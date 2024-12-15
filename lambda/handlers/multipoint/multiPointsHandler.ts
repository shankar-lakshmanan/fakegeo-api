import { featureCollectionMultiPointsRoutes } from "../../routers/multipoint/featureCollectionMultiPointsRoutes";
import { router } from "../../routers/router";

exports.handler = async (event: any) => {
  return router(event, featureCollectionMultiPointsRoutes);
};
