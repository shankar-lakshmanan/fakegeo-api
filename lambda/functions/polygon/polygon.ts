import * as turf from "@turf/turf";
import { Feature, Geometry, Point, FeatureCollection } from "geojson";
import { APIGatewayProxyResult } from "aws-lambda";
import { BadRequestErrorResponse, GetBadRequestErrorResponse, GetInternalServerErrorResponse, GetOkResponse, OkResponse } from "../../util/stringify";
import { thousandPolygons } from "./thousandPolygons";
import { populateGeoJsonFeatureCollectionWithProperties, populateGeoJsonFeatureWithProperties } from "../properties/properties";

function PolygonOrPolygonWithProperties(withProperties: boolean) {
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

  if (withProperties) {
    const polygonWithProperties = populateGeoJsonFeatureWithProperties(polygon);
    return polygonWithProperties;
  }
  return polygon;
}

export function Polygon(
  ): OkResponse {
    
    return GetOkResponse(PolygonOrPolygonWithProperties(false));
  }

  export function PolygonWithProperties(
  ): OkResponse {
    
    return GetOkResponse(PolygonOrPolygonWithProperties(true));
  }

  function RandomPolygonOrRandomPolygonWithProperties(withProperties: boolean) {
    const polygon = turf.randomPolygon(1, { bbox: [-180, -90, 180, 90] }).features[0];

    if (withProperties) {
      const polygonWithProperties = populateGeoJsonFeatureWithProperties(polygon);
      return polygonWithProperties;
    }
    return polygon;
  }

  export function RandomPolygon(
  ): OkResponse {
    return GetOkResponse(RandomPolygonOrRandomPolygonWithProperties(false));
  }

  export function RandomPolygonWithProperties(
  ): OkResponse {
    return GetOkResponse(RandomPolygonOrRandomPolygonWithProperties(true));
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

function WithinPolygonOrWithinPolygonWithProperties(
  body: any,
  withProperties: boolean
) {
  let polygon;
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

  if (withProperties) {
    const polygonWithProperties = populateGeoJsonFeatureWithProperties(polygon);
    return polygonWithProperties;
  }

  return polygon;

}

/**
 * Validates the input and returns a Polygon at the center of a GeoJSON polygon or bbox.
 */
export function WithinPolygon(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");
  try {
    const result = WithinPolygonOrWithinPolygonWithProperties(
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
    return GetInternalServerErrorResponse(`Error processing input: ${error.message}`);
  }
}

export function WithinPolygonWithProperties(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");
  try {
    const result = WithinPolygonOrWithinPolygonWithProperties(
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
    return GetInternalServerErrorResponse(`Error processing input: ${error.message}`);
  }
}

function WithinRandomPolygonOrWithinRandomPolygonWithProperties(
  body: any,
  withProperties: boolean
) {

  let polygon;
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

    if (withProperties) {
      const polygonWithProperties = populateGeoJsonFeatureWithProperties(polygon);
      return polygonWithProperties;
    }
  
    return polygon;

}

/**
 * Validates the input and returns a random Polygon at the center of a GeoJSON polygon or bbox.
 */
export function WithinRandomPolygon(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    
    const result = WithinRandomPolygonOrWithinRandomPolygonWithProperties(
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
    return GetInternalServerErrorResponse(`Error processing input: ${error.message}`);
  }
}

export function WithinRandomPolygonWithProperties(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    
    const result = WithinRandomPolygonOrWithinRandomPolygonWithProperties(
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
    return GetInternalServerErrorResponse(`Error processing input: ${error.message}`);
  }
}

function PolygonsOrPolygonsWithProperties(withProperties: boolean) {
  const allPolygons = thousandPolygons;
  const last30Polygons = turf.featureCollection(allPolygons.features.slice(-30)); // Get only the last 30 polygons

  if (withProperties) {
    const polygonsWithProperties = populateGeoJsonFeatureCollectionWithProperties(last30Polygons);
    return polygonsWithProperties;
  }
  return last30Polygons;
}

/**
 * Polygons() - Returns a collection of polygons, limited to the last 30 polygons.
 */
export function Polygons(): OkResponse {
  return GetOkResponse(PolygonsOrPolygonsWithProperties(false));
}

export function PolygonsWithProperties(): OkResponse {
  return GetOkResponse(PolygonsOrPolygonsWithProperties(true));
}

function PolygonsLimitAndWithinOrPolygonsLimitAndWithinWithProperties(
  body: any,
  withProperties: boolean
) {

  const { limit, geojsonPolygon, bbox } = body;

    let polygons: FeatureCollection = thousandPolygons;
    let finalPolygons: FeatureCollection;

    if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {
      const filteredPolygons = polygons.features.filter((feature) => {
        return feature.geometry.type === "Polygon" && turf.booleanIntersects(feature.geometry, geojsonPolygon);
      });
      polygons = turf.featureCollection(filteredPolygons);
    } else if (bbox && isValidBBox(bbox)) {
      const bboxPolygonGeometry = turf.bboxPolygon(bbox);
      const filteredPolygons = polygons.features.filter((feature) => {
        return feature.geometry.type === "Polygon" && turf.booleanIntersects(feature.geometry, bboxPolygonGeometry);
      });
      polygons = turf.featureCollection(filteredPolygons);
    }

    if (limit) {
      if (polygons.features.length <= limit) {
        finalPolygons = polygons;
      } else if (limit < 1000) {
        const limitedPolygons = polygons.features.slice(0, limit);
        finalPolygons = {
          ...polygons,
          features: limitedPolygons,
        };
      } else if (limit > 1000) {
        finalPolygons = polygons;
      } else {
        return GetBadRequestErrorResponse("Invalid input. Provide a valid limit number.");
      }
    } else {
      finalPolygons = polygons;
    }

  if (withProperties) {
    const polygonsWithProperties = populateGeoJsonFeatureCollectionWithProperties(finalPolygons);
    return polygonsWithProperties;
  }

  return finalPolygons;
}

/**
 * PolygonsLimitAndWithin() - Filters and limits polygons based on a GeoJSON polygon or bbox.
 */
export function PolygonsLimitAndWithin(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result = PolygonsLimitAndWithinOrPolygonsLimitAndWithinWithProperties(
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
    return GetInternalServerErrorResponse(`Error processing input: ${error.message}`);
  }
}

export function PolygonsLimitAndWithinWithProperties(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  try {
    const result = PolygonsLimitAndWithinOrPolygonsLimitAndWithinWithProperties(
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
    return GetInternalServerErrorResponse(`Error processing input: ${error.message}`);
  }
}


function RandomPolygonsOrRandomPolygonsWithProperties(withProperties: boolean) {
  const globalBbox: [number, number, number, number] = [-180, -90, 180, 90];
  let randomPolygons = [];

  let polygons;

  for (let i = 0; i < 30; i++) {
    const polygon = turf.randomPolygon(1, { bbox: globalBbox });
    randomPolygons.push(polygon.features[0]);
  }
  polygons = turf.featureCollection(randomPolygons)

  if (withProperties) {
    const polygonsWithProperties = populateGeoJsonFeatureCollectionWithProperties(polygons);
    return polygonsWithProperties;
  }
  return polygons;
}

/**
 * RandomPolygons() - Returns 30 random polygons within a global bounding box.
 */
export function RandomPolygons(): OkResponse {
  return GetOkResponse(RandomPolygonsOrRandomPolygonsWithProperties(false));
}

export function RandomPolygonsWithProperties(): OkResponse {
  return GetOkResponse(RandomPolygonsOrRandomPolygonsWithProperties(true));
}

function RandomPolygonsLimitAndWithinOrRandomPolygonsLimitAndWithinWithProperties(
  body: any,
  withProperties: boolean
) {

  const { geojsonPolygon, bbox, limit } = body;

  const globalBbox: [number, number, number, number] = [-180, -90, 180, 90];
  const randomPolygons = [];
  let finalPolygons;

  for (let i = 0; i < 100; i++) { // Generate more than needed for filtering purposes
    const polygon = turf.randomPolygon(1, { bbox: globalBbox });
    randomPolygons.push(polygon.features[0]);
  }

  let filteredPolygons = randomPolygons;

  // Apply GeoJSON polygon filter if provided
  if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {
    filteredPolygons = filteredPolygons.filter((polygon) =>
      turf.booleanIntersects(polygon, geojsonPolygon)
    );
  } 
  // Apply bbox filter if provided
  else if (bbox && isValidBBox(bbox)) {
    const bboxPolygon = turf.bboxPolygon(bbox);
    filteredPolygons = filteredPolygons.filter((polygon) =>
      turf.booleanIntersects(polygon, bboxPolygon)
    );
  } else {
    return GetBadRequestErrorResponse("Invalid input. Provide either a valid GeoJSON polygon or bbox.");
  }

  const limitedPolygons = filteredPolygons.slice(0, limit || 30); // Limit to specified number or default to 30
  finalPolygons = turf.featureCollection(limitedPolygons);

  if (withProperties) {
    const polygonsWithProperties = populateGeoJsonFeatureCollectionWithProperties(finalPolygons);
    return polygonsWithProperties;
  }

  return finalPolygons;
}

/**
 * RandomPolygonsLimitAndWithin() - Filters and limits random polygons based on a GeoJSON polygon or bbox.
 */
export function RandomPolygonsLimitAndWithin(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");
  
  try {
    const result = RandomPolygonsLimitAndWithinOrRandomPolygonsLimitAndWithinWithProperties(
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
    return GetInternalServerErrorResponse(`Error processing input: ${error.message}`);
  }
}

export function RandomPolygonsLimitAndWithinWithProperties(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");
  
  try {
    const result = RandomPolygonsLimitAndWithinOrRandomPolygonsLimitAndWithinWithProperties(
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
    return GetInternalServerErrorResponse(`Error processing input: ${error.message}`);
  }
}
