import { Router } from 'express'
import { protect } from '../middleware/auth.middleware'
import { getUserProfile } from './user.controller'

const router = Router()

router.route('/profile').get(protect, getUserProfile)

export const userRoutes = router
