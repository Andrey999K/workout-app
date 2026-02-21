import { Router } from 'express'
import { protect } from '../middleware/auth.middleware'
import {
	createWorkout,
	deleteWorkout,
	getWorkout,
	getWorkouts,
	updateWorkout
} from './workout.controller'

const router = Router()

router.route('/').post(protect, createWorkout).get(protect, getWorkouts)
router
	.route('/:id')
	.get(protect, getWorkout)
	.put(protect, updateWorkout)
	.delete(protect, deleteWorkout)

export const workoutRoutes = router
