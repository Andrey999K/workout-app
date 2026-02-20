import { Router } from 'express'
import { protect } from '../middleware/auth.middleware'
import {
	createExercise,
	deleteExercise,
	getExercise,
	updateExercise
} from './exercise.controller'

const router = Router()

router.route('/').post(protect, createExercise)
router.route('/').get(protect, getExercise)
router.route('/:id').put(protect, updateExercise)
router.route('/:id').delete(protect, deleteExercise)

export const exerciseRoutes = router
