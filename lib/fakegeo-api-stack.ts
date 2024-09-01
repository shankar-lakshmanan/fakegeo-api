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
        entry: path.join(__dirname, "..", "lambda", "fakeGeo.ts"),
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

    // Define the '/fakegeo' hello world resource with a GET method
    const fakegeoResource = api.root.addResource("fakegeo");
    fakegeoResource.addMethod('GET', new apigateway.LambdaIntegration(fakeGeoFunction), {
      apiKeyRequired: true,
    });
    

    const pointResource = api.root.addResource("point");
    pointResource.addMethod('GET', new apigateway.LambdaIntegration(fakeGeoFunction), {
      apiKeyRequired: true,
    });

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
