import { featureMultiPointRoutes } from "../../routers/multipoint/featureMultiPointRoutes";
import { router } from "../../routers/router";

exports.handler = async (event: any) => {
  return router(event, featureMultiPointRoutes);
};
