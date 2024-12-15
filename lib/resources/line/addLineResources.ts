import * as cdk from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { addNestedResources } from "../addNestedResources";

export function addLineResources(
  featureResource:  cdk.aws_apigateway.Resource,
  methodOptions: {
    apiKeyRequired: boolean;
  },
  lineFunction: cdk.aws_lambda_nodejs.NodejsFunction
) {
  const lineResource = featureResource.addResource("line");
  // Attach methods to the base `lineResource`
  lineResource.addMethod(
    "GET",
    new apigateway.LambdaIntegration(lineFunction),
    methodOptions
  );
  lineResource.addMethod(
    "POST",
    new apigateway.LambdaIntegration(lineFunction),
    methodOptions
  );

  // Define all the paths
  const nestedPaths = [["random"], ["properties"], ["random", "properties"]];

  // Attach methods to all the paths
  nestedPaths.forEach((path) => {
    addNestedResources(lineResource, path, lineFunction, methodOptions);
  });
}
