import { featureCollectionMultiLinesRoutes } from "../../routers/multiline/featureCollectionMultiLinesRoutes";
import { router } from "../../routers/router";

exports.handler = async (event: any) => {
  return router(event, featureCollectionMultiLinesRoutes);
};
