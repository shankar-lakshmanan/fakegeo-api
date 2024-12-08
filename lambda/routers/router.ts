// router.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { featurePointRoutes } from "./featurePointRoutes";
import { featureLineRoutes } from "./featureLineRoutes";
import { featurePolygonRoutes } from "./featurePolygonRoutes";
import { featureCollectionPointsRoutes } from "./featureCollectionPointsRoutes";
import { featureCollectionLinesRoutes } from "./featureCollectionLinesRoutes";
import { featureCollectionPolygonsRoutes } from "./featureCollectionPolygonsRoutes";
import { featureMultiPointRoutes } from "./featureMultiPointRoutes";
import { featureCollectionMultiPointsRoutes } from "./featureCollectionMultiPointsRoutes";
import { featureMultiLineRoutes } from "./featureMultiLineRoutes";
import { featureCollectionMultiLinesRoutes } from "./featureCollectionMultiLinesRoutes";
import { featureMultiPolygonRoutes } from "./featureMultiPolygonRoutes";
import { featureCollectionMultiPolygonsRoutes } from "./featureCollectionMultiPolygonsRoutes";

const routes: Record<string, Function> = {
  ...featurePointRoutes,
  ...featureLineRoutes,
  ...featurePolygonRoutes,
  ...featureCollectionPointsRoutes,
  ...featureCollectionLinesRoutes,
  ...featureCollectionPolygonsRoutes,
  ...featureMultiPointRoutes,
  ...featureCollectionMultiPointsRoutes,
  ...featureMultiLineRoutes,
  ...featureCollectionMultiLinesRoutes,
  ...featureMultiPolygonRoutes,
  ...featureCollectionMultiPolygonsRoutes,
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
