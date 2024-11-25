import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// Import the Lambda module
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import path = require('path');
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export class FakegeoApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define the Lambda function resource
    // Define the Lambda function resource
    const fakeGeoFunction = new NodejsFunction(
      this,
      "FakeGeoFunction",
      {
        runtime: lambda.Runtime.NODEJS_20_X,
        entry: path.join(__dirname, "..", "lambda/handlers", "fakeGeoHandler.ts"),
        handler: "handler",
        // timeout: cdk.Duration.minutes(10),
        // memorySize: 2048,
        bundling: {
          externalModules: [], // Include all dependencies
        },
        // environment: {
        //   PATH: "/var/task/ffmpeg:" + process.env.PATH
        // },
      },
    );

    // Define the API Gateway resource
    const api = new apigateway.LambdaRestApi(this, "FakeGeoApi", {
      handler: fakeGeoFunction,
      proxy: false,
    });

    const methodOptions =  {
      apiKeyRequired: true,
    }

    // Define the '/fakegeo' hello world resource with a GET method
    const fakegeoResource = api.root.addResource("fakegeo");
    fakegeoResource.addMethod("GET", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);

    const featureResource = api.root.addResource("feature");
    const featurePointResource = featureResource.addResource("point");
    const featurePointPropertiesResource = featureResource.addResource("properties");
    const featurePointRandomResource = featurePointResource.addResource('random');
    const featurePointRandomPropertiesResource = featurePointRandomResource.addResource("properties");
    
    featurePointResource.addMethod("GET", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featurePointResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featurePointRandomResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featurePointPropertiesResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featurePointRandomPropertiesResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);

    const featureMultiPointResource = featureResource.addResource("multipoint");
    const featureMultiPointRandomResource = featureMultiPointResource.addResource('random');
    featureMultiPointResource.addMethod("GET", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featureMultiPointResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featureMultiPointRandomResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);

    const featureLineResource = featureResource.addResource("line");
    const featureLineRandomResource = featureLineResource.addResource('random');
    featureLineResource.addMethod("GET", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featureLineResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featureLineRandomResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);

    const featureMultiLineResource = featureResource.addResource("multiline");
    const featureMultiLineRandomResource = featureMultiLineResource.addResource('random');
    featureMultiLineResource.addMethod("GET", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featureMultiLineResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featureMultiLineRandomResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);

    const featurePolygonResource = featureResource.addResource("polygon");
    const featurePolygonRandomResource = featurePolygonResource.addResource('random');
    featurePolygonResource.addMethod("GET", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featurePolygonResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featurePolygonRandomResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);

    const featureMultiPolygonResource = featureResource.addResource("multipolygon");
    const featureMultiPolygonRandomResource = featureMultiPolygonResource.addResource('random');
    featureMultiPolygonResource.addMethod("GET", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featureMultiPolygonResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featureMultiPolygonRandomResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);

    const featureCollectionResource = api.root.addResource("featureCollection");
    const featureCollectionPointsResource = featureCollectionResource.addResource("points");
    const featureCollectionPointsPropertiesResource = featureCollectionResource.addResource("properties");
    const featureCollectionPointsRandomResource = featureCollectionPointsResource.addResource('random');
    const featureCollectionPointsRandomPropertiesResource = featureCollectionPointsResource.addResource('properties');
    featureCollectionPointsResource.addMethod("GET", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featureCollectionPointsResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featureCollectionPointsPropertiesResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featureCollectionPointsRandomResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featureCollectionPointsRandomPropertiesResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);

    const featureCollectionMultiPointsResource = featureCollectionResource.addResource("multipoints");
    const featureCollectionMultiPointsRandomResource = featureCollectionMultiPointsResource.addResource('random');
    featureCollectionMultiPointsResource.addMethod("GET", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featureCollectionMultiPointsResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featureCollectionMultiPointsRandomResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);

    const featureCollectionLinesResource = featureCollectionResource.addResource("lines");
    const featureCollectionLinesRandomResource = featureCollectionLinesResource.addResource('random');
    featureCollectionLinesResource.addMethod("GET", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featureCollectionLinesResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featureCollectionLinesRandomResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);

    const featureCollectionMultiLinesResource = featureCollectionResource.addResource("multilines");
    const featureCollectionMultiLinesRandomResource = featureCollectionMultiLinesResource.addResource('random');
    featureCollectionMultiLinesResource.addMethod("GET", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featureCollectionMultiLinesResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featureCollectionMultiLinesRandomResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);

    const featureCollectionPolygonsResource = featureCollectionResource.addResource("polygons");
    const featureCollectionPolygonsRandomResource = featureCollectionPolygonsResource.addResource('random');
    featureCollectionPolygonsResource.addMethod("GET", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featureCollectionPolygonsResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featureCollectionPolygonsRandomResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);

    const featureCollectionMultiPolygonsResource = featureCollectionResource.addResource("multipolygons");
    const featureCollectionMultiPolygonsRandomResource = featureCollectionMultiPolygonsResource.addResource('random');
    featureCollectionMultiPolygonsResource.addMethod("GET", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featureCollectionMultiPolygonsResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featureCollectionMultiPolygonsRandomResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);

    const plan = new apigateway.UsagePlan(this, "UsagePlan", {
      name: "Easy",
      throttle: {
        rateLimit: 100,
        burstLimit: 2,
      },
      quota: {
        limit: 10000,
        period: apigateway.Period.MONTH,
      },
    });

    const key = api.addApiKey(process.env.FAKE_GEO_API_KEY!);
    plan.addApiKey(key);

    plan.addApiStage({
      stage: api.deploymentStage,
    });

  }
}
