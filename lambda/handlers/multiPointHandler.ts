import { featureMultiPointRoutes } from "../routers/featureMultiPointRoutes";
import { router } from "../routers/router";

exports.handler = async (event: any) => {
  return router(event, featureMultiPointRoutes);
};
