import * as turf from "@turf/turf";
import { Feature, Geometry } from "geojson";
import { APIGatewayProxyResult } from "aws-lambda";
import { GetBadRequestErrorResponse, GetInternalServerErrorResponse, GetOkResponse, OkResponse } from "../../util/stringify";

/**
 * Validate if a GeoJSON object is a polygon feature.
 */
export function isGeoJSONPolygon(geojson: Feature): boolean {
  return geojson.type === "Feature" && geojson.geometry && geojson.geometry.type === "Polygon";
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

/**
 * Validates the input and returns a LineString at the center of a GeoJSON polygon or bbox.
 */
export function WithinLine(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  let lineString;

  try {
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
        rightPoint.geometry.coordinates,]);
    } else {
      return GetBadRequestErrorResponse("Invalid input. Provide either a valid GeoJSON polygon or a bbox.");
    }

    return GetOkResponse(lineString);
  } catch (error: any) {
    return GetInternalServerErrorResponse(`Error processing input: ${error.message}`);
  }
}
