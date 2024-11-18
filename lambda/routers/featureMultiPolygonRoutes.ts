import { MultiPolygon, RandomMultiPolygon, WithinMultiPolygon, WithinRandomMultiPolygon } from "../functions/polygon/multipolygon";

export const featureMultiPolygonRoutes: Record<string, Function> = {
/**
 * @openapi
 * /feature/multipolygon:
 *   get:
 *     tags:
 *       - MultiPolygon feature
 *     summary: Returns a multipolygon geojson Feature
 *     description: Generates a geographical multipolygon.
 *     responses:
 *       200:
 *         description: A successful response containing the multipolygon feature
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
 *                       example: MultiPolygon
 *                     coordinates:
 *                       type: array
 *                       items:
 *                         type: array
 *                         items:
 *                           type: array
 *                           items:
 *                             type: array
 *                             items:
 *                               type: number
 *                       example: [
 *                         [
 *                           [
 *                             [-98.41003457659247, 39.4047785977163],
 *                             [-98.02900405028468, 39.09917828895786],
 *                             [-96.96285807131997, 39.33112358709519],
 *                             [-97.70240571181387, 39.862404027619164],
 *                             [-98.41003457659247, 39.4047785977163]
 *                           ]
 *                         ]
 *                       ]
 *       400:
 *         description: Bad request - Invalid data
 *       500:
 *         description: Internal server error
 */
  "GET /feature/multipolygon": MultiPolygon,

/**
 * @openapi
 * /feature/multipolygon/random:
 *   get:
 *     tags:
 *       - MultiPolygon feature
 *     summary: Returns a random multipolygon geojson Feature
 *     description: Generates a geographical random multipolygon.
 *     responses:
 *       200:
 *         description: A successful response containing the random multipolygon feature
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
 *                       example: MultiPolygon
 *                     coordinates:
 *                       type: array
 *                       items:
 *                         type: array
 *                         items:
 *                           type: array
 *                           items:
 *                             type: array
 *                             items:
 *                               type: number
 *       400:
 *         description: Bad request - Invalid data
 *       500:
 *         description: Internal server error
 */
  "GET /feature/multipolygon/random": RandomMultiPolygon,

/**
 * @openapi
 * /feature/multipolygon:
 *   post:
 *     tags:
 *       - MultiPolygon feature
 *     summary: Returns a multipolygon geojson Feature within a GeoJSON polygon or bbox
 *     description: Accepts a GeoJSON Polygon or a bounding box (bbox) and returns a multipolygon within it.
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               geojsonPolygon:
 *                 type: object
 *                 description: GeoJSON Polygon to return a multipolygon within it
 *                 example:
 *                   type: "Polygon"
 *                   coordinates: [ ... ]
 *               bbox:
 *                 type: array
 *                 description: Bounding box in the format [minX, minY, maxX, maxY] to return a multipolygon within it
 *                 items:
 *                   type: number
 *                 example: [-104.35, 36.87, -94.44, 41.94]
 *     responses:
 *       200:
 *         description: A successful response
 *       400:
 *         description: Bad request - Invalid data
 *       500:
 *         description: Internal server error
 */
  "POST /feature/multipolygon": WithinMultiPolygon,

/**
 * @openapi
 * /feature/multipolygon/random:
 *   post:
 *     tags:
 *       - MultiPolygon feature
 *     summary: Returns a random multipolygon geojson Feature within a GeoJSON polygon or bbox
 *     description: Accepts a GeoJSON Polygon or a bounding box (bbox) and returns a random multipolygon within it.
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               geojsonPolygon:
 *                 type: object
 *                 description: GeoJSON Polygon to return a random multipolygon within it
 *                 example:
 *                   type: "Polygon"
 *                   coordinates: [ ... ]
 *               bbox:
 *                 type: array
 *                 description: Bounding box in the format [minX, minY, maxX, maxY] to return a random multipolygon within it
 *                 items:
 *                   type: number
 *                 example: [-104.35, 36.87, -94.44, 41.94]
 *     responses:
 *       200:
 *         description: A successful response
 *       400:
 *         description: Bad request - Invalid data
 *       500:
 *         description: Internal server error
 */
  "POST /feature/multipolygon/random": WithinRandomMultiPolygon,

};
