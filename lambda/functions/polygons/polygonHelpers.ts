import * as turf from "@turf/turf";
import { FeatureCollection } from "geojson";
import { isGeoJSONPolygon, isValidBBox } from "../../util/geojsonHelper";
import { GetBadRequestErrorResponse } from "../../util/stringify";
import { thousandPolygons } from "../geojsonData/thousandPolygons";
import { populateGeoJsonFeatureCollectionWithProperties } from "../properties/properties";

export function PolygonsOrPolygonsWithProperties(withProperties: boolean) {
  const allPolygons = thousandPolygons;
  const last30Polygons = turf.featureCollection(
    allPolygons.features.slice(-30)
  ); // Get only the last 30 polygons

  if (withProperties) {
    const polygonsWithProperties =
      populateGeoJsonFeatureCollectionWithProperties(last30Polygons);
    return polygonsWithProperties;
  }
  return last30Polygons;
}

export function PolygonsLimitAndWithinOrPolygonsLimitAndWithinWithProperties(
  body: any,
  withProperties: boolean
) {
  const { limit, geojsonPolygon, bbox } = body;

  let polygons: FeatureCollection = thousandPolygons;
  let finalPolygons: FeatureCollection;

  if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {
    const filteredPolygons = polygons.features.filter((feature) => {
      return (
        feature.geometry.type === "Polygon" &&
        turf.booleanIntersects(feature.geometry, geojsonPolygon)
      );
    });
    polygons = turf.featureCollection(filteredPolygons);
  } else if (bbox && isValidBBox(bbox)) {
    const bboxPolygonGeometry = turf.bboxPolygon(bbox);
    const filteredPolygons = polygons.features.filter((feature) => {
      return (
        feature.geometry.type === "Polygon" &&
        turf.booleanIntersects(feature.geometry, bboxPolygonGeometry)
      );
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
      return GetBadRequestErrorResponse(
        "Invalid input. Provide a valid limit number."
      );
    }
  } else {
    finalPolygons = polygons;
  }

  if (withProperties) {
    const polygonsWithProperties =
      populateGeoJsonFeatureCollectionWithProperties(finalPolygons);
    return polygonsWithProperties;
  }

  return finalPolygons;
}

export function RandomPolygonsOrRandomPolygonsWithProperties(
  withProperties: boolean
) {
  const globalBbox: [number, number, number, number] = [-180, -90, 180, 90];
  let randomPolygons = [];

  let polygons;

  for (let i = 0; i < 30; i++) {
    const polygon = turf.randomPolygon(1, { bbox: globalBbox });
    randomPolygons.push(polygon.features[0]);
  }
  polygons = turf.featureCollection(randomPolygons);

  if (withProperties) {
    const polygonsWithProperties =
      populateGeoJsonFeatureCollectionWithProperties(polygons);
    return polygonsWithProperties;
  }
  return polygons;
}

export function RandomPolygonsLimitAndWithinOrRandomPolygonsLimitAndWithinWithProperties(
  body: any,
  withProperties: boolean
) {
  const { geojsonPolygon, bbox, limit } = body;

  const globalBbox: [number, number, number, number] = [-180, -90, 180, 90];
  const randomPolygons = [];
  let finalPolygons;

  for (let i = 0; i < 100; i++) {
    // Generate more than needed for filtering purposes
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
    return GetBadRequestErrorResponse(
      "Invalid input. Provide either a valid GeoJSON polygon or bbox."
    );
  }

  const limitedPolygons = filteredPolygons.slice(0, limit || 30); // Limit to specified number or default to 30
  finalPolygons = turf.featureCollection(limitedPolygons);

  if (withProperties) {
    const polygonsWithProperties =
      populateGeoJsonFeatureCollectionWithProperties(finalPolygons);
    return polygonsWithProperties;
  }

  return finalPolygons;
}
