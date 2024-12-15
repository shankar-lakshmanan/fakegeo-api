import {
  Polygons,
  PolygonsLimitAndWithin,
  RandomPolygons,
  RandomPolygonsLimitAndWithin,
  PolygonsWithProperties,
  PolygonsLimitAndWithinWithProperties,
  RandomPolygonsWithProperties,
  RandomPolygonsLimitAndWithinWithProperties,
} from "../../functions/polygons/polygons";

export const featureCollectionPolygonsRoutes: Record<string, Function> = {
  /**
   * @openapi
   * /featureCollection/polygons:
   *   get:
   *     tags:
   *       - featureCollection/polygons
   *     summary: Returns a collection of geographical polygons
   *     description: Retrieves a collection of 30 geographical polygons.
   *     responses:
   *       200:
   *         description: A successful response with a collection of geographical polygons.
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
   *                             example: Polygon
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
  "GET /featureCollection/polygons": Polygons,

  /**
   * @openapi
   * /featureCollection/polygons/properties:
   *   get:
   *     tags:
   *       - featureCollection/polygons - with properties
   *     summary: Returns a collection of geographical polygons with properties
   *     description: Retrieves a collection of 30 geographical polygons, each with associated metadata properties.
   *     responses:
   *       200:
   *         description: A successful response with a collection of geographical polygons and properties.
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
   *                             example: Polygon
   *                           coordinates:
   *                             type: array
   *                             items:
   *                               type: array
   *                               items:
   *                                 type: array
   *                                 items:
   *                                   type: number
   *                                   example: [-101.278818, 40.816337]
   *                       properties:
   *                         type: object
   *                         description: Metadata associated with the polygon
   *                         properties:
   *                           id:
   *                             type: string
   *                             example: "polygon_001"
   *                           name:
   *                             type: string
   *                             example: "Polygon A"
   *                           area:
   *                             type: number
   *                             description: Calculated area of the polygon in square kilometers
   *                             example: 10.5
   *                           created_at:
   *                             type: string
   *                             format: date-time
   *                             example: "2024-12-01T16:00:00Z"
   *                           description:
   *                             type: string
   *                             example: "A detailed description of the polygon."
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

  "GET /featureCollection/polygons/properties": PolygonsWithProperties,

  /**
   * @openapi
   * /featureCollection/polygons:
   *   post:
   *     tags:
   *       - featureCollection/polygons
   *     summary: Returns a limited number of geographical polygons within a bounding box or GeoJSON polygon
   *     description: Accepts a limit and optionally a GeoJSON Polygon or bounding box (bbox) to filter a collection of geographical polygons. The limit must be less than or equal to 1000.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               limit:
   *                 type: integer
   *                 description: Number of polygons to return (must be <= 1000)
   *               geojsonPolygon:
   *                 type: object
   *                 description: GeoJSON Polygon to filter polygons within
   *                 example: { "type": "Polygon", "coordinates": [[[-104.8, 39.1], ...]] }
   *               bbox:
   *                 type: array
   *                 description: Bounding box in the format [minX, minY, maxX, maxY]
   *                 items:
   *                   type: number
   *                 example: [-104.8, 31.3, -84.3, 43.9]
   *     responses:
   *       200:
   *         description: A successful response with a collection of geographical polygons.
   *       400:
   *         description: Bad request - Invalid limit value, GeoJSON Polygon, or BBox
   *       500:
   *         description: Internal server error
   */
  "POST /featureCollection/polygons": PolygonsLimitAndWithin,

  /**
   * @openapi
   * /featureCollection/polygons/properties:
   *   post:
   *     tags:
   *       - featureCollection/polygons - with properties
   *     summary: Returns a limited number of geographical polygons with properties within a bounding box or GeoJSON polygon
   *     description: Accepts a limit and optionally a GeoJSON Polygon or bounding box (bbox) to filter a collection of geographical polygons, with metadata properties included. The limit must be less than or equal to 1000.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               limit:
   *                 type: integer
   *                 description: Number of polygons to return (must be <= 1000)
   *                 example: 30
   *               geojsonPolygon:
   *                 type: object
   *                 description: GeoJSON Polygon to filter polygons within
   *                 example:
   *                   type: "Polygon"
   *                   coordinates:
   *                     - [
   *                         [-104.8, 39.1],
   *                         [-104.3, 39.1],
   *                         [-104.3, 39.6],
   *                         [-104.8, 39.6],
   *                         [-104.8, 39.1]
   *                       ]
   *               bbox:
   *                 type: array
   *                 description: Bounding box in the format [minX, minY, maxX, maxY]
   *                 items:
   *                   type: number
   *                 example: [-104.8, 31.3, -84.3, 43.9]
   *     responses:
   *       200:
   *         description: A successful response with a collection of geographical polygons and properties.
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
   *                             example: Polygon
   *                           coordinates:
   *                             type: array
   *                             items:
   *                               type: array
   *                               items:
   *                                 type: array
   *                                 items:
   *                                   type: number
   *                                   example: [-101.278818, 40.816337]
   *                       properties:
   *                         type: object
   *                         description: Metadata associated with the polygon
   *                         properties:
   *                           id:
   *                             type: string
   *                             example: "polygon_001"
   *                           name:
   *                             type: string
   *                             example: "Polygon A"
   *                           area:
   *                             type: number
   *                             description: Calculated area of the polygon in square kilometers
   *                             example: 12.5
   *                           created_at:
   *                             type: string
   *                             format: date-time
   *                             example: "2024-12-01T16:00:00Z"
   *                           description:
   *                             type: string
   *                             example: "A detailed description of the polygon."
   *       400:
   *         description: Bad request - Invalid limit value, GeoJSON Polygon, or BBox
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

  "POST /featureCollection/polygons/properties":
    PolygonsLimitAndWithinWithProperties,

  /**
   * @openapi
   * /featureCollection/polygons/random:
   *   get:
   *     tags:
   *       - featureCollection/polygons
   *     summary: Returns a collection of random geographical polygons
   *     description: Retrieves a collection of 30 random geographical polygons. Each polygon is represented as a GeoJSON Feature with a geometry of type "Polygon". This endpoint does not require any input parameters and will generate random polygons that conform to valid GeoJSON standards. The polygons are randomly distributed within a predefined bounding area.
   *     responses:
   *       200:
   *         description: A successful response with a collection of random geographical polygons.
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
   *                             example: Polygon
   *                           coordinates:
   *                             type: array
   *                             items:
   *                               type: array
   *                               items:
   *                                 type: array
   *                                 items:
   *                                   type: number
   *                                   example: [-101.278818, 40.816337]
   *                       properties:
   *                         type: object
   *                         description: Metadata associated with the polygon
   *                         properties:
   *                           id:
   *                             type: string
   *                             example: "random_polygon_001"
   *                           name:
   *                             type: string
   *                             example: "Random Polygon"
   *                           created_at:
   *                             type: string
   *                             format: date-time
   *                             example: "2024-12-01T16:00:00Z"
   *                           description:
   *                             type: string
   *                             example: "A randomly generated polygon."
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

  "GET /featureCollection/polygons/random": RandomPolygons,

  /**
   * @openapi
   * /featureCollection/polygons/random/properties:
   *   get:
   *     tags:
   *       - featureCollection/polygons - with properties
   *     summary: Returns a collection of random geographical polygons with additional properties
   *     description: Retrieves a collection of 30 random geographical polygons. Each polygon is represented as a GeoJSON Feature with a geometry of type "Polygon" and includes additional metadata properties. This endpoint does not require any input parameters and will generate random polygons and associated properties, ensuring valid GeoJSON standards are maintained. The polygons are randomly distributed within a predefined bounding area.
   *     responses:
   *       200:
   *         description: A successful response with a collection of random geographical polygons and their properties.
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
   *                             example: Polygon
   *                           coordinates:
   *                             type: array
   *                             items:
   *                               type: array
   *                               items:
   *                                 type: array
   *                                 items:
   *                                   type: number
   *                                   example: [-101.278818, 40.816337]
   *                       properties:
   *                         type: object
   *                         description: Metadata associated with the polygon
   *                         properties:
   *                           id:
   *                             type: string
   *                             example: "random_polygon_001"
   *                           name:
   *                             type: string
   *                             example: "Random Polygon"
   *                           created_at:
   *                             type: string
   *                             format: date-time
   *                             example: "2024-12-01T16:00:00Z"
   *                           description:
   *                             type: string
   *                             example: "A randomly generated polygon with associated metadata."
   *                           area:
   *                             type: number
   *                             description: The calculated area of the polygon
   *                             example: 150.5
   *                           perimeter:
   *                             type: number
   *                             description: The calculated perimeter of the polygon
   *                             example: 55.2
   *                           centroid:
   *                             type: array
   *                             description: The centroid of the polygon
   *                             items:
   *                               type: number
   *                             example: [-101.278, 40.816]
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

  "GET /featureCollection/polygons/random/properties":
    RandomPolygonsWithProperties,

  /**
   * @openapi
   * /featureCollection/polygons/random:
   *   post:
   *     tags:
   *       - featureCollection/polygons
   *     summary: Retrieve a limited number of random geographical polygons within a bounding box or GeoJSON polygon
   *     description: This endpoint allows clients to retrieve a collection of random geographical polygons. The polygons are randomly distributed within a specified GeoJSON Polygon or bounding box. Clients can limit the number of polygons returned (up to a maximum of 1000). If no GeoJSON Polygon or bounding box is provided, the polygons will be generated within a default bounding area.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               limit:
   *                 type: integer
   *                 description: Maximum number of polygons to return. Must be a positive integer less than or equal to 1000.
   *                 example: 50
   *               geojsonPolygon:
   *                 type: object
   *                 description: A GeoJSON Polygon defining the area within which random polygons should be generated.
   *                 example:
   *                   type: Polygon
   *                   coordinates: [
   *                     [
   *                       [-104.8, 39.1],
   *                       [-104.8, 39.5],
   *                       [-104.2, 39.5],
   *                       [-104.2, 39.1],
   *                       [-104.8, 39.1]
   *                     ]
   *                   ]
   *               bbox:
   *                 type: array
   *                 description: A bounding box in the format [minX, minY, maxX, maxY] to define the area for polygon generation.
   *                 items:
   *                   type: number
   *                 example: [-104.8, 31.3, -84.3, 43.9]
   *     responses:
   *       200:
   *         description: A successful response with a collection of random geographical polygons.
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
   *                   description: Array of GeoJSON Feature objects, each representing a polygon.
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
   *                             example: Polygon
   *                           coordinates:
   *                             type: array
   *                             items:
   *                               type: array
   *                               items:
   *                                 type: array
   *                                 items:
   *                                   type: number
   *                                   example: [-101.278818, 40.816337]
   *                       properties:
   *                         type: object
   *                         description: Metadata associated with the polygon
   *                         properties:
   *                           id:
   *                             type: string
   *                             example: "random_polygon_001"
   *                           name:
   *                             type: string
   *                             example: "Random Polygon"
   *                           created_at:
   *                             type: string
   *                             format: date-time
   *                             example: "2024-12-01T16:00:00Z"
   *                           description:
   *                             type: string
   *                             example: "A randomly generated polygon within the specified area."
   *       400:
   *         description: Bad request - Invalid input for `limit`, `geojsonPolygon`, or `bbox`.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Invalid input. Limit must be <= 1000, and geojsonPolygon or bbox must be valid."
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "An unexpected error occurred while generating polygons."
   */
  "POST /featureCollection/polygons/random": RandomPolygonsLimitAndWithin,

  /**
   * @openapi
   * /featureCollection/polygons/random/properties:
   *   post:
   *     tags:
   *       - featureCollection/polygons - with properties
   *     summary: Retrieve a limited number of random geographical polygons with additional metadata within a bounding box or GeoJSON polygon
   *     description: This endpoint retrieves a collection of random geographical polygons along with additional properties. The polygons are randomly distributed within a specified GeoJSON Polygon or bounding box. Clients can limit the number of polygons returned (up to a maximum of 1000). If no GeoJSON Polygon or bounding box is provided, the polygons will be generated within a default bounding area.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               limit:
   *                 type: integer
   *                 description: Maximum number of polygons to return. Must be a positive integer less than or equal to 1000.
   *                 example: 50
   *               geojsonPolygon:
   *                 type: object
   *                 description: A GeoJSON Polygon defining the area within which random polygons should be generated.
   *                 example:
   *                   type: Polygon
   *                   coordinates: [
   *                     [
   *                       [-104.8, 39.1],
   *                       [-104.8, 39.5],
   *                       [-104.2, 39.5],
   *                       [-104.2, 39.1],
   *                       [-104.8, 39.1]
   *                     ]
   *                   ]
   *               bbox:
   *                 type: array
   *                 description: A bounding box in the format [minX, minY, maxX, maxY] to define the area for polygon generation.
   *                 items:
   *                   type: number
   *                 example: [-104.8, 31.3, -84.3, 43.9]
   *     responses:
   *       200:
   *         description: A successful response with a collection of random geographical polygons and their properties.
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
   *                   description: Array of GeoJSON Feature objects, each representing a polygon with additional properties.
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
   *                             example: Polygon
   *                           coordinates:
   *                             type: array
   *                             items:
   *                               type: array
   *                               items:
   *                                 type: array
   *                                 items:
   *                                   type: number
   *                                   example: [-101.278818, 40.816337]
   *                       properties:
   *                         type: object
   *                         description: Metadata associated with the polygon
   *                         properties:
   *                           id:
   *                             type: string
   *                             example: "random_polygon_001"
   *                           name:
   *                             type: string
   *                             example: "Random Polygon"
   *                           created_at:
   *                             type: string
   *                             format: date-time
   *                             example: "2024-12-01T16:00:00Z"
   *                           description:
   *                             type: string
   *                             example: "A randomly generated polygon within the specified area."
   *                           area:
   *                             type: number
   *                             description: The area of the polygon in square kilometers.
   *                             example: 12.34
   *                           perimeter:
   *                             type: number
   *                             description: The perimeter of the polygon in kilometers.
   *                             example: 5.67
   *                           random_property:
   *                             type: string
   *                             description: A randomly assigned property for the polygon.
   *                             example: "Random Value 123"
   *       400:
   *         description: Bad request - Invalid input for `limit`, `geojsonPolygon`, or `bbox`.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Invalid input. Limit must be <= 1000, and geojsonPolygon or bbox must be valid."
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "An unexpected error occurred while generating polygons."
   */
  "POST /featureCollection/polygons/random/properties":
    RandomPolygonsLimitAndWithinWithProperties,
};
