
import { featureCollectionPointsRoutes } from "../../routers/point/featureCollectionPointsRoutes";
import { router } from "../../routers/router";

exports.handler = async (event: any) => {
  return router(event, featureCollectionPointsRoutes);
};
