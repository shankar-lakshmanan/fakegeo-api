import { APIGatewayProxyResult } from "aws-lambda";
import {
  BadRequestErrorResponse,
  GetInternalServerErrorResponse,
  GetOkResponse,
  OkResponse,
} from "../../util/stringify";
import {
  MultiPolygonsLimitAndWithinOrMultiPolygonsLimitAndWithinWithProperties,
  MultiPolygonsOrMultiPolygonsWithProperties,
  RandomMultiPolygonsLimitAndWithinOrRandomMultiPolygonsLimitAndWithinWithProperties,
  RandomMultiPolygonsOrRandomMultiPolygonsWithProperties,
} from "./multipolygonsHelper";

/**
 * MultiPolygons() - Returns a collection of the last 30 MultiPolygons.
 */
export function MultiPolygons(): OkResponse {
  return GetOkResponse(MultiPolygonsOrMultiPolygonsWithProperties(false));
}

export function MultiPolygonsWithProperties(): OkResponse {
  return GetOkResponse(MultiPolygonsOrMultiPolygonsWithProperties(true));
}

/**
 * MultiPolygonsLimitAndWithin() - Filters and limits multi polygons based on a GeoJSON polygon or bbox.
 */
export function MultiPolygonsLimitAndWithin(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result =
      MultiPolygonsLimitAndWithinOrMultiPolygonsLimitAndWithinWithProperties(
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

export function MultiPolygonsLimitAndWithinWithProperties(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result =
      MultiPolygonsLimitAndWithinOrMultiPolygonsLimitAndWithinWithProperties(
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
 * RandomMultiPolygons() - Returns 30 random polygons as MultiPolygon geometries within a global bounding box.
 */
export function RandomMultiPolygons(): OkResponse {
  return GetOkResponse(
    RandomMultiPolygonsOrRandomMultiPolygonsWithProperties(false)
  );
}

export function RandomMultiPolygonsWithProperties(): OkResponse {
  return GetOkResponse(
    RandomMultiPolygonsOrRandomMultiPolygonsWithProperties(true)
  );
}

/**
 * Random MultiPolygons with limit and within a polygon or bbox.
 */
export function RandomMultiPolygonsLimitAndWithin(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  const result =
    RandomMultiPolygonsLimitAndWithinOrRandomMultiPolygonsLimitAndWithinWithProperties(
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
}

export function RandomMultiPolygonsLimitAndWithinWithProperties(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  const result =
    RandomMultiPolygonsLimitAndWithinOrRandomMultiPolygonsLimitAndWithinWithProperties(
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
}
