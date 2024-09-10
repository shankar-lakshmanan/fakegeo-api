import { Point } from "../functions/point/point";
import { RandomPoint } from "../functions/point/randomPoint";
import { WithinPoint } from "../functions/point/withinPoint";
import { WithinRandomPoint } from "../functions/point/withinRandomPoint";

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
 *                 description: Bounding box in the format [minX, minY, maxX, maxY] to return a point within it
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
 *                       example: Point
 *                     coordinates:
 *                       type: array
 *                       items:
 *                         type: number
 *                       example: [-99.40157045143154, 39.19210754121596]
 */

  "POST /feature/point": WithinPoint,

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
 *                 description: Bounding box in the format [minX, minY, maxX, maxY] to return a random point within it
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
 *                       example: Point
 *                     coordinates:
 *                       type: array
 *                       items:
 *                         type: number
 *                       example: []
 */
  "POST /feature/point/random": WithinRandomPoint,
};
