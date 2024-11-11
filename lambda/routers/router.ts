// router.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { fakeGeoRoutes } from "./fakeGeoRoutes";
import { featurePointRoutes } from "./featurePointRoutes";
import { featureLineRoutes } from "./featureLineRoutes";
import { featurePolygonRoutes } from "./featurePolygonRoutes";
import { featureCollectionPointsRoutes } from "./featureCollectionPointsRoutes";
import { featureCollectionLinesRoutes } from "./featureCollectionLinesRoutes";
import { featureCollectionPolygonsRoutes } from "./featureCollectionPolygonsRoutes";

const routes: Record<string, Function> = {
  ...fakeGeoRoutes,
  ...featurePointRoutes,
  ...featureLineRoutes,
  ...featurePolygonRoutes,
  ...featureCollectionPointsRoutes,
  ...featureCollectionLinesRoutes,
  ...featureCollectionPolygonsRoutes,
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
