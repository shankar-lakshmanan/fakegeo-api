import * as turf from "@turf/turf";
import { Feature, Point } from "geojson";
import { GetBadRequestErrorResponse } from "../../util/stringify";
import { populateGeoJsonFeatureWithProperties } from "../properties/properties";
import { isGeoJSONPolygon, isValidBBox } from "../../util/geojsonHelper";

export function MultiLineOrMultiLineWithProperties(withProperties: boolean) {
  const multiLine = turf.multiLineString([
    [
      [-98.46358188123595, 38.16839367133355],
      [-98.0095425039122, 38.6109019399903],
      [-97.5063234325582, 38.192492088530855],
      [-96.76369691515532, 38.668456803745556],
    ],
    [
      [-100.46358188123595, 38.16839367133355],
      [-100.0095425039122, 38.6109019399903],
      [-99.5063234325582, 38.192492088530855],
      [-98.76369691515532, 38.668456803745556],
    ],
  ]);

  if (withProperties) {
    const multiLineWithProperties =
      populateGeoJsonFeatureWithProperties(multiLine);
    return multiLineWithProperties;
  }
  return multiLine;
}

export function RandomMultiLineOrRandomMultiLineWithProperties(
  withProperties: boolean
) {
  const multiLine = turf.randomLineString(2, { bbox: [-180, -90, 180, 90] });
  const multiLineString = turf.multiLineString(
    multiLine.features.map((f) => f.geometry.coordinates)
  );

  if (withProperties) {
    const multiLineWithProperties =
      populateGeoJsonFeatureWithProperties(multiLineString);
    return multiLineWithProperties;
  }
  return multiLineString;
}

export function WithinMultiLineOrWithinMultiLineWithProperties(
  body: any,
  withProperties: boolean
) {
  let multiLineString;
  const { geojsonPolygon, bbox } = body;

  if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {
    const bboxPolygon = turf.bboxPolygon(turf.bbox(geojsonPolygon));
    const bboxCenter = turf.center(bboxPolygon);
    const leftPoint = turf.destination(bboxCenter, 0.1, -45);
    const rightPoint = turf.destination(bboxCenter, 0.1, 45);

    multiLineString = turf.multiLineString([
      [leftPoint.geometry.coordinates, bboxCenter.geometry.coordinates],
      [bboxCenter.geometry.coordinates, rightPoint.geometry.coordinates],
    ]);
  } else if (bbox && isValidBBox(bbox)) {
    const bboxPolygon = turf.bboxPolygon(bbox);
    const bboxCenter = turf.center(bboxPolygon);
    const leftPoint = turf.destination(bboxCenter, 0.1, -45);
    const rightPoint = turf.destination(bboxCenter, 0.1, 45);

    multiLineString = turf.multiLineString([
      [leftPoint.geometry.coordinates, bboxCenter.geometry.coordinates],
      [bboxCenter.geometry.coordinates, rightPoint.geometry.coordinates],
    ]);
  } else {
    return GetBadRequestErrorResponse(
      "Invalid input. Provide either a valid GeoJSON polygon or a bbox."
    );
  }

  if (withProperties) {
    const multiLineWithProperties =
      populateGeoJsonFeatureWithProperties(multiLineString);
    return multiLineWithProperties;
  }

  return multiLineString;
}

export function WithinRandomMultiLineOrWithinRandomMultiLineWithProperties(
  body: any,
  withProperties: boolean
) {
  let multiLineString;

  const { geojsonPolygon, bbox } = body;

  if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {
    const randomPointsOfBboxOfPolygon = turf.randomPoint(50, {
      bbox: turf.bbox(geojsonPolygon),
    });

    let bboxRandomPoint: Feature<Point> = {
      type: "Feature",
      geometry: {
        coordinates: [],
        type: "Point",
      },
      properties: {},
    };
    randomPointsOfBboxOfPolygon.features.forEach((point: Feature<Point>) => {
      if (turf.booleanWithin(point, geojsonPolygon)) {
        bboxRandomPoint = point;
        return;
      }
    });

    // Generate multiple line segments around the center point.
    const lines = Array.from({ length: 5 }, (_, i) => {
      const angle = i * 72; // Spread points at equal angles (5 lines around 360 degrees)
      const start = turf.destination(bboxRandomPoint, 0.1, angle - 45); // Left
      const end = turf.destination(bboxRandomPoint, 0.1, angle + 45); // Right
      return [
        start.geometry.coordinates,
        bboxRandomPoint.geometry.coordinates,
        end.geometry.coordinates,
      ];
    });

    multiLineString = {
      type: "Feature",
      geometry: {
        type: "MultiLineString",
        coordinates: lines,
      },
      properties: {},
    };
  } else if (bbox && isValidBBox(bbox)) {
    const point = turf.randomPoint(1, { bbox }).features[0];

    const lines = Array.from({ length: 5 }, (_, i) => {
      const angle = i * 72;
      const start = turf.destination(point, 0.1, angle - 45); // Left
      const end = turf.destination(point, 0.1, angle + 45); // Right
      return [
        start.geometry.coordinates,
        point.geometry.coordinates,
        end.geometry.coordinates,
      ];
    });

    multiLineString = {
      type: "Feature",
      geometry: {
        type: "MultiLineString",
        coordinates: lines,
      },
      properties: {},
    };
  } else {
    return GetBadRequestErrorResponse(
      "Invalid input. Provide either a valid GeoJSON polygon or a bbox."
    );
  }

  if (withProperties) {
    const multiLineWithProperties = populateGeoJsonFeatureWithProperties(
      multiLineString as Feature
    );
    return multiLineWithProperties;
  }

  return multiLineString;
}
