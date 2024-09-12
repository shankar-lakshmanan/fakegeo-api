import * as turf from "@turf/turf";
import { GetOkResponse, OkResponse } from "../../util/stringify";

export function RandomLine(
  ): OkResponse {
    const point = turf.randomLineString(1, { bbox: [-180, -90, 180, 90] });
    return GetOkResponse(point.features[0]);
  }