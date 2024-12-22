import * as cdk from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { addNestedResources } from "../addNestedResources";

export function addMultiPointsResources(
  featureCollectionResource: cdk.aws_apigateway.Resource,
  methodOptions: cdk.aws_apigateway.MethodOptions,
  multiPointsFunction: cdk.aws_lambda_nodejs.NodejsFunction
) {
  const multiPointsResource = featureCollectionResource.addResource("multipoints");
  // Attach methods to the base `multiPointResource`
  multiPointsResource.addMethod(
    "GET",
    new apigateway.LambdaIntegration(multiPointsFunction),
    methodOptions
  );
  multiPointsResource.addMethod(
    "POST",
    new apigateway.LambdaIntegration(multiPointsFunction),
    methodOptions
  );

  // Define all the paths
  const nestedPaths = [["random"], ["properties"], ["random", "properties"]];

  // Attach methods to all the paths
  nestedPaths.forEach((path) => {
    addNestedResources(multiPointsResource, path, multiPointsFunction, methodOptions);
  });
}
