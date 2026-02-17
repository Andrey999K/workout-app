import { Request } from 'express'
import { Prisma } from '../generated/prisma/client'
import { UserFields } from '../utils/user.utils'

type UserPayload = Prisma.UserGetPayload<{
	select: typeof UserFields
}>

export interface AuthRequest extends Request {
	user?: UserPayload
}
