import {
  Points,
  PointsLimitAndWithin,
  RandomPoints,
  RandomPointsLimitAndWithin,
} from "../functions/point/point";

export const featurePointsRoutes: Record<string, Function> = {
/**
 * @openapi
 * /feature/points:
 *   get:
 *     tags:
 *       - Points features
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

  "GET /feature/points": Points,

 
/**
 * @openapi
 * /feature/points:
 *   post:
 *     tags:
 *       - Points features
 *     summary: Returns a limited number of geographical points within a bounding box or GeoJSON polygon
 *     description: Accepts a limit and optionally a GeoJSON Polygon or bounding box (bbox) to filter a collection of geographical points. The limit must be less than or equal to 1000.
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
 *               geojsonPolygon:
 *                 type: object
 *                 description: GeoJSON Polygon to filter points within
 *                 example:
 *                   type: "Polygon"
 *                   coordinates:
 *                     - [
 *                         [-104.83004979248041, 39.06523015276548],
 *                         [-102.45708546876439, 31.328195547453603],
 *                         [-86.94737395052326, 31.832777392621864],
 *                         [-84.34442721393819, 42.32251654152694],
 *                         [-104.83004979248041, 39.06523015276548]
 *                       ]
 *               bbox:
 *                 type: array
 *                 description: Bounding box in the format [minX, minY, maxX, maxY] to filter points within
 *                 items:
 *                   type: number
 *                 example: [-104.83004979248041, 31.328195547453603, -84.34442721393819, 43.89485607270808]
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
 *         description: Bad request - Invalid limit value, GeoJSON Polygon, or BBox
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid input. Provide a valid limit number, GeoJSON Polygon, or bbox.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error processing input. An internal error occurred
 */

  "POST /feature/points": PointsLimitAndWithin,


/**
 * @openapi
 * /feature/points/random:
 *   get:
 *     tags:
 *       - Points features
 *     summary: Returns a collection of random geographical points
 *     description: Retrieves a collection of 30 random geographical points.
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
 *                             example: [-101.278818, 40.816337]
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

"GET /feature/points/random": RandomPoints,

/**
 * @openapi
 * /feature/points/random:
 *   post:
 *     tags:
 *       - Points features
 *     summary: Returns a limited number of random geographical points within a bounding box or GeoJSON polygon
 *     description: Accepts a limit and optionally a GeoJSON Polygon or bounding box (bbox) to filter a collection of random geographical points. The limit must be less than or equal to 1000.
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
 *               geojsonPolygon:
 *                 type: object
 *                 description: GeoJSON Polygon to filter points within
 *                 example:
 *                   type: "Polygon"
 *                   coordinates:
 *                     - [
 *                         [-104.83004979248041, 39.06523015276548],
 *                         [-102.45708546876439, 31.328195547453603],
 *                         [-86.94737395052326, 31.832777392621864],
 *                         [-84.34442721393819, 42.32251654152694],
 *                         [-104.83004979248041, 39.06523015276548]
 *                       ]
 *               bbox:
 *                 type: array
 *                 description: Bounding box in the format [minX, minY, maxX, maxY] to filter points within
 *                 items:
 *                   type: number
 *                 example: [-104.83004979248041, 31.328195547453603, -84.34442721393819, 43.89485607270808]
 *     responses:
 *       200:
 *         description: A successful response with a collection of random geographical points.
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
 *         description: Bad request - Invalid limit value, GeoJSON Polygon, or BBox
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid input. Provide a valid limit number, GeoJSON Polygon, or bbox.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error processing input. An internal error occurred
 */

"POST /feature/points/random": RandomPointsLimitAndWithin,


};
