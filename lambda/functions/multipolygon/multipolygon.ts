import { APIGatewayProxyResult } from "aws-lambda";
import {
  BadRequestErrorResponse,
  GetInternalServerErrorResponse,
  GetOkResponse,
  OkResponse,
} from "../../util/stringify";
import {
  MultiPolygonOrMultiPolygonWithProperties,
  RandomMultiPolygonOrRandomMultiPolygonWithProperties,
  WithinMultiPolygonOrWithinMultiPolygonWithProperties,
  WithinRandomMultiPolygonOrWithinRandomMultiPolygonWithProperties,
} from "./multipolygonHelper";

/**
 * Single MultiPolygon based on specified coordinates.
 */
export function MultiPolygon(): OkResponse {
  return GetOkResponse(MultiPolygonOrMultiPolygonWithProperties(false));
}

export function MultiPolygonWithProperties(): OkResponse {
  return GetOkResponse(MultiPolygonOrMultiPolygonWithProperties(true));
}

/**
 * Random MultiPolygon generation within the global bbox.
 */
export function RandomMultiPolygon(): OkResponse {
  return GetOkResponse(
    RandomMultiPolygonOrRandomMultiPolygonWithProperties(false)
  );
}

export function RandomMultiPolygonWithProperties(): OkResponse {
  return GetOkResponse(
    RandomMultiPolygonOrRandomMultiPolygonWithProperties(true)
  );
}

/**
 * MultiPolygon within or around a center point, based on GeoJSON polygon or bbox.
 */
export function WithinMultiPolygon(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result = WithinMultiPolygonOrWithinMultiPolygonWithProperties(
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

export function WithinMultiPolygonWithProperties(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result = WithinMultiPolygonOrWithinMultiPolygonWithProperties(
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
 * Random MultiPolygon within the bbox or a GeoJSON polygon.
 */
export function WithinRandomMultiPolygon(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result =
      WithinRandomMultiPolygonOrWithinRandomMultiPolygonWithProperties(
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

export function WithinRandomMultiPolygonWithProperties(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result =
      WithinRandomMultiPolygonOrWithinRandomMultiPolygonWithProperties(
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
