import * as turf from "@turf/turf";
import {
  Feature,
  Geometry,
  Point,
  FeatureCollection,
  MultiLineString,
  LineString,
} from "geojson";

import { APIGatewayProxyResult } from "aws-lambda";
import {
  BadRequestErrorResponse,
  GetBadRequestErrorResponse,
  GetInternalServerErrorResponse,
  GetOkResponse,
  OkResponse,
} from "../../util/stringify";
import { thousandLines } from "./thousandLines";
import { booleanWithin } from "@turf/turf";
import {
  populateGeoJsonFeatureCollectionWithProperties,
  populateGeoJsonFeatureWithProperties,
} from "../properties/properties";

function LineOrLineWithProperties(withProperties: boolean) {
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

export function Line(): OkResponse {
  return GetOkResponse(LineOrLineWithProperties(false));
}

export function LineWithProperties(): OkResponse {
  return GetOkResponse(LineOrLineWithProperties(true));
}

function RandomLineOrLineWithProperties(withProperties: boolean) {
  const line = turf.randomLineString(1, { bbox: [-180, -90, 180, 90] })
    .features[0];
  if (withProperties) {
    const lineWithProperties = populateGeoJsonFeatureWithProperties(line);
    return lineWithProperties;
  }
  return line;
}

export function RandomLine(): OkResponse {
  return GetOkResponse(RandomLineOrLineWithProperties(false));
}

export function RandomLineWithProperties(): OkResponse {
  return GetOkResponse(RandomLineOrLineWithProperties(true));
}

/**
 * Validate if a GeoJSON object is a polygon feature.
 */
export function isGeoJSONPolygon(geojson: Feature): boolean {
  return (
    geojson.type === "Feature" &&
    geojson.geometry &&
    geojson.geometry.type === "Polygon"
  );
}

/**
 * Validate if the bbox is a valid bounding box (array of four numbers).
 */
export function isValidBBox(bbox: any): boolean {
  return (
    Array.isArray(bbox) &&
    bbox.length === 4 &&
    bbox.every((coord) => typeof coord === "number")
  );
}

function WithinLineOrWithinLineWithProperties(
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

/**
 * Validates the input and returns a LineString at the center of a GeoJSON polygon or bbox.
 */
export function WithinLine(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");
  try {
    const result = WithinLineOrWithinLineWithProperties(
      body,
      false
    );
    if (result && "error" in result) {
      // result is a BadRequestErrorResponse
      return result as BadRequestErrorResponse;
    } else {
      // result is a Feature<LineString, GeoJsonProperties>
      return GetOkResponse(result);
    }
  } catch (error: any) {
    return GetInternalServerErrorResponse(
      `Error processing input: ${error.message}`
    );
  }
}

export function WithinLineWithProperties(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");
  try {
    const result = WithinLineOrWithinLineWithProperties(
      body,
      true
    );
    if (result && "error" in result) {
      // result is a BadRequestErrorResponse
      return result as BadRequestErrorResponse;
    } else {
      // result is a Feature<LineString, GeoJsonProperties>
      return GetOkResponse(result);
    }
  } catch (error: any) {
    return GetInternalServerErrorResponse(
      `Error processing input: ${error.message}`
    );
  }
}

function WithinRandomLineOrWithinRandomLineWithProperties(
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

/**
 * Validates the input and returns a random LineString at the center of a GeoJSON polygon or bbox.
 */
export function WithinRandomLine(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");
  try {
    const result = WithinRandomLineOrWithinRandomLineWithProperties(
      body,
      false
    );
    if ("error" in result) {
      // result is a BadRequestErrorResponse
      return result as BadRequestErrorResponse;
    } else {
      // result is a Feature<LineString, GeoJsonProperties>
      return GetOkResponse(result);
    }
  } catch (error: any) {
    return GetInternalServerErrorResponse(
      `Error processing input: ${error.message}`
    );
  }
}

export function WithinRandomLineWithProperties(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");
  try {
    const result = WithinRandomLineOrWithinRandomLineWithProperties(body, true);
    if ("error" in result) {
      // result is a BadRequestErrorResponse
      return result as BadRequestErrorResponse;
    } else {
      // result is a Feature<LineString, GeoJsonProperties>
      return GetOkResponse(result);
    }
  } catch (error: any) {
    return GetInternalServerErrorResponse(
      `Error processing input: ${error.message}`
    );
  }
}

function LinesOrLinesWithProperties(withProperties: boolean) {
  const lines: FeatureCollection = thousandLines;
  const thirtyLines = lines.features.slice(970);
  const reducedLines: FeatureCollection = {
    ...lines,
    features: [...thirtyLines],
  };

  if (withProperties) {
    const lineWithProperties =
      populateGeoJsonFeatureCollectionWithProperties(reducedLines);
    return lineWithProperties;
  }
  return reducedLines;
}

export function Lines(): OkResponse {
  return GetOkResponse(LinesOrLinesWithProperties(false));
}

export function LinesWithProperties(): OkResponse {
  return GetOkResponse(LinesOrLinesWithProperties(true));
}

function LinesLimitAndWithinOrLinesLimitAndWithinWithProperties(
  body: any,
  withProperties: boolean
) {
  const { limit, geojsonPolygon, bbox } = body;

  let lines: FeatureCollection = thousandLines;
  let finalLines: FeatureCollection;

  if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {
    const filteredLines = lines.features.filter((feature) => {
      return (
        feature.geometry.type === "LineString" &&
        booleanWithin(feature.geometry, geojsonPolygon)
      );
    });
    lines = turf.featureCollection(filteredLines);
  } else if (bbox && isValidBBox(bbox)) {
    const bboxPolygonGeometry = turf.bboxPolygon(bbox);
    const filteredLines = lines.features.filter((feature) => {
      return (
        feature.geometry.type === "LineString" &&
        booleanWithin(feature.geometry, bboxPolygonGeometry)
      );
    });
    lines = turf.featureCollection(filteredLines);
  }

  if (limit) {
    if (lines.features.length <= limit) {
      finalLines = lines;
    } else if (limit < 1000) {
      const limitedLines = lines.features.slice(0, limit);
      finalLines = {
        ...lines,
        features: limitedLines,
      };
    } else if (limit > 1000) {
      finalLines = lines;
    } else {
      return GetBadRequestErrorResponse(
        "Invalid input. Provide a valid limit number."
      );
    }
  } else {
    finalLines = lines;
  }

  if (withProperties) {
    const finalLinesWithProperties =
      populateGeoJsonFeatureCollectionWithProperties(finalLines);
    return finalLinesWithProperties;
  }

  return finalLines;
}

export function LinesLimitAndWithin(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result = LinesLimitAndWithinOrLinesLimitAndWithinWithProperties(
      body,
      false
    );
    if ("error" in result) {
      // result is a BadRequestErrorResponse
      return result as BadRequestErrorResponse;
    } else {
      // result is a Feature<LineString, GeoJsonProperties>
      return GetOkResponse(result);
    }
  } catch (error: any) {
    return GetInternalServerErrorResponse(
      `Error processing input: ${error.message}`
    );
  }
}

export function LinesLimitAndWithinWithProperties(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result = LinesLimitAndWithinOrLinesLimitAndWithinWithProperties(
      body,
      true
    );
    if ("error" in result) {
      // result is a BadRequestErrorResponse
      return result as BadRequestErrorResponse;
    } else {
      // result is a Feature<LineString, GeoJsonProperties>
      return GetOkResponse(result);
    }
  } catch (error: any) {
    return GetInternalServerErrorResponse(
      `Error processing input: ${error.message}`
    );
  }
}

function RandomLinesOrRandomLinesWithProperties(withProperties: boolean) {
  const thirtyLines: FeatureCollection = turf.randomLineString(30, {
    bbox: [-180, -90, 180, 90],
  });

  if (withProperties) {
    const linesWithProperties =
      populateGeoJsonFeatureCollectionWithProperties(thirtyLines);
    return linesWithProperties;
  }

  return thirtyLines;
}

export function RandomLines(): OkResponse {
  return GetOkResponse(RandomLinesOrRandomLinesWithProperties(false));
}

export function RandomLinesWithProperties(): OkResponse {
  return GetOkResponse(RandomLinesOrRandomLinesWithProperties(true));
}

function RandomLinesLimitAndWithinOrRandomLinesLimitAndWithinWithProperties(
  body: any,
  withProperties: boolean
) {
  const { limit, geojsonPolygon, bbox } = body;

  let lines: FeatureCollection = { features: [], type: "FeatureCollection" };
  let finalLines: FeatureCollection;

  if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {
    const bboxPoly = turf.bbox(geojsonPolygon);
    lines = turf.randomLineString(1000, { bbox: bboxPoly });
  } else if (bbox && isValidBBox(bbox)) {
    lines = turf.randomLineString(1000, { bbox: bbox });
  }

  if (limit) {
    if (lines.features.length <= limit) {
      finalLines = lines;
    } else if (limit < 1000) {
      const limitedLines = lines.features.slice(0, limit);
      finalLines = {
        ...lines,
        features: limitedLines,
      };
    } else if (limit > 1000) {
      finalLines = lines;
    } else {
      return GetBadRequestErrorResponse(
        "Invalid input. Provide a valid limit number."
      );
    }
  } else {
    finalLines = lines;
  }

  if (withProperties) {
    const finalLinesWithProperties =
      populateGeoJsonFeatureCollectionWithProperties(finalLines);
    return finalLinesWithProperties;
  }

  return finalLines;
}

export function RandomLinesLimitAndWithin(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");
  try {
    const result =
      RandomLinesLimitAndWithinOrRandomLinesLimitAndWithinWithProperties(
        body,
        false
      );
    if ("error" in result) {
      // result is a BadRequestErrorResponse
      return result as BadRequestErrorResponse;
    } else {
      // result is a Feature<LineString, GeoJsonProperties>
      return GetOkResponse(result);
    }
  } catch (error: any) {
    return GetInternalServerErrorResponse(
      `Error processing input: ${error.message}`
    );
  }
}

export function RandomLinesLimitAndWithinWithProperties(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");
  try {
    const result =
      RandomLinesLimitAndWithinOrRandomLinesLimitAndWithinWithProperties(
        body,
        true
      );
    if ("error" in result) {
      // result is a BadRequestErrorResponse
      return result as BadRequestErrorResponse;
    } else {
      // result is a Feature<LineString, GeoJsonProperties>
      return GetOkResponse(result);
    }
  } catch (error: any) {
    return GetInternalServerErrorResponse(
      `Error processing input: ${error.message}`
    );
  }
}
