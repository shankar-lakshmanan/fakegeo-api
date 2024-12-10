import { APIGatewayProxyResult } from "aws-lambda";
import {
  BadRequestErrorResponse,
  GetInternalServerErrorResponse,
  GetOkResponse,
  OkResponse,
} from "../../util/stringify";
import {
  PointsLimitAndWithinOrPointsLimitAndWithinWithProperties,
  PointsOrPointsWithProperties,
  RandomPointsLimitAndWithinOrRandomPointsLimitAndWithinWithProperties,
  RandomPointsOrRandomPointsWithProperties,
} from "./pointsHelper";

export function Points(): OkResponse {
  return GetOkResponse(PointsOrPointsWithProperties(false));
}

export function PointsWithProperties(): OkResponse {
  return GetOkResponse(PointsOrPointsWithProperties(true));
}

export function PointsLimitAndWithin(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result = PointsLimitAndWithinOrPointsLimitAndWithinWithProperties(
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

export function PointsLimitAndWithinWithProperties(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result = PointsLimitAndWithinOrPointsLimitAndWithinWithProperties(
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

export function RandomPoints(): OkResponse {
  return GetOkResponse(RandomPointsOrRandomPointsWithProperties(false));
}

export function RandomPointsWithProperties(): OkResponse {
  return GetOkResponse(RandomPointsOrRandomPointsWithProperties(true));
}

export function RandomPointsLimitAndWithin(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result =
      RandomPointsLimitAndWithinOrRandomPointsLimitAndWithinWithProperties(
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

export function RandomPointsLimitAndWithinWithProperties(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result =
      RandomPointsLimitAndWithinOrRandomPointsLimitAndWithinWithProperties(
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
