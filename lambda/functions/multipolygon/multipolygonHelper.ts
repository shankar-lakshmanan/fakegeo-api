import * as turf from "@turf/turf";
import {
  isGeoJSONMultiPolygon,
  isGeoJSONPolygon,
  isValidBBox,
} from "../../util/geojsonHelper";
import { GetBadRequestErrorResponse } from "../../util/stringify";
import { populateGeoJsonFeatureWithProperties } from "../properties/properties";

export function MultiPolygonOrMultiPolygonWithProperties(
  withProperties: boolean
) {
  const multiPolygon = turf.multiPolygon([
    [
      [
        [-98.41003457659247, 39.4047785977163],
        [-98.02900405028468, 39.09917828895786],
        [-96.96285807131997, 39.33112358709519],
        [-97.70240571181387, 39.862404027619164],
        [-97.89292169019507, 39.56582676744193],
        [-98.18773342170626, 39.71250430627077],
        [-98.41003457659247, 39.4047785977163],
      ],
    ],
  ]);

  if (withProperties) {
    const multiPolygonWithProperties =
      populateGeoJsonFeatureWithProperties(multiPolygon);
    return multiPolygonWithProperties;
  }
  return multiPolygon;
}

export function RandomMultiPolygonOrRandomMultiPolygonWithProperties(
  withProperties: boolean
) {
  const multiPolygon = turf.multiPolygon(
    Array.from(
      { length: 5 },
      () =>
        turf.randomPolygon(1, { bbox: [-180, -90, 180, 90] }).features[0]
          .geometry.coordinates
    )
  );

  if (withProperties) {
    const multiPolygonWithProperties =
      populateGeoJsonFeatureWithProperties(multiPolygon);
    return multiPolygonWithProperties;
  }
  return multiPolygon;
}

export function WithinMultiPolygonOrWithinMultiPolygonWithProperties(
  body: any,
  withProperties: boolean
) {
  let multiPolygon;

  const { geojsonPolygon, bbox } = body;

  if (
    geojsonPolygon &&
    (isGeoJSONPolygon(geojsonPolygon) || isGeoJSONMultiPolygon(geojsonPolygon))
  ) {
    const bboxCenter = turf.center(turf.bboxPolygon(turf.bbox(geojsonPolygon)));
    const coordinates = Array.from({ length: 3 }, () => {
      return [
        turf.destination(bboxCenter, 0.1, 0).geometry.coordinates,
        turf.destination(bboxCenter, 0.1, 60).geometry.coordinates,
        turf.destination(bboxCenter, 0.1, 120).geometry.coordinates,
        turf.destination(bboxCenter, 0.1, 180).geometry.coordinates,
        turf.destination(bboxCenter, 0.1, 240).geometry.coordinates,
        turf.destination(bboxCenter, 0.1, 300).geometry.coordinates,
        turf.destination(bboxCenter, 0.1, 0).geometry.coordinates,
      ];
    });

    multiPolygon = turf.multiPolygon([coordinates]);
  } else if (bbox && isValidBBox(bbox)) {
    const bboxCenter = turf.center(turf.bboxPolygon(bbox));
    const coordinates = Array.from({ length: 3 }, () => {
      return [
        turf.destination(bboxCenter, 0.1, 0).geometry.coordinates,
        turf.destination(bboxCenter, 0.1, 60).geometry.coordinates,
        turf.destination(bboxCenter, 0.1, 120).geometry.coordinates,
        turf.destination(bboxCenter, 0.1, 180).geometry.coordinates,
        turf.destination(bboxCenter, 0.1, 240).geometry.coordinates,
        turf.destination(bboxCenter, 0.1, 300).geometry.coordinates,
        turf.destination(bboxCenter, 0.1, 0).geometry.coordinates,
      ];
    });

    multiPolygon = turf.multiPolygon([coordinates]);
  } else {
    return GetBadRequestErrorResponse(
      "Invalid input. Provide either a valid GeoJSON polygon or a bbox."
    );
  }

  if (withProperties) {
    const multiPolygonWithProperties =
      populateGeoJsonFeatureWithProperties(multiPolygon);
    return multiPolygonWithProperties;
  }

  return multiPolygon;
}

export function WithinRandomMultiPolygonOrWithinRandomMultiPolygonWithProperties(
  body: any,
  withProperties: boolean
) {
  let multiPolygon;

  const { geojsonPolygon, bbox } = body;

  if (
    geojsonPolygon &&
    (isGeoJSONPolygon(geojsonPolygon) || isGeoJSONMultiPolygon(geojsonPolygon))
  ) {
    const randomPoints = turf.randomPoint(50, {
      bbox: turf.bbox(geojsonPolygon),
    }).features;
    const selectedPoints = randomPoints.filter((point) =>
      turf.booleanWithin(point, geojsonPolygon)
    );

    const coordinates = selectedPoints
      .slice(0, 3)
      .map((point) => [
        turf.destination(point, 0.1, 0).geometry.coordinates,
        turf.destination(point, 0.1, 60).geometry.coordinates,
        turf.destination(point, 0.1, 120).geometry.coordinates,
        turf.destination(point, 0.1, 180).geometry.coordinates,
        turf.destination(point, 0.1, 240).geometry.coordinates,
        turf.destination(point, 0.1, 300).geometry.coordinates,
        turf.destination(point, 0.1, 0).geometry.coordinates,
      ]);

    multiPolygon = turf.multiPolygon([coordinates]);
  } else if (bbox && isValidBBox(bbox)) {
    const randomPoint = turf.randomPoint(1, { bbox: bbox }).features[0];
    const coordinates = [
      turf.destination(randomPoint, 0.1, 0).geometry.coordinates,
      turf.destination(randomPoint, 0.1, 60).geometry.coordinates,
      turf.destination(randomPoint, 0.1, 120).geometry.coordinates,
      turf.destination(randomPoint, 0.1, 180).geometry.coordinates,
      turf.destination(randomPoint, 0.1, 240).geometry.coordinates,
      turf.destination(randomPoint, 0.1, 300).geometry.coordinates,
      turf.destination(randomPoint, 0.1, 0).geometry.coordinates,
    ];

    multiPolygon = turf.multiPolygon([[coordinates]]);
  } else {
    return GetBadRequestErrorResponse(
      "Invalid input. Provide either a valid GeoJSON polygon or a bbox."
    );
  }

  if (withProperties) {
    const multiPolygonWithProperties =
      populateGeoJsonFeatureWithProperties(multiPolygon);
    return multiPolygonWithProperties;
  }

  return multiPolygon;
}
