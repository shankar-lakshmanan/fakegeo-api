import { featureMultiPolygonRoutes } from "../routers/featureMultiPolygonRoutes";
import { router } from "../routers/router";

exports.handler = async (event: any) => {
  return router(event, featureMultiPolygonRoutes);
};
