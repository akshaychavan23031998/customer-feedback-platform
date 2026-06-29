import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Customer Feedback Platform API',
    version: '1.0.0',
    description:
      'REST API documentation for the Customer Feedback Platform assignment.',
  },
  servers: [
    {
      url: 'http://localhost:5000/api',
      description: 'Local development server',
    },
  ],
  tags: [
    {
      name: 'Health',
      description: 'API health check endpoints',
    },
    {
      name: 'Auth',
      description: 'Admin authentication endpoints',
    },
    {
      name: 'Feedback',
      description: 'Feedback submission and admin feedback management endpoints',
    },
    {
      name: 'Analytics',
      description: 'Admin analytics endpoints',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            example: 'admin@acowale.test',
          },
          password: {
            type: 'string',
            example: 'password123',
          },
        },
      },
      FeedbackRequest: {
        type: 'object',
        required: ['category', 'rating', 'comment'],
        properties: {
          name: {
            type: 'string',
            example: 'Akshay',
          },
          email: {
            type: 'string',
            example: 'akshay@example.com',
          },
          category: {
            type: 'string',
            enum: [
              'Bug',
              'Feature Request',
              'UI/UX',
              'Performance',
              'Support',
              'Billing',
              'General',
              'Other',
            ],
            example: 'Bug',
          },
          rating: {
            type: 'integer',
            minimum: 1,
            maximum: 5,
            example: 4,
          },
          comment: {
            type: 'string',
            example: 'The dashboard loads slowly on mobile devices.',
          },
          source: {
            type: 'string',
            example: 'Web',
          },
        },
      },
      ApiSuccessResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true,
          },
          message: {
            type: 'string',
            example: 'Request completed successfully.',
          },
        },
      },
      ApiErrorResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false,
          },
          message: {
            type: 'string',
            example: 'Something went wrong.',
          },
        },
      },
    },
  },
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);