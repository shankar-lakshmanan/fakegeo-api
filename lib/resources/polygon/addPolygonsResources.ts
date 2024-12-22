import * as cdk from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { addNestedResources } from "../addNestedResources";

export function addPolygonsResources(
  featureCollectionResource: cdk.aws_apigateway.Resource,
  methodOptions: cdk.aws_apigateway.MethodOptions,
  polygonsFunction: cdk.aws_lambda_nodejs.NodejsFunction
) {
  const polygonsResource = featureCollectionResource.addResource("polygons");
  // Attach methods to the base `polygonResource`
  polygonsResource.addMethod(
    "GET",
    new apigateway.LambdaIntegration(polygonsFunction),
    methodOptions
  );
  polygonsResource.addMethod(
    "POST",
    new apigateway.LambdaIntegration(polygonsFunction),
    methodOptions
  );

  // Define all the paths
  const nestedPaths = [["random"], ["properties"], ["random", "properties"]];

  // Attach methods to all the paths
  nestedPaths.forEach((path) => {
    addNestedResources(polygonsResource, path, polygonsFunction, methodOptions);
  });
}
