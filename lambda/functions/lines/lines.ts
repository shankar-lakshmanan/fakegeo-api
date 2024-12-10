import { APIGatewayProxyResult } from "aws-lambda";
import {
  BadRequestErrorResponse,
  GetInternalServerErrorResponse,
  GetOkResponse,
  OkResponse,
} from "../../util/stringify";
import {
  LinesLimitAndWithinOrLinesLimitAndWithinWithProperties,
  LinesOrLinesWithProperties,
  RandomLinesLimitAndWithinOrRandomLinesLimitAndWithinWithProperties,
  RandomLinesOrRandomLinesWithProperties,
} from "./linesHelper";

export function Lines(): OkResponse {
  return GetOkResponse(LinesOrLinesWithProperties(false));
}

export function LinesWithProperties(): OkResponse {
  return GetOkResponse(LinesOrLinesWithProperties(true));
}

export function LinesLimitAndWithin(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result = LinesLimitAndWithinOrLinesLimitAndWithinWithProperties(
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

export function LinesLimitAndWithinWithProperties(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result = LinesLimitAndWithinOrLinesLimitAndWithinWithProperties(
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

export function RandomLines(): OkResponse {
  return GetOkResponse(RandomLinesOrRandomLinesWithProperties(false));
}

export function RandomLinesWithProperties(): OkResponse {
  return GetOkResponse(RandomLinesOrRandomLinesWithProperties(true));
}

export function RandomLinesLimitAndWithin(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");
  try {
    const result =
      RandomLinesLimitAndWithinOrRandomLinesLimitAndWithinWithProperties(
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

export function RandomLinesLimitAndWithinWithProperties(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");
  try {
    const result =
      RandomLinesLimitAndWithinOrRandomLinesLimitAndWithinWithProperties(
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
