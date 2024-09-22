import {
  Point,
  Points,
  PointsLimitAndWithin,
  RandomPoint,
  WithinPoint,
  WithinRandomPoint,
} from "../functions/point/point";

export const pointsRoutes: Record<string, Function> = {
/**
 * @openapi
 * /points:
 *   get:
 *     tags:
 *       - Points
 *     summary: Returns a collection of geographical points
 *     description: Retrieves a collection of 30 geographical points.
 *     responses:
 *       200:
 *         description: A successful response with a collection of geographical points.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:
 *                   type: string
 *                   example: FeatureCollection
 *                 features:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: Feature
 *                       geometry:
 *                         type: object
 *                         properties:
 *                           type:
 *                             type: string
 *                             example: Point
 *                           coordinates:
 *                             type: array
 *                             items:
 *                               type: number
 *                               example: [-101.278818, 40.816337]
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
 * 
 */

  "GET /points": Points,

 /**
 * @openapi
 * /points:
 *   post:
 *     tags:
 *       - Points
 *     summary: Returns a limited number of geographical points
 *     description: Accepts a limit and returns that many points from a collection of geographical points. Limit must be less than or equal to 1000.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               limit:
 *                 type: integer
 *                 description: Number of points to return (must be <= 1000)
 *                 example: 30
 *     responses:
 *       200:
 *         description: A successful response with a collection of geographical points.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:
 *                   type: string
 *                   example: FeatureCollection
 *                 features:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: Feature
 *                       geometry:
 *                         type: object
 *                         properties:
 *                           type:
 *                             type: string
 *                             example: Point
 *                           coordinates:
 *                             type: array
 *                             items:
 *                               type: number
 *                               example: [-101.278818, 40.816337]
 *       400:
 *         description: Bad request - Invalid limit value
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid input. Provide a valid limit number.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error processing input <error_message>
 */

  "POST /points": PointsLimitAndWithin,







  

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
