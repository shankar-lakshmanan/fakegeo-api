import * as turf from "@turf/turf";
import { booleanPointInPolygon } from "@turf/turf";
import { FeatureCollection } from "geojson";
import { isGeoJSONPolygon, isValidBBox } from "../../util/geojsonHelper";
import { GetBadRequestErrorResponse } from "../../util/stringify";
import { thousandPoints } from "../geojsonData/thousandPoints";
import { populateGeoJsonFeatureCollectionWithProperties } from "../properties/properties";

export function PointsOrPointsWithProperties(withProperties: boolean) {
  const points: FeatureCollection = thousandPoints;
  const thirtyPoints = points.features.slice(970);
  const reducedPoints: FeatureCollection = {
    ...points,
    features: [...thirtyPoints],
  };

  if (withProperties) {
    const pointsWithProperties =
      populateGeoJsonFeatureCollectionWithProperties(reducedPoints);
    return pointsWithProperties;
  }
  return reducedPoints;
}

export function PointsLimitAndWithinOrPointsLimitAndWithinWithProperties(
  body: any,
  withProperties: boolean
) {
  const { limit, geojsonPolygon, bbox } = body;

  let points: FeatureCollection = thousandPoints;
  let finalPoints: FeatureCollection;
  // Check if geojsonPolygon is valid
  if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {
    const filteredPoints = points.features.filter((feature) => {
      // Check if the feature is a point and within the bbox polygon
      return (
        feature.geometry.type === "Point" &&
        booleanPointInPolygon(feature.geometry.coordinates, geojsonPolygon)
      );
    });

    // Wrap the filtered points back into a FeatureCollection
    points = turf.featureCollection(filteredPoints);
  } else if (bbox && isValidBBox(bbox)) {
    const bboxPolygonGeometry = turf.bboxPolygon(bbox); // Create a polygon from the bbox

    const filteredPoints = points.features.filter((feature) => {
      // Check if the feature is a point and within the bbox polygon
      return (
        feature.geometry.type === "Point" &&
        booleanPointInPolygon(feature.geometry.coordinates, bboxPolygonGeometry)
      );
    });

    // Wrap the filtered points back into a FeatureCollection
    points = turf.featureCollection(filteredPoints);
  }

  if (limit) {
    if (points.features.length <= limit) {
      // If there are fewer or equal points than the limit, return all points
      finalPoints = points;
    } else if (limit < 1000) {
      // If limit is less than 1000, return the specified number of points
      const limitedPoints = points.features.slice(0, limit);
      finalPoints = {
        ...points,
        features: limitedPoints,
      };
    } else if (limit > 1000) {
      // If limit is greater than 1000, return all points
      finalPoints = points;
    } else {
      return GetBadRequestErrorResponse(
        "Invalid input. Provide a valid limit number"
      );
    }
  } else {
    // If no limit is specified, return all points
    finalPoints = points;
  }

  if (withProperties) {
    const pointsWithProperties =
      populateGeoJsonFeatureCollectionWithProperties(finalPoints);
    return pointsWithProperties;
  }

  return finalPoints;
}

export function RandomPointsOrRandomPointsWithProperties(
  withProperties: boolean
) {
  var thirtyPoints: FeatureCollection = turf.randomPoint(30, {
    bbox: [-180, -90, 180, 90],
  });

  if (withProperties) {
    const pointsWithProperties =
      populateGeoJsonFeatureCollectionWithProperties(thirtyPoints);
    return pointsWithProperties;
  }
  return thirtyPoints;
}

export function RandomPointsLimitAndWithinOrRandomPointsLimitAndWithinWithProperties(
  body: any,
  withProperties: boolean
) {
  const { limit, geojsonPolygon, bbox } = body;

  let points: FeatureCollection = turf.randomPoint(1000);
  let finalPoints: FeatureCollection;
  // Check if geojsonPolygon is valid
  if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {
    var bboxPoly = turf.bbox(geojsonPolygon);
    points = turf.randomPoint(1000, { bbox: bboxPoly });
  } else if (bbox && isValidBBox(bbox)) {
    // Create a polygon from the bbox
    points = turf.randomPoint(1000, { bbox: bbox });
  }

  if (limit) {
    if (points.features.length <= limit) {
      // If there are fewer or equal points than the limit, return all points
      finalPoints = points;
    } else if (limit < 1000) {
      // If limit is less than 1000, return the specified number of points
      const limitedPoints = points.features.slice(0, limit);
      finalPoints = {
        ...points,
        features: limitedPoints,
      };
    } else if (limit > 1000) {
      // If limit is greater than 1000, return all points
      finalPoints = points;
    } else {
      return GetBadRequestErrorResponse(
        "Invalid input. Provide a valid limit number"
      );
    }
  } else {
    // If no limit is specified, return all points
    finalPoints = points;
  }

  if (withProperties) {
    const pointsWithProperties =
      populateGeoJsonFeatureCollectionWithProperties(finalPoints);
    return pointsWithProperties;
  }

  return finalPoints;
}
