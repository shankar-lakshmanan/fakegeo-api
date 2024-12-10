import { APIGatewayProxyResult } from "aws-lambda";
import {
  BadRequestErrorResponse,
  GetInternalServerErrorResponse,
  GetOkResponse,
  OkResponse,
} from "../../util/stringify";
import {
  LineOrLineWithProperties,
  RandomLineOrLineWithProperties,
  WithinLineOrWithinLineWithProperties,
  WithinRandomLineOrWithinRandomLineWithProperties,
} from "./lineHelper";

export function Line(): OkResponse {
  return GetOkResponse(LineOrLineWithProperties(false));
}

export function LineWithProperties(): OkResponse {
  return GetOkResponse(LineOrLineWithProperties(true));
}

export function RandomLine(): OkResponse {
  return GetOkResponse(RandomLineOrLineWithProperties(false));
}

export function RandomLineWithProperties(): OkResponse {
  return GetOkResponse(RandomLineOrLineWithProperties(true));
}

/**
 * Validates the input and returns a LineString at the center of a GeoJSON polygon or bbox.
 */
export function WithinLine(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");
  try {
    const result = WithinLineOrWithinLineWithProperties(body, false);
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
    const result = WithinLineOrWithinLineWithProperties(body, true);
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
