import * as turf from "@turf/turf";
import {Feature, Geometry} from "geojson";
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
 * Validates the input and returns a point within a GeoJSON polygon or bbox.
 */
export function WithinPoint(event: any): APIGatewayProxyResult {

  const body = JSON.parse(event.body || "{}")

  let point;

  try {
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
      return GetBadRequestErrorResponse("Invalid input. Provide either a valid GeoJSON polygon or a bbox.");
    }

    return GetOkResponse(point);
  } catch (error:any) {
    return GetInternalServerErrorResponse(`Error processing input: ${error.message}`);
  }
}
