import { APIGatewayProxyResult } from "aws-lambda";
import {
  BadRequestErrorResponse,
  GetInternalServerErrorResponse,
  GetOkResponse,
  OkResponse,
} from "../../util/stringify";
import {
  MultiLinesLimitAndWithinOrMultiLinesLimitAndWithinWithProperties,
  MultiLinesOrMultiLinesWithProperties,
  RandomMultiLinesLimitAndWithinOrRandomMultiLinesLimitAndWithinWithProperties,
  RandomMultiLinesOrRandomMultiLinesWithProperties,
} from "./multilinesHelper";

/**
 * Generate a random MultiLineString within a bounding box or the bbox of a GeoJSON polygon.
 */
export function RandomMultiLinesLimitAndWithin(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result =
      RandomMultiLinesLimitAndWithinOrRandomMultiLinesLimitAndWithinWithProperties(
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

export function RandomMultiLinesLimitAndWithinWithProperties(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result =
      RandomMultiLinesLimitAndWithinOrRandomMultiLinesLimitAndWithinWithProperties(
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

export function MultiLines(): OkResponse {
  return GetOkResponse(MultiLinesOrMultiLinesWithProperties(false));
}

export function MultiLinesWithProperties(): OkResponse {
  return GetOkResponse(MultiLinesOrMultiLinesWithProperties(true));
}

export function MultiLinesLimitAndWithin(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result =
      MultiLinesLimitAndWithinOrMultiLinesLimitAndWithinWithProperties(
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

export function MultiLinesLimitAndWithinWithProperties(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result =
      MultiLinesLimitAndWithinOrMultiLinesLimitAndWithinWithProperties(
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

export function RandomMultiLines(): OkResponse {
  return GetOkResponse(RandomMultiLinesOrRandomMultiLinesWithProperties(false));
}
export function RandomMultiLinesWithProperties(): OkResponse {
  return GetOkResponse(RandomMultiLinesOrRandomMultiLinesWithProperties(true));
}
