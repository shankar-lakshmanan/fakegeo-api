import * as swaggerJsdoc from "swagger-jsdoc";
import { Options } from "swagger-jsdoc";


// Define the Swagger options
const options: Options = {
  definition: {
    openapi: "3.0.0", // Specify the OpenAPI version
    info: {
      title: "FakeGeo API", // Title of your API
      version: "1.0.0", // API version
      description: "Documentation for FakeGeo API", // Short description of the API
    },
  },
  // Path to the files with the API documentation annotations
  apis: ["./lambda/**/*.ts"], // Adjust the path to match your project structure
};

// Initialize swagger-jsdoc with the given options
const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
