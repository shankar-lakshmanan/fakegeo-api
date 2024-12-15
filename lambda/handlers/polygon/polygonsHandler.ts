
import { featureCollectionPolygonsRoutes } from "../../routers/polygon/featureCollectionPolygonsRoutes";
import { router } from "../../routers/router";

exports.handler = async (event: any) => {
  return router(event, featureCollectionPolygonsRoutes);
};
