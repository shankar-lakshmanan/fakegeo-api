import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { PostHog } from "posthog-node";

// Initialize PostHog client
const posthog = new PostHog(process.env.POSTHOG_API_KEY!, { host: process.env.POSTHOG_HOST, flushAt: 1, flushInterval:0 });

export const router = async (
  event: APIGatewayProxyEvent,
  routes: Record<string, Function>,
): Promise<APIGatewayProxyResult> => {
  const key = `${event.httpMethod} ${event.path}`;
  const route = routes[key];

  // Start tracking API latency
  const startTime = Date.now();

  // Capture the API request
  posthog.capture({
    distinctId: event.requestContext?.identity?.sourceIp || "anonymous",
    event: "API Call",
    properties: {
      method: event.httpMethod,
      path: event.path,
      queryString: event.queryStringParameters,
      headers: event.headers,
      routeFound: !!route,
    },
  });

  try {
    if (route) {
      // Handle the route and capture a successful response
      const result = await route(event);

      posthog.capture({
        distinctId: event.requestContext?.identity?.sourceIp || "anonymous",
        event: "API Response",
        properties: {
          statusCode: result.statusCode,
          path: event.path,
          latency: Date.now() - startTime,
        },
      });

      return result;
    } else {
      // Route not found
      const notFoundResponse = {
        statusCode: 404,
        body: JSON.stringify({ message: "Not Found" }),
      };

      posthog.capture({
        distinctId: event.requestContext?.identity?.sourceIp || "anonymous",
        event: "API Not Found",
        properties: {
          method: event.httpMethod,
          path: event.path,
          latency: Date.now() - startTime,
        },
      });

      return notFoundResponse;
    }
  } catch (error: any) {
    // Log and capture the error
    console.error("Error in route handler:", error);

    posthog.capture({
      distinctId: event.requestContext?.identity?.sourceIp || "anonymous",
      event: "API Error",
      properties: {
        method: event.httpMethod,
        path: event.path,
        error: error.message,
        latency: Date.now() - startTime,
      },
    });

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  } finally {
    // Ensure PostHog events are flushed
    // await posthog.flush();
    await posthog.shutdown();
  }
};
