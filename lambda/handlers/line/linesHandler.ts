import { featureCollectionLinesRoutes } from "../../routers/line/featureCollectionLinesRoutes";
import { router } from "../../routers/router";

exports.handler = async (event: any) => {
  return router(event, featureCollectionLinesRoutes);
};
