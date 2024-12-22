import * as cdk from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { addNestedResources } from "../addNestedResources";

export function addPolygonResources(
  featureResource:  cdk.aws_apigateway.Resource,
  methodOptions: cdk.aws_apigateway.MethodOptions,
  polygonFunction: cdk.aws_lambda_nodejs.NodejsFunction
) {
  const polygonResource = featureResource.addResource("polygon");
  // Attach methods to the base `polygonResource`
  polygonResource.addMethod(
    "GET",
    new apigateway.LambdaIntegration(polygonFunction),
    methodOptions
  );
  polygonResource.addMethod(
    "POST",
    new apigateway.LambdaIntegration(polygonFunction),
    methodOptions
  );

  // Define all the paths
  const nestedPaths = [["random"], ["properties"], ["random", "properties"]];

  // Attach methods to all the paths
  nestedPaths.forEach((path) => {
    addNestedResources(polygonResource, path, polygonFunction, methodOptions);
  });
}
