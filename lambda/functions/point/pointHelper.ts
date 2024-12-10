import * as turf from "@turf/turf";
import { isGeoJSONPolygon, isValidBBox } from "../../util/geojsonHelper";
import { GetBadRequestErrorResponse } from "../../util/stringify";
import { populateGeoJsonFeatureWithProperties } from "../properties/properties";

export function PointOrPointWithProperties(withProperties: boolean) {
  const point = turf.point([-101.278818, 40.816337]);

  if (withProperties) {
    const pointWithProperties = populateGeoJsonFeatureWithProperties(point);
    return pointWithProperties;
  }
  return point;
}

export function RandomPointOrRandomPointWithProperties(
  withProperties: boolean
) {
  const point = turf.randomPoint(1, { bbox: [-180, -90, 180, 90] }).features[0];

  if (withProperties) {
    const pointWithProperties = populateGeoJsonFeatureWithProperties(point);
    return pointWithProperties;
  }
  return point;
}

export function WithinPointOrWithinPointWithProperties(
  body: any,
  withProperties: boolean
) {
  let point;

  const { geojsonPolygon, bbox } = body;

  // Check if geojsonPolygon is valid
  if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {
    // Return the center which is always within the polygon
    point = turf.center(geojsonPolygon);
  }
  // Check if bbox is valid
  else if (bbox && isValidBBox(bbox)) {
    const bboxPolygon = turf.bboxPolygon(bbox);
    // Return the center which is always within the polygon
    point = turf.center(bboxPolygon);
  } else {
    return GetBadRequestErrorResponse(
      "Invalid input. Provide either a valid GeoJSON polygon or a bbox."
    );
  }

  if (withProperties) {
    const pointWithProperties = populateGeoJsonFeatureWithProperties(point);
    return pointWithProperties;
  }

  return point;
}

export function WithinRandomPointOrWithinRandomPointWithProperties(
  body: any,
  withProperties: boolean
) {
  let point;

  const { geojsonPolygon, bbox } = body;

  // Check if geojsonPolygon is valid
  if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {
    const bboxOfPolygon = turf.bbox(geojsonPolygon);
    const randomPointsOfBboxOfPolygon = turf.randomPoint(50, {
      bbox: bboxOfPolygon,
    });

    let randomPoint;
    randomPointsOfBboxOfPolygon.features.forEach((point) => {
      if (turf.booleanWithin(point, geojsonPolygon)) {
        randomPoint = point;
        return;
      }
    });

    // Return the center which is always within the polygon
    point = randomPoint;
  }
  // Check if bbox is valid
  else if (bbox && isValidBBox(bbox)) {
    // Return the center which is always within the polygon
    point = turf.randomPoint(1, { bbox: bbox }).features[0];
  } else {
    return GetBadRequestErrorResponse(
      "Invalid input. Provide either a valid GeoJSON polygon or a bbox."
    );
  }

  if (point && withProperties) {
    const pointWithProperties = populateGeoJsonFeatureWithProperties(point);
    return pointWithProperties;
  }

  return point;
}
