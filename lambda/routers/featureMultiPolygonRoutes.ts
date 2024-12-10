import {
  MultiPolygon,
  RandomMultiPolygon,
  WithinMultiPolygon,
  WithinRandomMultiPolygon,
  MultiPolygonWithProperties,
  RandomMultiPolygonWithProperties,
  WithinMultiPolygonWithProperties,
  WithinRandomMultiPolygonWithProperties,
} from "../functions/multipolygon/multipolygon";

export const featureMultiPolygonRoutes: Record<string, Function> = {
  /**
   * @openapi
   * /feature/multipolygon:
   *   get:
   *     tags:
   *       - feature/multipolygon
   *     summary: Returns a multipolygon geojson Feature
   *     description: Generates a geographical multipolygon.
   *     responses:
   *       200:
   *         description: A successful response containing the multipolygon feature
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 type:
   *                   type: string
   *                   example: Feature
   *                 geometry:
   *                   type: object
   *                   properties:
   *                     type:
   *                       type: string
   *                       example: MultiPolygon
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: array
   *                         items:
   *                           type: array
   *                           items:
   *                             type: array
   *                             items:
   *                               type: number
   *                       example: [
   *                         [
   *                           [
   *                             [-98.41003457659247, 39.4047785977163],
   *                             [-98.02900405028468, 39.09917828895786],
   *                             [-96.96285807131997, 39.33112358709519],
   *                             [-97.70240571181387, 39.862404027619164],
   *                             [-98.41003457659247, 39.4047785977163]
   *                           ]
   *                         ]
   *                       ]
   *       400:
   *         description: Bad request - Invalid data
   *       500:
   *         description: Internal server error
   */
  "GET /feature/multipolygon": MultiPolygon,

  /**
   * @openapi
   * /feature/multipolygon/properties:
   *   get:
   *     tags:
   *       - feature/multipolygon - with properties
   *     summary: Returns a multipolygon geojson Feature with additional properties
   *     description: Generates a geographical multipolygon with associated metadata and properties.
   *     responses:
   *       200:
   *         description: A successful response containing the multipolygon feature with properties
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 type:
   *                   type: string
   *                   example: Feature
   *                 geometry:
   *                   type: object
   *                   properties:
   *                     type:
   *                       type: string
   *                       example: MultiPolygon
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: array
   *                         items:
   *                           type: array
   *                           items:
   *                             type: array
   *                             items:
   *                               type: number
   *                       example: [
   *                         [
   *                           [
   *                             [-98.41003457659247, 39.4047785977163],
   *                             [-98.02900405028468, 39.09917828895786],
   *                             [-96.96285807131997, 39.33112358709519],
   *                             [-97.70240571181387, 39.862404027619164],
   *                             [-98.41003457659247, 39.4047785977163]
   *                           ]
   *                         ]
   *                       ]
   *                 properties:
   *                   type: object
   *                   description: Additional metadata associated with the multipolygon
   *                   properties:
   *                     id:
   *                       type: string
   *                       example: "multipolygon_001"
   *                     name:
   *                       type: string
   *                       example: "Example MultiPolygon"
   *                     created_at:
   *                       type: string
   *                       format: date-time
   *                       example: "2024-12-01T16:00:00Z"
   *                     area:
   *                       type: number
   *                       description: The total area of the multipolygon in square kilometers.
   *                       example: 123.45
   *                     perimeter:
   *                       type: number
   *                       description: The total perimeter of the multipolygon in kilometers.
   *                       example: 67.89
   *                     description:
   *                       type: string
   *                       example: "A multipolygon representing an example geographical region."
   *       400:
   *         description: Bad request - Invalid data
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Invalid request data."
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "An unexpected error occurred while generating the multipolygon."
   */
  "GET /feature/multipolygon/properties": MultiPolygonWithProperties,

  /**
   * @openapi
   * /feature/multipolygon/random:
   *   get:
   *     tags:
   *       - feature/multipolygon
   *     summary: Returns a random multipolygon geojson Feature
   *     description: Generates a geographical random multipolygon.
   *     responses:
   *       200:
   *         description: A successful response containing the random multipolygon feature
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 type:
   *                   type: string
   *                   example: Feature
   *                 geometry:
   *                   type: object
   *                   properties:
   *                     type:
   *                       type: string
   *                       example: MultiPolygon
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: array
   *                         items:
   *                           type: array
   *                           items:
   *                             type: array
   *                             items:
   *                               type: number
   *       400:
   *         description: Bad request - Invalid data
   *       500:
   *         description: Internal server error
   */
  "GET /feature/multipolygon/random": RandomMultiPolygon,

  /**
   * @openapi
   * /feature/multipolygon/random/properties:
   *   get:
   *     tags:
   *       - feature/multipolygon - with properties
   *     summary: Returns a random multipolygon geojson Feature with additional properties
   *     description: Generates a geographical random multipolygon with associated metadata and properties.
   *     responses:
   *       200:
   *         description: A successful response containing the random multipolygon feature with properties
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 type:
   *                   type: string
   *                   example: Feature
   *                 geometry:
   *                   type: object
   *                   properties:
   *                     type:
   *                       type: string
   *                       example: MultiPolygon
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: array
   *                         items:
   *                           type: array
   *                           items:
   *                             type: array
   *                             items:
   *                               type: number
   *                       example: [
   *                         [
   *                           [
   *                             [-99.1234, 38.5678],
   *                             [-99.4567, 38.6789],
   *                             [-99.7890, 38.7890],
   *                             [-99.1234, 38.5678]
   *                           ]
   *                         ]
   *                       ]
   *                 properties:
   *                   type: object
   *                   description: Additional metadata associated with the random multipolygon
   *                   properties:
   *                     id:
   *                       type: string
   *                       example: "random_multipolygon_001"
   *                     name:
   *                       type: string
   *                       example: "Random MultiPolygon"
   *                     created_at:
   *                       type: string
   *                       format: date-time
   *                       example: "2024-12-01T16:00:00Z"
   *                     area:
   *                       type: number
   *                       description: The total area of the multipolygon in square kilometers.
   *                       example: 245.67
   *                     perimeter:
   *                       type: number
   *                       description: The total perimeter of the multipolygon in kilometers.
   *                       example: 150.32
   *                     description:
   *                       type: string
   *                       example: "A randomly generated multipolygon with associated properties."
   *       400:
   *         description: Bad request - Invalid data
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Invalid request data."
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "An unexpected error occurred while generating the random multipolygon."
   */
  "GET /feature/multipolygon/random/properties":
    RandomMultiPolygonWithProperties,

  /**
   * @openapi
   * /feature/multipolygon:
   *   post:
   *     tags:
   *       - feature/multipolygon
   *     summary: Returns a multipolygon geojson Feature within a GeoJSON polygon or bbox
   *     description: Accepts a GeoJSON Polygon or a bounding box (bbox) and returns a multipolygon within it.
   *     requestBody:
   *       required: false
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               geojsonPolygon:
   *                 type: object
   *                 description: GeoJSON Polygon to return a multipolygon within it
   *                 example:
   *                   type: "Polygon"
   *                   coordinates: [ ... ]
   *               bbox:
   *                 type: array
   *                 description: Bounding box in the format [minX, minY, maxX, maxY] to return a multipolygon within it
   *                 items:
   *                   type: number
   *                 example: [-104.35, 36.87, -94.44, 41.94]
   *     responses:
   *       200:
   *         description: A successful response
   *       400:
   *         description: Bad request - Invalid data
   *       500:
   *         description: Internal server error
   */
  "POST /feature/multipolygon": WithinMultiPolygon,

  /**
   * @openapi
   * /feature/multipolygon/properties:
   *   post:
   *     tags:
   *       - feature/multipolygon - with properties
   *     summary: Returns a multipolygon geojson Feature with properties within a GeoJSON polygon or bbox
   *     description: Accepts a GeoJSON Polygon or a bounding box (bbox) and returns a multipolygon within it with associated properties.
   *     requestBody:
   *       required: false
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               geojsonPolygon:
   *                 type: object
   *                 description: GeoJSON Polygon to return a multipolygon within it
   *                 example:
   *                   type: "Polygon"
   *                   coordinates: [
   *                     [
   *                       [-104.35, 36.87],
   *                       [-104.35, 41.94],
   *                       [-94.44, 41.94],
   *                       [-94.44, 36.87],
   *                       [-104.35, 36.87]
   *                     ]
   *                   ]
   *               bbox:
   *                 type: array
   *                 description: Bounding box in the format [minX, minY, maxX, maxY] to return a multipolygon within it
   *                 items:
   *                   type: number
   *                 example: [-104.35, 36.87, -94.44, 41.94]
   *     responses:
   *       200:
   *         description: A successful response containing the multipolygon feature with properties
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 type:
   *                   type: string
   *                   example: Feature
   *                 geometry:
   *                   type: object
   *                   properties:
   *                     type:
   *                       type: string
   *                       example: MultiPolygon
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: array
   *                         items:
   *                           type: array
   *                           items:
   *                             type: array
   *                             items:
   *                               type: number
   *                       example: [
   *                         [
   *                           [
   *                             [-104.34, 37.12],
   *                             [-104.10, 37.25],
   *                             [-103.92, 37.11],
   *                             [-104.34, 37.12]
   *                           ]
   *                         ]
   *                       ]
   *                 properties:
   *                   type: object
   *                   description: Additional metadata associated with the multipolygon
   *                   properties:
   *                     id:
   *                       type: string
   *                       example: "multipolygon_within_001"
   *                     name:
   *                       type: string
   *                       example: "Multipolygon Within Area"
   *                     created_at:
   *                       type: string
   *                       format: date-time
   *                       example: "2024-12-01T16:00:00Z"
   *                     area:
   *                       type: number
   *                       description: The area of the multipolygon in square kilometers.
   *                       example: 325.45
   *                     perimeter:
   *                       type: number
   *                       description: The perimeter of the multipolygon in kilometers.
   *                       example: 240.12
   *                     description:
   *                       type: string
   *                       example: "A multipolygon generated within the provided area with additional metadata."
   *       400:
   *         description: Bad request - Invalid input data
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Invalid GeoJSON Polygon or bounding box provided."
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "An unexpected error occurred while generating the multipolygon."
   */
  "POST /feature/multipolygon/properties": WithinMultiPolygonWithProperties,

  /**
   * @openapi
   * /feature/multipolygon/random:
   *   post:
   *     tags:
   *       - feature/multipolygon
   *     summary: Returns a random multipolygon geojson Feature within a GeoJSON polygon or bbox
   *     description: Accepts a GeoJSON Polygon or a bounding box (bbox) and returns a random multipolygon within it.
   *     requestBody:
   *       required: false
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               geojsonPolygon:
   *                 type: object
   *                 description: GeoJSON Polygon to return a random multipolygon within it
   *                 example:
   *                   type: "Polygon"
   *                   coordinates: [ ... ]
   *               bbox:
   *                 type: array
   *                 description: Bounding box in the format [minX, minY, maxX, maxY] to return a random multipolygon within it
   *                 items:
   *                   type: number
   *                 example: [-104.35, 36.87, -94.44, 41.94]
   *     responses:
   *       200:
   *         description: A successful response
   *       400:
   *         description: Bad request - Invalid data
   *       500:
   *         description: Internal server error
   */
  "POST /feature/multipolygon/random": WithinRandomMultiPolygon,

  /**
   * @openapi
   * /feature/multipolygon/random/properties:
   *   post:
   *     tags:
   *       - feature/multipolygon - with properties
   *     summary: Returns a random multipolygon geojson Feature with properties within a GeoJSON polygon or bbox
   *     description: Accepts a GeoJSON Polygon or a bounding box (bbox) and returns a random multipolygon within it, along with associated properties.
   *     requestBody:
   *       required: false
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               geojsonPolygon:
   *                 type: object
   *                 description: GeoJSON Polygon to return a random multipolygon within it
   *                 example:
   *                   type: "Polygon"
   *                   coordinates: [
   *                     [
   *                       [-104.35, 36.87],
   *                       [-104.35, 41.94],
   *                       [-94.44, 41.94],
   *                       [-94.44, 36.87],
   *                       [-104.35, 36.87]
   *                     ]
   *                   ]
   *               bbox:
   *                 type: array
   *                 description: Bounding box in the format [minX, minY, maxX, maxY] to return a random multipolygon within it
   *                 items:
   *                   type: number
   *                 example: [-104.35, 36.87, -94.44, 41.94]
   *     responses:
   *       200:
   *         description: A successful response containing the random multipolygon feature with properties
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 type:
   *                   type: string
   *                   example: Feature
   *                 geometry:
   *                   type: object
   *                   properties:
   *                     type:
   *                       type: string
   *                       example: MultiPolygon
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: array
   *                         items:
   *                           type: array
   *                           items:
   *                             type: array
   *                             items:
   *                               type: number
   *                       example: [
   *                         [
   *                           [
   *                             [-104.22, 37.01],
   *                             [-104.11, 37.12],
   *                             [-104.35, 37.25],
   *                             [-104.22, 37.01]
   *                           ]
   *                         ]
   *                       ]
   *                 properties:
   *                   type: object
   *                   description: Additional metadata associated with the random multipolygon
   *                   properties:
   *                     id:
   *                       type: string
   *                       example: "random_multipolygon_001"
   *                     name:
   *                       type: string
   *                       example: "Random Multipolygon"
   *                     created_at:
   *                       type: string
   *                       format: date-time
   *                       example: "2024-12-01T16:00:00Z"
   *                     area:
   *                       type: number
   *                       description: The area of the random multipolygon in square kilometers.
   *                       example: 421.75
   *                     perimeter:
   *                       type: number
   *                       description: The perimeter of the random multipolygon in kilometers.
   *                       example: 315.62
   *                     description:
   *                       type: string
   *                       example: "A random multipolygon generated within the provided area with additional metadata."
   *       400:
   *         description: Bad request - Invalid input data
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Invalid GeoJSON Polygon or bounding box provided."
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "An unexpected error occurred while generating the random multipolygon."
   */
  "POST /feature/multipolygon/random/properties":
    WithinRandomMultiPolygonWithProperties,
};
