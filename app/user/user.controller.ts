import { Response } from 'express'
import { prisma } from '../prisma'
import { AuthRequest } from '../types/authRequest'
import { UserFields } from '../utils/user.utils'

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
export const getUserProfile = async (req: AuthRequest, res: Response) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.user!.id
		},
		select: UserFields
	})

	res.json(user)
}
