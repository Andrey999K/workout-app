import { Router } from 'express'
import { protect } from '../middleware/auth.middleware'
import {
	createExercise,
	deleteExercise,
	getExercise,
	updateExercise
} from './exercise.controller'
import { createNewExerciseLog } from './log/exercise-log.controller'

const router = Router()

router.route('/').post(protect, createExercise).get(protect, getExercise)
router
	.route('/:id')
	.put(protect, updateExercise)
	.delete(protect, deleteExercise)

router.route('/log/:exerciseId').post(protect, createNewExerciseLog)

export const exerciseRoutes = router
