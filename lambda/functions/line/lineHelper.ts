import * as turf from "@turf/turf";
import { populateGeoJsonFeatureWithProperties } from "../properties/properties";
import { isGeoJSONPolygon, isValidBBox } from "../../util/geojsonHelper";
import { GetBadRequestErrorResponse } from "../../util/stringify";
import { Feature, Point } from "geojson";

export function LineOrLineWithProperties(withProperties: boolean) {
  const line = turf.lineString([
    [-98.46358188123595, 38.16839367133355],
    [-98.0095425039122, 38.6109019399903],
    [-97.5063234325582, 38.192492088530855],
    [-96.76369691515532, 38.668456803745556],
  ]);

  if (withProperties) {
    const lineWithProperties = populateGeoJsonFeatureWithProperties(line);
    return lineWithProperties;
  }
  return line;
}

export function RandomLineOrLineWithProperties(withProperties: boolean) {
  const line = turf.randomLineString(1, { bbox: [-180, -90, 180, 90] })
    .features[0];
  if (withProperties) {
    const lineWithProperties = populateGeoJsonFeatureWithProperties(line);
    return lineWithProperties;
  }
  return line;
}

export function WithinLineOrWithinLineWithProperties(
  body: any,
  withProperties: boolean
) {
  let lineString;
  const { geojsonPolygon, bbox } = body;

  // Check if geojsonPolygon is valid
  if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {
    // Create a line based on the center of the polygon and the bounding box of the polygon
    const bboxPolygon = turf.bboxPolygon(turf.bbox(geojsonPolygon));
    const bboxCenter = turf.center(bboxPolygon);

    // Calculate points to the left and right of the center point.
    const leftPoint = turf.destination(bboxCenter, 0.1, -45); // Left
    const rightPoint = turf.destination(bboxCenter, 0.1, 45); // Right

    lineString = turf.lineString([
      leftPoint.geometry.coordinates,
      bboxCenter.geometry.coordinates,
      rightPoint.geometry.coordinates,
    ]);
    // lineString.geometry.coordinates[1][1] = lineString.geometry.coordinates[1][1] -0.015437038004
  }
  // Check if bbox is valid
  else if (bbox && isValidBBox(bbox)) {
    const bboxPolygon = turf.bboxPolygon(bbox);
    const bboxCenter = turf.center(bboxPolygon);

    // Calculate points to the left and right of the center point.
    const leftPoint = turf.destination(bboxCenter, 0.1, -45); // Left
    const rightPoint = turf.destination(bboxCenter, 0.1, 45); // Right

    lineString = turf.lineString([
      leftPoint.geometry.coordinates,
      bboxCenter.geometry.coordinates,
      rightPoint.geometry.coordinates,
    ]);
  } else {
    return GetBadRequestErrorResponse(
      "Invalid input. Provide either a valid GeoJSON polygon or a bbox."
    );
  }

  if (withProperties) {
    const lineWithProperties = populateGeoJsonFeatureWithProperties(lineString);
    return lineWithProperties;
  }

  return lineString;
}

export function WithinRandomLineOrWithinRandomLineWithProperties(
  body: any,
  withProperties: boolean
) {
  let lineString;

  const { geojsonPolygon, bbox } = body;

  // Check if geojsonPolygon is valid
  if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {
    const randomPointsOfBboxOfPolygon = turf.randomPoint(50, {
      bbox: turf.bbox(geojsonPolygon),
    });

    let bboxRandomPoint: Feature<Point, any> = {
      type: "Feature",
      geometry: {
        coordinates: [],
        type: "Point",
      },
      properties: undefined,
    };
    randomPointsOfBboxOfPolygon.features.forEach(
      (point: Feature<Point, any>) => {
        if (turf.booleanWithin(point, geojsonPolygon)) {
          bboxRandomPoint = point;
          return;
        }
      }
    );

    // Calculate points to the left and right of the center point.
    const leftPoint = turf.destination(bboxRandomPoint, 0.1, -45); // Left
    const rightPoint = turf.destination(bboxRandomPoint, 0.1, 45); // Right

    lineString = turf.lineString([
      leftPoint.geometry.coordinates,
      bboxRandomPoint.geometry.coordinates,
      rightPoint.geometry.coordinates,
    ]);
  }
  // Check if bbox is valid
  else if (bbox && isValidBBox(bbox)) {
    // Return the center which is always within the polygon
    const point = turf.randomPoint(1, { bbox: bbox }).features[0];

    // Calculate points to the left and right of the center point.
    const leftPoint = turf.destination(point, 0.1, -45); // Left
    const rightPoint = turf.destination(point, 0.1, 45); // Right

    lineString = turf.lineString([
      leftPoint.geometry.coordinates,
      point.geometry.coordinates,
      rightPoint.geometry.coordinates,
    ]);
  } else {
    return GetBadRequestErrorResponse(
      "Invalid input. Provide either a valid GeoJSON polygon or a bbox."
    );
  }

  if (withProperties) {
    const lineWithProperties = populateGeoJsonFeatureWithProperties(lineString);
    return lineWithProperties;
  }

  return lineString;
}
