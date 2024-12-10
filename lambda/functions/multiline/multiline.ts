import { APIGatewayProxyResult } from "aws-lambda";
import {
  BadRequestErrorResponse,
  GetInternalServerErrorResponse,
  GetOkResponse,
  OkResponse,
} from "../../util/stringify";
import {
  MultiLineOrMultiLineWithProperties,
  RandomMultiLineOrRandomMultiLineWithProperties,
  WithinMultiLineOrWithinMultiLineWithProperties,
  WithinRandomMultiLineOrWithinRandomMultiLineWithProperties,
} from "./multilineHelper";

export function MultiLine(): OkResponse {
  return GetOkResponse(MultiLineOrMultiLineWithProperties(false));
}

export function MultiLineWithProperties(): OkResponse {
  return GetOkResponse(MultiLineOrMultiLineWithProperties(true));
}

export function RandomMultiLine(): OkResponse {
  return GetOkResponse(RandomMultiLineOrRandomMultiLineWithProperties(false));
}

export function RandomMultiLineWithProperties(): OkResponse {
  return GetOkResponse(RandomMultiLineOrRandomMultiLineWithProperties(true));
}

/**
 * Validates the input and returns a MultiLineString at the center of a GeoJSON polygon or bbox.
 */
export function WithinMultiLine(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");
  try {
    const result = WithinMultiLineOrWithinMultiLineWithProperties(body, false);
    if ("error" in result) {
      // result is a BadRequestErrorResponse
      return result as BadRequestErrorResponse;
    } else {
      return GetOkResponse(result);
    }
  } catch (error: any) {
    return GetInternalServerErrorResponse(
      `Error processing input: ${error.message}`
    );
  }
}

export function WithinMultiLineWithProperties(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");
  try {
    const result = WithinMultiLineOrWithinMultiLineWithProperties(body, true);
    if ("error" in result) {
      // result is a BadRequestErrorResponse
      return result as BadRequestErrorResponse;
    } else {
      return GetOkResponse(result);
    }
  } catch (error: any) {
    return GetInternalServerErrorResponse(
      `Error processing input: ${error.message}`
    );
  }
}

export function WithinRandomMultiLine(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result = WithinRandomMultiLineOrWithinRandomMultiLineWithProperties(
      body,
      false
    );
    if ("error" in result) {
      // result is a BadRequestErrorResponse
      return result as BadRequestErrorResponse;
    } else {
      return GetOkResponse(result);
    }
  } catch (error: any) {
    return GetInternalServerErrorResponse(
      `Error processing input: ${error.message}`
    );
  }
}

export function WithinRandomMultiLineWithProperties(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result = WithinRandomMultiLineOrWithinRandomMultiLineWithProperties(
      body,
      true
    );
    if ("error" in result) {
      // result is a BadRequestErrorResponse
      return result as BadRequestErrorResponse;
    } else {
      return GetOkResponse(result);
    }
  } catch (error: any) {
    return GetInternalServerErrorResponse(
      `Error processing input: ${error.message}`
    );
  }
}
