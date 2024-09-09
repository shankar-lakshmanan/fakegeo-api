import * as turf from "@turf/turf";
import { GetOkResponse, OkResponse } from "../../util/stringify";

export function Point(
  ): OkResponse {
    const point = turf.point([-101.278818, 40.816337]);
    return GetOkResponse(point);
  }