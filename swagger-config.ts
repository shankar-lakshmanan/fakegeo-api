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
    // tags: [
    //   {
    //     name: "Point feature",
    //     description: "Operations related to geographical point feature",
    //   },
    //   {
    //     name: "Line feature",
    //     description: "Operations related to geographical line feature",
    //   },
    //   {
    //     name: "Polygon feature",
    //     description: "Operations related to geographical polygon feature",
    //   },
    //   {
    //     name: "MultiPoint feature",
    //     description: "Operations related to geographical multi point feature",
    //   },
    //   {
    //     name: "MultiLine feature",
    //     description: "Operations related to geographical multi line feature",
    //   },
    //   {
    //     name: "Points featureCollection",
    //     description: "Operations related to geographical points featureCollection"
    //   },
    //   {
    //     name: "Lines featureCollection",
    //     description: "Operations related to geographical lines featureCollection"
    //   },
    //   {
    //     name: "Polygons featureCollection",
    //     description: "Operations related to geographical polygons featureCollection"
    //   },{
    //     name: "Multipoints featureCollection",
    //     description: "Operations related to geographical multi points featureCollection"
    //   },{
    //     name: "MultiLines featureCollection",
    //     description: "Operations related to geographical multi lines featureCollection"
    //   },
    //   // Add more global tags here as needed
    // ],
  },
  // Path to the files with the API documentation annotations
  apis: ["./lambda/**/*.ts"], // Adjust the path to match your project structure
};

// Initialize swagger-jsdoc with the given options
const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
