import { APIGatewayProxyResult } from "aws-lambda";
import {
  BadRequestErrorResponse,
  GetInternalServerErrorResponse,
  GetOkResponse,
  OkResponse,
} from "../../util/stringify";
import {
  PolygonsLimitAndWithinOrPolygonsLimitAndWithinWithProperties,
  PolygonsOrPolygonsWithProperties,
  RandomPolygonsLimitAndWithinOrRandomPolygonsLimitAndWithinWithProperties,
  RandomPolygonsOrRandomPolygonsWithProperties,
} from "./polygonHelpers";

/**
 * Polygons() - Returns a collection of polygons, limited to the last 30 polygons.
 */
export function Polygons(): OkResponse {
  return GetOkResponse(PolygonsOrPolygonsWithProperties(false));
}

export function PolygonsWithProperties(): OkResponse {
  return GetOkResponse(PolygonsOrPolygonsWithProperties(true));
}

/**
 * PolygonsLimitAndWithin() - Filters and limits polygons based on a GeoJSON polygon or bbox.
 */
export function PolygonsLimitAndWithin(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result = PolygonsLimitAndWithinOrPolygonsLimitAndWithinWithProperties(
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

export function PolygonsLimitAndWithinWithProperties(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result = PolygonsLimitAndWithinOrPolygonsLimitAndWithinWithProperties(
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

/**
 * RandomPolygons() - Returns 30 random polygons within a global bounding box.
 */
export function RandomPolygons(): OkResponse {
  return GetOkResponse(RandomPolygonsOrRandomPolygonsWithProperties(false));
}

export function RandomPolygonsWithProperties(): OkResponse {
  return GetOkResponse(RandomPolygonsOrRandomPolygonsWithProperties(true));
}

/**
 * RandomPolygonsLimitAndWithin() - Filters and limits random polygons based on a GeoJSON polygon or bbox.
 */
export function RandomPolygonsLimitAndWithin(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result =
      RandomPolygonsLimitAndWithinOrRandomPolygonsLimitAndWithinWithProperties(
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

export function RandomPolygonsLimitAndWithinWithProperties(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result =
      RandomPolygonsLimitAndWithinOrRandomPolygonsLimitAndWithinWithProperties(
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
