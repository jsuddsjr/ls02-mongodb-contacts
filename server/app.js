import express from 'express'
import logger from 'morgan'
import contactsRoute from './routes/contacts.js'
import indexRoute from './routes/index.js'

const app = express()
	// Middleware
	.use(logger('dev'))
	.use(express.json())
	.use(express.urlencoded({extended: false}))

	// Routes
	.use('/', indexRoute)
	.use('/contacts', contactsRoute)

export default app
