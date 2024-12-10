import * as turf from "@turf/turf";
import { FeatureCollection, GeoJsonProperties, Polygon } from "geojson";
import {
  isGeoJSONMultiPolygon,
  isGeoJSONPolygon,
  isValidBBox,
} from "../../util/geojsonHelper";
import { GetBadRequestErrorResponse } from "../../util/stringify";
import { thousandPolygons } from "../geojsonData/thousandPolygons";
import { populateGeoJsonFeatureCollectionWithProperties } from "../properties/properties";

export function MultiPolygonsOrMultiPolygonsWithProperties(
  withProperties: boolean
) {
  const thousandPolygonsFeatureCollection =
    thousandPolygons as FeatureCollection<Polygon, GeoJsonProperties>;
  const allPolygons = turf.featureCollection(
    thousandPolygonsFeatureCollection.features
      .slice(-30)
      .map((feature) => turf.multiPolygon([feature.geometry.coordinates]))
  );

  if (withProperties) {
    const multiPolygonsWithProperties =
      populateGeoJsonFeatureCollectionWithProperties(allPolygons);
    return multiPolygonsWithProperties;
  }
  return allPolygons;
}

export function MultiPolygonsLimitAndWithinOrMultiPolygonsLimitAndWithinWithProperties(
  body: any,
  withProperties: boolean
) {
  const { limit, geojsonPolygon, bbox } = body;

  let polygons: FeatureCollection = thousandPolygons;
  let finalPolygons: FeatureCollection;

  if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {
    const filteredPolygons = polygons.features.filter((feature) => {
      if (
        feature.geometry.type === "Polygon" ||
        feature.geometry.type === "MultiPolygon"
      ) {
        const geometry =
          feature.geometry.type === "Polygon"
            ? turf.multiPolygon([feature.geometry.coordinates]) // Convert Polygon to MultiPolygon
            : feature;
        return turf.booleanIntersects(geometry, geojsonPolygon);
      }
      return false;
    });
    polygons = turf.featureCollection(filteredPolygons);
  } else if (bbox && isValidBBox(bbox)) {
    const bboxPolygonGeometry = turf.bboxPolygon(bbox);
    const filteredPolygons = polygons.features.filter((feature) => {
      if (
        feature.geometry.type === "Polygon" ||
        feature.geometry.type === "MultiPolygon"
      ) {
        const geometry =
          feature.geometry.type === "Polygon"
            ? turf.multiPolygon([feature.geometry.coordinates]) // Convert Polygon to MultiPolygon
            : feature;
        return turf.booleanIntersects(geometry, bboxPolygonGeometry);
      }
      return false;
    });
    polygons = turf.featureCollection(filteredPolygons);
  }

  if (limit) {
    if (polygons.features.length <= limit) {
      finalPolygons = polygons;
    } else if (limit < 1000) {
      const limitedPolygons = polygons.features.slice(0, limit);
      finalPolygons = turf.featureCollection(limitedPolygons);
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
    const multiPolygonsWithProperties =
      populateGeoJsonFeatureCollectionWithProperties(finalPolygons);
    return multiPolygonsWithProperties;
  }

  return finalPolygons;
}

export function RandomMultiPolygonsOrRandomMultiPolygonsWithProperties(
  withProperties: boolean
) {
  const globalBbox: [number, number, number, number] = [-180, -90, 180, 90];
  const randomPolygons = [];

  for (let i = 0; i < 30; i++) {
    const polygon = turf.randomPolygon(1, { bbox: globalBbox });
    const multiPolygon = turf.multiPolygon([
      polygon.features[0].geometry.coordinates,
    ]);
    randomPolygons.push(multiPolygon);
  }

  const randomPolygonsCollection = turf.featureCollection(randomPolygons);

  if (withProperties) {
    const multiPolygonsWithProperties =
      populateGeoJsonFeatureCollectionWithProperties(randomPolygonsCollection);
    return multiPolygonsWithProperties;
  }
  return randomPolygonsCollection;
}

export function RandomMultiPolygonsLimitAndWithinOrRandomMultiPolygonsLimitAndWithinWithProperties(
  body: any,
  withProperties: boolean
) {
  const { geojsonPolygon, bbox, limit = 30 } = body;

  const globalBbox: [number, number, number, number] = [-180, -90, 180, 90];
  const randomPolygons = Array.from(
    { length: 100 },
    () => turf.randomPolygon(1, { bbox: globalBbox }).features[0]
  );

  let filteredPolygons = randomPolygons;

  if (
    geojsonPolygon &&
    (isGeoJSONPolygon(geojsonPolygon) || isGeoJSONMultiPolygon(geojsonPolygon))
  ) {
    filteredPolygons = filteredPolygons.filter((polygon) =>
      turf.booleanIntersects(polygon, geojsonPolygon)
    );
  } else if (bbox && isValidBBox(bbox)) {
    const bboxPolygon = turf.bboxPolygon(bbox);
    filteredPolygons = filteredPolygons.filter((polygon) =>
      turf.booleanIntersects(polygon, bboxPolygon)
    );
  } else {
    return GetBadRequestErrorResponse(
      "Invalid input. Provide either a valid GeoJSON polygon or bbox."
    );
  }

  const multiPolygons = turf.featureCollection(
    filteredPolygons
      .slice(0, limit)
      .map((polygon) => turf.multiPolygon([polygon.geometry.coordinates]))
  );

  if (withProperties) {
    const multiPolygonsWithProperties =
      populateGeoJsonFeatureCollectionWithProperties(multiPolygons);
    return multiPolygonsWithProperties;
  }

  return multiPolygons;
}
