import { Request, Response } from 'express'


// @desc 		Auth user
// @route 	POST /api/auth/login
// @access 	Public

export const authUser = async (_req: Request, res: Response) => {
	res.json({ message: 'You are authenticated' })
}
