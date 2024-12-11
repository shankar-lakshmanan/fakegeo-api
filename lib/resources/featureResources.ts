import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { IFunction } from 'aws-cdk-lib/aws-lambda';

export function addFeatureResources(api: apigateway.RestApi, fakeGeoFunction: IFunction, methodOptions: apigateway.MethodOptions) {
    const featureResource = api.root.addResource("feature");

    const types = ["point", "multipoint", "line", "multiline", "polygon", "multipolygon"];
    types.forEach(type => {
        const resource = featureResource.addResource(type);
        resource.addMethod("GET", new LambdaIntegration(fakeGeoFunction), methodOptions);
        resource.addMethod("POST", new LambdaIntegration(fakeGeoFunction), methodOptions);

        const randomResource = resource.addResource("random");
        randomResource.addMethod("GET", new LambdaIntegration(fakeGeoFunction), methodOptions);
        randomResource.addMethod("POST", new LambdaIntegration(fakeGeoFunction), methodOptions);
    });
}
