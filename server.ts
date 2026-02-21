import 'colors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import { errorHandler, notFound } from './app/middleware/error.middleware'
import { authRoutes } from './app/auth/auth.routes'
import { exerciseRoutes } from './app/exercise/exercise.routes'
import { prisma } from './app/prisma.js'
import { userRoutes } from './app/user/user.routes'
import { workoutRoutes } from './app/workout/workout.routes'

dotenv.config()

const app = express()

async function main() {
	if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

	app.use(express.json())

	app.use('/uploads', express.static('uploads'))

	app.use('/api/auth', authRoutes)
	app.use('/api/users', userRoutes)
	app.use('/api/exercises', exerciseRoutes)
	app.use('/api/workouts', workoutRoutes)

	app.use(notFound)
	app.use(errorHandler)

	const PORT = process.env.PORT || 4000

	app.listen(PORT, () => {
		console.log(
			`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold
		)
	})
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
