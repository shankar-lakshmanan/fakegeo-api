// router.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { pointRoutes } from "./pointRoutes";
import { fakeGeoRoutes } from "./fakeGeoRoutes";
import { featurePointRoutes } from "./featurePointRoutes";
import { lineRoutes } from "./lineRoutes";
import { featureLineRoutes } from "./featureLineRoutes";
import { polygonRoutes } from "./polygonRoutes";
import { featurePolygonRoutes } from "./featurePolygonRoutes";
import { pointsRoutes } from "./pointsRoutes";
import { linesRoutes } from "./linesRoutes";
import { polygonsRoutes } from "./polygonsRoutes";
import { featurePointsRoutes } from "./featurePointsRoutes";
import { featureLinesRoutes } from "./featureLinesRoutes";
import { featurePolygonsRoutes } from "./featurePolygonsRoutes";

const routes: Record<string, Function> = {
  ...fakeGeoRoutes,
  ...pointRoutes,
  ...featurePointRoutes,
  ...lineRoutes,
  ...featureLineRoutes,
  ...polygonRoutes,
  ...featurePolygonRoutes,
  ...pointsRoutes,
  ...linesRoutes,
  ...polygonsRoutes,
  ...featurePointsRoutes,
  ...featureLinesRoutes,
  ...featurePolygonsRoutes,
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
