import { Line } from "../functions/line/line";
import { RandomLine } from "../functions/line/randomLine";
import { WithinLine } from "../functions/line/withinLine";
import { WithinRandomLine } from "../functions/line/withinRandomLine";

export const lineRoutes: Record<string, Function> = {
  /**
   * @openapi
   * /line:
   *   get:
   *     tags:
   *       - Line
   *     summary: Returns a line
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

  "GET /line": Line,

  /**
 * @openapi
 * /line/random:
 *   get:
 *     tags:
 *       - Line
 *     summary: Returns a random line
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
  "GET /line/random": RandomLine,

/**
 * @openapi
 * /line:
 *   post:
 *     tags:
 *       - Line
 *     summary: Returns a line within a GeoJSON polygon or bbox
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

  "POST /line": WithinLine,

  /**
 * @openapi
 * /line/random:
 *   post:
 *     tags:
 *       - Line
 *     summary: Returns a random line within a GeoJSON polygon or bbox
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
  "POST /line/random": WithinRandomLine,

};
