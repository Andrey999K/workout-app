import { Router } from 'express'
import { authUser, signupUser } from './auth.controller'

const router = Router()

router.route('/login').post(authUser)
router.route('/signup').post(signupUser)

export const authRoutes = router
