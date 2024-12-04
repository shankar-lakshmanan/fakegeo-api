import * as turf from "@turf/turf";
import { Feature, Geometry, FeatureCollection } from "geojson";
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
import { populateGeoJsonFeatureCollectionWithProperties, populateGeoJsonFeatureWithProperties } from "../properties/properties";


function PointOrPointWithProperties(withProperties: boolean) {
  const point = turf.point([-101.278818, 40.816337]);

  if (withProperties) {
    const pointWithProperties = populateGeoJsonFeatureWithProperties(point);
    return pointWithProperties;
  }
  return point;
}

export function Point(): OkResponse {
  return GetOkResponse(PointOrPointWithProperties(false));
}

export function PointWithProperties(): OkResponse {
  return GetOkResponse(PointOrPointWithProperties(true));
}

function RandomPointOrRandomPointWithProperties(withProperties: boolean) {
  const point = turf.randomPoint(1, { bbox: [-180, -90, 180, 90] }).features[0];

  if (withProperties) {
    const pointWithProperties = populateGeoJsonFeatureWithProperties(point);
    return pointWithProperties;
  }
  return point;
}

export function RandomPoint(): OkResponse {
  return GetOkResponse(RandomPointOrRandomPointWithProperties(false));
}

export function RandomPointWithProperties(): OkResponse {
  return GetOkResponse(RandomPointOrRandomPointWithProperties(true));
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

function WithinPointOrWithinPointWithProperties(
  body: any,
  withProperties: boolean
) {

  let point;

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

  if (withProperties) {
    const pointWithProperties = populateGeoJsonFeatureWithProperties(point);
    return pointWithProperties;
  }

  return point;
}

/**
 * Validates the input and returns a point within a GeoJSON polygon or bbox.
 */
export function WithinPoint(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result = WithinPointOrWithinPointWithProperties(
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

export function WithinPointWithProperties(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result = WithinPointOrWithinPointWithProperties(
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

function WithinRandomPointOrWithinRandomPointWithProperties(
  body: any,
  withProperties: boolean
) {
  let point;

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

  if (point && withProperties) {
    const pointWithProperties = populateGeoJsonFeatureWithProperties(point);
    return pointWithProperties;
  }

  return point;
}

/**
 * Validates the input and returns a random point within a GeoJSON polygon or bbox.
 */
export function WithinRandomPoint(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result = WithinRandomPointOrWithinRandomPointWithProperties(
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

export function WithinRandomPointWithProperties(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result = WithinRandomPointOrWithinRandomPointWithProperties(
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

function PointsOrPointsWithProperties(withProperties: boolean) {
  const points: FeatureCollection = thousandPoints;
  const thirtyPoints = points.features.slice(970);
  const reducedPoints: FeatureCollection = {
    ...points,
    features: [...thirtyPoints],
  };

  if (withProperties) {
    const pointsWithProperties = populateGeoJsonFeatureCollectionWithProperties(reducedPoints);
    return pointsWithProperties;
  }
  return reducedPoints;
}

export function Points(): OkResponse {
  return GetOkResponse(PointsOrPointsWithProperties(false));
}

export function PointsWithProperties(): OkResponse {
  return GetOkResponse(PointsOrPointsWithProperties(true));
}

function PointsLimitAndWithinOrPointsLimitAndWithinWithProperties(
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

  if (withProperties) {
    const pointsWithProperties = populateGeoJsonFeatureCollectionWithProperties(finalPoints);
    return pointsWithProperties;
  }

  return finalPoints;
}

export function PointsLimitAndWithin(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result = PointsLimitAndWithinOrPointsLimitAndWithinWithProperties(
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

export function PointsLimitAndWithinWithProperties(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result = PointsLimitAndWithinOrPointsLimitAndWithinWithProperties(
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

function RandomPointsOrRandomPointsWithProperties(withProperties: boolean) {
  var thirtyPoints: FeatureCollection = turf.randomPoint(30, {
    bbox: [-180, -90, 180, 90],
  });

  if (withProperties) {
    const pointsWithProperties = populateGeoJsonFeatureCollectionWithProperties(thirtyPoints);
    return pointsWithProperties;
  }
  return thirtyPoints;
}

export function RandomPoints(): OkResponse {
  return GetOkResponse(RandomPointsOrRandomPointsWithProperties(false));
}

export function RandomPointsWithProperties(): OkResponse {
  return GetOkResponse(RandomPointsOrRandomPointsWithProperties(true));
}

function RandomPointsLimitAndWithinOrRandomPointsLimitAndWithinWithProperties(
  body: any,
  withProperties: boolean
) {

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

  if (withProperties) {
    const pointsWithProperties = populateGeoJsonFeatureCollectionWithProperties(finalPoints);
    return pointsWithProperties;
  }

  return finalPoints;
}

export function RandomPointsLimitAndWithin(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result = RandomPointsLimitAndWithinOrRandomPointsLimitAndWithinWithProperties(
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

export function RandomPointsLimitAndWithinWithProperties(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result = RandomPointsLimitAndWithinOrRandomPointsLimitAndWithinWithProperties(
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