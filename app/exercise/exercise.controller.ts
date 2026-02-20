import { Response } from 'express'
import { prisma } from '../prisma'
import { AuthRequest } from '../types/authRequest'

// @desc Create exercises
// @route POST /api/exercises
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
// @route GET /api/exercises
// @access Private
export const getExercise = async (req: AuthRequest, res: Response) => {
	const exercises = await prisma.exercise.findMany({
		orderBy: {
			createdAt: 'desc'
		}
	})

	res.json({ exercises })
}

// @desc Update exercises
// @route PUT /api/exercises/:id
// @access Private
export const updateExercise = async (req: AuthRequest, res: Response) => {
	const exercises = await prisma.exercise.update({
		where: {
			id: +req.params.id
		},
		data: req.body
	})

	res.json({ exercises })
}

// @desc Delete exercises
// @route DELETE /api/exercises/:id
// @access Private
export const deleteExercise = async (req: AuthRequest, res: Response) => {
	const exercises = await prisma.exercise.delete({
		where: {
			id: +req.params.id
		}
	})

	res.json({ exercises })
}
