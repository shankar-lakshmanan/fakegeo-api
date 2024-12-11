import { RestApi } from 'aws-cdk-lib/aws-apigateway';
import { IFunction } from 'aws-cdk-lib/aws-lambda';
import { addFeatureResources } from './featureResources';
import { addFeatureCollectionResources } from './featureCollectionResources';

export function addApiResources(api: RestApi, fakeGeoFunction: IFunction, methodOptions: any) {
    addFeatureResources(api, fakeGeoFunction, methodOptions);
    addFeatureCollectionResources(api, fakeGeoFunction, methodOptions);
}
