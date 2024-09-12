import * as turf from "@turf/turf";
import { GetOkResponse, OkResponse } from "../../util/stringify";

export function Line(
  ): OkResponse {
    const line = turf.lineString(
      [
        [
          -98.46358188123595,
          38.16839367133355
        ],
        [
          -98.0095425039122,
          38.6109019399903
        ],
        [
          -97.5063234325582,
          38.192492088530855
        ],
        [
          -96.76369691515532,
          38.668456803745556
        ]
      ]
    );
    return GetOkResponse(line);
  }