import { APIGatewayProxyResult } from "aws-lambda";
import {
  BadRequestErrorResponse,
  GetInternalServerErrorResponse,
  GetOkResponse,
  OkResponse,
} from "../../util/stringify";
import {
  PolygonOrPolygonWithProperties,
  RandomPolygonOrRandomPolygonWithProperties,
  WithinPolygonOrWithinPolygonWithProperties,
  WithinRandomPolygonOrWithinRandomPolygonWithProperties,
} from "./polygonHelper";

export function Polygon(): OkResponse {
  return GetOkResponse(PolygonOrPolygonWithProperties(false));
}

export function PolygonWithProperties(): OkResponse {
  return GetOkResponse(PolygonOrPolygonWithProperties(true));
}

export function RandomPolygon(): OkResponse {
  return GetOkResponse(RandomPolygonOrRandomPolygonWithProperties(false));
}

export function RandomPolygonWithProperties(): OkResponse {
  return GetOkResponse(RandomPolygonOrRandomPolygonWithProperties(true));
}

/**
 * Validates the input and returns a Polygon at the center of a GeoJSON polygon or bbox.
 */
export function WithinPolygon(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");
  try {
    const result = WithinPolygonOrWithinPolygonWithProperties(body, false);
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

export function WithinPolygonWithProperties(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");
  try {
    const result = WithinPolygonOrWithinPolygonWithProperties(body, true);
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
 * Validates the input and returns a random Polygon at the center of a GeoJSON polygon or bbox.
 */
export function WithinRandomPolygon(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result = WithinRandomPolygonOrWithinRandomPolygonWithProperties(
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

export function WithinRandomPolygonWithProperties(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result = WithinRandomPolygonOrWithinRandomPolygonWithProperties(
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
