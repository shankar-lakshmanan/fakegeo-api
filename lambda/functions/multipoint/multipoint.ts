import { APIGatewayProxyResult } from "aws-lambda";
import {
  BadRequestErrorResponse,
  GetInternalServerErrorResponse,
  GetOkResponse,
  OkResponse,
} from "../../util/stringify";
import {
  MultiPointOrMultiPointWithProperties,
  RandomMultiPointOrRandomMultiPointWithProperties,
  WithinMultiPointOrWithinMultiPointWithProperties,
  WithinRandomMultiPointOrWithinRandomMultiPointWithProperties,
} from "./multipointHelper";

export function MultiPoint(): OkResponse {
  return GetOkResponse(MultiPointOrMultiPointWithProperties(false));
}

export function MultiPointWithProperties(): OkResponse {
  return GetOkResponse(MultiPointOrMultiPointWithProperties(true));
}

export function RandomMultiPoint(): OkResponse {
  return GetOkResponse(RandomMultiPointOrRandomMultiPointWithProperties(false));
}

export function RandomMultiPointWithProperties(): OkResponse {
  return GetOkResponse(RandomMultiPointOrRandomMultiPointWithProperties(true));
}

/**
 * Validates the input and returns a multipoint within a GeoJSON polygon or bbox.
 */
export function WithinMultiPoint(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");
  try {
    const result = WithinMultiPointOrWithinMultiPointWithProperties(
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

export function WithinMultiPointWithProperties(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result = WithinMultiPointOrWithinMultiPointWithProperties(body, true);
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
 * Validates the input and returns random multipoints within a GeoJSON polygon or bbox.
 */
export function WithinRandomMultiPoint(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result = WithinRandomMultiPointOrWithinRandomMultiPointWithProperties(
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

/**
 * Validates the input and returns random multipoints within a GeoJSON polygon or bbox.
 */
export function WithinRandomMultiPointWithProperties(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result = WithinRandomMultiPointOrWithinRandomMultiPointWithProperties(
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
