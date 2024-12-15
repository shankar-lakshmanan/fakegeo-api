import { featurePointRoutes } from "../../routers/point/featurePointRoutes";
import { router } from "../../routers/router";

exports.handler = async (event: any) => {
  return router(event, featurePointRoutes);
};
