import {
  Line,
  RandomLine,
  WithinLine,
  WithinRandomLine,
  LineWithProperties,
  RandomLineWithProperties,
  WithinLineWithProperties,
  WithinRandomLineWithProperties,
} from "../functions/line/line";

export const featureLineRoutes: Record<string, Function> = {
  /**
   * @openapi
   * /feature/line:
   *   get:
   *     tags:
   *       - feature/line
   *     summary: Returns a line geojson Feature
   *     description: Generates a geographical line.
   *     responses:
   *       200:
   *         description: A successful response containing the line feature
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
   *                       example: LineString
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: array
   *                         items:
   *                           type: number
   *                       example: [
   *                         [-98.46358188123595, 38.16839367133355],
   *                         [-98.0095425039122, 38.6109019399903],
   *                         [-97.5063234325582, 38.192492088530855],
   *                         [-96.76369691515532, 38.668456803745556]
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

  "GET /feature/line": Line,

  /**
   * @openapi
   * /feature/line/properties:
   *   get:
   *     tags:
   *       - feature/line - with properties
   *     summary: Returns a line geojson Feature with properties
   *     description: Generates a geographical line with additional random properties.
   *     responses:
   *       200:
   *         description: A successful response containing the line feature with properties
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
   *                       example: LineString
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: array
   *                         items:
   *                           type: number
   *                       example: [
   *                         [-98.46358188123595, 38.16839367133355],
   *                         [-98.0095425039122, 38.6109019399903],
   *                         [-97.5063234325582, 38.192492088530855],
   *                         [-96.76369691515532, 38.668456803745556]
   *                       ]
   *                 properties:
   *                   type: object
   *                   additionalProperties: true
   *                   example:
   *                     name: Random Line
   *                     description: This line was generated with random properties.
   *                     length: 123.45
   *                     timestamp: "2024-11-28T10:00:00Z"
   *       400:
   *         description: Bad request - Invalid data
   *       500:
   *         description: Internal server error
   */
  "GET /feature/line/properties": LineWithProperties,

  /**
   * @openapi
   * /feature/line/random:
   *   get:
   *     tags:
   *       - feature/line
   *     summary: Returns a random line geojson Feature
   *     description: Generates a random geographical LineString.
   *     responses:
   *       200:
   *         description: A successful response containing the random line feature
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
   *                       example: LineString
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: array
   *                         items:
   *                           type: number
   *                       example: [
   *                         [-98.46358188123595, 38.16839367133355],
   *                         [-98.0095425039122, 38.6109019399903],
   *                         [-97.5063234325582, 38.192492088530855],
   *                         [-96.76369691515532, 38.668456803745556]
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
  "GET /feature/line/random": RandomLine,

  /**
   * @openapi
   * /feature/line/random/properties:
   *   get:
   *     tags:
   *       - feature/line - with properties
   *     summary: Returns a random line geojson Feature with properties
   *     description: Generates a random geographical line with additional random properties.
   *     responses:
   *       200:
   *         description: A successful response containing the random line feature with properties
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
   *                       example: LineString
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: array
   *                         items:
   *                           type: number
   *                       example: [
   *                         [-98.46358188123595, 38.16839367133355],
   *                         [-98.0095425039122, 38.6109019399903],
   *                         [-97.5063234325582, 38.192492088530855],
   *                         [-96.76369691515532, 38.668456803745556]
   *                       ]
   *                 properties:
   *                   type: object
   *                   additionalProperties: true
   *                   example:
   *                     name: Randomized Line
   *                     category: Exploratory
   *                     details:
   *                       importance: high
   *                       validated: true
   *       400:
   *         description: Bad request - Invalid data
   *       500:
   *         description: Internal server error
   */
  "GET /feature/line/random/properties": RandomLineWithProperties,

  /**
   * @openapi
   * /feature/line:
   *   post:
   *     tags:
   *       - feature/line
   *     summary: Returns a line geojson feature within a GeoJSON polygon or bbox
   *     description: Accepts a GeoJSON Polygon or a bounding box (bbox) and returns a line within it.
   *     requestBody:
   *       required: false
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               geojsonPolygon:
   *                 type: object
   *                 description: GeoJSON Polygon to return a line within it
   *                 example:
   *                   type: "Polygon"
   *                   coordinates:
   *                     - [
   *                         [-104.35959912130382, 40.186854567133594],
   *                         [-99.75483802782351, 36.870115044295346],
   *                         [-97.427541041584, 36.43876305758806],
   *                         [-94.44354178155926, 38.13171162987652],
   *                         [-99.30047105952276, 41.94545202484386],
   *                         [-104.35959912130382, 40.186854567133594]
   *                       ]
   *               bbox:
   *                 type: array
   *                 description: Bounding box in the format [minX, minY, maxX, maxY] to return a line within it
   *                 items:
   *                   type: number
   *                 example: [-104.35959912130382, 36.870115044295346, -94.44354178155926, 41.94545202484386]
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
   *                       example: LineString
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: array
   *                         items:
   *                           type: number
   *                       example: [
   *                         [
   *                           -99.40157045143154, 39.19210754121596
   *                         ],
   *                         [
   *                           -96.78364279952356, 39.99810774123456
   *                         ]
   *                       ]
   */

  "POST /feature/line": WithinLine,

  /**
   * @openapi
   * /feature/line/properties:
   *   post:
   *     tags:
   *       - feature/line - with properties
   *     summary: Returns a line GeoJSON feature with additional properties within a GeoJSON polygon or bbox
   *     description: Accepts a GeoJSON Polygon or a bounding box (bbox) and returns a line within it, enriched with user-defined properties.
   *     requestBody:
   *       required: false
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               geojsonPolygon:
   *                 type: object
   *                 description: GeoJSON Polygon to return a line within it
   *                 example:
   *                   type: "Polygon"
   *                   coordinates:
   *                     - [
   *                         [-104.35959912130382, 40.186854567133594],
   *                         [-99.75483802782351, 36.870115044295346],
   *                         [-97.427541041584, 36.43876305758806],
   *                         [-94.44354178155926, 38.13171162987652],
   *                         [-99.30047105952276, 41.94545202484386],
   *                         [-104.35959912130382, 40.186854567133594]
   *                       ]
   *               bbox:
   *                 type: array
   *                 description: Bounding box in the format [minX, minY, maxX, maxY] to return a line within it
   *                 items:
   *                   type: number
   *                 example: [-104.35959912130382, 36.870115044295346, -94.44354178155926, 41.94545202484386]
   *               properties:
   *                 type: object
   *                 description: Additional properties to enrich the line feature
   *                 example:
   *                   name: "Example Line"
   *                   tags: ["geojson", "test"]
   *                   createdBy: "user123"
   *     responses:
   *       200:
   *         description: A successful response with additional properties
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
   *                       example: LineString
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: array
   *                         items:
   *                           type: number
   *                       example: [
   *                         [
   *                           -99.40157045143154, 39.19210754121596
   *                         ],
   *                         [
   *                           -96.78364279952356, 39.99810774123456
   *                         ]
   *                       ]
   *                 properties:
   *                   type: object
   *                   additionalProperties: true
   *                   example:
   *                     name: "Example Line"
   *                     tags: ["geojson", "test"]
   *                     createdBy: "user123"
   *                     generatedAt: "2024-11-28T10:45:00Z"
   */
  "POST /feature/line/properties": WithinLineWithProperties,

  /**
   * @openapi
   * /feature/line/random:
   *   post:
   *     tags:
   *       - feature/line
   *     summary: Returns a random line geojson feature within a GeoJSON polygon or bbox
   *     description: Accepts a GeoJSON Polygon or a bounding box (bbox) and returns a random line within it.
   *     requestBody:
   *       required: false
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               geojsonPolygon:
   *                 type: object
   *                 description: GeoJSON Polygon to return a random line within it
   *                 example:
   *                   type: "Polygon"
   *                   coordinates:
   *                     - [
   *                         [-104.35959912130382, 40.186854567133594],
   *                         [-99.75483802782351, 36.870115044295346],
   *                         [-97.427541041584, 36.43876305758806],
   *                         [-94.44354178155926, 38.13171162987652],
   *                         [-99.30047105952276, 41.94545202484386],
   *                         [-104.35959912130382, 40.186854567133594]
   *                       ]
   *               bbox:
   *                 type: array
   *                 description: Bounding box in the format [minX, minY, maxX, maxY] to return a random line within it
   *                 items:
   *                   type: number
   *                 example: [-104.35959912130382, 36.870115044295346, -94.44354178155926, 41.94545202484386]
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
   *                       example: LineString
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: array
   *                         items:
   *                           type: number
   *                       example: [
   *                         [
   *                           -99.40157045143154, 39.19210754121596
   *                         ],
   *                         [
   *                           -96.78364279952356, 39.99810774123456
   *                         ]
   *                       ]
   */
  "POST /feature/line/random": WithinRandomLine,

  /**
   * @openapi
   * /feature/line/random/properties:
   *   post:
   *     tags:
   *       - feature/line - with properties
   *     summary: Returns a random line GeoJSON feature with additional properties within a GeoJSON polygon or bbox
   *     description: Accepts a GeoJSON Polygon or a bounding box (bbox) and returns a random line within it, enriched with user-defined properties.
   *     requestBody:
   *       required: false
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               geojsonPolygon:
   *                 type: object
   *                 description: GeoJSON Polygon to return a random line within it
   *                 example:
   *                   type: "Polygon"
   *                   coordinates:
   *                     - [
   *                         [-104.35959912130382, 40.186854567133594],
   *                         [-99.75483802782351, 36.870115044295346],
   *                         [-97.427541041584, 36.43876305758806],
   *                         [-94.44354178155926, 38.13171162987652],
   *                         [-99.30047105952276, 41.94545202484386],
   *                         [-104.35959912130382, 40.186854567133594]
   *                       ]
   *               bbox:
   *                 type: array
   *                 description: Bounding box in the format [minX, minY, maxX, maxY] to return a random line within it
   *                 items:
   *                   type: number
   *                 example: [-104.35959912130382, 36.870115044295346, -94.44354178155926, 41.94545202484386]
   *               properties:
   *                 type: object
   *                 description: Additional properties to enrich the random line feature
   *                 example:
   *                   name: "Random Line"
   *                   tags: ["random", "geojson"]
   *                   createdBy: "user456"
   *     responses:
   *       200:
   *         description: A successful response with additional properties
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
   *                       example: LineString
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: array
   *                         items:
   *                           type: number
   *                       example: [
   *                         [
   *                           -99.78456978142837, 38.12398745125468
   *                         ],
   *                         [
   *                           -97.14569845123457, 37.45612398745136
   *                         ]
   *                       ]
   *                 properties:
   *                   type: object
   *                   additionalProperties: true
   *                   example:
   *                     name: "Random Line"
   *                     tags: ["random", "geojson"]
   *                     createdBy: "user456"
   *                     generatedAt: "2024-11-28T12:15:00Z"
   */
  "POST /feature/line/random/properties": WithinRandomLineWithProperties,
};
