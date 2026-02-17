import { Response } from 'express'
import { prisma } from '../prisma'
import { AuthRequest } from '../types/authRequest'

// @desc Create exercises
// @route POST /api/exercise
// @access Private
export const createExercise = async (req: AuthRequest, res: Response) => {
	const { name, times, iconPath } = req.body

	const newExercise = await prisma.exercise.create({
		data: {
			name,
			times,
			iconPath,
			userId: req.user!.id
		}
	})

	res.json(newExercise)
}

// @desc Get exercises
// @route GET /api/exercise
// @access Private
export const getExercise = async (req: AuthRequest, res: Response) => {
	const exercises = await prisma.exercise.findMany()

	res.json({ exercises })
}
