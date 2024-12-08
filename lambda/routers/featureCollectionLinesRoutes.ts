import {
  Lines,
  LinesLimitAndWithin,
  RandomLines,
  RandomLinesLimitAndWithin,
  LinesWithProperties,
  LinesLimitAndWithinWithProperties,
  RandomLinesWithProperties,
  RandomLinesLimitAndWithinWithProperties,
} from "../functions/line/line";

export const featureCollectionLinesRoutes: Record<string, Function> = {
  /**
   * @openapi
   * /featureCollection/lines:
   *   get:
   *     tags:
   *       - featureCollection/lines
   *     summary: Returns a collection of geographical lines
   *     description: Retrieves a collection of 30 geographical lines.
   *     responses:
   *       200:
   *         description: A successful response with a collection of geographical lines.
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
   *                             example: LineString
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
   *
   */

  "GET /featureCollection/lines": Lines,

  /**
   * @openapi
   * /featureCollection/lines/properties:
   *   get:
   *     tags:
   *       - featureCollection/lines - with properties
   *     summary: Returns a collection of geographical lines with properties
   *     description: Retrieves a collection of 30 geographical lines, each with associated properties.
   *     responses:
   *       200:
   *         description: A successful response with a collection of geographical lines and their properties.
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
   *                             example: LineString
   *                           coordinates:
   *                             type: array
   *                             items:
   *                               type: array
   *                               items:
   *                                 type: number
   *                                 example: [-101.278818, 40.816337]
   *                       properties:
   *                         type: object
   *                         description: Additional properties associated with the line
   *                         properties:
   *                           id:
   *                             type: string
   *                             example: "line_001"
   *                           name:
   *                             type: string
   *                             example: "Main Line"
   *                           description:
   *                             type: string
   *                             example: "This is a sample description for a line feature."
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

  "GET /featureCollection/lines/properties": LinesWithProperties,

  /**
   * @openapi
   * /featureCollection/lines:
   *   post:
   *     tags:
   *       - featureCollection/lines
   *     summary: Returns a limited number of geographical lines within a bounding box or GeoJSON polygon
   *     description: Accepts a limit and optionally a GeoJSON Polygon or bounding box (bbox) to filter a collection of geographical lines. The limit must be less than or equal to 1000.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               limit:
   *                 type: integer
   *                 description: Number of lines to return (must be <= 1000)
   *                 example: 30
   *               geojsonPolygon:
   *                 type: object
   *                 description: GeoJSON Polygon to filter lines within
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
   *                 description: Bounding box in the format [minX, minY, maxX, maxY] to filter lines within
   *                 items:
   *                   type: number
   *                 example: [-104.83004979248041, 31.328195547453603, -84.34442721393819, 43.89485607270808]
   *     responses:
   *       200:
   *         description: A successful response with a collection of geographical lines.
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
   *                             example: LineString
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

  "POST /featureCollection/lines": LinesLimitAndWithin,

  /**
   * @openapi
   * /featureCollection/lines/properties:
   *   post:
   *     tags:
   *       - featureCollection/lines - with properties
   *     summary: Returns a limited number of geographical lines with properties within a bounding box or GeoJSON polygon
   *     description: Accepts a limit and optionally a GeoJSON Polygon or bounding box (bbox) to filter a collection of geographical lines, with additional properties included. The limit must be less than or equal to 1000.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               limit:
   *                 type: integer
   *                 description: Number of lines to return (must be <= 1000)
   *                 example: 30
   *               geojsonPolygon:
   *                 type: object
   *                 description: GeoJSON Polygon to filter lines within
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
   *                 description: Bounding box in the format [minX, minY, maxX, maxY] to filter lines within
   *                 items:
   *                   type: number
   *                 example: [-104.83004979248041, 31.328195547453603, -84.34442721393819, 43.89485607270808]
   *     responses:
   *       200:
   *         description: A successful response with a collection of geographical lines and their properties.
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
   *                             example: LineString
   *                           coordinates:
   *                             type: array
   *                             items:
   *                               type: array
   *                               items:
   *                                 type: number
   *                                 example: [-101.278818, 40.816337]
   *                       properties:
   *                         type: object
   *                         description: Additional properties associated with the line
   *                         properties:
   *                           id:
   *                             type: string
   *                             example: "line_001"
   *                           name:
   *                             type: string
   *                             example: "Main Line"
   *                           description:
   *                             type: string
   *                             example: "This is a sample description for a line feature."
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

  "POST /featureCollection/lines/properties": LinesLimitAndWithinWithProperties,

  /**
   * @openapi
   * /featureCollection/lines/random:
   *   get:
   *     tags:
   *       - featureCollection/lines
   *     summary: Returns a collection of random geographical lines
   *     description: Retrieves a collection of 30 random geographical lines.
   *     responses:
   *       200:
   *         description: A successful response with a collection of geographical lines.
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
   *                             example: LineString
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

  "GET /featureCollection/lines/random": RandomLines,

  /**
   * @openapi
   * /featureCollection/lines/random/properties:
   *   get:
   *     tags:
   *       - featureCollection/lines - with properties
   *     summary: Returns a collection of random geographical lines with properties
   *     description: Retrieves a collection of 30 random geographical lines, each with associated properties.
   *     responses:
   *       200:
   *         description: A successful response with a collection of random geographical lines and their properties.
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
   *                             example: LineString
   *                           coordinates:
   *                             type: array
   *                             items:
   *                               type: array
   *                               items:
   *                                 type: number
   *                                 example: [-101.278818, 40.816337]
   *                       properties:
   *                         type: object
   *                         description: Additional properties associated with the random line
   *                         properties:
   *                           id:
   *                             type: string
   *                             example: "random_line_001"
   *                           name:
   *                             type: string
   *                             example: "Random Line 1"
   *                           description:
   *                             type: string
   *                             example: "A random line feature generated for demonstration purposes."
   *                           created_at:
   *                             type: string
   *                             format: date-time
   *                             example: "2024-11-28T12:00:00Z"
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

  "GET /featureCollection/lines/random/properties": RandomLinesWithProperties,

  /**
   * @openapi
   * /featureCollection/lines/random:
   *   post:
   *     tags:
   *       - featureCollection/lines
   *     summary: Returns a limited number of random geographical lines within a bounding box or GeoJSON polygon
   *     description: Accepts a limit and optionally a GeoJSON Polygon or bounding box (bbox) to filter a collection of random geographical lines. The limit must be less than or equal to 1000.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               limit:
   *                 type: integer
   *                 description: Number of lines to return (must be <= 1000)
   *                 example: 30
   *               geojsonPolygon:
   *                 type: object
   *                 description: GeoJSON Polygon to filter lines within
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
   *                 description: Bounding box in the format [minX, minY, maxX, maxY] to filter lines within
   *                 items:
   *                   type: number
   *                 example: [-104.83004979248041, 31.328195547453603, -84.34442721393819, 43.89485607270808]
   *     responses:
   *       200:
   *         description: A successful response with a collection of random geographical lines.
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
   *                             example: LineString
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

  "POST /featureCollection/lines/random": RandomLinesLimitAndWithin,

  /**
   * @openapi
   * /featureCollection/lines/random/properties:
   *   post:
   *     tags:
   *       - featureCollection/lines - with properties
   *     summary: Returns a limited number of random geographical lines with properties within a bounding box or GeoJSON polygon
   *     description: Accepts a limit and optionally a GeoJSON Polygon or bounding box (bbox) to filter a collection of random geographical lines, each with associated properties. The limit must be less than or equal to 1000.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               limit:
   *                 type: integer
   *                 description: Number of lines to return (must be <= 1000)
   *                 example: 30
   *               geojsonPolygon:
   *                 type: object
   *                 description: GeoJSON Polygon to filter lines within
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
   *                 description: Bounding box in the format [minX, minY, maxX, maxY] to filter lines within
   *                 items:
   *                   type: number
   *                 example: [-104.83004979248041, 31.328195547453603, -84.34442721393819, 43.89485607270808]
   *     responses:
   *       200:
   *         description: A successful response with a collection of random geographical lines and their properties.
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
   *                             example: LineString
   *                           coordinates:
   *                             type: array
   *                             items:
   *                               type: array
   *                               items:
   *                                 type: number
   *                                 example: [-101.278818, 40.816337]
   *                       properties:
   *                         type: object
   *                         description: Additional properties associated with the random line
   *                         properties:
   *                           id:
   *                             type: string
   *                             example: "random_line_001"
   *                           name:
   *                             type: string
   *                             example: "Random Line 1"
   *                           description:
   *                             type: string
   *                             example: "A random line feature generated for demonstration purposes."
   *                           created_at:
   *                             type: string
   *                             format: date-time
   *                             example: "2024-11-28T12:00:00Z"
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

  "POST /featureCollection/lines/random/properties":
    RandomLinesLimitAndWithinWithProperties,
};
