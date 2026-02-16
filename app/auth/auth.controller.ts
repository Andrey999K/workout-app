import { faker } from '@faker-js/faker'
import { hash, verify } from 'argon2'
import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma'
import { UserFields } from '../utils/user.utils'
import { generateToken } from './generate-token'

// @desc 		Auth user
// @route 	POST /api/auth/login
// @access 	Public
export const authUser = asyncHandler(async (req: Request, res: Response) => {
	const { email, password } = req.body
	const user = await prisma.user.findUnique({
		where: {
			email
		}
	})

	if (!user) {
		res.status(401)
		throw new Error('Invalid email or password')
	}

	const validUser = await verify(user.password, password)

	if (validUser) {
		const token = generateToken(user.id)
		res.json({ user, token })
		return
	}

	res.status(401)
	throw new Error('Invalid email or password')
})

// @desc 		Register user
// @route 	POST /api/auth/signup
// @access 	Public
export const signupUser = asyncHandler(async (req: Request, res: Response) => {
	const { email, password } = req.body
	const isHaveUser = await prisma.user.findFirst({
		where: {
			email
		}
	})

	if (isHaveUser) {
		res.status(409)
		throw new Error('User already exists')
	}

	const user = await prisma.user.create({
		data: {
			email,
			password: await hash(password),
			name: faker.person.fullName()
		},
		select: UserFields
	})

	const token = generateToken(user.id)

	res.json({ user, token })
})
