import * as turf from "@turf/turf";
import { GetOkResponse, OkResponse } from "../../util/stringify";

export function RandomLine(
  ): OkResponse {
    const line = turf.randomLineString(1, { bbox: [-180, -90, 180, 90] });
    return GetOkResponse(line.features[0]);
  }