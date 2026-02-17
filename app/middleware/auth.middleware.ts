import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import { prisma } from '../prisma'
import { AuthRequest } from '../types/authRequest'
import { UserFields } from '../utils/user.utils'

export const protect = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	let token

	if (req.headers.authorization?.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1]
	}

	let decoded
	try {
		decoded = jwt.verify(token!, process.env.JWT_SECRET!)
	} catch (error) {
		console.log('error', error)
		res.status(401)
		throw new Error('Not authorized, token failed')
	}

	if (decoded && typeof decoded === 'object') {
		const user = await prisma.user.findUnique({
			where: {
				id: decoded.userId
			},
			select: UserFields
		})

		if (user) {
			req.user = user
			next()
			return
		}
	}

	res.status(401)
	throw new Error('Not authorized, token failed')
}
