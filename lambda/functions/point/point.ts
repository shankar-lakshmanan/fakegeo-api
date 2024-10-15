import * as turf from "@turf/turf";
import {Feature, Geometry, FeatureCollection} from "geojson";
import { APIGatewayProxyResult } from "aws-lambda";
import { GetBadRequestErrorResponse, GetInternalServerErrorResponse, GetOkResponse, OkResponse } from "../../util/stringify";
import { thousandPoints } from "./thousandPoints";
import { booleanPointInPolygon } from "@turf/turf";

export function Point(
  ): OkResponse {
    const point = turf.point([-101.278818, 40.816337]);
    return GetOkResponse(point);
  }

  export function RandomPoint(
  ): OkResponse {
    const point = turf.randomPoint(1, { bbox: [-180, -90, 180, 90] });
    return GetOkResponse(point.features[0]);
  }

  
/**
 * Validate if a GeoJSON object is a polygon feature.
 */
export function isGeoJSONPolygon(geojson: Feature): boolean {
  return geojson.type === "Feature" && geojson.geometry && geojson.geometry.type === "Polygon";
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

const body = JSON.parse(event.body || "{}")

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
    return GetBadRequestErrorResponse("Invalid input. Provide either a valid GeoJSON polygon or a bbox.");
  }

  return GetOkResponse(point);
} catch (error:any) {
  return GetInternalServerErrorResponse(`Error processing input: ${error.message}`);
}
}


/**
* Validates the input and returns a random point within a GeoJSON polygon or bbox.
*/
export function WithinRandomPoint(event: any): APIGatewayProxyResult {

const body = JSON.parse(event.body || "{}")

let point;

try {
  const { geojsonPolygon, bbox } = body;

  // Check if geojsonPolygon is valid
  if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {

    const bboxOfPolygon = turf.bbox(geojsonPolygon);
    const randomPointsOfBboxOfPolygon = turf.randomPoint(50, {bbox: bboxOfPolygon})

    let randomPoint;
    randomPointsOfBboxOfPolygon.features.forEach((point) => {
      if(turf.booleanWithin(point, geojsonPolygon)){
          randomPoint = point;
          return
      }
    });

    // Return the center which is always within the polygon
    point = randomPoint
    
  }
  // Check if bbox is valid
  else if (bbox && isValidBBox(bbox)) {
    // Return the center which is always within the polygon
    point = turf.randomPoint(1, {bbox: bbox}).features[0]
  } else {
    return GetBadRequestErrorResponse("Invalid input. Provide either a valid GeoJSON polygon or a bbox.");
  }

  return GetOkResponse(point);
} catch (error:any) {
  return GetInternalServerErrorResponse(`Error processing input: ${error.message}`);
}
}


export function Points(
): OkResponse {
  const points: FeatureCollection = thousandPoints;
  const thirtyPoints = points.features.slice(970);
  const reducedPoints: FeatureCollection = {
    ...points,
    features: [...thirtyPoints]
  }
  return GetOkResponse(reducedPoints);
}

export function PointsLimitAndWithin(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}")

  try {
  const { limit, geojsonPolygon, bbox } = body;

  let points: FeatureCollection = thousandPoints;
  let finalPoints: FeatureCollection;
  // Check if geojsonPolygon is valid
  if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {

    const filteredPoints = points.features.filter((feature) => {
      // Check if the feature is a point and within the bbox polygon
      return feature.geometry.type === "Point" && booleanPointInPolygon(feature.geometry.coordinates, geojsonPolygon);
    });
    
    // Wrap the filtered points back into a FeatureCollection
    points = turf.featureCollection(filteredPoints);

  } else if (bbox && isValidBBox(bbox)) {
    const bboxPolygonGeometry = turf.bboxPolygon(bbox); // Create a polygon from the bbox
    
    const filteredPoints = points.features.filter((feature) => {
      // Check if the feature is a point and within the bbox polygon
      return feature.geometry.type === "Point" && booleanPointInPolygon(feature.geometry.coordinates, bboxPolygonGeometry);
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
    } else if(limit > 1000){
      // If limit is greater than 1000, return all points
      finalPoints = points;
    } else {
      return GetBadRequestErrorResponse("Invalid input. Provide a valid limit number");
    }
  } else {
    // If no limit is specified, return all points
    finalPoints = points;
  }

  return GetOkResponse(finalPoints);
} catch (error:any) {
  return GetInternalServerErrorResponse(`Error processing input: ${error.message}`);
}
}