import swaggerJSDoc from 'swagger-jsdoc';

import { env } from './env.js';

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
      url: `${env.apiPublicUrl}/api`,
      description:
        env.nodeEnv === 'production'
          ? 'Production server'
          : 'Local development server',
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
  paths: {
    '/health': {
      get: {
        summary: 'Check API health status',
        tags: ['Health'],
        responses: {
          200: {
            description: 'API is healthy',
          },
        },
      },
    },
    '/auth/login': {
      post: {
        summary: 'Login admin user',
        description: 'Authenticates the admin user and returns a JWT token.',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LoginRequest',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Login successful',
          },
          400: {
            description: 'Email and password are required',
          },
          401: {
            description: 'Invalid email or password',
          },
          429: {
            description: 'Too many login attempts',
          },
        },
      },
    },
    '/auth/logout': {
      post: {
        summary: 'Logout admin user',
        description:
          'Logs out the admin user. The frontend clears the stored JWT token after this call.',
        tags: ['Auth'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: 'Logout successful',
          },
          401: {
            description: 'Authentication token is required or invalid',
          },
        },
      },
    },
    '/feedback': {
      post: {
        summary: 'Submit public feedback',
        description: 'Allows any user to submit feedback without authentication.',
        tags: ['Feedback'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/FeedbackRequest',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Feedback submitted successfully',
          },
          400: {
            description: 'Validation failed',
          },
          429: {
            description: 'Too many feedback submissions',
          },
        },
      },
      get: {
        summary: 'Get feedback list for admin dashboard',
        description:
          'Returns submitted feedback with search, filters, sorting, and pagination. Requires admin JWT token.',
        tags: ['Feedback'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            in: 'query',
            name: 'search',
            schema: {
              type: 'string',
            },
            description: 'Search by comment, category, status, user name, or email',
          },
          {
            in: 'query',
            name: 'category',
            schema: {
              type: 'string',
              enum: [
                'All',
                'Bug',
                'Feature Request',
                'UI/UX',
                'Performance',
                'Support',
                'Billing',
                'General',
                'Other',
              ],
            },
            description: 'Category filter',
          },
          {
            in: 'query',
            name: 'status',
            schema: {
              type: 'string',
              enum: ['All', 'New', 'In Review', 'Resolved', 'Archived'],
            },
            description: 'Status filter',
          },
          {
            in: 'query',
            name: 'rating',
            schema: {
              type: 'string',
              example: 'All',
            },
            description: 'Rating filter. Use All or a rating from 1 to 5.',
          },
          {
            in: 'query',
            name: 'sortBy',
            schema: {
              type: 'string',
              enum: ['latest', 'oldest', 'highestRating', 'lowestRating'],
            },
            description: 'Sorting option',
          },
          {
            in: 'query',
            name: 'page',
            schema: {
              type: 'integer',
              example: 1,
            },
            description: 'Page number',
          },
          {
            in: 'query',
            name: 'limit',
            schema: {
              type: 'integer',
              example: 10,
            },
            description: 'Number of records per page',
          },
        ],
        responses: {
          200: {
            description: 'Feedback fetched successfully',
          },
          401: {
            description: 'Authentication token is required',
          },
        },
      },
    },
    '/analytics/summary': {
      get: {
        summary: 'Get analytics summary for admin dashboard',
        description:
          'Returns feedback totals, category distribution, rating distribution, recent submissions, and trend data.',
        tags: ['Analytics'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: 'Analytics summary fetched successfully',
          },
          401: {
            description: 'Authentication token is required',
          },
        },
      },
    },
  },
};

const swaggerOptions = {
  swaggerDefinition,
  apis: [],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);