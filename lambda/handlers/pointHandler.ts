import { featurePointRoutes } from "../routers/featurePointRoutes";
import { router } from "../routers/router";

exports.handler = async (event: any) => {
  return router(event, featurePointRoutes);
};
