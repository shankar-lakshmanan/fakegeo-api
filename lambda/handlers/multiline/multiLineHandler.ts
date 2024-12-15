import { featureMultiLineRoutes } from "../../routers/multiline/featureMultiLineRoutes";
import { router } from "../../routers/router";

exports.handler = async (event: any) => {
  return router(event, featureMultiLineRoutes);
};
