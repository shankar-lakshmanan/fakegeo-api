import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
// Import the Lambda module
import * as lambda from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import path = require("path");
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as dotenv from "dotenv";
import { addNestedResources } from "./resources/addNestedResources";
import { addPointResources } from "./resources/point/addPointResources";
import { addPointsResources } from "./resources/point/addPointsResources";
import { addMultiPointResources } from "./resources/multipoint/addMultiPointResources";
import { addMultiPointsResources } from "./resources/multipoint/addMultiPointsResources";
import { addLineResources } from "./resources/line/addLineResources";
import { addLinesResources } from "./resources/line/addLinesResources";
import { addMultiLineResources } from "./resources/multiline/addMultiLineResources";
import { addMultiLinesResources } from "./resources/multiline/addMultiLinesResources";
import { addPolygonResources } from "./resources/polygon/addPolygonResources";
import { addPolygonsResources } from "./resources/polygon/addPolygonsResources";
import { addMultiPolygonResources } from "./resources/multipolygon/addMultiPolygonResources";
import { addMultiPolygonsResources } from "./resources/multipolygon/addMultiPolygonsResources";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as route53targets from "aws-cdk-lib/aws-route53-targets";
import * as certificatemanager from "aws-cdk-lib/aws-certificatemanager";

// Load environment variables from .env file
dotenv.config();

export class FakegeoApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Custom Domain Setup
    const hostedZone = route53.HostedZone.fromLookup(this, "HostedZone", {
      domainName: "fakegeo.com",
    });

    const certificate = new certificatemanager.Certificate(
      this,
      "Certificate",
      {
        domainName: "api.fakegeo.com",
        validation:
          certificatemanager.CertificateValidation.fromDns(hostedZone),
      }
    );

    // Define the API Gateway resource
    const api = new apigateway.RestApi(this, "FakeGeoApi", {
      restApiName: 'FakeGeo API',
      domainName: {
        domainName: 'api.fakegeo.com',
        certificate,
      },
      defaultCorsPreflightOptions: {
        allowOrigins: ["*"],
        allowMethods: ["GET", "POST", "OPTIONS"],
      },
    });

    const methodOptions: cdk.aws_apigateway.MethodOptions = {
      apiKeyRequired: false,
      methodResponses: [
        {
          statusCode: "200",
          responseParameters: {
            "method.response.header.Access-Control-Allow-Origin": true,
          },
        },
      ],
    };

    const durationInSeconds = 10;
    const pointFunction = new NodejsFunction(this, "PointFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: path.join(
        __dirname,
        "..",
        "lambda/handlers/point",
        "pointHandler.ts"
      ),
      handler: "handler",
      bundling: { externalModules: [] },
      environment: {
        POSTHOG_API_KEY: process.env.POSTHOG_API_KEY!,
      },
      timeout: cdk.Duration.seconds(durationInSeconds),
    });
    const featureResource = api.root.addResource("feature");
    addPointResources(featureResource, methodOptions, pointFunction);

    const featureCollectionResource = api.root.addResource("featureCollection");
    const pointsFunction = new NodejsFunction(this, "PointsFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: path.join(
        __dirname,
        "..",
        "lambda/handlers/point",
        "pointsHandler.ts"
      ),
      handler: "handler",
      bundling: { externalModules: [] },
      environment: {
        POSTHOG_API_KEY: process.env.POSTHOG_API_KEY!,
      },
      timeout: cdk.Duration.seconds(durationInSeconds),
    });
    addPointsResources(
      featureCollectionResource,
      methodOptions,
      pointsFunction
    );

    const multiPointFunction = new NodejsFunction(this, "MultiPointFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: path.join(
        __dirname,
        "..",
        "lambda/handlers/multipoint",
        "multiPointHandler.ts"
      ),
      handler: "handler",
      bundling: { externalModules: [] },
      environment: {
        POSTHOG_API_KEY: process.env.POSTHOG_API_KEY!,
      },
      timeout: cdk.Duration.seconds(durationInSeconds),
    });
    addMultiPointResources(featureResource, methodOptions, multiPointFunction);

    const multiPointsFunction = new NodejsFunction(
      this,
      "MultiPointsFunction",
      {
        runtime: lambda.Runtime.NODEJS_20_X,
        entry: path.join(
          __dirname,
          "..",
          "lambda/handlers/multipoint",
          "multiPointsHandler.ts"
        ),
        handler: "handler",
        bundling: { externalModules: [] },
        environment: {
          POSTHOG_API_KEY: process.env.POSTHOG_API_KEY!,
        },
        timeout: cdk.Duration.seconds(durationInSeconds),
      }
    );
    addMultiPointsResources(
      featureCollectionResource,
      methodOptions,
      multiPointsFunction
    );

    const lineFunction = new NodejsFunction(this, "LineFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: path.join(
        __dirname,
        "..",
        "lambda/handlers/line",
        "LineHandler.ts"
      ),
      handler: "handler",
      bundling: { externalModules: [] },
      environment: {
        POSTHOG_API_KEY: process.env.POSTHOG_API_KEY!,
      },
      timeout: cdk.Duration.seconds(durationInSeconds),
    });
    addLineResources(featureResource, methodOptions, lineFunction);

    const linesFunction = new NodejsFunction(this, "LinesFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: path.join(
        __dirname,
        "..",
        "lambda/handlers/line",
        "linesHandler.ts"
      ),
      handler: "handler",
      bundling: { externalModules: [] },
      environment: {
        POSTHOG_API_KEY: process.env.POSTHOG_API_KEY!,
      },
      timeout: cdk.Duration.seconds(durationInSeconds),
    });
    addLinesResources(featureCollectionResource, methodOptions, linesFunction);

    const multiLineFunction = new NodejsFunction(this, "MultiLineFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: path.join(
        __dirname,
        "..",
        "lambda/handlers/multiline",
        "multiLineHandler.ts"
      ),
      handler: "handler",
      bundling: { externalModules: [] },
      environment: {
        POSTHOG_API_KEY: process.env.POSTHOG_API_KEY!,
      },
      timeout: cdk.Duration.seconds(durationInSeconds),
    });
    addMultiLineResources(featureResource, methodOptions, multiLineFunction);

    const multiLinesFunction = new NodejsFunction(this, "MultiLinesFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: path.join(
        __dirname,
        "..",
        "lambda/handlers/multiline",
        "multiLinesHandler.ts"
      ),
      handler: "handler",
      bundling: { externalModules: [] },
      environment: {
        POSTHOG_API_KEY: process.env.POSTHOG_API_KEY!,
      },
      timeout: cdk.Duration.seconds(durationInSeconds),
    });
    addMultiLinesResources(
      featureCollectionResource,
      methodOptions,
      multiLinesFunction
    );

    const polygonFunction = new NodejsFunction(this, "PolygonFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: path.join(
        __dirname,
        "..",
        "lambda/handlers/polygon",
        "PolygonHandler.ts"
      ),
      handler: "handler",
      bundling: { externalModules: [] },
      environment: {
        POSTHOG_API_KEY: process.env.POSTHOG_API_KEY!,
      },
      timeout: cdk.Duration.seconds(durationInSeconds),
    });
    addPolygonResources(featureResource, methodOptions, polygonFunction);

    const polygonsFunction = new NodejsFunction(this, "PolygonsFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: path.join(
        __dirname,
        "..",
        "lambda/handlers/polygon",
        "PolygonsHandler.ts"
      ),
      handler: "handler",
      bundling: { externalModules: [] },
      environment: {
        POSTHOG_API_KEY: process.env.POSTHOG_API_KEY!,
      },
      timeout: cdk.Duration.seconds(durationInSeconds),
    });
    addPolygonsResources(
      featureCollectionResource,
      methodOptions,
      polygonsFunction
    );

    const multiPolygonFunction = new NodejsFunction(
      this,
      "MultiPolygonFunction",
      {
        runtime: lambda.Runtime.NODEJS_20_X,
        entry: path.join(
          __dirname,
          "..",
          "lambda/handlers/multipolygon",
          "multiPolygonHandler.ts"
        ),
        handler: "handler",
        bundling: { externalModules: [] },
        environment: {
          POSTHOG_API_KEY: process.env.POSTHOG_API_KEY!,
        },
        timeout: cdk.Duration.seconds(durationInSeconds),
      }
    );
    addMultiPolygonResources(
      featureResource,
      methodOptions,
      multiPolygonFunction
    );

    const multiPolygonsFunction = new NodejsFunction(
      this,
      "MultiPolygonsFunction",
      {
        runtime: lambda.Runtime.NODEJS_20_X,
        entry: path.join(
          __dirname,
          "..",
          "lambda/handlers/multipolygon",
          "multiPolygonsHandler.ts"
        ),
        handler: "handler",
        bundling: { externalModules: [] },
        environment: {
          POSTHOG_API_KEY: process.env.POSTHOG_API_KEY!,
        },
        timeout: cdk.Duration.seconds(durationInSeconds),
      }
    );
    addMultiPolygonsResources(
      featureCollectionResource,
      methodOptions,
      multiPolygonsFunction
    );

    const plan = new apigateway.UsagePlan(this, "UsagePlan", {
      name: "Easy",
      throttle: {
        rateLimit: 100, // Maximum requests per second
        burstLimit: 2,  // Burst limit for throttling
      },
      quota: {
        limit: 50000,    // Total requests allowed
        period: apigateway.Period.DAY, // Quota period
      },
    });
    
    // Generate an API key
    const apiKey = api.addApiKey("DefaultApiKey", {
      value: process.env.FAKE_GEO_API_KEY!, // Use an environment variable to securely define the key
      description: "Default API Key for all requests",
    });
    
    // Add the API key to the usage plan
    plan.addApiKey(apiKey);
    
    // Link the usage plan to the deployment stage of the API
    plan.addApiStage({
      stage: api.deploymentStage, // Associates the usage plan with the API's stage
    });

    // Route53 Record
    new route53.ARecord(this, 'ApiRecord', {
      zone: hostedZone,
      target: route53.RecordTarget.fromAlias(
        new route53targets.ApiGateway(api)
      ),
      recordName: 'api',
    });
  }
}
