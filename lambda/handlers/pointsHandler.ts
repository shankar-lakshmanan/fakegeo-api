import { featureCollectionPointsRoutes } from "../routers/featureCollectionPointsRoutes";
import { router } from "../routers/router";

exports.handler = async (event: any) => {
  return router(event, featureCollectionPointsRoutes);
};
