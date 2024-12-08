import * as turf from "@turf/turf";
import {
  Feature,
  Geometry,
  Point,
  FeatureCollection,
  Polygon,
  GeoJsonProperties,
} from "geojson";
import { APIGatewayProxyResult } from "aws-lambda";
import {
  BadRequestErrorResponse,
  GetBadRequestErrorResponse,
  GetInternalServerErrorResponse,
  GetOkResponse,
  OkResponse,
} from "../../util/stringify";
import { thousandPolygons } from "./thousandPolygons";
import { isGeoJSONPolygon, isValidBBox } from "./polygon";
import {
  populateGeoJsonFeatureCollectionWithProperties,
  populateGeoJsonFeatureWithProperties,
} from "../properties/properties";

function MultiPolygonOrMultiPolygonWithProperties(withProperties: boolean) {
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

/**
 * Single MultiPolygon based on specified coordinates.
 */
export function MultiPolygon(): OkResponse {
  return GetOkResponse(MultiPolygonOrMultiPolygonWithProperties(false));
}

export function MultiPolygonWithProperties(): OkResponse {
  return GetOkResponse(MultiPolygonOrMultiPolygonWithProperties(true));
}

function RandomMultiPolygonOrRandomMultiPolygonWithProperties(
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

/**
 * Random MultiPolygon generation within the global bbox.
 */
export function RandomMultiPolygon(): OkResponse {
  return GetOkResponse(
    RandomMultiPolygonOrRandomMultiPolygonWithProperties(false)
  );
}

export function RandomMultiPolygonWithProperties(): OkResponse {
  return GetOkResponse(
    RandomMultiPolygonOrRandomMultiPolygonWithProperties(true)
  );
}

/**
 * Validate if a GeoJSON object is a MultiPolygon feature.
 */
export function isGeoJSONMultiPolygon(geojson: Feature): boolean {
  return (
    geojson.type === "Feature" &&
    geojson.geometry &&
    geojson.geometry.type === "MultiPolygon"
  );
}

function WithinMultiPolygonOrWithinMultiPolygonWithProperties(
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
/**
 * MultiPolygon within or around a center point, based on GeoJSON polygon or bbox.
 */
export function WithinMultiPolygon(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result = WithinMultiPolygonOrWithinMultiPolygonWithProperties(
      body,
      false
    );
    if ("error" in result) {
      // result is a BadRequestErrorResponse
      return result as BadRequestErrorResponse;
    } else {
      // result is a Feature<LineString, GeoJsonProperties>
      return GetOkResponse(result);
    }
  } catch (error: any) {
    return GetInternalServerErrorResponse(
      `Error processing input: ${error.message}`
    );
  }
}

export function WithinMultiPolygonWithProperties(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result = WithinMultiPolygonOrWithinMultiPolygonWithProperties(
      body,
      true
    );
    if ("error" in result) {
      // result is a BadRequestErrorResponse
      return result as BadRequestErrorResponse;
    } else {
      // result is a Feature<LineString, GeoJsonProperties>
      return GetOkResponse(result);
    }
  } catch (error: any) {
    return GetInternalServerErrorResponse(
      `Error processing input: ${error.message}`
    );
  }
}

function WithinRandomMultiPolygonOrWithinRandomMultiPolygonWithProperties(
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

/**
 * Random MultiPolygon within the bbox or a GeoJSON polygon.
 */
export function WithinRandomMultiPolygon(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result =
      WithinRandomMultiPolygonOrWithinRandomMultiPolygonWithProperties(
        body,
        false
      );
    if ("error" in result) {
      // result is a BadRequestErrorResponse
      return result as BadRequestErrorResponse;
    } else {
      // result is a Feature<LineString, GeoJsonProperties>
      return GetOkResponse(result);
    }
  } catch (error: any) {
    return GetInternalServerErrorResponse(
      `Error processing input: ${error.message}`
    );
  }
}

export function WithinRandomMultiPolygonWithProperties(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result =
      WithinRandomMultiPolygonOrWithinRandomMultiPolygonWithProperties(
        body,
        true
      );
    if ("error" in result) {
      // result is a BadRequestErrorResponse
      return result as BadRequestErrorResponse;
    } else {
      // result is a Feature<LineString, GeoJsonProperties>
      return GetOkResponse(result);
    }
  } catch (error: any) {
    return GetInternalServerErrorResponse(
      `Error processing input: ${error.message}`
    );
  }
}

function MultiPolygonsOrMultiPolygonsWithProperties(withProperties: boolean) {
  const thousandPolygonsFeatureCollection =
    thousandPolygons as FeatureCollection<Polygon, GeoJsonProperties>;
  const allPolygons = turf.featureCollection(
    thousandPolygonsFeatureCollection.features
      .slice(-30)
      .map((feature) => turf.multiPolygon([feature.geometry.coordinates]))
  );

  if (withProperties) {
    const multiPolygonsWithProperties =
      populateGeoJsonFeatureCollectionWithProperties(allPolygons);
    return multiPolygonsWithProperties;
  }
  return allPolygons;
}

/**
 * MultiPolygons() - Returns a collection of the last 30 MultiPolygons.
 */
export function MultiPolygons(): OkResponse {
  return GetOkResponse(MultiPolygonsOrMultiPolygonsWithProperties(false));
}

export function MultiPolygonsWithProperties(): OkResponse {
  return GetOkResponse(MultiPolygonsOrMultiPolygonsWithProperties(true));
}

function MultiPolygonsLimitAndWithinOrMultiPolygonsLimitAndWithinWithProperties(
  body: any,
  withProperties: boolean
) {
  const { limit, geojsonPolygon, bbox } = body;

  let polygons: FeatureCollection = thousandPolygons;
  let finalPolygons: FeatureCollection;

  if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {
    const filteredPolygons = polygons.features.filter((feature) => {
      if (
        feature.geometry.type === "Polygon" ||
        feature.geometry.type === "MultiPolygon"
      ) {
        const geometry =
          feature.geometry.type === "Polygon"
            ? turf.multiPolygon([feature.geometry.coordinates]) // Convert Polygon to MultiPolygon
            : feature;
        return turf.booleanIntersects(geometry, geojsonPolygon);
      }
      return false;
    });
    polygons = turf.featureCollection(filteredPolygons);
  } else if (bbox && isValidBBox(bbox)) {
    const bboxPolygonGeometry = turf.bboxPolygon(bbox);
    const filteredPolygons = polygons.features.filter((feature) => {
      if (
        feature.geometry.type === "Polygon" ||
        feature.geometry.type === "MultiPolygon"
      ) {
        const geometry =
          feature.geometry.type === "Polygon"
            ? turf.multiPolygon([feature.geometry.coordinates]) // Convert Polygon to MultiPolygon
            : feature;
        return turf.booleanIntersects(geometry, bboxPolygonGeometry);
      }
      return false;
    });
    polygons = turf.featureCollection(filteredPolygons);
  }

  if (limit) {
    if (polygons.features.length <= limit) {
      finalPolygons = polygons;
    } else if (limit < 1000) {
      const limitedPolygons = polygons.features.slice(0, limit);
      finalPolygons = turf.featureCollection(limitedPolygons);
    } else if (limit > 1000) {
      finalPolygons = polygons;
    } else {
      return GetBadRequestErrorResponse(
        "Invalid input. Provide a valid limit number."
      );
    }
  } else {
    finalPolygons = polygons;
  }

  if (withProperties) {
    const multiPolygonsWithProperties =
      populateGeoJsonFeatureCollectionWithProperties(finalPolygons);
    return multiPolygonsWithProperties;
  }

  return finalPolygons;
}

/**
 * MultiPolygonsLimitAndWithin() - Filters and limits multi polygons based on a GeoJSON polygon or bbox.
 */
export function MultiPolygonsLimitAndWithin(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result =
      MultiPolygonsLimitAndWithinOrMultiPolygonsLimitAndWithinWithProperties(
        body,
        false
      );
    if ("error" in result) {
      // result is a BadRequestErrorResponse
      return result as BadRequestErrorResponse;
    } else {
      // result is a Feature<LineString, GeoJsonProperties>
      return GetOkResponse(result);
    }
  } catch (error: any) {
    return GetInternalServerErrorResponse(
      `Error processing input: ${error.message}`
    );
  }
}

export function MultiPolygonsLimitAndWithinWithProperties(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result =
      MultiPolygonsLimitAndWithinOrMultiPolygonsLimitAndWithinWithProperties(
        body,
        true
      );
    if ("error" in result) {
      // result is a BadRequestErrorResponse
      return result as BadRequestErrorResponse;
    } else {
      // result is a Feature<LineString, GeoJsonProperties>
      return GetOkResponse(result);
    }
  } catch (error: any) {
    return GetInternalServerErrorResponse(
      `Error processing input: ${error.message}`
    );
  }
}

function RandomMultiPolygonsOrRandomMultiPolygonsWithProperties(
  withProperties: boolean
) {
  const globalBbox: [number, number, number, number] = [-180, -90, 180, 90];
  const randomPolygons = [];

  for (let i = 0; i < 30; i++) {
    const polygon = turf.randomPolygon(1, { bbox: globalBbox });
    const multiPolygon = turf.multiPolygon([
      polygon.features[0].geometry.coordinates,
    ]);
    randomPolygons.push(multiPolygon);
  }

  const randomPolygonsCollection = turf.featureCollection(randomPolygons);

  if (withProperties) {
    const multiPolygonsWithProperties =
      populateGeoJsonFeatureCollectionWithProperties(randomPolygonsCollection);
    return multiPolygonsWithProperties;
  }
  return randomPolygonsCollection;
}

/**
 * RandomMultiPolygons() - Returns 30 random polygons as MultiPolygon geometries within a global bounding box.
 */
export function RandomMultiPolygons(): OkResponse {
  return GetOkResponse(
    RandomMultiPolygonsOrRandomMultiPolygonsWithProperties(false)
  );
}

export function RandomMultiPolygonsWithProperties(): OkResponse {
  return GetOkResponse(
    RandomMultiPolygonsOrRandomMultiPolygonsWithProperties(true)
  );
}

function RandomMultiPolygonsLimitAndWithinOrRandomMultiPolygonsLimitAndWithinWithProperties(
  body: any,
  withProperties: boolean
) {
  const { geojsonPolygon, bbox, limit = 30 } = body;

  const globalBbox: [number, number, number, number] = [-180, -90, 180, 90];
  const randomPolygons = Array.from(
    { length: 100 },
    () => turf.randomPolygon(1, { bbox: globalBbox }).features[0]
  );

  let filteredPolygons = randomPolygons;

  if (
    geojsonPolygon &&
    (isGeoJSONPolygon(geojsonPolygon) || isGeoJSONMultiPolygon(geojsonPolygon))
  ) {
    filteredPolygons = filteredPolygons.filter((polygon) =>
      turf.booleanIntersects(polygon, geojsonPolygon)
    );
  } else if (bbox && isValidBBox(bbox)) {
    const bboxPolygon = turf.bboxPolygon(bbox);
    filteredPolygons = filteredPolygons.filter((polygon) =>
      turf.booleanIntersects(polygon, bboxPolygon)
    );
  } else {
    return GetBadRequestErrorResponse(
      "Invalid input. Provide either a valid GeoJSON polygon or bbox."
    );
  }

  const multiPolygons = turf.featureCollection(
    filteredPolygons
      .slice(0, limit)
      .map((polygon) => turf.multiPolygon([polygon.geometry.coordinates]))
  );

  if (withProperties) {
    const multiPolygonsWithProperties =
      populateGeoJsonFeatureCollectionWithProperties(multiPolygons);
    return multiPolygonsWithProperties;
  }

  return multiPolygons;
}
/**
 * Random MultiPolygons with limit and within a polygon or bbox.
 */
export function RandomMultiPolygonsLimitAndWithin(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  const result =
    RandomMultiPolygonsLimitAndWithinOrRandomMultiPolygonsLimitAndWithinWithProperties(
      body,
      false
    );
  if ("error" in result) {
    // result is a BadRequestErrorResponse
    return result as BadRequestErrorResponse;
  } else {
    // result is a Feature<LineString, GeoJsonProperties>
    return GetOkResponse(result);
  }
}

export function RandomMultiPolygonsLimitAndWithinWithProperties(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  const result =
    RandomMultiPolygonsLimitAndWithinOrRandomMultiPolygonsLimitAndWithinWithProperties(
      body,
      true
    );
  if ("error" in result) {
    // result is a BadRequestErrorResponse
    return result as BadRequestErrorResponse;
  } else {
    // result is a Feature<LineString, GeoJsonProperties>
    return GetOkResponse(result);
  }
}
