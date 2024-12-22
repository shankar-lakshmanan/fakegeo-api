import * as cdk from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { addNestedResources } from "../addNestedResources";

export function addLinesResources(
  featureCollectionResource: cdk.aws_apigateway.Resource,
  methodOptions: cdk.aws_apigateway.MethodOptions,
  linesFunction: cdk.aws_lambda_nodejs.NodejsFunction
) {
  const linesResource = featureCollectionResource.addResource("lines");
  // Attach methods to the base `lineResource`
  linesResource.addMethod(
    "GET",
    new apigateway.LambdaIntegration(linesFunction),
    methodOptions
  );
  linesResource.addMethod(
    "POST",
    new apigateway.LambdaIntegration(linesFunction),
    methodOptions
  );

  // Define all the paths
  const nestedPaths = [["random"], ["properties"], ["random", "properties"]];

  // Attach methods to all the paths
  nestedPaths.forEach((path) => {
    addNestedResources(linesResource, path, linesFunction, methodOptions);
  });
}
