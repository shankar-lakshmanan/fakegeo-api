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
    fakegeoResource.addMethod('GET', new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    
    const pointResource = api.root.addResource("point");
    const pointRandomResource = pointResource.addResource('random');
    pointResource.addMethod('GET', new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    pointResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    pointRandomResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);

    const featureResource = api.root.addResource("feature");
    const featurePointResource = featureResource.addResource("point");
    const featurePointRandomResource = featurePointResource.addResource('random');
    featurePointResource.addMethod('GET', new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featurePointResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featurePointRandomResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);

    
    const lineResource = api.root.addResource("line");
    const lineRandomResource = lineResource.addResource('random');
    lineResource.addMethod('GET', new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    lineResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    lineRandomResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);

    const featureLineResource = featureResource.addResource("line");
    const featureLineRandomResource = featureLineResource.addResource('random');
    featureLineResource.addMethod('GET', new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featureLineResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featureLineRandomResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);

    const polygonResource = api.root.addResource("polygon");
    const polygonRandomResource = polygonResource.addResource('random');
    polygonResource.addMethod('GET', new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    polygonResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    polygonRandomResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);

    const featurePolygonResource = featureResource.addResource("polygon");
    const featurePolygonRandomResource = featurePolygonResource.addResource('random');
    featurePolygonResource.addMethod('GET', new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featurePolygonResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featurePolygonRandomResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);

    const pointsResource = api.root.addResource("points");
    pointsResource.addMethod('GET', new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    pointsResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);

    const featurePointsResource = featureResource.addResource("points");
    const featurePointsRandomResource = featurePointsResource.addResource('random');
    featurePointsResource.addMethod('GET', new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featurePointsResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featurePointsRandomResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);

    const linesResource = api.root.addResource("lines");
    linesResource.addMethod('GET', new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    linesResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);

    const featureLinesResource = featureResource.addResource("lines");
    const featureLinesRandomResource = featureLinesResource.addResource('random');
    featureLinesResource.addMethod('GET', new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featureLinesResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featureLinesRandomResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);

    const polygonsResource = api.root.addResource("polygons");
    polygonsResource.addMethod('GET', new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    polygonsResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);

    const featurePolygonsResource = featureResource.addResource("polygons");
    const featurePolygonsRandomResource = featurePolygonsResource.addResource('random');
    featurePolygonsResource.addMethod('GET', new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featurePolygonsResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);
    featurePolygonsRandomResource.addMethod("POST", new apigateway.LambdaIntegration(fakeGeoFunction), methodOptions);

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
