import {
  Points,
  PointsLimitAndWithin,
  RandomPoints,
  RandomPointsLimitAndWithin,
  PointsWithProperties,
  PointsLimitAndWithinWithProperties,
  RandomPointsWithProperties,
  RandomPointsLimitAndWithinWithProperties,
} from "../functions/point/point";

export const featureCollectionPointsRoutes: Record<string, Function> = {
  /**
   * @openapi
   * /featureCollection/points:
   *   get:
   *     tags:
   *       - featureCollection/points
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

  "GET /featureCollection/points": Points,

  /**
   * @openapi
   * /featureCollection/points/properties:
   *   get:
   *     tags:
   *       - featureCollection/points - with properties
   *     summary: Returns a collection of geographical points with properties
   *     description: Retrieves a collection of 30 geographical points, each with associated properties.
   *     responses:
   *       200:
   *         description: A successful response with a collection of geographical points with properties.
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
   *                       properties:
   *                         type: object
   *                         properties:
   *                           name:
   *                             type: string
   *                             example: Point A
   *                           description:
   *                             type: string
   *                             example: A description of the point
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

  "GET /featureCollection/points/properties": PointsWithProperties,

  /**
   * @openapi
   * /featureCollection/points:
   *   post:
   *     tags:
   *       - featureCollection/points
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

  "POST /featureCollection/points": PointsLimitAndWithin,

  /**
   * @openapi
   * /featureCollection/points/properties:
   *   post:
   *     tags:
   *       - featureCollection/points - with properties
   *     summary: Returns a limited number of geographical points with properties within a bounding box or GeoJSON polygon
   *     description: Accepts a limit and optionally a GeoJSON Polygon or bounding box (bbox) to filter a collection of geographical points with properties. The limit must be less than or equal to 1000.
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
   *         description: A successful response with a collection of geographical points with properties.
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
   *                       properties:
   *                         type: object
   *                         properties:
   *                           name:
   *                             type: string
   *                             example: Point A
   *                           description:
   *                             type: string
   *                             example: A description of the point
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

  "POST /featureCollection/points/properties":
    PointsLimitAndWithinWithProperties,

  /**
   * @openapi
   * /featureCollection/points/random:
   *   get:
   *     tags:
   *       - featureCollection/points
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

  "GET /featureCollection/points/random": RandomPoints,

  /**
   * @openapi
   * /featureCollection/points/random/properties:
   *   get:
   *     tags:
   *       - featureCollection/points - with properties
   *     summary: Returns a collection of random geographical points with properties
   *     description: Retrieves a collection of 30 random geographical points along with additional properties.
   *     responses:
   *       200:
   *         description: A successful response with a collection of geographical points including properties.
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
   *                       properties:
   *                         type: object
   *                         properties:
   *                           name:
   *                             type: string
   *                             example: "Point A"
   *                           description:
   *                             type: string
   *                             example: "A random point located in the geographic area."
   *                           elevation:
   *                             type: number
   *                             example: 1600
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

  "GET /featureCollection/points/random/properties": RandomPointsWithProperties,

  /**
   * @openapi
   * /featureCollection/points/random:
   *   post:
   *     tags:
   *       - featureCollection/points
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

  "POST /featureCollection/points/random": RandomPointsLimitAndWithin,

  /**
   * @openapi
   * /featureCollection/points/random/properties:
   *   post:
   *     tags:
   *       - featureCollection/points - with properties
   *     summary: Returns a limited number of random geographical points with properties within a bounding box or GeoJSON polygon
   *     description: Accepts a limit and optionally a GeoJSON Polygon or bounding box (bbox) to filter a collection of random geographical points along with properties. The limit must be less than or equal to 1000.
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
   *         description: A successful response with a collection of random geographical points with properties.
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
   *                       properties:
   *                         type: object
   *                         properties:
   *                           name:
   *                             type: string
   *                             example: "Point A"
   *                           description:
   *                             type: string
   *                             example: "A random point located within the specified area."
   *                           elevation:
   *                             type: number
   *                             example: 1600
   *                           timestamp:
   *                             type: string
   *                             example: "2024-11-21T12:00:00Z"
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

  "POST /featureCollection/points/random/properties":
    RandomPointsLimitAndWithinWithProperties,
};
