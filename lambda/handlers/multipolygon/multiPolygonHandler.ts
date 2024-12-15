import { featureMultiPolygonRoutes } from "../../routers/multipolygon/featureMultiPolygonRoutes";
import { router } from "../../routers/router";

exports.handler = async (event: any) => {
  return router(event, featureMultiPolygonRoutes);
};
