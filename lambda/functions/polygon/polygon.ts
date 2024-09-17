import * as turf from "@turf/turf";
import { Feature, Geometry, Point } from "geojson";
import { APIGatewayProxyResult } from "aws-lambda";
import { GetBadRequestErrorResponse, GetInternalServerErrorResponse, GetOkResponse, OkResponse } from "../../util/stringify";

export function Polygon(
  ): OkResponse {
    const polygon = turf.polygon(
      [
        [
          [
            -98.41003457659247,
            39.4047785977163
          ],
          [
            -98.02900405028468,
            39.09917828895786
          ],
          [
            -96.96285807131997,
            39.33112358709519
          ],
          [
            -97.70240571181387,
            39.862404027619164
          ],
          [
            -97.89292169019507,
            39.56582676744193
          ],
          [
            -98.18773342170626,
            39.71250430627077
          ],
          [
            -98.41003457659247,
            39.4047785977163
          ]
        ]
      ]
    );
    return GetOkResponse(polygon);
  }

  export function RandomPolygon(
  ): OkResponse {
    const polygon = turf.randomPolygon(1, { bbox: [-180, -90, 180, 90] });
    return GetOkResponse(polygon.features[0]);
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
 * Validates the input and returns a Polygon at the center of a GeoJSON polygon or bbox.
 */
export function WithinPolygon(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  let polygon;

  try {
    const { geojsonPolygon, bbox } = body;

    // Check if geojsonPolygon is valid
    if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {

      // Create a bounding box based on the polygon and get its center
      const bboxPolygon = turf.bboxPolygon(turf.bbox(geojsonPolygon));
      const bboxCenter = turf.center(bboxPolygon);

      // Calculate 6 points around the center point at different angles to form a polygon
      const point1 = turf.destination(bboxCenter, 0.1, 0);    // 0 degrees
      const point2 = turf.destination(bboxCenter, 0.1, 60);   // 60 degrees
      const point3 = turf.destination(bboxCenter, 0.1, 120);  // 120 degrees
      const point4 = turf.destination(bboxCenter, 0.1, 180);  // 180 degrees
      const point5 = turf.destination(bboxCenter, 0.1, 240);  // 240 degrees
      const point6 = turf.destination(bboxCenter, 0.1, 300);  // 300 degrees

      // Create a polygon from these 6 points and close the loop by repeating the first point
      polygon = turf.polygon([[
        point1.geometry.coordinates,
        point2.geometry.coordinates,
        point3.geometry.coordinates,
        point4.geometry.coordinates,
        point5.geometry.coordinates,
        point6.geometry.coordinates,
        point1.geometry.coordinates  // Close the polygon
      ]]);
    }
    // Check if bbox is valid
    else if (bbox && isValidBBox(bbox)) {
      const bboxPolygon = turf.bboxPolygon(bbox);
      const bboxCenter = turf.center(bboxPolygon);

      // Calculate 6 points around the center point at different angles to form a polygon
      const point1 = turf.destination(bboxCenter, 0.1, 0);    // 0 degrees
      const point2 = turf.destination(bboxCenter, 0.1, 60);   // 60 degrees
      const point3 = turf.destination(bboxCenter, 0.1, 120);  // 120 degrees
      const point4 = turf.destination(bboxCenter, 0.1, 180);  // 180 degrees
      const point5 = turf.destination(bboxCenter, 0.1, 240);  // 240 degrees
      const point6 = turf.destination(bboxCenter, 0.1, 300);  // 300 degrees

      // Create a polygon from these 6 points and close the loop by repeating the first point
      polygon = turf.polygon([[
        point1.geometry.coordinates,
        point2.geometry.coordinates,
        point3.geometry.coordinates,
        point4.geometry.coordinates,
        point5.geometry.coordinates,
        point6.geometry.coordinates,
        point1.geometry.coordinates  // Close the polygon
      ]]);
    } else {
      return GetBadRequestErrorResponse("Invalid input. Provide either a valid GeoJSON polygon or a bbox.");
    }

    return GetOkResponse(polygon);
  } catch (error: any) {
    return GetInternalServerErrorResponse(`Error processing input: ${error.message}`);
  }
}

/**
 * Validates the input and returns a random Polygon at the center of a GeoJSON polygon or bbox.
 */
export function WithinRandomPolygon(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  let polygon;

  try {
    const { geojsonPolygon, bbox } = body;

    // Check if geojsonPolygon is valid
    if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {

      const randomPointsOfBboxOfPolygon = turf.randomPoint(50, {bbox: turf.bbox(geojsonPolygon)})

      let bboxRandomPoint: Feature<Point, any> = {
        type: "Feature",
        geometry: {
          coordinates: [],
          type: "Point"
        },
        properties: undefined
      };
      randomPointsOfBboxOfPolygon.features.forEach((point: Feature<Point, any>) => {
        if(turf.booleanWithin(point, geojsonPolygon)){
          bboxRandomPoint = point;
          return
        }
      });

      // Calculate 6 points around the center point at different angles to form a polygon
      const point1 = turf.destination(bboxRandomPoint, 0.1, 0);    // 0 degrees
      const point2 = turf.destination(bboxRandomPoint, 0.1, 60);   // 60 degrees
      const point3 = turf.destination(bboxRandomPoint, 0.1, 120);  // 120 degrees
      const point4 = turf.destination(bboxRandomPoint, 0.1, 180);  // 180 degrees
      const point5 = turf.destination(bboxRandomPoint, 0.1, 240);  // 240 degrees
      const point6 = turf.destination(bboxRandomPoint, 0.1, 300);  // 300 degrees

      // Create a polygon from these 6 points and close the loop by repeating the first point
      polygon = turf.polygon([[
        point1.geometry.coordinates,
        point2.geometry.coordinates,
        point3.geometry.coordinates,
        point4.geometry.coordinates,
        point5.geometry.coordinates,
        point6.geometry.coordinates,
        point1.geometry.coordinates  // Close the polygon
      ]]);
    }
    // Check if bbox is valid
    else if (bbox && isValidBBox(bbox)) {
      // Return the center which is always within the polygon
      const point = turf.randomPoint(1, {bbox: bbox}).features[0]

      // Calculate 6 points around the center point at different angles to form a polygon
      const point1 = turf.destination(point, 0.1, 0);    // 0 degrees
      const point2 = turf.destination(point, 0.1, 60);   // 60 degrees
      const point3 = turf.destination(point, 0.1, 120);  // 120 degrees
      const point4 = turf.destination(point, 0.1, 180);  // 180 degrees
      const point5 = turf.destination(point, 0.1, 240);  // 240 degrees
      const point6 = turf.destination(point, 0.1, 300);  // 300 degrees

      // Create a polygon from these 6 points and close the loop by repeating the first point
      polygon = turf.polygon([[
        point1.geometry.coordinates,
        point2.geometry.coordinates,
        point3.geometry.coordinates,
        point4.geometry.coordinates,
        point5.geometry.coordinates,
        point6.geometry.coordinates,
        point1.geometry.coordinates  // Close the polygon
      ]]);
    } else {
      return GetBadRequestErrorResponse("Invalid input. Provide either a valid GeoJSON polygon or a bbox.");
    }

    return GetOkResponse(polygon);
  } catch (error: any) {
    return GetInternalServerErrorResponse(`Error processing input: ${error.message}`);
  }
}
