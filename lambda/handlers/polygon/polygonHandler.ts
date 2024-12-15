import { featurePolygonRoutes } from "../../routers/polygon/featurePolygonRoutes";
import { router } from "../../routers/router";

exports.handler = async (event: any) => {
  return router(event, featurePolygonRoutes);
};
