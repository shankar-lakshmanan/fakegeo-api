import { featureLineRoutes } from "../../routers/line/featureLineRoutes";
import { router } from "../../routers/router";

exports.handler = async (event: any) => {
  return router(event, featureLineRoutes);
};
