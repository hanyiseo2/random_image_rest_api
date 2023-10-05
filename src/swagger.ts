import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Random-Image-API",
      version: "1.0.0",
      description: "creating random_image with query function",
    },
    basePath: "/",
  },
  apis: ["src/handlers.ts"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
