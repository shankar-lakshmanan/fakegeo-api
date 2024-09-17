import {
  Point,
  RandomPoint,
  WithinPoint,
  WithinRandomPoint,
} from "../functions/point/point";

export const pointRoutes: Record<string, Function> = {
  /**
   * @openapi
   * /point:
   *   get:
   *     tags:
   *       - Point
   *     summary: Returns a point
   *     description: Generates a geographical point.
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
   *                       example: Point
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: number
   *                       example: [-101.278818, 40.816337]
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

  "GET /point": Point,

  /**
   * @openapi
   * /point/random:
   *   get:
   *     tags:
   *       - Point
   *     summary: Returns a random point
   *     description: Generates a random geographical point.
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
   *                       example: Point
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: number
   *                       example: [-101.278818, 40.816337]
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
  "GET /point/random": RandomPoint,

  /**
   * @openapi
   * /point:
   *   post:
   *     tags:
   *       - Point
   *     summary: Returns a point within a GeoJSON polygon or bbox
   *     description: Accepts a GeoJSON Polygon or a bounding box (bbox) and returns a point within it.
   *     requestBody:
   *       required: false
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               geojsonPolygon:
   *                 type: object
   *                 description: GeoJSON Polygon to return a point within it
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
   *                 description: Bounding box in the format [minX, minY, maxX, maxY] to return a point within it
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
   *                       example: Point
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: number
   *                       example: [-99.40157045143154, 39.19210754121596]
   *       400:
   *         description: Bad request - Invalid input data
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

  "POST /point": WithinPoint,

  /**
   * @openapi
   * /point/random:
   *   post:
   *     tags:
   *       - Point
   *     summary: Returns a random point within a GeoJSON polygon or bbox
   *     description: Accepts a GeoJSON Polygon or a bounding box (bbox) and returns a random point within it.
   *     requestBody:
   *       required: false
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               geojsonPolygon:
   *                 type: object
   *                 description: GeoJSON Polygon to return a random point within it
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
   *                 description: Bounding box in the format [minX, minY, maxX, maxY] to return a random point within it
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
   *                       example: Point
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: number
   *                       example: [-99.40157045143154, 39.19210754121596]
   *       400:
   *         description: Bad request - Invalid input data
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

  "POST /point/random": WithinRandomPoint,
};
