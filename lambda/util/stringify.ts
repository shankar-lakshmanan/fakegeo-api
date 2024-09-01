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