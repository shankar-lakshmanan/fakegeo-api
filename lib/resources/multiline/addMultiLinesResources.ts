import * as cdk from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { addNestedResources } from "../addNestedResources";

export function addMultiLinesResources(
  featureCollectionResource: cdk.aws_apigateway.Resource,
  methodOptions: {
    apiKeyRequired: boolean;
  },
  multiLinesFunction: cdk.aws_lambda_nodejs.NodejsFunction
) {
  const multiLinesResource = featureCollectionResource.addResource("multilines");
  // Attach methods to the base `multiLineResource`
  multiLinesResource.addMethod(
    "GET",
    new apigateway.LambdaIntegration(multiLinesFunction),
    methodOptions
  );
  multiLinesResource.addMethod(
    "POST",
    new apigateway.LambdaIntegration(multiLinesFunction),
    methodOptions
  );

  // Define all the paths
  const nestedPaths = [["random"], ["properties"], ["random", "properties"]];

  // Attach methods to all the paths
  nestedPaths.forEach((path) => {
    addNestedResources(multiLinesResource, path, multiLinesFunction, methodOptions);
  });
}
