import express from 'express'
import logger from 'morgan'
import indexRoute from './routes/index.js'
import contactsRoute from './routes/contacts.js'

const app = express()
	// Middleware
	.use(logger('dev'))
	.use(express.json())
	.use(express.urlencoded({extended: false}))
	.use(express.static(path.join(path.dirname('..'), 'public')))

	// Routes
	.use('/', indexRoute)
	.use('/contacts', contactsRoute)

export default app
