import { MultiLine, RandomMultiLine, WithinMultiLine, WithinRandomMultiLine } from "../functions/line/multiline";

export const featureMultiLineRoutes: Record<string, Function> = {
  /**
   * @openapi
   * /feature/multiline:
   *   get:
   *     tags:
   *       - MultiLine feature
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
   * /feature/multiline/random:
   *   get:
   *     tags:
   *       - MultiLine feature
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
   * /feature/multiline:
   *   post:
   *     tags:
   *       - MultiLine feature
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
   * /feature/multiline/random:
   *   post:
   *     tags:
   *       - MultiLine feature
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
};
