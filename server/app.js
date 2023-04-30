import express from 'express'
import logger from 'morgan'
import swaggerUi from 'swagger-ui-express';

import contactsRoute from './routes/contacts.js'
import indexRoute from './routes/index.js'

import swaggerSpec from './swagger.js';

const app = express()
	// Middleware
	.use(logger('dev'))
	.use(express.json())
	.use(express.urlencoded({extended: false}))

	// Routes
	.use('/', indexRoute)
	.use('/contacts', contactsRoute)
	.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

export default app
