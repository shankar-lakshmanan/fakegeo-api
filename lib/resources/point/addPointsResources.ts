import * as cdk from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { addNestedResources } from "../addNestedResources";

export function addPointsResources(
  featureCollectionResource: cdk.aws_apigateway.Resource,
  methodOptions: {
    apiKeyRequired: boolean;
  },
  pointsFunction: cdk.aws_lambda_nodejs.NodejsFunction
) {
  const pointsResource = featureCollectionResource.addResource("points");
  // Attach methods to the base `pointResource`
  pointsResource.addMethod(
    "GET",
    new apigateway.LambdaIntegration(pointsFunction),
    methodOptions
  );
  pointsResource.addMethod(
    "POST",
    new apigateway.LambdaIntegration(pointsFunction),
    methodOptions
  );

  // Define all the paths
  const nestedPaths = [["random"], ["properties"], ["random", "properties"]];

  // Attach methods to all the paths
  nestedPaths.forEach((path) => {
    addNestedResources(pointsResource, path, pointsFunction, methodOptions);
  });
}
