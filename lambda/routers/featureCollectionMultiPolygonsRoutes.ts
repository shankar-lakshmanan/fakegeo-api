import {
    MultiPolygons,
    MultiPolygonsLimitAndWithin,
    RandomMultiPolygons,
    RandomMultiPolygonsLimitAndWithin,
  } from "../functions/polygon/multipolygon";
  
  export const featureCollectionMultiPolygonsRoutes: Record<string, Function> = {
    /**
     * @openapi
     * /featureCollection/multipolygons:
     *   get:
     *     tags:
     *       - MultiPolygons featureCollection
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
     * /featureCollection/multipolygons:
     *   post:
     *     tags:
     *       - MultiPolygons featureCollection
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
     * /featureCollection/multipolygons/random:
     *   get:
     *     tags:
     *       - MultiPolygons featureCollection
     *     summary: Returns a collection of random geographical multipolygons
     *     description: Retrieves a collection of 30 random geographical multipolygons.
     *     responses:
     *       200:
     *         description: A successful response with a collection of geographical multipolygons.
     *       400:
     *         description: Bad request - Invalid data
     *       500:
     *         description: Internal server error
     */
    "GET /featureCollection/multipolygons/random": RandomMultiPolygons,
  
    /**
     * @openapi
     * /featureCollection/multipolygons/random:
     *   post:
     *     tags:
     *       - MultiPolygons featureCollection
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
    "POST /featureCollection/multipolygons/random": RandomMultiPolygonsLimitAndWithin,
  };
  