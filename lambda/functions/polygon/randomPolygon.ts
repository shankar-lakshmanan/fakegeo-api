import * as turf from "@turf/turf";
import { GetOkResponse, OkResponse } from "../../util/stringify";

export function RandomPolygon(
  ): OkResponse {
    const polygon = turf.randomPolygon(1, { bbox: [-180, -90, 180, 90] });
    return GetOkResponse(polygon.features[0]);
  }