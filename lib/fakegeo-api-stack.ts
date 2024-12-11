import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// Import the Lambda module
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import path = require('path');
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as dotenv from "dotenv";
import { addApiResources } from './resources/resources';

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

    addApiResources(api, fakeGeoFunction, methodOptions);

    const plan = new apigateway.UsagePlan(this, "UsagePlan", {
      name: "Easy",
      throttle: {
        rateLimit: 100,
        burstLimit: 2,
      },
      quota: {
        limit: 1000,
        period: apigateway.Period.DAY,
      },
    });

    const key = api.addApiKey(process.env.FAKE_GEO_API_KEY!);
    plan.addApiKey(key);

    plan.addApiStage({
      stage: api.deploymentStage,
    });

  }
}
