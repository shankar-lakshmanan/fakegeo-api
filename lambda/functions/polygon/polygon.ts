import * as turf from "@turf/turf";
import { GetOkResponse, OkResponse } from "../../util/stringify";

export function Polygon(
  ): OkResponse {
    const polygon = turf.polygon(
      [
        [
          [
            -98.41003457659247,
            39.4047785977163
          ],
          [
            -98.02900405028468,
            39.09917828895786
          ],
          [
            -96.96285807131997,
            39.33112358709519
          ],
          [
            -97.70240571181387,
            39.862404027619164
          ],
          [
            -97.89292169019507,
            39.56582676744193
          ],
          [
            -98.18773342170626,
            39.71250430627077
          ],
          [
            -98.41003457659247,
            39.4047785977163
          ]
        ]
      ]
    );
    return GetOkResponse(polygon);
  }