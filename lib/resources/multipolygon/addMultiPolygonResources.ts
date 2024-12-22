import * as cdk from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { addNestedResources } from "../addNestedResources";

export function addMultiPolygonResources(
  featureResource:  cdk.aws_apigateway.Resource,
  methodOptions: cdk.aws_apigateway.MethodOptions,
  multiPolygonFunction: cdk.aws_lambda_nodejs.NodejsFunction
) {
  const multiPolygonResource = featureResource.addResource("multipolygon");
  // Attach methods to the base `multiPolygonResource`
  multiPolygonResource.addMethod(
    "GET",
    new apigateway.LambdaIntegration(multiPolygonFunction),
    methodOptions
  );
  multiPolygonResource.addMethod(
    "POST",
    new apigateway.LambdaIntegration(multiPolygonFunction),
    methodOptions
  );

  // Define all the paths
  const nestedPaths = [["random"], ["properties"], ["random", "properties"]];

  // Attach methods to all the paths
  nestedPaths.forEach((path) => {
    addNestedResources(multiPolygonResource, path, multiPolygonFunction, methodOptions);
  });
}
