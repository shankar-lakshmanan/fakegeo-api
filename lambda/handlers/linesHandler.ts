import { featureCollectionLinesRoutes } from "../routers/featureCollectionLinesRoutes";
import { router } from "../routers/router";

exports.handler = async (event: any) => {
  return router(event, featureCollectionLinesRoutes);
};
