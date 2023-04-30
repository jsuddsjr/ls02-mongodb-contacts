#!/usr/bin/env node
import http from 'node:http'
import process from 'node:process'
import debugLib from 'debug'
import app from '../app.js'
import mongodb from '../db/connect.js'

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

mongodb.initDb((error, _db) => {
	if (error) {
		console.log(error)
	} else {
		/**
		 * Create HTTP server.
		 */

		const server = http.createServer(app)

		/**
		 * Listen on provided port, on all network interfaces.
		 */

		server.listen(port)
		server.on('error', onError)
		server.on('listening', () => {
			const debug = debugLib('ls02-mongodb-contacts:server')
			const addr = server.address()
			const bind =
				typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
			debug('Listening on ' + bind)
		})
	}
})

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(value) {
	const port = Number.parseInt(value, 10)

	if (Number.isNaN(port)) {
		// Named pipe
		return value
	}

	if (port >= 0) {
		// Port number
		return port
	}

	return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error
	}

	const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

	// Handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES': {
			console.error(bind + ' requires elevated privileges')
			process.exit(1)
			break
		}

		case 'EADDRINUSE': {
			console.error(bind + ' is already in use')
			process.exit(1)
			break
		}

		default: {
			console.error(error)
			throw error
		}
	}
}
