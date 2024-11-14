import * as turf from "@turf/turf";
import { BBox, Feature, FeatureCollection, Geometry, LineString, MultiLineString, Point } from "geojson";
import { APIGatewayProxyResult } from "aws-lambda";
import { GetBadRequestErrorResponse, GetInternalServerErrorResponse, GetOkResponse, OkResponse } from "../../util/stringify";
import { thousandLines } from "./thousandLines";
import { booleanWithin } from "@turf/turf";
import { isGeoJSONPolygon, isValidBBox } from "./line";

export function MultiLine(): OkResponse {
    
  const multiLine = turf.multiLineString([
    [
      [-98.46358188123595, 38.16839367133355],
      [-98.0095425039122, 38.6109019399903],
      [-97.5063234325582, 38.192492088530855],
      [-96.76369691515532, 38.668456803745556]
    ],
    [
      [-100.46358188123595, 38.16839367133355],
      [-100.0095425039122, 38.6109019399903],
      [-99.5063234325582, 38.192492088530855],
      [-98.76369691515532, 38.668456803745556]
    ]
  ]);
  return GetOkResponse(multiLine);
}

export function RandomMultiLine(): OkResponse {
  const multiLine = turf.randomLineString(2, { bbox: [-180, -90, 180, 90] });
  const multiLineString = turf.multiLineString(multiLine.features.map(f => f.geometry.coordinates));
  return GetOkResponse(multiLineString);
}

/**
 * Validates the input and returns a MultiLineString at the center of a GeoJSON polygon or bbox.
 */
export function WithinMultiLine(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  let multiLineString;

  try {
    const { geojsonPolygon, bbox } = body;

    if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {
      const bboxPolygon = turf.bboxPolygon(turf.bbox(geojsonPolygon));
      const bboxCenter = turf.center(bboxPolygon);
      const leftPoint = turf.destination(bboxCenter, 0.1, -45);
      const rightPoint = turf.destination(bboxCenter, 0.1, 45);

      multiLineString = turf.multiLineString([
        [leftPoint.geometry.coordinates, bboxCenter.geometry.coordinates],
        [bboxCenter.geometry.coordinates, rightPoint.geometry.coordinates]
      ]);
    } else if (bbox && isValidBBox(bbox)) {
      const bboxPolygon = turf.bboxPolygon(bbox);
      const bboxCenter = turf.center(bboxPolygon);
      const leftPoint = turf.destination(bboxCenter, 0.1, -45);
      const rightPoint = turf.destination(bboxCenter, 0.1, 45);

      multiLineString = turf.multiLineString([
        [leftPoint.geometry.coordinates, bboxCenter.geometry.coordinates],
        [bboxCenter.geometry.coordinates, rightPoint.geometry.coordinates]
      ]);
    } else {
      return GetBadRequestErrorResponse("Invalid input. Provide either a valid GeoJSON polygon or a bbox.");
    }

    return GetOkResponse(multiLineString);
  } catch (error: any) {
    return GetInternalServerErrorResponse(`Error processing input: ${error.message}`);
  }
}

export function WithinRandomMultiLine(event: any): APIGatewayProxyResult {
  const body = JSON.parse(event.body || "{}");

  let multiLineString: Feature<MultiLineString>;

  try {
    const { geojsonPolygon, bbox } = body;

    if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {
      const randomPointsOfBboxOfPolygon = turf.randomPoint(50, { bbox: turf.bbox(geojsonPolygon) });

      let bboxRandomPoint: Feature<Point> = {
        type: "Feature",
        geometry: {
          coordinates: [],
          type: "Point",
        },
        properties: {},
      };
      randomPointsOfBboxOfPolygon.features.forEach((point: Feature<Point>) => {
        if (turf.booleanWithin(point, geojsonPolygon)) {
          bboxRandomPoint = point;
          return;
        }
      });

      // Generate multiple line segments around the center point.
      const lines = Array.from({ length: 5 }, (_, i) => {
        const angle = i * 72; // Spread points at equal angles (5 lines around 360 degrees)
        const start = turf.destination(bboxRandomPoint, 0.1, angle - 45); // Left
        const end = turf.destination(bboxRandomPoint, 0.1, angle + 45); // Right
        return [
          start.geometry.coordinates,
          bboxRandomPoint.geometry.coordinates,
          end.geometry.coordinates,
        ];
      });

      multiLineString = {
        type: "Feature",
        geometry: {
          type: "MultiLineString",
          coordinates: lines,
        },
        properties: {},
      };
    } else if (bbox && isValidBBox(bbox)) {
      const point = turf.randomPoint(1, { bbox }).features[0];

      const lines = Array.from({ length: 5 }, (_, i) => {
        const angle = i * 72;
        const start = turf.destination(point, 0.1, angle - 45); // Left
        const end = turf.destination(point, 0.1, angle + 45); // Right
        return [
          start.geometry.coordinates,
          point.geometry.coordinates,
          end.geometry.coordinates,
        ];
      });

      multiLineString = {
        type: "Feature",
        geometry: {
          type: "MultiLineString",
          coordinates: lines,
        },
        properties: {},
      };
    } else {
      return GetBadRequestErrorResponse("Invalid input. Provide either a valid GeoJSON polygon or a bbox.");
    }

    return GetOkResponse(multiLineString);
  } catch (error: any) {
    return GetInternalServerErrorResponse(`Error processing input: ${error.message}`);
  }
}


/**
 * Generate a random MultiLineString within a bounding box or the bbox of a GeoJSON polygon.
 */
export function RandomMultiLinesLimitAndWithin(event: any): APIGatewayProxyResult {
    const body = JSON.parse(event.body || "{}");
  
    try {
      const { limit, geojsonPolygon, bbox } = body;
  
      let multiLineStrings: FeatureCollection<MultiLineString> = {
        type: "FeatureCollection",
        features: [],
      };
  
      let lineStrings: Feature<LineString>[] = [];
  
      if (geojsonPolygon && geojsonPolygon.type === "Feature" && geojsonPolygon.geometry.type === "Polygon") {
        const bboxPoly = turf.bbox(geojsonPolygon);
        lineStrings = turf.randomLineString(1000, { bbox: bboxPoly }).features;
      } else if (bbox && Array.isArray(bbox) && bbox.length === 4) {

        lineStrings = turf.randomLineString(1000, { bbox: bbox as BBox }).features;
      } else {
        return GetBadRequestErrorResponse("Invalid input. Provide either a valid GeoJSON polygon or a bbox.");
      }
  
      if (limit && limit < lineStrings.length) {
        lineStrings = lineStrings.slice(0, limit);
      }
  
      const multiLineFeature = toMultiLineString(lineStrings);
      multiLineStrings.features.push(multiLineFeature);
  
      return GetOkResponse(multiLineStrings);
    } catch (error: any) {
      return GetInternalServerErrorResponse(`Error processing input: ${error.message}`);
    }
  }

  /**
 * Helper function to convert a collection of LineStrings into a MultiLineString feature.
 */
function toMultiLineString(lineStrings: Feature<LineString>[]): Feature<MultiLineString> {
    const multiLineCoordinates = lineStrings.map(line => line.geometry.coordinates);
    return {
      type: "Feature",
      geometry: {
        type: "MultiLineString",
        coordinates: multiLineCoordinates,
      },
      properties: {}
    };
  }
  
  export function MultiLines(): OkResponse {
    const lines: FeatureCollection = thousandLines;  // Assuming thousandLines is defined elsewhere
    const thirtyLines = lines.features.slice(970);
  
    const reducedMultiLines: FeatureCollection<MultiLineString> = {
      ...lines,
      features: thirtyLines.map((feature) => {
        // Ensure that the feature has a geometry of type "LineString"
        if (feature.geometry.type === "LineString") {
          return {
            type: "Feature",
            geometry: {
              type: "MultiLineString",
              coordinates: [feature.geometry.coordinates],  // Wrap LineString coordinates in an array
            },
            properties: feature.properties,
          };
        } else {
          // Handle unexpected feature types, you can return null or an empty MultiLineString
          return {
            type: "Feature",
            geometry: {
              type: "MultiLineString",
              coordinates: [],  // Return empty coordinates for non-LineString geometries
            },
            properties: feature.properties,
          };
        }
      }),
    };
  
    return GetOkResponse(reducedMultiLines);
  }


  export function MultiLinesLimitAndWithin(event: any): APIGatewayProxyResult {
    const body = JSON.parse(event.body || "{}");
  
    try {
      const { limit, geojsonPolygon, bbox } = body;
  
      let lines: FeatureCollection = thousandLines;
      let finalLines: FeatureCollection<MultiLineString>;
  
      if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {
        const filteredLines = lines.features.filter((feature) => {
          return feature.geometry.type === "LineString" && booleanWithin(feature.geometry as LineString, geojsonPolygon);
        });
        lines = turf.featureCollection(filteredLines);
      } else if (bbox && isValidBBox(bbox)) {
        const bboxPolygonGeometry = turf.bboxPolygon(bbox);
        const filteredLines = lines.features.filter((feature) => {
          return feature.geometry.type === "LineString" && booleanWithin(feature.geometry as LineString, bboxPolygonGeometry);
        });
        lines = turf.featureCollection(filteredLines);
      }
  
      const multiLineFeatures = lines.features.map((feature) => ({
        type: "Feature" as const,  // Ensure type is the literal "Feature"
        geometry: {
          type: "MultiLineString",
          coordinates: [(feature.geometry as LineString).coordinates]
        },
        properties: feature.properties
      })) as Feature<MultiLineString>[];
  
      if (limit) {
        if (multiLineFeatures.length <= limit) {
          finalLines = turf.featureCollection(multiLineFeatures) as FeatureCollection<MultiLineString>;
        } else if (limit < 1000) {
          finalLines = turf.featureCollection(multiLineFeatures.slice(0, limit)) as FeatureCollection<MultiLineString>;
        } else if (limit > 1000) {
          finalLines = turf.featureCollection(multiLineFeatures) as FeatureCollection<MultiLineString>;
        } else {
          return GetBadRequestErrorResponse("Invalid input. Provide a valid limit number.");
        }
      } else {
        finalLines = turf.featureCollection(multiLineFeatures) as FeatureCollection<MultiLineString>;
      }
  
      return GetOkResponse(finalLines);
    } catch (error: any) {
      return GetInternalServerErrorResponse(`Error processing input: ${error.message}`);
    }
  }
  
  export function RandomMultiLines(): OkResponse {
    // Generate 30 random LineStrings within the specified bbox
    const randomLineStrings: FeatureCollection = turf.randomLineString(30, { bbox: [-180, -90, 180, 90] });
  
    // Convert each LineString into a MultiLineString by wrapping the coordinates in an array
    const multiLineFeatures = randomLineStrings.features.map((feature) => ({
      type: "Feature" as const,
      geometry: {
        type: "MultiLineString",
        coordinates: [(feature.geometry as LineString).coordinates]  // Wrap coordinates to form MultiLineString
      },
      properties: feature.properties
    })) as Feature<MultiLineString>[];
  
    // Create a FeatureCollection of MultiLineString features
    const multiLineFeatureCollection = turf.featureCollection(multiLineFeatures) as FeatureCollection<MultiLineString>;
  
    return GetOkResponse(multiLineFeatureCollection);
  }