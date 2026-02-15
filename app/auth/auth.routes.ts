import { Router } from 'express'
import { authUser } from './auth.controller'

const router = Router()

router.route('/login').post(authUser)

export default router
