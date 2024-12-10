import {
  MultiPoints,
  MultiPointsLimitAndWithin,
  RandomMultiPoints,
  RandomMultiPointsLimitAndWithin,
  MultiPointsWithProperties,
  MultiPointsLimitAndWithinWithProperties,
  RandomMultiPointsWithProperties,
  RandomMultiPointsLimitAndWithinWithProperties,
} from "../functions/multipoints/multipoints";

export const featureCollectionMultiPointsRoutes: Record<string, Function> = {
  /**
   * @openapi
   * /featureCollection/multipoints:
   *   get:
   *     tags:
   *       - featureCollection/multipoints
   *     summary: Returns a collection of geographical multipoints
   *     description: Retrieves a collection of 30 geographical multipoints.
   *     responses:
   *       200:
   *         description: A successful response with a collection of geographical multipoints.
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
   *                             example: MultiPoint
   *                           coordinates:
   *                             type: array
   *                             items:
   *                               type: array
   *                               items:
   *                                 type: number
   *                                 example: [-101.278818, 40.816337]
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
  "GET /featureCollection/multipoints": MultiPoints,

  /**
   * @openapi
   * /featureCollection/multipoints:
   *   post:
   *     tags:
   *       - featureCollection/multipoints
   *     summary: Returns a limited number of geographical multipoints within a bounding box or GeoJSON polygon
   *     description: Accepts a limit and optionally a GeoJSON Polygon or bounding box (bbox) to filter a collection of geographical multipoints. The limit must be less than or equal to 1000.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               limit:
   *                 type: integer
   *                 description: Number of multipoints to return (must be <= 1000)
   *                 example: 30
   *               geojsonPolygon:
   *                 type: object
   *                 description: GeoJSON Polygon to filter multipoints within
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
   *                 description: Bounding box in the format [minX, minY, maxX, maxY] to filter multipoints within
   *                 items:
   *                   type: number
   *                 example: [-104.83004979248041, 31.328195547453603, -84.34442721393819, 43.89485607270808]
   *     responses:
   *       200:
   *         description: A successful response with a collection of geographical multipoints.
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
   *                             example: MultiPoint
   *                           coordinates:
   *                             type: array
   *                             items:
   *                               type: array
   *                               items:
   *                                 type: number
   *                                 example: [-101.278818, 40.816337]
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
  "POST /featureCollection/multipoints": MultiPointsLimitAndWithin,

  /**
   * @openapi
   * /featureCollection/multipoints/random:
   *   get:
   *     tags:
   *       - featureCollection/multipoints
   *     summary: Returns a collection of random geographical multipoints
   *     description: Retrieves a collection of 30 random geographical multipoints.
   *     responses:
   *       200:
   *         description: A successful response with a collection of geographical multipoints.
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
   *                             example: MultiPoint
   *                           coordinates:
   *                             type: array
   *                             items:
   *                               type: array
   *                               items:
   *                                 type: number
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
   */
  "GET /featureCollection/multipoints/random": RandomMultiPoints,

  /**
   * @openapi
   * /featureCollection/multipoints/random:
   *   post:
   *     tags:
   *       - featureCollection/multipoints
   *     summary: Returns a limited number of random geographical multipoints within a bounding box or GeoJSON polygon
   *     description: Accepts a limit and optionally a GeoJSON Polygon or bounding box (bbox) to filter a collection of random geographical multipoints. The limit must be less than or equal to 1000.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               limit:
   *                 type: integer
   *                 description: Number of multipoints to return (must be <= 1000)
   *                 example: 30
   *               geojsonPolygon:
   *                 type: object
   *                 description: GeoJSON Polygon to filter multipoints within
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
   *                 description: Bounding box in the format [minX, minY, maxX, maxY] to filter multipoints within
   *                 items:
   *                   type: number
   *                 example: [-104.83004979248041, 31.328195547453603, -84.34442721393819, 43.89485607270808]
   *     responses:
   *       200:
   *         description: A successful response with a collection of random geographical multipoints.
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
   *                             example: MultiPoint
   *                           coordinates:
   *                             type: array
   *                             items:
   *                               type: array
   *                               items:
   *                                 type: number
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
  "POST /featureCollection/multipoints/random": RandomMultiPointsLimitAndWithin,

  /**
   * @openapi
   * /featureCollection/multipoints/properties:
   *   get:
   *     tags:
   *       - featureCollection/multipoints - with properties
   *     summary: Returns a collection of geographical multipoints with additional properties
   *     description: Retrieves a collection of 30 geographical multipoints, including custom properties in the response.
   *     responses:
   *       200:
   *         description: A successful response with a collection of geographical multipoints with properties.
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
   *                             example: MultiPoint
   *                           coordinates:
   *                             type: array
   *                             items:
   *                               type: array
   *                               items:
   *                                 type: number
   *                               example: [-101.278818, 40.816337]
   *                       properties:
   *                         type: object
   *                         description: Additional metadata for each multipoint
   *                         example: { "name": "Sample Point", "elevation": 500 }
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
  "GET /featureCollection/multipoints/properties": MultiPointsWithProperties,

  /**
   * @openapi
   * /featureCollection/multipoints/properties:
   *   post:
   *     tags:
   *       - featureCollection/multipoints - with properties
   *     summary: Returns a limited number of geographical multipoints with properties within a bounding box or GeoJSON polygon
   *     description: Accepts a limit and optionally a GeoJSON Polygon or bounding box (bbox) to filter a collection of geographical multipoints with additional properties. The limit must be less than or equal to 1000.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               limit:
   *                 type: integer
   *                 description: Number of multipoints to return (must be <= 1000)
   *                 example: 30
   *               geojsonPolygon:
   *                 type: object
   *                 description: GeoJSON Polygon to filter multipoints within
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
   *                 description: Bounding box in the format [minX, minY, maxX, maxY] to filter multipoints within
   *                 items:
   *                   type: number
   *                 example: [-104.83004979248041, 31.328195547453603, -84.34442721393819, 43.89485607270808]
   *     responses:
   *       200:
   *         description: A successful response with a collection of geographical multipoints with properties.
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
   *                             example: MultiPoint
   *                           coordinates:
   *                             type: array
   *                             items:
   *                               type: array
   *                               items:
   *                                 type: number
   *                               example: [-101.278818, 40.816337]
   *                       properties:
   *                         type: object
   *                         description: Additional metadata for each multipoint
   *                         example: { "name": "Sample Point", "elevation": 500 }
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
  "POST /featureCollection/multipoints/properties":
    MultiPointsLimitAndWithinWithProperties,

  /**
   * @openapi
   * /featureCollection/multipoints/random/properties:
   *   get:
   *     tags:
   *       - featureCollection/multipoints - with properties
   *     summary: Returns a collection of random geographical multipoints with additional properties
   *     description: Retrieves a collection of 30 random geographical multipoints with additional properties.
   *     responses:
   *       200:
   *         description: A successful response with a collection of random geographical multipoints with properties.
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
   *                             example: MultiPoint
   *                           coordinates:
   *                             type: array
   *                             items:
   *                               type: array
   *                               items:
   *                                 type: number
   *                               example: [-101.278818, 40.816337]
   *                       properties:
   *                         type: object
   *                         description: Additional metadata for each multipoint
   *                         example: { "name": "Sample Point", "elevation": 500 }
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
  "GET /featureCollection/multipoints/random/properties":
    RandomMultiPointsWithProperties,

  /**
   * @openapi
   * /featureCollection/multipoints/random/properties:
   *   post:
   *     tags:
   *       - featureCollection/multipoints - with properties
   *     summary: Returns a limited number of random geographical multipoints with properties within a bounding box or GeoJSON polygon
   *     description: Accepts a limit and optionally a GeoJSON Polygon or bounding box (bbox) to filter a collection of random geographical multipoints with additional properties. The limit must be less than or equal to 1000.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               limit:
   *                 type: integer
   *                 description: Number of multipoints to return (must be <= 1000)
   *                 example: 30
   *               geojsonPolygon:
   *                 type: object
   *                 description: GeoJSON Polygon to filter multipoints within
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
   *                 description: Bounding box in the format [minX, minY, maxX, maxY] to filter multipoints within
   *                 items:
   *                   type: number
   *                 example: [-104.83004979248041, 31.328195547453603, -84.34442721393819, 43.89485607270808]
   *     responses:
   *       200:
   *         description: A successful response with a collection of random geographical multipoints with properties.
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
   *                             example: MultiPoint
   *                           coordinates:
   *                             type: array
   *                             items:
   *                               type: array
   *                               items:
   *                                 type: number
   *                               example: [-101.278818, 40.816337]
   *                       properties:
   *                         type: object
   *                         description: Additional metadata for each multipoint
   *                         example: { "name": "Sample Point", "elevation": 500 }
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
  "POST /featureCollection/multipoints/random/properties":
    RandomMultiPointsLimitAndWithinWithProperties,
};
