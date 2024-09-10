// router.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { pointRoutes } from "./pointRoutes";
import { fakeGeoRoutes } from "./fakeGeoRoutes";
import { featurePointRoutes } from "./featurePointRoutes";

const routes: Record<string, Function> = {
  ...fakeGeoRoutes,
  ...pointRoutes,
  ...featurePointRoutes
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
