import * as cdk from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { addNestedResources } from "./addNestedResources";

export function addMultiPolygonsResources(
  featureCollectionResource: cdk.aws_apigateway.Resource,
  methodOptions: {
    apiKeyRequired: boolean;
  },
  multiPolygonsFunction: cdk.aws_lambda_nodejs.NodejsFunction
) {
  const multiPolygonsResource = featureCollectionResource.addResource("multipolygons");
  // Attach methods to the base `multiPolygonResource`
  multiPolygonsResource.addMethod(
    "GET",
    new apigateway.LambdaIntegration(multiPolygonsFunction),
    methodOptions
  );
  multiPolygonsResource.addMethod(
    "POST",
    new apigateway.LambdaIntegration(multiPolygonsFunction),
    methodOptions
  );

  // Define all the paths
  const nestedPaths = [["random"], ["properties"], ["random", "properties"]];

  // Attach methods to all the paths
  nestedPaths.forEach((path) => {
    addNestedResources(multiPolygonsResource, path, multiPolygonsFunction, methodOptions);
  });
}
