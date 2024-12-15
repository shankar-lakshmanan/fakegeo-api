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
import { addPointsResources } from './resources/addPointsResources';
import { addMultiPointResources } from './resources/addMultiPointResources';
import { addMultiPointsResources } from './resources/addMultiPointsResources';
import { addLineResources } from './resources/addLineResources';
import { addLinesResources } from './resources/addLinesResources';
import { addMultiLineResources } from './resources/addMultiLineResources';
import { addMultiLinesResources } from './resources/addMultiLinesResources';

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
    const featureResource = api.root.addResource("feature");
    addPointResources(featureResource,methodOptions, pointFunction)

    const featureCollectionResource = api.root.addResource("featureCollection");
    const pointsFunction = new NodejsFunction(this, "PointsFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: path.join(__dirname, "..", "lambda/handlers", "pointsHandler.ts"),
      handler: "handler",
      bundling: { externalModules: [] },
    });
    addPointsResources(featureCollectionResource,methodOptions, pointsFunction)

    const multiPointFunction = new NodejsFunction(this, "MultiPointFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: path.join(__dirname, "..", "lambda/handlers", "multiPointHandler.ts"),
      handler: "handler",
      bundling: { externalModules: [] },
    });
    addMultiPointResources(featureResource,methodOptions, multiPointFunction)

    const multiPointsFunction = new NodejsFunction(this, "MultiPointsFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: path.join(__dirname, "..", "lambda/handlers", "multiPointsHandler.ts"),
      handler: "handler",
      bundling: { externalModules: [] },
    });
    addMultiPointsResources(featureCollectionResource,methodOptions, multiPointsFunction)


    const lineFunction = new NodejsFunction(this, "LineFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: path.join(__dirname, "..", "lambda/handlers", "LineHandler.ts"),
      handler: "handler",
      bundling: { externalModules: [] },
    });
    addLineResources(featureResource,methodOptions, lineFunction)

    const linesFunction = new NodejsFunction(this, "LinesFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: path.join(__dirname, "..", "lambda/handlers", "linesHandler.ts"),
      handler: "handler",
      bundling: { externalModules: [] },
    });
    addLinesResources(featureCollectionResource,methodOptions, linesFunction)

    const multiLineFunction = new NodejsFunction(this, "MultiLineFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: path.join(__dirname, "..", "lambda/handlers", "multiLineHandler.ts"),
      handler: "handler",
      bundling: { externalModules: [] },
    });
    addMultiLineResources(featureResource,methodOptions, multiLineFunction)

    const multiLinesFunction = new NodejsFunction(this, "MultiLinesFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: path.join(__dirname, "..", "lambda/handlers", "multiLinesHandler.ts"),
      handler: "handler",
      bundling: { externalModules: [] },
    });
    addMultiLinesResources(featureCollectionResource,methodOptions, multiLinesFunction)



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
