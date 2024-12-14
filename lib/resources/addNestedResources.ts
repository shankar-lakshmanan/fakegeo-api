import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from 'aws-cdk-lib/aws-lambda';

export function addNestedResources(
    baseResource: apigateway.Resource,
    paths: string[],
    lambdaFunction: lambda.IFunction,
    methodOptions: apigateway.MethodOptions
  ) {
    if (paths.length === 0) return;
  
    // Get the next part of the path
    const [current, ...remaining] = paths;
  
    // Add the current resource or get an existing one
    const childResource = baseResource.getResource(current) as apigateway.Resource || baseResource.addResource(current);
  
    // Attach methods if this is the last resource in the hierarchy
    if (remaining.length === 0) {
      childResource.addMethod("GET", new apigateway.LambdaIntegration(lambdaFunction), methodOptions);
      childResource.addMethod("POST", new apigateway.LambdaIntegration(lambdaFunction), methodOptions);
    }
  
    // Recurse to handle remaining paths
    addNestedResources(childResource, remaining, lambdaFunction, methodOptions);
  }
  