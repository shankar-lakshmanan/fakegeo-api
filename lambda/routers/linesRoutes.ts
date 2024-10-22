import {
    Lines,
    LinesLimitAndWithin,
    RandomLines,
    RandomLinesLimitAndWithin,
  } from "../functions/line/line";
  
  export const linesRoutes: Record<string, Function> = {
  /**
   * @openapi
   * /lines:
   *   get:
   *     tags:
   *       - Lines
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
  
    "GET /lines": Lines,
  
   
  /**
   * @openapi
   * /lines:
   *   post:
   *     tags:
   *       - Lines
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
  
    "POST /lines": LinesLimitAndWithin,
  
  
  /**
   * @openapi
   * /lines/random:
   *   get:
   *     tags:
   *       - Lines
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
  
  "GET /lines/random": RandomLines,
  
  /**
   * @openapi
   * /lines/random:
   *   post:
   *     tags:
   *       - Lines
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
  
  "POST /lines/random": RandomLinesLimitAndWithin,
  };
  