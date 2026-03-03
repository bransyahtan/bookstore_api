import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bookstore API Documentation",
      version: "1.0.0",
      description: "API documentation for the Bookstore application",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "integer" },
            email: { type: "string" },
            fullName: { type: "string" },
            role: { type: "string", enum: ["admin", "customer"] },
          },
        },
        RegisterRequest: {
          type: "object",
          required: ["fullName", "email", "password"],
          properties: {
            fullName: { type: "string" },
            email: { type: "string" },
            password: { type: "string" },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string" },
            password: { type: "string" },
          },
        },
        Book: {
          type: "object",
          properties: {
            id: { type: "integer" },
            title: { type: "string" },
            authorId: { type: "integer" },
            price: { type: "number" },
            stock: { type: "integer" },
          },
        },
        Author: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            bio: { type: "string" },
          },
        },
      },
      responses: {
        UnauthorizedError: {
          description: "Access token is missing or invalid",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "object",
                    properties: {
                      code: { type: "string", example: "UNAUTHORIZED" },
                      message: { type: "string", example: "No token provided" },
                    },
                  },
                },
              },
            },
          },
        },
        ForbiddenError: {
          description: "User does not have the required permissions",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "object",
                    properties: {
                      code: { type: "string", example: "FORBIDDEN" },
                      message: {
                        type: "string",
                        example: "admin role required",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        NotFoundError: {
          description: "The requested resource was not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "object",
                    properties: {
                      code: { type: "string", example: "NOT_FOUND" },
                      message: {
                        type: "string",
                        example: "Resource not found",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        ValidationError: {
          description: "Invalid request payload",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "object",
                    properties: {
                      code: { type: "string", example: "VALIDATION_ERROR" },
                      message: {
                        type: "string",
                        example:
                          "email is required, password must be at least 6 characters",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./controllers/*.ts", "./routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
