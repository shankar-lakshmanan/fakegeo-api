import {
  MultiPoint,
  RandomMultiPoint,
  WithinMultiPoint,
  WithinRandomMultiPoint,
} from "../functions/point/multipoint";

export const featureMultiPointRoutes: Record<string, Function> = {
  /**
   * @openapi
   * /feature/multipoint:
   *   get:
   *     tags:
   *       - MultiPoint feature
   *     summary: Returns a multipoint geojson Feature
   *     description: Generates a geographical multipoint.
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
   *                       example: MultiPoint
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: array
   *                         items:
   *                           type: number
   *                       example: [[-101.278818, 40.816337], [-99.40157045143154, 39.19210754121596]]
   *       400:
   *         description: Bad request - Invalid data
   *       500:
   *         description: Internal server error
   */
  "GET /feature/multipoint": MultiPoint,

  /**
   * @openapi
   * /feature/multipoint/random:
   *   get:
   *     tags:
   *       - MultiPoint feature
   *     summary: Returns a random multipoint geojson Feature
   *     description: Generates a random geographical multipoint.
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
   *                       example: MultiPoint
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: array
   *                         items:
   *                           type: number
   *                       example: [[-101.278818, 40.816337], [-99.40157045143154, 39.19210754121596]]
   *       400:
   *         description: Bad request - Invalid data
   *       500:
   *         description: Internal server error
   */
  "GET /feature/multipoint/random": RandomMultiPoint,

  /**
   * @openapi
   * /feature/multipoint:
   *   post:
   *     tags:
   *       - MultiPoint feature
   *     summary: Returns a multipoint geojson Feature within a GeoJSON polygon or bbox
   *     description: Accepts a GeoJSON Polygon or a bounding box (bbox) and returns multipoints within it.
   *     requestBody:
   *       required: false
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               geojsonPolygon:
   *                 type: object
   *                 description: GeoJSON Polygon to return multipoints within it
   *               bbox:
   *                 type: array
   *                 description: Bounding box in the format [minX, minY, maxX, maxY] to return multipoints within it
   *                 items:
   *                   type: number
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
   *                       example: MultiPoint
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: array
   *                         items:
   *                           type: number
   *       400:
   *         description: Bad request - Invalid data
   *       500:
   *         description: Internal server error
   */
  "POST /feature/multipoint": WithinMultiPoint,

  /**
   * @openapi
   * /feature/multipoint/random:
   *   post:
   *     tags:
   *       - MultiPoint feature
   *     summary: Returns a random multipoint geojson Feature within a GeoJSON polygon or bbox
   *     description: Accepts a GeoJSON Polygon or a bounding box (bbox) and returns random multipoints within it.
   *     requestBody:
   *       required: false
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               geojsonPolygon:
   *                 type: object
   *                 description: GeoJSON Polygon to return random multipoints within it
   *               bbox:
   *                 type: array
   *                 description: Bounding box in the format [minX, minY, maxX, maxY] to return random multipoints within it
   *                 items:
   *                   type: number
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
   *                       example: MultiPoint
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: array
   *                         items:
   *                           type: number
   *       400:
   *         description: Bad request - Invalid data
   *       500:
   *         description: Internal server error
   */
  "POST /feature/multipoint/random": WithinRandomMultiPoint,
};
