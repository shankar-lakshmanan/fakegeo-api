import { APIGatewayProxyResult } from "aws-lambda";
import {
  BadRequestErrorResponse,
  GetInternalServerErrorResponse,
  GetOkResponse,
  OkResponse,
} from "../../util/stringify";
import {
  PointOrPointWithProperties,
  RandomPointOrRandomPointWithProperties,
  WithinPointOrWithinPointWithProperties,
  WithinRandomPointOrWithinRandomPointWithProperties,
} from "./pointHelper";

export function Point(): OkResponse {
  return GetOkResponse(PointOrPointWithProperties(false));
}

export function PointWithProperties(): OkResponse {
  return GetOkResponse(PointOrPointWithProperties(true));
}

export function RandomPoint(): OkResponse {
  return GetOkResponse(RandomPointOrRandomPointWithProperties(false));
}

export function RandomPointWithProperties(): OkResponse {
  return GetOkResponse(RandomPointOrRandomPointWithProperties(true));
}

/**
 * Validates the input and returns a point within a GeoJSON polygon or bbox.
 */
export function WithinPoint(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result = WithinPointOrWithinPointWithProperties(body, false);
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

export function WithinPointWithProperties(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result = WithinPointOrWithinPointWithProperties(body, true);
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
 * Validates the input and returns a random point within a GeoJSON polygon or bbox.
 */
export function WithinRandomPoint(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result = WithinRandomPointOrWithinRandomPointWithProperties(
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

export function WithinRandomPointWithProperties(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result = WithinRandomPointOrWithinRandomPointWithProperties(
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
