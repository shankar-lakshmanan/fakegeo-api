import * as cdk from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { addNestedResources } from "../addNestedResources";

export function addPointResources(
  featureResource:  cdk.aws_apigateway.Resource,
  methodOptions: cdk.aws_apigateway.MethodOptions,
  pointFunction: cdk.aws_lambda_nodejs.NodejsFunction
) {
  const pointResource = featureResource.addResource("point");
  // Attach methods to the base `pointResource`
  pointResource.addMethod(
    "GET",
    new apigateway.LambdaIntegration(pointFunction),
    methodOptions
  );
  pointResource.addMethod(
    "POST",
    new apigateway.LambdaIntegration(pointFunction),
    methodOptions
  );

  // Define all the paths
  const nestedPaths = [["random"], ["properties"], ["random", "properties"]];

  // Attach methods to all the paths
  nestedPaths.forEach((path) => {
    addNestedResources(pointResource, path, pointFunction, methodOptions);
  });
}
