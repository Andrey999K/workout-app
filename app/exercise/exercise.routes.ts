import { Router } from 'express'
import { protect } from '../middleware/auth.middleware'
import {
	createExercise,
	deleteExercise,
	getExercise,
	updateExercise
} from './exercise.controller'

const router = Router()

router.route('/').post(protect, createExercise).get(protect, getExercise)
router
	.route('/:id')
	.put(protect, updateExercise)
	.delete(protect, deleteExercise)

export const exerciseRoutes = router
