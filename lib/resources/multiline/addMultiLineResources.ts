import * as cdk from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { addNestedResources } from "../addNestedResources";

export function addMultiLineResources(
  featureResource:  cdk.aws_apigateway.Resource,
  methodOptions: cdk.aws_apigateway.MethodOptions,
  multiLineFunction: cdk.aws_lambda_nodejs.NodejsFunction
) {
  const multiLineResource = featureResource.addResource("multiline");
  // Attach methods to the base `multiLineResource`
  multiLineResource.addMethod(
    "GET",
    new apigateway.LambdaIntegration(multiLineFunction),
    methodOptions
  );
  multiLineResource.addMethod(
    "POST",
    new apigateway.LambdaIntegration(multiLineFunction),
    methodOptions
  );

  // Define all the paths
  const nestedPaths = [["random"], ["properties"], ["random", "properties"]];

  // Attach methods to all the paths
  nestedPaths.forEach((path) => {
    addNestedResources(multiLineResource, path, multiLineFunction, methodOptions);
  });
}
