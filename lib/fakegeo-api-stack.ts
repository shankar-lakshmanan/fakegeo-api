import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// Import the Lambda module
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import path = require('path');
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as dotenv from "dotenv";
import { addNestedResources } from './resources/addNestedResources';
import { addPointResources } from './resources/addPointResources';

// Load environment variables from .env file
dotenv.config();

export class FakegeoApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define the API Gateway resource
    const api = new apigateway.RestApi(this, "FakeGeoApi", {
      defaultCorsPreflightOptions: {
        allowOrigins: ["*"],
        allowMethods: ["GET", "POST"],
      },
    });

    const methodOptions =  {
      apiKeyRequired: true,
    }

    const pointFunction = new NodejsFunction(this, "PointFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: path.join(__dirname, "..", "lambda/handlers", "pointHandler.ts"),
      handler: "handler",
      bundling: { externalModules: [] },
    });
    addPointResources(api,methodOptions, pointFunction)


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
