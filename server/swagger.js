import swaggerJsdoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.0',
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
            url: 'mongodb-contacts.onrender.com',
            description: 'Render server',
        }
    ],
};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;
