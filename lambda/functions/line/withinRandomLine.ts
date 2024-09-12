import * as turf from "@turf/turf";
import { Feature, Geometry, Point } from "geojson";
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
 * Validates the input and returns a random LineString at the center of a GeoJSON polygon or bbox.
 */
export function WithinRandomLine(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  let lineString;

  try {
    const { geojsonPolygon, bbox } = body;

    // Check if geojsonPolygon is valid
    if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {

      const randomPointsOfBboxOfPolygon = turf.randomPoint(50, {bbox: turf.bbox(geojsonPolygon)})

      let bboxRandomPoint: Feature<Point, any> = {
        type: "Feature",
        geometry: {
          coordinates: [],
          type: "Point"
        },
        properties: undefined
      };
      randomPointsOfBboxOfPolygon.features.forEach((point: Feature<Point, any>) => {
        if(turf.booleanWithin(point, geojsonPolygon)){
          bboxRandomPoint = point;
          return
        }
      });

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
      const point = turf.randomPoint(1, {bbox: bbox}).features[0]

      // Calculate points to the left and right of the center point.
      const leftPoint = turf.destination(point, 0.1, -45); // Left
      const rightPoint = turf.destination(point, 0.1, 45); // Right

      lineString = turf.lineString([
        leftPoint.geometry.coordinates,
        point.geometry.coordinates,
        rightPoint.geometry.coordinates,]);
    } else {
      return GetBadRequestErrorResponse("Invalid input. Provide either a valid GeoJSON polygon or a bbox.");
    }

    return GetOkResponse(lineString);
  } catch (error: any) {
    return GetInternalServerErrorResponse(`Error processing input: ${error.message}`);
  }
}
