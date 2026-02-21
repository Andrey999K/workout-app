import { Response } from 'express'
import { prisma } from '../../prisma'
import { AuthRequest } from '../../types/authRequest'

// @desc    Create new exercise log
// @route   POST /api/exercise/log/:exerciseId
// @access  Private
export const createNewExerciseLog = async (req: AuthRequest, res: Response) => {
	const exerciseId = +req.params.exerciseId

	const exercise = await prisma.exercise.findUnique({
		where: {
			id: exerciseId
		}
	})

	if (!exercise) {
		res.status(404)
		throw new Error('Exercise not found')
	}

	let timesDefault = []

	for (let i = 0; i < exercise.times; i++) {
		timesDefault.push({
			weight: 0,
			repeat: 0
		})
	}

	const exerciseLog = await prisma.exerciseLog.create({
		data: {
			user: {
				connect: {
					id: req.user!.id
				}
			},
			exercise: {
				connect: {
					id: exerciseId
				}
			},
			times: {
				createMany: {
					data: timesDefault
				}
			}
		},
		include: {
			times: true,
			_count: true
		}
	})
	res.json({ exerciseLog })
}
