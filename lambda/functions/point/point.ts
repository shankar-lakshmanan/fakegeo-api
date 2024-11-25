import * as turf from "@turf/turf";
import { Feature, Geometry, FeatureCollection } from "geojson";
import { APIGatewayProxyResult } from "aws-lambda";
import {
  GetBadRequestErrorResponse,
  GetInternalServerErrorResponse,
  GetOkResponse,
  OkResponse,
} from "../../util/stringify";
import { thousandPoints } from "./thousandPoints";
import { booleanPointInPolygon } from "@turf/turf";
import { populateGeoJsonFeatureCollectionWithProperties, populateGeoJsonFeatureWithProperties } from "../properties/properties";

function GetPoint() {
  return turf.point([-101.278818, 40.816337]);
}

export function Point(): OkResponse {
  const point = GetPoint();
  return GetOkResponse(point);
}

export function PointWithProperties(): OkResponse {
  const point = GetPoint();
  const pointWithProperties = populateGeoJsonFeatureWithProperties(point);
  return GetOkResponse(pointWithProperties);
}

function GetRandomPoint() {
  return turf.randomPoint(1, { bbox: [-180, -90, 180, 90] });
}

export function RandomPoint(): OkResponse {
  const point = GetRandomPoint();
  return GetOkResponse(point.features[0]);
}

export function RandomPointWithProperties(): OkResponse {
  const point = GetRandomPoint();
  const pointWithProperties = populateGeoJsonFeatureWithProperties(point.features[0]);
  return GetOkResponse(pointWithProperties);
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

/**
 * Validates the input and returns a point within a GeoJSON polygon or bbox.
 */
export function WithinPoint(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  let point;

  try {
    const { geojsonPolygon, bbox } = body;

    // Check if geojsonPolygon is valid
    if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {
      // Return the center which is always within the polygon
      point = turf.center(geojsonPolygon);
    }
    // Check if bbox is valid
    else if (bbox && isValidBBox(bbox)) {
      const bboxPolygon = turf.bboxPolygon(bbox);
      // Return the center which is always within the polygon
      point = turf.center(bboxPolygon);
    } else {
      return GetBadRequestErrorResponse(
        "Invalid input. Provide either a valid GeoJSON polygon or a bbox."
      );
    }

    return GetOkResponse(point);
  } catch (error: any) {
    return GetInternalServerErrorResponse(
      `Error processing input: ${error.message}`
    );
  }
}

export function WithinPointWithProperties(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  let point;

  try {
    const { geojsonPolygon, bbox } = body;

    // Check if geojsonPolygon is valid
    if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {
      // Return the center which is always within the polygon
      point = turf.center(geojsonPolygon);
    }
    // Check if bbox is valid
    else if (bbox && isValidBBox(bbox)) {
      const bboxPolygon = turf.bboxPolygon(bbox);
      // Return the center which is always within the polygon
      point = turf.center(bboxPolygon);
    } else {
      return GetBadRequestErrorResponse(
        "Invalid input. Provide either a valid GeoJSON polygon or a bbox."
      );
    }

    const pointWithProperties = populateGeoJsonFeatureWithProperties(point)
    return GetOkResponse(pointWithProperties);
  } catch (error: any) {
    return GetInternalServerErrorResponse(
      `Error processing input: ${error.message}`
    );
  }
}



/**
 * Validates the input and returns a random point within a GeoJSON polygon or bbox.
 */
export function WithinRandomPoint(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  let point;

  try {
    const { geojsonPolygon, bbox } = body;

    // Check if geojsonPolygon is valid
    if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {
      const bboxOfPolygon = turf.bbox(geojsonPolygon);
      const randomPointsOfBboxOfPolygon = turf.randomPoint(50, {
        bbox: bboxOfPolygon,
      });

      let randomPoint;
      randomPointsOfBboxOfPolygon.features.forEach((point) => {
        if (turf.booleanWithin(point, geojsonPolygon)) {
          randomPoint = point;
          return;
        }
      });

      // Return the center which is always within the polygon
      point = randomPoint;
    }
    // Check if bbox is valid
    else if (bbox && isValidBBox(bbox)) {
      // Return the center which is always within the polygon
      point = turf.randomPoint(1, { bbox: bbox }).features[0];
    } else {
      return GetBadRequestErrorResponse(
        "Invalid input. Provide either a valid GeoJSON polygon or a bbox."
      );
    }

    return GetOkResponse(point);
  } catch (error: any) {
    return GetInternalServerErrorResponse(
      `Error processing input: ${error.message}`
    );
  }
}

export function WithinRandomPointWithProperties(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  let point;

  try {
    const { geojsonPolygon, bbox } = body;

    // Check if geojsonPolygon is valid
    if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {
      const bboxOfPolygon = turf.bbox(geojsonPolygon);
      const randomPointsOfBboxOfPolygon = turf.randomPoint(50, {
        bbox: bboxOfPolygon,
      });

      let randomPoint;
      randomPointsOfBboxOfPolygon.features.forEach((point) => {
        if (turf.booleanWithin(point, geojsonPolygon)) {
          randomPoint = point;
          return;
        }
      });

      // Return the center which is always within the polygon
      point = randomPoint;
    }
    // Check if bbox is valid
    else if (bbox && isValidBBox(bbox)) {
      // Return the center which is always within the polygon
      point = turf.randomPoint(1, { bbox: bbox }).features[0];
    } else {
      return GetBadRequestErrorResponse(
        "Invalid input. Provide either a valid GeoJSON polygon or a bbox."
      );
    }

    if(point){
      const pointWithProperties = populateGeoJsonFeatureWithProperties(point)
      return GetOkResponse(pointWithProperties);
    }else {
      return GetBadRequestErrorResponse(
        "Invalid input. Provide either a valid GeoJSON polygon or a bbox."
      );
    }
    
  } catch (error: any) {
    return GetInternalServerErrorResponse(
      `Error processing input: ${error.message}`
    );
  }
}

export function Points(): OkResponse {
  const points: FeatureCollection = thousandPoints;
  const thirtyPoints = points.features.slice(970);
  const reducedPoints: FeatureCollection = {
    ...points,
    features: [...thirtyPoints],
  };
  return GetOkResponse(reducedPoints);
}

export function PointsWithProperties(): OkResponse {
  const points: FeatureCollection = thousandPoints;
  const thirtyPoints = points.features.slice(970);
  const reducedPoints: FeatureCollection = {
    ...points,
    features: [...thirtyPoints],
  };
  const pointsWithProperties = populateGeoJsonFeatureCollectionWithProperties(reducedPoints);
  return GetOkResponse(pointsWithProperties);
}

export function PointsLimitAndWithin(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
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
          booleanPointInPolygon(
            feature.geometry.coordinates,
            bboxPolygonGeometry
          )
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

    return GetOkResponse(finalPoints);
  } catch (error: any) {
    return GetInternalServerErrorResponse(
      `Error processing input: ${error.message}`
    );
  }
}

export function PointsLimitAndWithinWithProperties(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
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
          booleanPointInPolygon(
            feature.geometry.coordinates,
            bboxPolygonGeometry
          )
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

    const finalPointsWithProperties = populateGeoJsonFeatureCollectionWithProperties(finalPoints);
    return GetOkResponse(finalPointsWithProperties);
  } catch (error: any) {
    return GetInternalServerErrorResponse(
      `Error processing input: ${error.message}`
    );
  }
}

export function RandomPoints(): OkResponse {
  var thirtyPoints: FeatureCollection = turf.randomPoint(30, {
    bbox: [-180, -90, 180, 90],
  });
  return GetOkResponse(thirtyPoints);
}

export function RandomPointsWithProperties(): OkResponse {
  var thirtyPoints: FeatureCollection = turf.randomPoint(30, {
    bbox: [-180, -90, 180, 90],
  });
  
  const randomPointsProperties = populateGeoJsonFeatureCollectionWithProperties(thirtyPoints);
  return GetOkResponse(randomPointsProperties);
}

export function RandomPointsLimitAndWithin(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const { limit, geojsonPolygon, bbox } = body;

    let points: FeatureCollection = { features: [], type: "FeatureCollection" };
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

    return GetOkResponse(finalPoints);
  } catch (error: any) {
    return GetInternalServerErrorResponse(
      `Error processing input: ${error.message}`
    );
  }
}

export function RandomPointsLimitAndWithinWithProperties(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const { limit, geojsonPolygon, bbox } = body;

    let points: FeatureCollection = { features: [], type: "FeatureCollection" };
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

    const finalPointsWithProperties = populateGeoJsonFeatureCollectionWithProperties(finalPoints);

    return GetOkResponse(finalPointsWithProperties);
  } catch (error: any) {
    return GetInternalServerErrorResponse(
      `Error processing input: ${error.message}`
    );
  }
}