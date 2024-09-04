// router.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Point } from "../functions/point/point";

const routes: Record<string, Function> = {
    "GET /fakegeo": async (): Promise<APIGatewayProxyResult> => ({
        statusCode: 200,
        body: JSON.stringify({ message: "Hello, FakeGeo!" }),
    }),
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
