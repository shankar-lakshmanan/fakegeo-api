import {
  MultiLine,
  RandomMultiLine,
  WithinMultiLine,
  WithinRandomMultiLine,
  MultiLineWithProperties,
  RandomMultiLineWithProperties,
  WithinMultiLineWithProperties,
  WithinRandomMultiLineWithProperties,
} from "../functions/line/multiline";

export const featureMultiLineRoutes: Record<string, Function> = {
  /**
   * @openapi
   * /feature/multiline:
   *   get:
   *     tags:
   *       - feature/multiline
   *     summary: Returns a multi-line geojson Feature
   *     description: Generates a geographical MultiLineString.
   *     responses:
   *       200:
   *         description: A successful response containing the multi-line feature
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
   *                       example: MultiLineString
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: array
   *                         items:
   *                           type: array
   *                           items:
   *                             type: number
   *                       example: [
   *                         [[-98.46358188123595, 38.16839367133355], [-98.0095425039122, 38.6109019399903]],
   *                         [[-97.5063234325582, 38.192492088530855], [-96.76369691515532, 38.668456803745556]]
   *                       ]
   *       400:
   *         description: Bad request - Invalid data
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Invalid request
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Internal Server Error
   */

  "GET /feature/multiline": MultiLine,

  /**
   * @openapi
   * /feature/multiline/properties:
   *   get:
   *     tags:
   *       - feature/multiline - with properties
   *     summary: Returns a multi-line GeoJSON Feature with properties
   *     description: Generates a geographical MultiLineString feature with additional properties describing the feature.
   *     responses:
   *       200:
   *         description: A successful response containing the multi-line feature with properties
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
   *                       example: MultiLineString
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: array
   *                         items:
   *                           type: array
   *                           items:
   *                             type: number
   *                       example: [
   *                         [[-98.46358188123595, 38.16839367133355], [-98.0095425039122, 38.6109019399903]],
   *                         [[-97.5063234325582, 38.192492088530855], [-96.76369691515532, 38.668456803745556]]
   *                       ]
   *                 properties:
   *                   type: object
   *                   description: Additional metadata associated with the MultiLineString feature
   *                   properties:
   *                     id:
   *                       type: string
   *                       example: "multiline_feature_001"
   *                     name:
   *                       type: string
   *                       example: "MultiLine Feature Example"
   *                     description:
   *                       type: string
   *                       example: "A randomly generated multi-line geographical feature."
   *                     created_at:
   *                       type: string
   *                       format: date-time
   *                       example: "2024-11-28T12:00:00Z"
   *       400:
   *         description: Bad request - Invalid data
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Invalid request
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Internal Server Error
   */

  "GET /feature/multiline/properties": MultiLineWithProperties,

  /**
   * @openapi
   * /feature/multiline/random:
   *   get:
   *     tags:
   *       - feature/multiline
   *     summary: Returns a random multi-line geojson Feature
   *     description: Generates a random geographical MultiLineString.
   *     responses:
   *       200:
   *         description: A successful response containing the random multi-line feature
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
   *                       example: MultiLineString
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: array
   *                         items:
   *                           type: array
   *                           items:
   *                             type: number
   *                       example: [
   *                         [[-98.46358188123595, 38.16839367133355], [-98.0095425039122, 38.6109019399903]],
   *                         [[-97.5063234325582, 38.192492088530855], [-96.76369691515532, 38.668456803745556]]
   *                       ]
   *       400:
   *         description: Bad request - Invalid data
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Invalid request
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Internal Server Error
   */
  "GET /feature/multiline/random": RandomMultiLine,

  /**
   * @openapi
   * /feature/multiline/random/properties:
   *   get:
   *     tags:
   *       - feature/multiline - with properties
   *     summary: Returns a random multi-line GeoJSON Feature with properties
   *     description: Generates a random geographical MultiLineString feature with associated metadata properties.
   *     responses:
   *       200:
   *         description: A successful response containing the random multi-line feature with properties
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
   *                       example: MultiLineString
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: array
   *                         items:
   *                           type: array
   *                           items:
   *                             type: number
   *                       example: [
   *                         [[-100.12345, 39.98765], [-99.54321, 40.12345]],
   *                         [[-97.56789, 38.87654], [-96.67890, 39.45678]]
   *                       ]
   *                 properties:
   *                   type: object
   *                   description: Additional metadata associated with the MultiLineString feature
   *                   properties:
   *                     id:
   *                       type: string
   *                       example: "random_multiline_001"
   *                     name:
   *                       type: string
   *                       example: "Random MultiLine Feature"
   *                     description:
   *                       type: string
   *                       example: "A randomly generated multi-line geographical feature with metadata."
   *                     created_at:
   *                       type: string
   *                       format: date-time
   *                       example: "2024-12-01T15:00:00Z"
   *       400:
   *         description: Bad request - Invalid data
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Invalid request
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Internal Server Error
   */

  "GET /feature/multiline/random/properties": RandomMultiLineWithProperties,

  /**
   * @openapi
   * /feature/multiline:
   *   post:
   *     tags:
   *       - feature/multiline
   *     summary: Returns a multi-line geojson feature within a GeoJSON polygon or bbox
   *     description: Accepts a GeoJSON Polygon or a bounding box (bbox) and returns a multi-line within it.
   *     requestBody:
   *       required: false
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               geojsonPolygon:
   *                 type: object
   *                 description: GeoJSON Polygon to return a multi-line within it
   *                 example:
   *                   type: "Polygon"
   *                   coordinates: [[[-104.3, 40.1], [-99.7, 36.8], [-94.4, 38.1], [-99.3, 41.9], [-104.3, 40.1]]]
   *               bbox:
   *                 type: array
   *                 description: Bounding box [minX, minY, maxX, maxY] to return a multi-line within
   *                 items:
   *                   type: number
   *                 example: [-104.3, 36.8, -94.4, 41.9]
   *     responses:
   *       200:
   *         description: A successful response
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
   *                       example: MultiLineString
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: array
   *                         items:
   *                           type: array
   *                           items:
   *                             type: number
   *                       example: [
   *                         [[-99.4, 39.1], [-96.7, 39.9]],
   *                         [[-97.4, 38.4], [-94.5, 37.9]]
   *                       ]
   */

  "POST /feature/multiline": WithinMultiLine,

  /**
   * @openapi
   * /feature/multiline/properties:
   *   post:
   *     tags:
   *       - feature/multiline - with properties
   *     summary: Returns a multi-line geojson feature with properties within a GeoJSON polygon or bbox
   *     description: Accepts a GeoJSON Polygon or a bounding box (bbox) and returns a multi-line within it along with additional metadata properties.
   *     requestBody:
   *       required: false
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               geojsonPolygon:
   *                 type: object
   *                 description: GeoJSON Polygon to return a multi-line within it
   *                 example:
   *                   type: "Polygon"
   *                   coordinates: [[[-104.3, 40.1], [-99.7, 36.8], [-94.4, 38.1], [-99.3, 41.9], [-104.3, 40.1]]]
   *               bbox:
   *                 type: array
   *                 description: Bounding box [minX, minY, maxX, maxY] to return a multi-line within
   *                 items:
   *                   type: number
   *                 example: [-104.3, 36.8, -94.4, 41.9]
   *     responses:
   *       200:
   *         description: A successful response
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
   *                       example: MultiLineString
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: array
   *                         items:
   *                           type: array
   *                           items:
   *                             type: number
   *                       example: [
   *                         [[-99.4, 39.1], [-96.7, 39.9]],
   *                         [[-97.4, 38.4], [-94.5, 37.9]]
   *                       ]
   *                 properties:
   *                   type: object
   *                   description: Additional metadata associated with the MultiLineString feature
   *                   properties:
   *                     id:
   *                       type: string
   *                       example: "multiline_within_001"
   *                     name:
   *                       type: string
   *                       example: "MultiLine within bounds"
   *                     description:
   *                       type: string
   *                       example: "A multi-line feature within the specified bounds with metadata."
   *                     created_at:
   *                       type: string
   *                       format: date-time
   *                       example: "2024-12-01T15:00:00Z"
   *       400:
   *         description: Bad request - Invalid data
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Invalid request
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Internal Server Error
   */

  "POST /feature/multiline/properties": WithinMultiLineWithProperties,

  /**
   * @openapi
   * /feature/multiline/random:
   *   post:
   *     tags:
   *       - feature/multiline
   *     summary: Returns a random multi-line geojson feature within a GeoJSON polygon or bbox
   *     description: Accepts a GeoJSON Polygon or a bounding box (bbox) and returns a random multi-line within it.
   *     requestBody:
   *       required: false
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               geojsonPolygon:
   *                 type: object
   *                 description: GeoJSON Polygon to return a random multi-line within it
   *                 example:
   *                   type: "Polygon"
   *                   coordinates: [[[-104.3, 40.1], [-99.7, 36.8], [-94.4, 38.1], [-99.3, 41.9], [-104.3, 40.1]]]
   *               bbox:
   *                 type: array
   *                 description: Bounding box [minX, minY, maxX, maxY] to return a random multi-line within
   *                 items:
   *                   type: number
   *                 example: [-104.3, 36.8, -94.4, 41.9]
   *     responses:
   *       200:
   *         description: A successful response
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
   *                       example: MultiLineString
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: array
   *                         items:
   *                           type: array
   *                           items:
   *                             type: number
   *                       example: [
   *                         [[-99.4, 39.1], [-96.7, 39.9]],
   *                         [[-97.4, 38.4], [-94.5, 37.9]]
   *                       ]
   */

  "POST /feature/multiline/random": WithinRandomMultiLine,

  /**
   * @openapi
   * /feature/multiline/random/properties:
   *   post:
   *     tags:
   *       - feature/multiline - with properties
   *     summary: Returns a random multi-line geojson feature with properties within a GeoJSON polygon or bbox
   *     description: Accepts a GeoJSON Polygon or a bounding box (bbox) and returns a random multi-line within it along with additional metadata properties.
   *     requestBody:
   *       required: false
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               geojsonPolygon:
   *                 type: object
   *                 description: GeoJSON Polygon to return a random multi-line within it
   *                 example:
   *                   type: "Polygon"
   *                   coordinates: [[[-104.3, 40.1], [-99.7, 36.8], [-94.4, 38.1], [-99.3, 41.9], [-104.3, 40.1]]]
   *               bbox:
   *                 type: array
   *                 description: Bounding box [minX, minY, maxX, maxY] to return a random multi-line within
   *                 items:
   *                   type: number
   *                 example: [-104.3, 36.8, -94.4, 41.9]
   *     responses:
   *       200:
   *         description: A successful response
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
   *                       example: MultiLineString
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: array
   *                         items:
   *                           type: array
   *                           items:
   *                             type: number
   *                       example: [
   *                         [[-99.4, 39.1], [-96.7, 39.9]],
   *                         [[-97.4, 38.4], [-94.5, 37.9]]
   *                       ]
   *                 properties:
   *                   type: object
   *                   description: Additional metadata associated with the MultiLineString feature
   *                   properties:
   *                     id:
   *                       type: string
   *                       example: "random_multiline_001"
   *                     name:
   *                       type: string
   *                       example: "Random MultiLine with Properties"
   *                     description:
   *                       type: string
   *                       example: "A random multi-line feature with associated metadata."
   *                     created_at:
   *                       type: string
   *                       format: date-time
   *                       example: "2024-12-01T15:00:00Z"
   *       400:
   *         description: Bad request - Invalid data
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Invalid request
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Internal Server Error
   */

  "POST /feature/multiline/random/properties":
    WithinRandomMultiLineWithProperties,
};
