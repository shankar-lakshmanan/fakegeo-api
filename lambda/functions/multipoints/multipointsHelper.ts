import * as turf from "@turf/turf";
import { booleanPointInPolygon } from "@turf/turf";
import { Feature, FeatureCollection, Point } from "geojson";
import { isGeoJSONPolygon, isValidBBox } from "../../util/geojsonHelper";
import { thousandPoints } from "../geojsonData/thousandPoints";
import { populateGeoJsonFeatureCollectionWithProperties } from "../properties/properties";

export function MultiPointsOrMultiPointsWithProperties(
  withProperties: boolean
) {
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

export function MultiPointsLimitAndWithinOrMultiPointsLimitAndWithinWithProperties(
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

export function RandomMultiPointsOrRandomMultiPointsWithProperties(
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

export function RandomMultiPointsLimitAndWithinOrRandomMultiPointsLimitAndWithinWithProperties(
  body: any,
  withProperties: boolean
) {
  const { limit, geojsonPolygon, bbox } = body;

  let points: FeatureCollection = turf.randomPoint(1000);
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
