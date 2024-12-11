import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { IFunction } from 'aws-cdk-lib/aws-lambda';

export function addFeatureCollectionResources(api: apigateway.RestApi, fakeGeoFunction: IFunction, methodOptions: apigateway.MethodOptions) {
    const featureCollectionResource = api.root.addResource("featureCollection");

    const types = [
        { name: "points", extraResources: ["properties"] },
        { name: "multipoints" },
        { name: "lines" },
        { name: "multilines", extraResources: ["properties"] },
        { name: "polygons" },
        { name: "multipolygons" },
    ];

    types.forEach(type => {
        const resource = featureCollectionResource.addResource(type.name);
        resource.addMethod("GET", new LambdaIntegration(fakeGeoFunction), methodOptions);
        resource.addMethod("POST", new LambdaIntegration(fakeGeoFunction), methodOptions);

        const randomResource = resource.addResource("random");
        randomResource.addMethod("POST", new LambdaIntegration(fakeGeoFunction), methodOptions);

        if (type.extraResources) {
            type.extraResources.forEach(extra => {
                const extraResource = resource.addResource(extra);
                extraResource.addMethod("POST", new LambdaIntegration(fakeGeoFunction), methodOptions);
            });
        }
    });
}
