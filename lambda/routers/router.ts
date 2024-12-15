// router.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const router = async (
  event: APIGatewayProxyEvent,
  routes: Record<string, Function>,
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