export type OkResponse = {
  statusCode: number;
  headers: {
    "Content-Type": string;
  };
  body: string;
};

export function GetOkResponse(payload: any): OkResponse {
  const response = {
    statusCode: 200,
    headers: { 
      "Access-Control-Allow-Origin": "*", // Allow all origins
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS", // Allow specific methods
      "Access-Control-Allow-Headers": "Content-Type", // Allow specific headers
      "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };
  return response;
}

export type BadRequestErrorResponse = {
  statusCode: number;
  headers: {
    "Content-Type": string;
  };
  body: string;
};

export function GetBadRequestErrorResponse(
  payload: any
): BadRequestErrorResponse {
  const response = {
    statusCode: 400,
    headers: { 
      "Access-Control-Allow-Origin": "*", // Allow all origins
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS", // Allow specific methods
      "Access-Control-Allow-Headers": "Content-Type", // Allow specific headers
      "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };
  return response;
}

export type InternalServerErrorResponse = {
  statusCode: number;
  headers: {
    "Content-Type": string;
  };
  body: string;
};

export function GetInternalServerErrorResponse(
  payload: any
): InternalServerErrorResponse {
  const response = {
    statusCode: 500,
    headers: { 
      "Access-Control-Allow-Origin": "*", // Allow all origins
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS", // Allow specific methods
      "Access-Control-Allow-Headers": "Content-Type", // Allow specific headers
      "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };
  return response;
}
