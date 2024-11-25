import {
  Point,
  RandomPoint,
  WithinPoint,
  WithinRandomPoint,
  PointWithProperties,
  RandomPointWithProperties,
  WithinPointWithProperties,
  WithinRandomPointWithProperties,
} from "../functions/point/point";

export const featurePointRoutes: Record<string, Function> = {
  /**
   * @openapi
   * /feature/point:
   *   get:
   *     tags:
   *       - Point feature
   *     summary: Returns a point geojson Feature
   *     description: Generates a geographical point.
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
   *                       example: Point
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: number
   *                       example: [-101.278818, 40.816337]
   */

  "GET /feature/point": Point,

  /**
   * @openapi
   * /feature/point/properties:
   *   get:
   *     tags:
   *       - Point feature
   *     summary: Returns a point geojson Feature with random properties
   *     description: Generates a geographical point with random properties added to the feature's properties object.
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
   *                       example: Point
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: number
   *                       example: [-101.278818, 40.816337]
   *                 properties:
   *                   type: object
   *                   additionalProperties:
   *                     type: any
   *                   example:
   *                     name: Random Point
   *                     elevation: 1234
   *                     description: A randomly generated feature with rich properties
   */

  "GET /feature/point/properties": PointWithProperties,

  /**
   * @openapi
   * /feature/point/random:
   *   get:
   *     tags:
   *       - Point feature
   *     summary: Returns a random point geojson Feature
   *     description: Generates a random geographical point.
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
   *                       example: Point
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: number
   *                       example: [-101.278818, 40.816337]
   */

  "GET /feature/point/random": RandomPoint,

  /**
   * @openapi
   * /feature/point/random/properties:
   *   get:
   *     tags:
   *       - Point feature
   *     summary: Returns a random point geojson Feature with random properties
   *     description: Generates a random geographical point with additional random properties.
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
   *                       example: Point
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: number
   *                       example: [-101.278818, 40.816337]
   *                 properties:
   *                   type: object
   *                   additionalProperties:
   *                     type: any
   *                   example:
   *                     category: Random Data
   *                     elevation: 4567
   *                     info: Additional details
   */

  "GET /feature/point/random/properties": RandomPointWithProperties,

  /**
   * @openapi
   * /feature/point:
   *   post:
   *     tags:
   *       - Point feature
   *     summary: Returns a point geojson Feature within a GeoJSON polygon or bbox
   *     description: Accepts a GeoJSON Polygon or a bounding box (bbox) and returns a point within it.
   *     requestBody:
   *       required: false
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               geojsonPolygon:
   *                 type: object
   *                 description: GeoJSON Polygon to return a point within it
   *                 example: { "type": "Polygon", "coordinates": [[[-104, 40], [-99, 36], [-94, 38], [-104, 40]]] }
   *               bbox:
   *                 type: array
   *                 items:
   *                   type: number
   *                 description: Bounding box in [minX, minY, maxX, maxY] format
   *                 example: [-104, 36, -94, 41]
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
   *                       example: Point
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: number
   *                       example: [-99.5, 38.2]
   */

  "POST /feature/point": WithinPoint,

  /**
   * @openapi
   * /feature/point/properties:
   *   post:
   *     tags:
   *       - Point feature
   *     summary: Returns a point geojson Feature within a GeoJSON polygon or bbox with random properties
   *     description: Accepts a GeoJSON Polygon or a bounding box (bbox) and returns a point within it, including additional random properties.
   *     requestBody:
   *       required: false
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               geojsonPolygon:
   *                 type: object
   *                 description: GeoJSON Polygon to return a point within it
   *                 example: { "type": "Polygon", "coordinates": [[[-104, 40], [-99, 36], [-94, 38], [-104, 40]]] }
   *               bbox:
   *                 type: array
   *                 items:
   *                   type: number
   *                 description: Bounding box in [minX, minY, maxX, maxY] format
   *                 example: [-104, 36, -94, 41]
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
   *                       example: Point
   *                     coordinates:
   *                       type: array
   *                       items:
   *                         type: number
   *                       example: [-99.5, 38.2]
   *                 properties:
   *                   type: object
   *                   additionalProperties:
   *                     type: any
   *                   example:
   *                     category: Random Data
   *                     elevation: 567
   *                     description: Polygon-based random data
   */

  "POST /feature/point/properties": WithinPointWithProperties,

    /**
     * @openapi
     * /feature/point/random:
     *   post:
     *     tags:
     *       - Point feature
     *     summary: Returns a random point geojson Feature within a GeoJSON polygon or bbox
     *     description: Accepts a GeoJSON Polygon or a bounding box (bbox) and returns a random point within it.
     *     requestBody:
     *       required: false
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               geojsonPolygon:
     *                 type: object
     *                 description: GeoJSON Polygon to return a random point within it
     *                 example: { "type": "Polygon", "coordinates": [[[-104, 40], [-99, 36], [-94, 38], [-104, 40]]] }
     *               bbox:
     *                 type: array
     *                 items:
     *                   type: number
     *                 description: Bounding box in [minX, minY, maxX, maxY] format
     *                 example: [-104, 36, -94, 41]
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
     *                       example: Point
     *                     coordinates:
     *                       type: array
     *                       items:
     *                         type: number
     *                       example: [-99.5, 38.2]
     */
  
    "POST /feature/point/random": WithinRandomPoint,
  
    /**
     * @openapi
     * /feature/point/random/properties:
     *   post:
     *     tags:
     *       - Point feature
     *     summary: Returns a random point geojson Feature within a GeoJSON polygon or bbox with random properties
     *     description: Accepts a GeoJSON Polygon or a bounding box (bbox) and generates a random point within it, including additional random properties.
     *     requestBody:
     *       required: false
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               geojsonPolygon:
     *                 type: object
     *                 description: GeoJSON Polygon to return a random point within it
     *                 example: { "type": "Polygon", "coordinates": [[[-104, 40], [-99, 36], [-94, 38], [-104, 40]]] }
     *               bbox:
     *                 type: array
     *                 items:
     *                   type: number
     *                 description: Bounding box in [minX, minY, maxX, maxY] format
     *                 example: [-104, 36, -94, 41]
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
     *                       example: Point
     *                     coordinates:
     *                       type: array
     *                       items:
     *                         type: number
     *                       example: [-99.5, 38.2]
     *                 properties:
     *                   type: object
     *                   additionalProperties:
     *                     type: any
     *                   example:
     *                     randomProperty: Random Value
     *                     category: Example Data
     *                     description: Detailed random property
     */
  
    "POST /feature/point/random/properties": WithinRandomPointWithProperties,
  
  
};
