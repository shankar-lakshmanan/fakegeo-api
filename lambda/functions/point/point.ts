import * as turf from "@turf/turf";
import { GetOkResponse, OkResponse } from "../../util/stringify";

export function Point(
  ): OkResponse {
    const point = turf.randomPoint(1, { bbox: [-180, -90, 180, 90] });
    return GetOkResponse(point);
  }