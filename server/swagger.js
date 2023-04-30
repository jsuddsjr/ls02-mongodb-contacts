import path from 'node:path'
import swaggerJsdoc from 'swagger-jsdoc'

const swaggerDefinition = {
    swagger: '2.0',
    info: {
        title: 'Contacts API',
        version: '1.0.0',
        description: 'A simple Express.js Contacts API',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Local server',
        },
        {
            url: 'https://mongodb-contacts.onrender.com',
            description: 'Render server',
        },
    ],
}

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: [path.resolve('server/routes/contacts.js')],
    failOnErrors: true,
}

const swaggerSpec = swaggerJsdoc(options)
export default swaggerSpec
