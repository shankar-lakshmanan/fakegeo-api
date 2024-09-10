export type OkResponse = {
    statusCode: number;
    headers: {
        "Content-Type": string;
    };
    body: string;
};

export function GetOkResponse(
    payload: any
  ): OkResponse {
    const response = {
        statusCode: 200,
        headers: { "Content-Type": "text/plain" },
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
        headers: { "Content-Type": "text/plain" },
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
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload),
    };
    return response;
  }