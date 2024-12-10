import { APIGatewayProxyResult } from "aws-lambda";
import {
  GetInternalServerErrorResponse,
  GetOkResponse,
  OkResponse,
} from "../../util/stringify";
import {
  MultiPointsLimitAndWithinOrMultiPointsLimitAndWithinWithProperties,
  MultiPointsOrMultiPointsWithProperties,
  RandomMultiPointsLimitAndWithinOrRandomMultiPointsLimitAndWithinWithProperties,
  RandomMultiPointsOrRandomMultiPointsWithProperties,
} from "./multipointsHelper";

export function MultiPoints(): OkResponse {
  return GetOkResponse(MultiPointsOrMultiPointsWithProperties(false));
}

export function MultiPointsWithProperties(): OkResponse {
  return GetOkResponse(MultiPointsOrMultiPointsWithProperties(true));
}

export function MultiPointsLimitAndWithin(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result =
      MultiPointsLimitAndWithinOrMultiPointsLimitAndWithinWithProperties(
        body,
        false
      );
    return GetOkResponse(result);
  } catch (error: any) {
    return GetInternalServerErrorResponse(
      `Error processing input: ${error.message}`
    );
  }
}

export function MultiPointsLimitAndWithinWithProperties(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result =
      MultiPointsLimitAndWithinOrMultiPointsLimitAndWithinWithProperties(
        body,
        true
      );
    return GetOkResponse(result);
  } catch (error: any) {
    return GetInternalServerErrorResponse(
      `Error processing input: ${error.message}`
    );
  }
}

export function RandomMultiPoints(): OkResponse {
  return GetOkResponse(
    RandomMultiPointsOrRandomMultiPointsWithProperties(false)
  );
}

export function RandomMultiPointsWithProperties(): OkResponse {
  return GetOkResponse(
    RandomMultiPointsOrRandomMultiPointsWithProperties(true)
  );
}

export function RandomMultiPointsLimitAndWithin(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result =
      RandomMultiPointsLimitAndWithinOrRandomMultiPointsLimitAndWithinWithProperties(
        body,
        false
      );
    return GetOkResponse(result);
  } catch (error: any) {
    return GetInternalServerErrorResponse(
      `Error processing input: ${error.message}`
    );
  }
}

export function RandomMultiPointsLimitAndWithinWithProperties(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result =
      RandomMultiPointsLimitAndWithinOrRandomMultiPointsLimitAndWithinWithProperties(
        body,
        true
      );
    return GetOkResponse(result);
  } catch (error: any) {
    return GetInternalServerErrorResponse(
      `Error processing input: ${error.message}`
    );
  }
}
