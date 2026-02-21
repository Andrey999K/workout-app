import { Response } from 'express'
import { prisma } from '../prisma'
import { AuthRequest } from '../types/authRequest'

// @desc Get workout
// @route GET /api/workout
// @access Private
export const getWorkouts = async (req: AuthRequest, res: Response) => {
	const workouts = await prisma.workout.findMany({
		orderBy: {
			createdAt: 'desc'
		},
		include: {
			exercises: true
		}
	})

	const massWorkouts = workouts.map(workout => ({
		...workout,
		minutes: Math.ceil(workout!.exercises.length * 3.7)
	}))

	res.json({ data: massWorkouts })
}

// @desc Get workout
// @route GET /api/workout/:id
// @access Private
export const getWorkout = async (req: AuthRequest, res: Response) => {
	try {
		const workout = await prisma.workout.findUnique({
			where: {
				id: +req.params.id
			},
			include: {
				exercises: true
			}
		})

		const minutes = Math.ceil(workout!.exercises.length * 3.7)

		res.json({ ...workout, minutes })
	} catch (error) {
		res.status(404)
		throw new Error('Workout not found')
	}
}

// @desc Create workout
// @route POST /api/workout
// @access Private
export const createWorkout = async (req: AuthRequest, res: Response) => {
	const { name, exerciseIds } = req.body

	const newWorkout = await prisma.workout.create({
		data: {
			name,
			exercises: {
				connect: exerciseIds.map((id: number) => ({ id: +id }))
			}
		}
	})

	res.json(newWorkout)
}

// @desc Update workout
// @route PUT /api/workout/:id
// @access Private
export const updateWorkout = async (req: AuthRequest, res: Response) => {
	const { name, exerciseIds } = req.body

	console.log('workout id', +req.params.id)

	try {
		const workout = await prisma.workout.update({
			where: {
				id: +req.params.id
			},
			data: {
				name,
				exercises: {
					set: exerciseIds.map((id: number) => ({ id: +id }))
				}
			}
		})

		res.json(workout)
	} catch (error) {
		res.status(404)
		throw new Error('Workout not found')
	}
}

// @desc Delete workout
// @route DELETE /api/workout/:id
// @access Private
export const deleteWorkout = async (req: AuthRequest, res: Response) => {
	try {
		const workout = await prisma.workout.delete({
			where: {
				id: +req.params.id
			}
		})

		res.json({ workout })
	} catch (error) {
		res.status(404)
		throw new Error('Workout not found')
	}
}
