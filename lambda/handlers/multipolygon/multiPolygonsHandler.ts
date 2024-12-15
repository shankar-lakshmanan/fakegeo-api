
import { featureCollectionMultiPolygonsRoutes } from "../../routers/multipolygon/featureCollectionMultiPolygonsRoutes";
import { router } from "../../routers/router";

exports.handler = async (event: any) => {
  return router(event, featureCollectionMultiPolygonsRoutes);
};
