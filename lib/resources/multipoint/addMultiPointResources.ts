import * as cdk from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { addNestedResources } from "../addNestedResources";

export function addMultiPointResources(
  featureResource:  cdk.aws_apigateway.Resource,
  methodOptions: {
    apiKeyRequired: boolean;
  },
  multiPointFunction: cdk.aws_lambda_nodejs.NodejsFunction
) {
  const multiPointResource = featureResource.addResource("multipoint");
  // Attach methods to the base `multiPointResource`
  multiPointResource.addMethod(
    "GET",
    new apigateway.LambdaIntegration(multiPointFunction),
    methodOptions
  );
  multiPointResource.addMethod(
    "POST",
    new apigateway.LambdaIntegration(multiPointFunction),
    methodOptions
  );

  // Define all the paths
  const nestedPaths = [["random"], ["properties"], ["random", "properties"]];

  // Attach methods to all the paths
  nestedPaths.forEach((path) => {
    addNestedResources(multiPointResource, path, multiPointFunction, methodOptions);
  });
}
