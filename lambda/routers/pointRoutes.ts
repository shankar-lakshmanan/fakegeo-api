import { Point } from "../functions/point/point";
import { RandomPoint } from "../functions/point/randomPoint";

export const pointRoutes: Record<string, Function> = {
    /**
    * @openapi
    * /point:
    *   get:
    *     tags:
    *       - point
    *     summary: Returns a point
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
   "GET /point": Point,
   
   /**
    * @openapi
    * /point/random:
    *   get:
    *     tags:
    *       - point
    *     summary: Returns a random point
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
       "GET /point/random": RandomPoint}