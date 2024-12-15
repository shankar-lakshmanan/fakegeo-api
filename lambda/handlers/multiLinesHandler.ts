import { featureCollectionMultiLinesRoutes } from "../routers/featureCollectionMultiLinesRoutes";
import { router } from "../routers/router";

exports.handler = async (event: any) => {
  return router(event, featureCollectionMultiLinesRoutes);
};
