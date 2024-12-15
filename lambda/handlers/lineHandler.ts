import { featureLineRoutes } from "../routers/featureLineRoutes";
import { router } from "../routers/router";

exports.handler = async (event: any) => {
  return router(event, featureLineRoutes);
};
