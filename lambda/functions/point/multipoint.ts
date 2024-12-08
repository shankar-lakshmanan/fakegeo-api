import * as turf from "@turf/turf";
import { Feature, Geometry, FeatureCollection, Point } from "geojson";
import { APIGatewayProxyResult } from "aws-lambda";
import {
  BadRequestErrorResponse,
  GetBadRequestErrorResponse,
  GetInternalServerErrorResponse,
  GetOkResponse,
  OkResponse,
} from "../../util/stringify";
import { thousandPoints } from "./thousandPoints";
import { booleanPointInPolygon } from "@turf/turf";
import {
  populateGeoJsonFeatureCollectionWithProperties,
  populateGeoJsonFeatureWithProperties,
} from "../properties/properties";

function MultiPointOrMultiPointWithProperties(withProperties: boolean) {
  const multipoint = turf.multiPoint([
    [-101.278818, 40.816337],
    [-99.40157045143154, 39.19210754121596],
  ]);

  if (withProperties) {
    const multiPointWithProperties =
      populateGeoJsonFeatureWithProperties(multipoint);
    return multiPointWithProperties;
  }
  return multipoint;
}

export function MultiPoint(): OkResponse {
  return GetOkResponse(MultiPointOrMultiPointWithProperties(false));
}

export function MultiPointWithProperties(): OkResponse {
  return GetOkResponse(MultiPointOrMultiPointWithProperties(true));
}

function RandomMultiPointOrRandomMultiPointWithProperties(
  withProperties: boolean
) {
  const points = turf.randomPoint(2, { bbox: [-180, -90, 180, 90] });
  const coordinates = points.features.map(
    (feature) => feature.geometry.coordinates
  );
  const multipoint = turf.multiPoint(coordinates);

  if (withProperties) {
    const multiPointWithProperties =
      populateGeoJsonFeatureWithProperties(multipoint);
    return multiPointWithProperties;
  }
  return multipoint;
}

export function RandomMultiPoint(): OkResponse {
  return GetOkResponse(RandomMultiPointOrRandomMultiPointWithProperties(false));
}

export function RandomMultiPointWithProperties(): OkResponse {
  return GetOkResponse(RandomMultiPointOrRandomMultiPointWithProperties(true));
}

/**
 * Validate if a GeoJSON object is a polygon feature.
 */
export function isGeoJSONPolygon(geojson: Feature): boolean {
  return (
    geojson.type === "Feature" &&
    geojson.geometry &&
    geojson.geometry.type === "Polygon"
  );
}

/**
 * Validate if the bbox is a valid bounding box (array of four numbers).
 */
export function isValidBBox(bbox: any): boolean {
  return (
    Array.isArray(bbox) &&
    bbox.length === 4 &&
    bbox.every((coord) => typeof coord === "number")
  );
}

function WithinMultiPointOrWithinMultiPointWithProperties(
  body: any,
  withProperties: boolean
) {
  let multipoint;
  const { geojsonPolygon, bbox } = body;

  if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {
    const point = turf.center(geojsonPolygon);
    const [x, y] = point.geometry.coordinates;

    // Offset the second point slightly to the right (east) of the first
    const secondPoint = [x + 0.01, y];

    multipoint = turf.multiPoint([point.geometry.coordinates, secondPoint]);
  } else if (bbox && isValidBBox(bbox)) {
    const bboxPolygon = turf.bboxPolygon(bbox);
    const point = turf.center(bboxPolygon);
    const [x, y] = point.geometry.coordinates;

    // Offset the second point slightly to the right (east) of the first
    const secondPoint = [x + 0.01, y];

    multipoint = turf.multiPoint([point.geometry.coordinates, secondPoint]);
  } else {
    return GetBadRequestErrorResponse(
      "Invalid input. Provide either a valid GeoJSON polygon or a bbox."
    );
  }

  if (withProperties) {
    const pointWithProperties =
      populateGeoJsonFeatureWithProperties(multipoint);
    return pointWithProperties;
  }

  return multipoint;
}
/**
 * Validates the input and returns a multipoint within a GeoJSON polygon or bbox.
 */
export function WithinMultiPoint(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");
  try {
    const result = WithinMultiPointOrWithinMultiPointWithProperties(
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

export function WithinMultiPointWithProperties(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result = WithinMultiPointOrWithinMultiPointWithProperties(body, true);
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

function WithinRandomMultiPointOrWithinRandomMultiPointWithProperties(
  body: any,
  withProperties: boolean
) {
  let multipoint;
  const { geojsonPolygon, bbox } = body;

  if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {
    const bboxOfPolygon = turf.bbox(geojsonPolygon);
    const randomPointsOfBboxOfPolygon = turf.randomPoint(50, {
      bbox: bboxOfPolygon,
    });
    const pointsWithinPolygon = randomPointsOfBboxOfPolygon.features.filter(
      (point) => turf.booleanWithin(point, geojsonPolygon)
    );
    multipoint = turf.multiPoint(
      pointsWithinPolygon.map((point) => point.geometry.coordinates)
    );
  } else if (bbox && isValidBBox(bbox)) {
    const randomPoints = turf.randomPoint(2, { bbox });
    multipoint = turf.multiPoint(
      randomPoints.features.map((point) => point.geometry.coordinates)
    );
  } else {
    return GetBadRequestErrorResponse(
      "Invalid input. Provide either a valid GeoJSON polygon or a bbox."
    );
  }

  if (withProperties) {
    const multiPointWithProperties =
      populateGeoJsonFeatureWithProperties(multipoint);
    return multiPointWithProperties;
  }

  return multipoint;
}
/**
 * Validates the input and returns random multipoints within a GeoJSON polygon or bbox.
 */
export function WithinRandomMultiPoint(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result = WithinRandomMultiPointOrWithinRandomMultiPointWithProperties(
      body,
      false
    );
    if (result && "error" in result) {
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

/**
 * Validates the input and returns random multipoints within a GeoJSON polygon or bbox.
 */
export function WithinRandomMultiPointWithProperties(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result = WithinRandomMultiPointOrWithinRandomMultiPointWithProperties(
      body,
      true
    );
    if (result && "error" in result) {
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

function MultiPointsOrMultiPointsWithProperties(withProperties: boolean) {
  const points: FeatureCollection = thousandPoints;
  const thirtyPoints = points.features.slice(970, 1000); // Get 30 features

  // Convert each point to a MultiPoint feature with an additional point offset slightly to the right
  const multiPoints = thirtyPoints.map((feature) => {
    // Ensure the feature is a Point
    if (feature.geometry.type === "Point") {
      const [x, y] = feature.geometry.coordinates as [number, number];
      const secondPoint = [x + 0.01, y]; // Offset the second point slightly to the right

      // Create a MultiPoint feature for each original point
      return turf.multiPoint([feature.geometry.coordinates, secondPoint]);
    } else {
      // Handle cases where the geometry is not a Point (e.g., ignore or return an empty MultiPoint)
      return turf.multiPoint([]);
    }
  });

  // Wrap the MultiPoint features into a FeatureCollection
  const multiPointCollection = turf.featureCollection(multiPoints);

  if (withProperties) {
    const multiPointsWithProperties =
      populateGeoJsonFeatureCollectionWithProperties(multiPointCollection);
    return multiPointsWithProperties;
  }
  return multiPointCollection;
}

export function MultiPoints(): OkResponse {
  return GetOkResponse(MultiPointsOrMultiPointsWithProperties(false));
}

export function MultiPointsWithProperties(): OkResponse {
  return GetOkResponse(MultiPointsOrMultiPointsWithProperties(true));
}

function MultiPointsLimitAndWithinOrMultiPointsLimitAndWithinWithProperties(
  body: any,
  withProperties: boolean
) {
  const { limit, geojsonPolygon, bbox } = body;

  let points: FeatureCollection = thousandPoints;
  let finalMultiPoints: FeatureCollection;
  let filteredPoints: Feature[] = [];

  // Filter points based on geojsonPolygon or bbox
  if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {
    filteredPoints = points.features.filter(
      (feature) =>
        feature.geometry.type === "Point" &&
        booleanPointInPolygon(
          feature.geometry.coordinates as [number, number],
          geojsonPolygon
        )
    );
  } else if (bbox && isValidBBox(bbox)) {
    const bboxPolygonGeometry = turf.bboxPolygon(bbox);
    filteredPoints = points.features.filter(
      (feature) =>
        feature.geometry.type === "Point" &&
        booleanPointInPolygon(
          feature.geometry.coordinates as [number, number],
          bboxPolygonGeometry
        )
    );
  } else {
    filteredPoints = points.features;
  }

  // Apply limit if specified
  if (limit && limit < filteredPoints.length) {
    filteredPoints = filteredPoints.slice(0, limit);
  }

  // Generate MultiPoint features with offset points, ensuring geometry is of type 'Point'
  const multipoints1 = filteredPoints
    .filter((feature) => feature.geometry.type === "Point")
    .map(
      (feature) => (feature.geometry as Point).coordinates as [number, number]
    );

  const multipoints2 = multipoints1.map(
    ([x, y]) => [x + 0.01, y] as [number, number]
  ); // Offset each point slightly

  const multiPointFeature1 = turf.multiPoint(multipoints1);
  const multiPointFeature2 = turf.multiPoint(multipoints2);

  // Wrap into a FeatureCollection with two MultiPoint features
  finalMultiPoints = turf.featureCollection([
    turf.feature(multiPointFeature1.geometry),
    turf.feature(multiPointFeature2.geometry),
  ]);

  if (withProperties) {
    const multiPointsWithProperties =
      populateGeoJsonFeatureCollectionWithProperties(finalMultiPoints);
    return multiPointsWithProperties;
  }

  return finalMultiPoints;
}

export function MultiPointsLimitAndWithin(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result =
      MultiPointsLimitAndWithinOrMultiPointsLimitAndWithinWithProperties(
        body,
        false
      );
    return GetOkResponse(result);
  } catch (error: any) {
    return GetInternalServerErrorResponse(
      `Error processing input: ${error.message}`
    );
  }
}

export function MultiPointsLimitAndWithinWithProperties(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result =
      MultiPointsLimitAndWithinOrMultiPointsLimitAndWithinWithProperties(
        body,
        true
      );
    return GetOkResponse(result);
  } catch (error: any) {
    return GetInternalServerErrorResponse(
      `Error processing input: ${error.message}`
    );
  }
}

function RandomMultiPointsOrRandomMultiPointsWithProperties(
  withProperties: boolean
) {
  const points = turf.randomPoint(30, { bbox: [-180, -90, 180, 90] });

  let finalMultiPoints: FeatureCollection;

  // Generate two MultiPoint features by adding an offset point for each
  const multipoints1 = points.features
    .filter((feature) => feature.geometry.type === "Point")
    .map(
      (feature) => (feature.geometry as Point).coordinates as [number, number]
    );

  const multipoints2 = multipoints1.map(
    ([x, y]) => [x + 0.01, y] as [number, number]
  ); // Offset each point slightly

  const multiPointFeature1 = turf.multiPoint(multipoints1);
  const multiPointFeature2 = turf.multiPoint(multipoints2);

  // Wrap into a FeatureCollection with two MultiPoint features
  finalMultiPoints = turf.featureCollection([
    turf.feature(multiPointFeature1.geometry),
    turf.feature(multiPointFeature2.geometry),
  ]);

  if (withProperties) {
    const multiPointsWithProperties =
      populateGeoJsonFeatureCollectionWithProperties(finalMultiPoints);
    return multiPointsWithProperties;
  }
  return finalMultiPoints;
}

export function RandomMultiPoints(): OkResponse {
  return GetOkResponse(
    RandomMultiPointsOrRandomMultiPointsWithProperties(false)
  );
}

export function RandomMultiPointsWithProperties(): OkResponse {
  return GetOkResponse(
    RandomMultiPointsOrRandomMultiPointsWithProperties(true)
  );
}

function RandomMultiPointsLimitAndWithinOrRandomMultiPointsLimitAndWithinWithProperties(
  body: any,
  withProperties: boolean
) {
  const { limit, geojsonPolygon, bbox } = body;

  let points: FeatureCollection = { features: [], type: "FeatureCollection" };
  let finalMultiPoints: FeatureCollection;

  // Generate random points within the geojsonPolygon or bbox
  if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {
    const bboxPoly = turf.bbox(geojsonPolygon);
    points = turf.randomPoint(1000, { bbox: bboxPoly });
  } else if (bbox && isValidBBox(bbox)) {
    points = turf.randomPoint(1000, { bbox: bbox });
  }

  // Apply limit if specified
  let limitedPoints = points.features;
  if (limit && limit < limitedPoints.length) {
    limitedPoints = limitedPoints.slice(0, limit);
  }

  // Generate two MultiPoint features by adding an offset point for each
  const multipoints1 = limitedPoints
    .filter((feature) => feature.geometry.type === "Point")
    .map(
      (feature) => (feature.geometry as Point).coordinates as [number, number]
    );

  const multipoints2 = multipoints1.map(
    ([x, y]) => [x + 0.01, y] as [number, number]
  ); // Offset each point slightly

  const multiPointFeature1 = turf.multiPoint(multipoints1);
  const multiPointFeature2 = turf.multiPoint(multipoints2);

  // Wrap into a FeatureCollection with two MultiPoint features
  finalMultiPoints = turf.featureCollection([
    turf.feature(multiPointFeature1.geometry),
    turf.feature(multiPointFeature2.geometry),
  ]);

  if (withProperties) {
    const pointsWithProperties =
      populateGeoJsonFeatureCollectionWithProperties(finalMultiPoints);
    return pointsWithProperties;
  }

  return finalMultiPoints;
}

export function RandomMultiPointsLimitAndWithin(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result =
      RandomMultiPointsLimitAndWithinOrRandomMultiPointsLimitAndWithinWithProperties(
        body,
        false
      );
    return GetOkResponse(result);
  } catch (error: any) {
    return GetInternalServerErrorResponse(
      `Error processing input: ${error.message}`
    );
  }
}

export function RandomMultiPointsLimitAndWithinWithProperties(
  event: any
): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result =
      RandomMultiPointsLimitAndWithinOrRandomMultiPointsLimitAndWithinWithProperties(
        body,
        true
      );
    return GetOkResponse(result);
  } catch (error: any) {
    return GetInternalServerErrorResponse(
      `Error processing input: ${error.message}`
    );
  }
}
