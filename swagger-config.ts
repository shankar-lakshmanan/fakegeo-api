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
    tags: [
      {
        name: "feature/point",
        description: "Operations related to point geojson feature",
      },
      {
        name: "feature/point - with properties",
        description: "Operations related to point geojson feature",
      },
      {
        name: "feature/multipoint",
        description: "Operations related to multipoint geojson feature",
      },
      {
        name: "feature/multipoint - with properties",
        description: "Operations related to multipoint geojson feature",
      },
      {
        name: "featureCollection/points",
        description: "Operations related to points geojson feature collection",
      },
      {
        name: "featureCollection/points - with properties",
        description: "Operations related to points geojson feature collection",
      },
      {
        name: "featureCollection/multipoints",
        description: "Operations related to multipoints geojson feature collection",
      },
      {
        name: "featureCollection/multipoints - with properties",
        description: "Operations related to multipoints geojson feature collection",
      },

      {
        name: "feature/line",
        description: "Operations related to line geojson feature",
      },
      {
        name: "feature/line - with properties",
        description: "Operations related to line geojson feature",
      },
      {
        name: "feature/multiline",
        description: "Operations related to multiline geojson feature",
      },
      {
        name: "feature/multiline - with properties",
        description: "Operations related to multiline geojson feature",
      },
      {
        name: "featureCollection/lines",
        description: "Operations related to lines geojson feature collection",
      },
      {
        name: "featureCollection/lines - with properties",
        description: "Operations related to lines geojson feature collection",
      },
      {
        name: "featureCollection/multilines",
        description: "Operations related to multilines geojson feature collection",
      },
      {
        name: "featureCollection/multilines - with properties",
        description: "Operations related to multilines geojson feature collection",
      },

      {
        name: "feature/polygon",
        description: "Operations related to polygon geojson feature",
      },
      {
        name: "feature/polygon - with properties",
        description: "Operations related to polygon geojson feature",
      },
      {
        name: "feature/multipolygon",
        description: "Operations related to multipolygon geojson feature",
      },
      {
        name: "feature/multipolygon - with properties",
        description: "Operations related to multipolygon geojson feature",
      },
      {
        name: "featureCollection/polygons",
        description: "Operations related to polygons geojson feature collection",
      },
      {
        name: "featureCollection/polygons - with properties",
        description: "Operations related to polygons geojson feature collection",
      },
      {
        name: "featureCollection/multipolygons",
        description: "Operations related to multipolygons geojson feature collection",
      },
      {
        name: "featureCollection/multipolygons - with properties",
        description: "Operations related to multipolygons geojson feature collection",
      },
    ]
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
