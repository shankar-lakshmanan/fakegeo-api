import { APIGatewayProxyResult } from "aws-lambda";

export const fakeGeoRoutes: Record<string, Function> = {
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
    })
}