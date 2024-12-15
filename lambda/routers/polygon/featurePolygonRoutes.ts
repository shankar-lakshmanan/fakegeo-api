import {
  Polygon,
  RandomPolygon,
  WithinPolygon,
  WithinRandomPolygon,
  PolygonWithProperties,
  RandomPolygonWithProperties,
  WithinPolygonWithProperties,
  WithinRandomPolygonWithProperties,
} from "../../functions/polygon/polygon";

export const featurePolygonRoutes: Record<string, Function> = {
  /**
   * @openapi
   * /feature/polygon:
   *   get:
   *     tags:
   *       - feature/polygon
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
   * /feature/polygon/properties:
   *   get:
   *     tags:
   *       - feature/polygon - with properties
   *     summary: Returns a polygon GeoJSON Feature with metadata properties
   *     description: Generates a geographical polygon and includes additional metadata properties.
   *     responses:
   *       200:
   *         description: A successful response containing the polygon feature with metadata properties
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
   *                 properties:
   *                   type: object
   *                   description: Metadata associated with the polygon feature
   *                   properties:
   *                     id:
   *                       type: string
   *                       example: "polygon_feature_001"
   *                     name:
   *                       type: string
   *                       example: "Random Polygon"
   *                     area:
   *                       type: number
   *                       description: Calculated area of the polygon in square kilometers
   *                       example: 120.5
   *                     description:
   *                       type: string
   *                       example: "A randomly generated polygon with metadata."
   *                     created_at:
   *                       type: string
   *                       format: date-time
   *                       example: "2024-12-01T15:00:00Z"
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

  "GET /feature/polygon/properties": PolygonWithProperties,

  /**
   * @openapi
   * /feature/polygon/random:
   *   get:
   *     tags:
   *       - feature/polygon
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
   * /feature/polygon/random/properties:
   *   get:
   *     tags:
   *       - feature/polygon - with properties
   *     summary: Returns a random polygon GeoJSON Feature with metadata properties
   *     description: Generates a geographical random polygon and includes additional metadata properties.
   *     responses:
   *       200:
   *         description: A successful response containing the random polygon feature with metadata properties
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
   *                 properties:
   *                   type: object
   *                   description: Metadata associated with the random polygon feature
   *                   properties:
   *                     id:
   *                       type: string
   *                       example: "random_polygon_001"
   *                     name:
   *                       type: string
   *                       example: "Random Polygon"
   *                     area:
   *                       type: number
   *                       description: Calculated area of the polygon in square kilometers
   *                       example: 85.7
   *                     description:
   *                       type: string
   *                       example: "A randomly generated polygon with metadata."
   *                     created_at:
   *                       type: string
   *                       format: date-time
   *                       example: "2024-12-01T15:00:00Z"
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

  "GET /feature/polygon/random/properties": RandomPolygonWithProperties,

  /**
   * @openapi
   * /feature/polygon:
   *   post:
   *     tags:
   *       - feature/polygon
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
   * /feature/polygon/properties:
   *   post:
   *     tags:
   *       - feature/polygon - with properties
   *     summary: Returns a polygon GeoJSON Feature with properties within a GeoJSON polygon or bbox
   *     description: Accepts a GeoJSON Polygon or a bounding box (bbox) and returns a polygon within it along with additional properties.
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
   *                 properties:
   *                   type: object
   *                   description: Metadata associated with the polygon feature
   *                   properties:
   *                     id:
   *                       type: string
   *                       example: "polygon_within_001"
   *                     name:
   *                       type: string
   *                       example: "Polygon Within Area"
   *                     area:
   *                       type: number
   *                       description: Calculated area of the polygon in square kilometers
   *                       example: 120.5
   *                     description:
   *                       type: string
   *                       example: "A polygon generated within the provided area."
   *                     created_at:
   *                       type: string
   *                       format: date-time
   *                       example: "2024-12-01T15:00:00Z"
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

  "POST /feature/polygon/properties": WithinPolygonWithProperties,

  /**
   * @openapi
   * /feature/polygon/random:
   *   post:
   *     tags:
   *       - feature/polygon
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

  /**
   * @openapi
   * /feature/polygon/random/properties:
   *   post:
   *     tags:
   *       - feature/polygon - with properties
   *     summary: Returns a random polygon GeoJSON Feature with properties within a GeoJSON polygon or bbox
   *     description: Accepts a GeoJSON Polygon or a bounding box (bbox) and returns a random polygon within it along with additional properties.
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
   *                 properties:
   *                   type: object
   *                   description: Metadata associated with the random polygon feature
   *                   properties:
   *                     id:
   *                       type: string
   *                       example: "random_polygon_001"
   *                     name:
   *                       type: string
   *                       example: "Random Polygon"
   *                     area:
   *                       type: number
   *                       description: Calculated area of the polygon in square kilometers
   *                       example: 85.2
   *                     description:
   *                       type: string
   *                       example: "A randomly generated polygon within the provided area."
   *                     created_at:
   *                       type: string
   *                       format: date-time
   *                       example: "2024-12-01T16:00:00Z"
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

  "POST /feature/polygon/random/properties": WithinRandomPolygonWithProperties,
};
