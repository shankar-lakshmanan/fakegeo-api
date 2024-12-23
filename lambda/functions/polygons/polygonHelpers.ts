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

  const { limit, geojsonPolygon, bbox } = body;
  
    let polygons: FeatureCollection = turf.randomPolygon(1000);
    let finalPolygons: FeatureCollection;
    // Check if geojsonPolygon is valid
    if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {
      var bboxPoly = turf.bbox(geojsonPolygon);
      polygons = turf.randomPolygon(1000, { bbox: bboxPoly,max_radial_length:1 });
    } else if (bbox && isValidBBox(bbox)) {
      // Create a polygon from the bbox
      polygons = turf.randomPolygon(1000, { bbox: bbox,max_radial_length:1 });
    }
  
    if (limit) {
      if (polygons.features.length <= limit) {
        // If there are fewer or equal polygons than the limit, return all polygons
        finalPolygons = polygons;
      } else if (limit < 1000) {
        // If limit is less than 1000, return the specified number of polygons
        const limitedPolygons = polygons.features.slice(0, limit);
        finalPolygons = {
          ...polygons,
          features: limitedPolygons,
        };
      } else if (limit > 1000) {
        // If limit is greater than 1000, return all polygons
        finalPolygons = polygons;
      } else {
        return GetBadRequestErrorResponse(
          "Invalid input. Provide a valid limit number"
        );
      }
    } else {
      // If no limit is specified, return all polygons
      finalPolygons = polygons;
    }
  
    if (withProperties) {
      const polygonsWithProperties =
        populateGeoJsonFeatureCollectionWithProperties(finalPolygons);
      return polygonsWithProperties;
    }
  
    return finalPolygons;
}
