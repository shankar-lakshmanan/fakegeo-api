import { Polygon, RandomPolygon, WithinPolygon, WithinRandomPolygon } from "../functions/polygon/polygon";

export const featurePolygonRoutes: Record<string, Function> = {
/**
 * @openapi
 * /feature/polygon:
 *   get:
 *     tags:
 *       - Polygon feature
 *     summary: Returns a polygon geojson Feature
 *     description: Generates a geographical polygon.
 *     responses:
 *       200:
 *         description: A successful response containing the polygon feature
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
 *                       example: Polygon
 *                     coordinates:
 *                       type: array
 *                       items:
 *                         type: array
 *                         items:
 *                           type: number
 *                       example: [
 *                         [
 *                           -98.41003457659247,
 *                           39.4047785977163
 *                         ],
 *                         [
 *                           -98.02900405028468,
 *                           39.09917828895786
 *                         ],
 *                         [
 *                           -96.96285807131997,
 *                           39.33112358709519
 *                         ],
 *                         [
 *                           -97.70240571181387,
 *                           39.862404027619164
 *                         ],
 *                         [
 *                           -97.89292169019507,
 *                           39.56582676744193
 *                         ],
 *                         [
 *                           -98.18773342170626,
 *                           39.71250430627077
 *                         ],
 *                         [
 *                           -98.41003457659247,
 *                           39.4047785977163
 *                         ]
 *                       ]
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
  "GET /feature/polygon": Polygon,

/**
 * @openapi
 * /feature/polygon/random:
 *   get:
 *     tags:
 *       - Polygon feature
 *     summary: Returns a random polygon geojson Feature
 *     description: Generates a geographical random polygon.
 *     responses:
 *       200:
 *         description: A successful response containing the random polygon feature
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
 *                       example: Polygon
 *                     coordinates:
 *                       type: array
 *                       items:
 *                         type: array
 *                         items:
 *                           type: number
 *                       example: [
 *                         [
 *                           -98.41003457659247,
 *                           39.4047785977163
 *                         ],
 *                         [
 *                           -98.02900405028468,
 *                           39.09917828895786
 *                         ],
 *                         [
 *                           -96.96285807131997,
 *                           39.33112358709519
 *                         ],
 *                         [
 *                           -97.70240571181387,
 *                           39.862404027619164
 *                         ],
 *                         [
 *                           -97.89292169019507,
 *                           39.56582676744193
 *                         ],
 *                         [
 *                           -98.18773342170626,
 *                           39.71250430627077
 *                         ],
 *                         [
 *                           -98.41003457659247,
 *                           39.4047785977163
 *                         ]
 *                       ]
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
  "GET /feature/polygon/random": RandomPolygon,

/**
 * @openapi
 * /feature/polygon:
 *   post:
 *     tags:
 *       - Polygon feature
 *     summary: Returns a polygon geojson Feature within a GeoJSON polygon or bbox
 *     description: Accepts a GeoJSON Polygon or a bounding box (bbox) and returns a polygon within it.
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               geojsonPolygon:
 *                 type: object
 *                 description: GeoJSON Polygon to return a polygon within it
 *                 example:
 *                   type: "Polygon"
 *                   coordinates:
 *                     - [
 *                         [-104.35959912130382, 40.186854567133594],
 *                         [-99.75483802782351, 36.870115044295346],
 *                         [-97.427541041584, 36.43876305758806],
 *                         [-94.44354178155926, 38.13171162987652],
 *                         [-99.30047105952276, 41.94545202484386],
 *                         [-104.35959912130382, 40.186854567133594]
 *                       ]
 *               bbox:
 *                 type: array
 *                 description: Bounding box in the format [minX, minY, maxX, maxY] to return a polygon within it
 *                 items:
 *                   type: number
 *                 example: [-104.35959912130382, 36.870115044295346, -94.44354178155926, 41.94545202484386]
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
 *                       type: Polygon
 *                     coordinates:
 *                       type: array
 *                       items:
 *                         type: array
 *                         items:
 *                           type: number
 *                       example: [
 *                         [
 *                           -104.35959912130382, 40.186854567133594
 *                         ],
 *                         [
 *                           -99.75483802782351, 36.870115044295346
 *                         ],
 *                         [
 *                           -97.427541041584, 36.43876305758806
 *                         ],
 *                         [
 *                           -94.44354178155926, 38.13171162987652
 *                         ],
 *                         [
 *                           -99.30047105952276, 41.94545202484386
 *                         ],
 *                         [
 *                           -104.35959912130382, 40.186854567133594
 *                         ]
 *                       ]
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
  "POST /feature/polygon": WithinPolygon,

  /**
 * @openapi
 * /feature/polygon/random:
 *   post:
 *     tags:
 *       - Polygon feature
 *     summary: Returns a random polygon geojson Feature within a GeoJSON polygon or bbox
 *     description: Accepts a GeoJSON Polygon or a bounding box (bbox) and returns a random polygon within it.
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               geojsonPolygon:
 *                 type: object
 *                 description: GeoJSON Polygon to return a random polygon within it
 *                 example:
 *                   type: "Polygon"
 *                   coordinates:
 *                     - [
 *                         [-104.35959912130382, 40.186854567133594],
 *                         [-99.75483802782351, 36.870115044295346],
 *                         [-97.427541041584, 36.43876305758806],
 *                         [-94.44354178155926, 38.13171162987652],
 *                         [-99.30047105952276, 41.94545202484386],
 *                         [-104.35959912130382, 40.186854567133594]
 *                       ]
 *               bbox:
 *                 type: array
 *                 description: Bounding box in the format [minX, minY, maxX, maxY] to return a random polygon within it
 *                 items:
 *                   type: number
 *                 example: [-104.35959912130382, 36.870115044295346, -94.44354178155926, 41.94545202484386]
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
 *                       type: Polygon
 *                     coordinates:
 *                       type: array
 *                       items:
 *                         type: array
 *                         items:
 *                           type: number
 *                       example: [
 *                         [
 *                           -104.35959912130382, 40.186854567133594
 *                         ],
 *                         [
 *                           -99.75483802782351, 36.870115044295346
 *                         ],
 *                         [
 *                           -97.427541041584, 36.43876305758806
 *                         ],
 *                         [
 *                           -94.44354178155926, 38.13171162987652
 *                         ],
 *                         [
 *                           -99.30047105952276, 41.94545202484386
 *                         ],
 *                         [
 *                           -104.35959912130382, 40.186854567133594
 *                         ]
 *                       ]
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
  "POST /feature/polygon/random": WithinRandomPolygon,

};
