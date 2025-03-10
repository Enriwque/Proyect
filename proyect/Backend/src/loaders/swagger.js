import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '3.0.0',
    },
    tags: [
        {
        name: 'Characters',
        description: 'API for characters in the database'
        },
        {
        name: 'Chapters',
        description: 'API for chapters in the database'
        },
        {
        name: 'Users',
        description: 'API for users in the database'
        },
        {
        name: 'Posts',
        description: 'API for posts from users in the database'
        },
    ],
  },
  apis: [
    
    './routes/chapters.js',
    './routes/wikih.js',
    './routes/users.js',
    './routes/posts.js',
  ] 
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };