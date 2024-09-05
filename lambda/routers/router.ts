// router.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Point } from "../functions/point/point";

const routes: Record<string, Function> = {
    /**
     * @openapi
     * /fakegeo:
     *   get:
     *     summary: Returns a greeting message
     *     description: Returns a simple hello message from the FakeGeo API.
     *     responses:
     *       200:
     *         description: A successful response
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: Hello, FakeGeo!
     */
    "GET /fakegeo": async (): Promise<APIGatewayProxyResult> => ({
        statusCode: 200,
        body: JSON.stringify({ message: "Hello, FakeGeo!" }),
    }),

    /**
     * @openapi
     * /point:
     *   get:
     *     summary: Returns a random point
     *     description: Generates a random geographical point using the Turf.js library.
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
     *                   example: FeatureCollection
     *                 features:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       geometry:
     *                         type: object
     *                         properties:
     *                           coordinates:
     *                             type: array
     *                             items:
     *                               type: number
     *                             example: [-101.278818, 40.816337]
     */
    "GET /point": Point,
    // Add more routes here
};

export const router = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    const key = `${event.httpMethod} ${event.path}`;
    const route = routes[key];

    if (route) {
        return route(event);
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: "Not Found" }),
        };
    }
};
