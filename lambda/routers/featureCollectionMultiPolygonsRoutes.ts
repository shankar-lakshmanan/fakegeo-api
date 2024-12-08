import {
  MultiPolygons,
  MultiPolygonsLimitAndWithin,
  RandomMultiPolygons,
  RandomMultiPolygonsLimitAndWithin,
  MultiPolygonsWithProperties,
  MultiPolygonsLimitAndWithinWithProperties,
  RandomMultiPolygonsWithProperties,
  RandomMultiPolygonsLimitAndWithinWithProperties,
} from "../functions/polygon/multipolygon";

export const featureCollectionMultiPolygonsRoutes: Record<string, Function> = {
  /**
   * @openapi
   * /featureCollection/multipolygons:
   *   get:
   *     tags:
   *       - featureCollection/multipolygons
   *     summary: Returns a collection of geographical multipolygons
   *     description: Retrieves a collection of 30 geographical multipolygons.
   *     responses:
   *       200:
   *         description: A successful response with a collection of geographical multipolygons.
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
   *                             example: MultiPolygon
   *                           coordinates:
   *                             type: array
   *                             items:
   *                               type: array
   *                               items:
   *                                 type: array
   *                                 items:
   *                                   type: number
   *                                   example: [-101.278818, 40.816337]
   *       400:
   *         description: Bad request - Invalid data
   *       500:
   *         description: Internal server error
   */
  "GET /featureCollection/multipolygons": MultiPolygons,

  /**
   * @openapi
   * /featureCollection/multipolygons/properties:
   *   get:
   *     tags:
   *       - featureCollection/multipolygons - with properties
   *     summary: Returns a collection of geographical multipolygons with properties
   *     description: Retrieves a collection of 30 geographical multipolygons, each with associated properties.
   *     responses:
   *       200:
   *         description: A successful response with a collection of geographical multipolygons with properties.
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
   *                             example: MultiPolygon
   *                           coordinates:
   *                             type: array
   *                             items:
   *                               type: array
   *                               items:
   *                                 type: array
   *                                 items:
   *                                   type: array
   *                                   items:
   *                                     type: number
   *                                     example: [-101.278818, 40.816337]
   *                       properties:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: string
   *                             example: "multipolygon_001"
   *                           name:
   *                             type: string
   *                             example: "Example Multipolygon"
   *                           area:
   *                             type: number
   *                             description: Area of the multipolygon in square kilometers.
   *                             example: 150.25
   *                           perimeter:
   *                             type: number
   *                             description: Perimeter of the multipolygon in kilometers.
   *                             example: 50.75
   *                           created_at:
   *                             type: string
   *                             format: date-time
   *                             example: "2024-12-01T16:00:00Z"
   *                           description:
   *                             type: string
   *                             example: "A sample multipolygon with metadata."
   *       400:
   *         description: Bad request - Invalid data
   *       500:
   *         description: Internal server error
   */
  "GET /featureCollection/multipolygons/properties":
    MultiPolygonsWithProperties,

  /**
   * @openapi
   * /featureCollection/multipolygons:
   *   post:
   *     tags:
   *       - featureCollection/multipolygons
   *     summary: Returns a limited number of geographical multipolygons within a bounding box or GeoJSON polygon
   *     description: Accepts a limit and optionally a GeoJSON Polygon or bounding box (bbox) to filter a collection of geographical multipolygons. The limit must be less than or equal to 1000.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               limit:
   *                 type: integer
   *                 description: Number of multipolygons to return (must be <= 1000)
   *               geojsonPolygon:
   *                 type: object
   *                 description: GeoJSON Polygon to filter multipolygons within
   *                 example: { "type": "Polygon", "coordinates": [[[-104.8, 39.1], ...]] }
   *               bbox:
   *                 type: array
   *                 description: Bounding box in the format [minX, minY, maxX, maxY]
   *                 items:
   *                   type: number
   *                 example: [-104.8, 31.3, -84.3, 43.9]
   *     responses:
   *       200:
   *         description: A successful response with a collection of geographical multipolygons.
   *       400:
   *         description: Bad request - Invalid limit value, GeoJSON Polygon, or BBox
   *       500:
   *         description: Internal server error
   */
  "POST /featureCollection/multipolygons": MultiPolygonsLimitAndWithin,

  /**
   * @openapi
   * /featureCollection/multipolygons/properties:
   *   post:
   *     tags:
   *       - featureCollection/multipolygons - with properties
   *     summary: Returns a limited number of geographical multipolygons with properties within a bounding box or GeoJSON polygon
   *     description: Accepts a limit and optionally a GeoJSON Polygon or bounding box (bbox) to filter a collection of geographical multipolygons with associated properties. The limit must be less than or equal to 1000.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               limit:
   *                 type: integer
   *                 description: Number of multipolygons to return (must be <= 1000)
   *                 example: 50
   *               geojsonPolygon:
   *                 type: object
   *                 description: GeoJSON Polygon to filter multipolygons within
   *                 example: { "type": "Polygon", "coordinates": [[[-104.8, 39.1], [-104.9, 39.2], [-104.7, 39.3], [-104.8, 39.1]]] }
   *               bbox:
   *                 type: array
   *                 description: Bounding box in the format [minX, minY, maxX, maxY]
   *                 items:
   *                   type: number
   *                 example: [-104.8, 31.3, -84.3, 43.9]
   *     responses:
   *       200:
   *         description: A successful response with a collection of geographical multipolygons and their properties.
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
   *                             example: MultiPolygon
   *                           coordinates:
   *                             type: array
   *                             items:
   *                               type: array
   *                               items:
   *                                 type: array
   *                                 items:
   *                                   type: array
   *                                   items:
   *                                     type: number
   *                       properties:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: string
   *                             example: "multipolygon_001"
   *                           name:
   *                             type: string
   *                             example: "Filtered Multipolygon"
   *                           area:
   *                             type: number
   *                             description: Area of the multipolygon in square kilometers
   *                             example: 125.78
   *                           perimeter:
   *                             type: number
   *                             description: Perimeter of the multipolygon in kilometers
   *                             example: 45.67
   *                           created_at:
   *                             type: string
   *                             format: date-time
   *                             example: "2024-12-01T16:00:00Z"
   *                           description:
   *                             type: string
   *                             example: "A multipolygon filtered by the provided constraints."
   *       400:
   *         description: Bad request - Invalid limit value, GeoJSON Polygon, or BBox
   *       500:
   *         description: Internal server error
   */
  "POST /featureCollection/multipolygons/properties":
    MultiPolygonsLimitAndWithinWithProperties,

  /**
   * @openapi
   * /featureCollection/multipolygons/random:
   *   get:
   *     tags:
   *       - featureCollection/multipolygons
   *     summary: Returns a collection of random geographical multipolygons
   *     description: Retrieves a collection of 30 random geographical multipolygons. Each multipolygon is generated randomly and adheres to basic geographical constraints.
   *     responses:
   *       200:
   *         description: A successful response with a collection of random geographical multipolygons.
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
   *                   description: Array of multipolygon features
   *                   items:
   *                     type: object
   *                     properties:
   *                       type:
   *                         type: string
   *                         description: Indicates the feature type
   *                         example: Feature
   *                       geometry:
   *                         type: object
   *                         description: The geometry object defining the multipolygon
   *                         properties:
   *                           type:
   *                             type: string
   *                             description: The type of geometry
   *                             example: MultiPolygon
   *                           coordinates:
   *                             type: array
   *                             description: The coordinates defining the multipolygon geometry
   *                             items:
   *                               type: array
   *                               items:
   *                                 type: array
   *                                 items:
   *                                   type: array
   *                                   items:
   *                                     type: number
   *                                     description: A latitude or longitude value
   *                                     example: -101.278818
   *       400:
   *         description: Bad request - Invalid request data
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   description: Description of the error
   *                   example: "Invalid data format provided."
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   description: Description of the error
   *                   example: "An unexpected error occurred while generating multipolygons."
   */
  "GET /featureCollection/multipolygons/random": RandomMultiPolygons,

  /**
   * @openapi
   * /featureCollection/multipolygons/random/properties:
   *   get:
   *     tags:
   *       - featureCollection/multipolygons - with properties
   *     summary: Returns a collection of random geographical multipolygons with additional properties
   *     description: Retrieves a collection of 30 random geographical multipolygons. Each multipolygon includes additional metadata properties such as area, perimeter, and a unique identifier.
   *     responses:
   *       200:
   *         description: A successful response with a collection of random geographical multipolygons and their properties.
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
   *                   description: Array of multipolygon features with detailed properties
   *                   items:
   *                     type: object
   *                     properties:
   *                       type:
   *                         type: string
   *                         description: Indicates the feature type
   *                         example: Feature
   *                       geometry:
   *                         type: object
   *                         description: The geometry object defining the multipolygon
   *                         properties:
   *                           type:
   *                             type: string
   *                             description: The type of geometry
   *                             example: MultiPolygon
   *                           coordinates:
   *                             type: array
   *                             description: The coordinates defining the multipolygon geometry
   *                             items:
   *                               type: array
   *                               items:
   *                                 type: array
   *                                 items:
   *                                   type: array
   *                                   items:
   *                                     type: number
   *                                     description: A latitude or longitude value
   *                                     example: -101.278818
   *                       properties:
   *                         type: object
   *                         description: Additional metadata associated with the multipolygon
   *                         properties:
   *                           id:
   *                             type: string
   *                             description: A unique identifier for the multipolygon feature
   *                             example: "random_001"
   *                           name:
   *                             type: string
   *                             description: The name of the multipolygon
   *                             example: "Random Multipolygon"
   *                           description:
   *                             type: string
   *                             description: A brief description of the multipolygon
   *                             example: "A randomly generated multipolygon feature."
   *                           area:
   *                             type: number
   *                             description: The calculated area of the multipolygon in square kilometers
   *                             example: 145.67
   *                           perimeter:
   *                             type: number
   *                             description: The perimeter of the multipolygon in kilometers
   *                             example: 52.45
   *       400:
   *         description: Bad request - Invalid request data
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   description: Description of the error
   *                   example: "Invalid data format provided."
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   description: Description of the error
   *                   example: "An unexpected error occurred while generating multipolygons."
   */
  "GET /featureCollection/multipolygons/random/properties":
    RandomMultiPolygonsWithProperties,

  /**
   * @openapi
   * /featureCollection/multipolygons/random:
   *   post:
   *     tags:
   *       - featureCollection/multipolygons
   *     summary: Returns a limited number of random geographical multipolygons within a bounding box or GeoJSON polygon
   *     description: Accepts a limit and optionally a GeoJSON Polygon or bounding box (bbox) to filter a collection of random geographical multipolygons. The limit must be less than or equal to 1000.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               limit:
   *                 type: integer
   *                 description: Number of multipolygons to return (must be <= 1000)
   *               geojsonPolygon:
   *                 type: object
   *                 description: GeoJSON Polygon to filter multipolygons within
   *                 example: { "type": "Polygon", "coordinates": [[[-104.8, 39.1], ...]] }
   *               bbox:
   *                 type: array
   *                 description: Bounding box in the format [minX, minY, maxX, maxY]
   *                 items:
   *                   type: number
   *                 example: [-104.8, 31.3, -84.3, 43.9]
   *     responses:
   *       200:
   *         description: A successful response with a collection of random geographical multipolygons.
   *       400:
   *         description: Bad request - Invalid limit value, GeoJSON Polygon, or BBox
   *       500:
   *         description: Internal server error
   */
  "POST /featureCollection/multipolygons/random":
    RandomMultiPolygonsLimitAndWithin,

  /**
   * @openapi
   * /featureCollection/multipolygons/random/properties:
   *   post:
   *     tags:
   *       - featureCollection/multipolygons - with properties
   *     summary: Returns a limited number of random geographical multipolygons with additional properties within a bounding box or GeoJSON polygon
   *     description: Accepts a limit and optionally a GeoJSON Polygon or bounding box (bbox) to filter a collection of random geographical multipolygons with additional metadata properties. The limit must be less than or equal to 1000.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               limit:
   *                 type: integer
   *                 description: Number of multipolygons to return (must be <= 1000)
   *                 example: 30
   *               geojsonPolygon:
   *                 type: object
   *                 description: GeoJSON Polygon to filter multipolygons within
   *                 example: { "type": "Polygon", "coordinates": [[[-104.8, 39.1], [-104.9, 39.0], [-104.7, 39.0], [-104.8, 39.1]]] }
   *               bbox:
   *                 type: array
   *                 description: Bounding box in the format [minX, minY, maxX, maxY]
   *                 items:
   *                   type: number
   *                 example: [-104.8, 31.3, -84.3, 43.9]
   *     responses:
   *       200:
   *         description: A successful response with a collection of random geographical multipolygons and their properties.
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
   *                   description: Array of multipolygon features with detailed properties
   *                   items:
   *                     type: object
   *                     properties:
   *                       type:
   *                         type: string
   *                         description: Indicates the feature type
   *                         example: Feature
   *                       geometry:
   *                         type: object
   *                         description: The geometry object defining the multipolygon
   *                         properties:
   *                           type:
   *                             type: string
   *                             description: The type of geometry
   *                             example: MultiPolygon
   *                           coordinates:
   *                             type: array
   *                             description: The coordinates defining the multipolygon geometry
   *                             items:
   *                               type: array
   *                               items:
   *                                 type: array
   *                                 items:
   *                                   type: array
   *                                   items:
   *                                     type: number
   *                                     description: A latitude or longitude value
   *                                     example: -101.278818
   *                       properties:
   *                         type: object
   *                         description: Additional metadata associated with the multipolygon
   *                         properties:
   *                           id:
   *                             type: string
   *                             description: A unique identifier for the multipolygon feature
   *                             example: "random_001"
   *                           name:
   *                             type: string
   *                             description: The name of the multipolygon
   *                             example: "Random Multipolygon"
   *                           description:
   *                             type: string
   *                             description: A brief description of the multipolygon
   *                             example: "A randomly generated multipolygon feature."
   *                           area:
   *                             type: number
   *                             description: The calculated area of the multipolygon in square kilometers
   *                             example: 145.67
   *                           perimeter:
   *                             type: number
   *                             description: The perimeter of the multipolygon in kilometers
   *                             example: 52.45
   *       400:
   *         description: Bad request - Invalid limit value, GeoJSON Polygon, or BBox
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   description: Description of the error
   *                   example: "Invalid limit value provided."
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   description: Description of the error
   *                   example: "An unexpected error occurred while generating multipolygons."
   */
  "POST /featureCollection/multipolygons/random/properties":
    RandomMultiPolygonsLimitAndWithinWithProperties,
};
