import {
  Polygons,
  PolygonsLimitAndWithin,
  RandomPolygons,
  RandomPolygonsLimitAndWithin,
} from "../functions/polygon/polygon";

export const featurePolygonsRoutes: Record<string, Function> = {
  /**
   * @openapi
   * /feature/polygons:
   *   get:
   *     tags:
   *       - Polygons features
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
  "GET /feature/polygons": Polygons,

  /**
   * @openapi
   * /feature/polygons:
   *   post:
   *     tags:
   *       - Polygons features
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
  "POST /feature/polygons": PolygonsLimitAndWithin,

  /**
   * @openapi
   * /feature/polygons/random:
   *   get:
   *     tags:
   *       - Polygons features
   *     summary: Returns a collection of random geographical polygons
   *     description: Retrieves a collection of 30 random geographical polygons.
   *     responses:
   *       200:
   *         description: A successful response with a collection of geographical polygons.
   *       400:
   *         description: Bad request - Invalid data
   *       500:
   *         description: Internal server error
   */
  "GET /feature/polygons/random": RandomPolygons,

  /**
   * @openapi
   * /feature/polygons/random:
   *   post:
   *     tags:
   *       - Polygons features
   *     summary: Returns a limited number of random geographical polygons within a bounding box or GeoJSON polygon
   *     description: Accepts a limit and optionally a GeoJSON Polygon or bounding box (bbox) to filter a collection of random geographical polygons. The limit must be less than or equal to 1000.
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
   *         description: A successful response with a collection of random geographical polygons.
   *       400:
   *         description: Bad request - Invalid limit value, GeoJSON Polygon, or BBox
   *       500:
   *         description: Internal server error
   */
  "POST /feature/polygons/random": RandomPolygonsLimitAndWithin,
};
