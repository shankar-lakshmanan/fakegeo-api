import { Feature, LineString, MultiLineString } from "geojson";

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
 * Helper function to convert a collection of LineStrings into a MultiLineString feature.
 */
export function toMultiLineString(
  lineStrings: Feature<LineString>[]
): Feature<MultiLineString> {
  const multiLineCoordinates = lineStrings.map(
    (line) => line.geometry.coordinates
  );
  return {
    type: "Feature",
    geometry: {
      type: "MultiLineString",
      coordinates: multiLineCoordinates,
    },
    properties: {},
  };
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