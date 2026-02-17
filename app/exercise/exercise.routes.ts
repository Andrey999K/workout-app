import { Router } from 'express'
import { protect } from '../middleware/auth.middleware'
import { createExercise, getExercise } from './exercise.controller'

const router = Router()

router.route('/').post(protect, createExercise)
router.route('/').get(protect, getExercise)

export const exerciseRoutes = router
