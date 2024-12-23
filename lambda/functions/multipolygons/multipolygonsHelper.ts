import * as turf from "@turf/turf";
import { BBox, Feature, FeatureCollection, GeoJsonProperties, MultiPolygon, Polygon } from "geojson";
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
  let finalPolygons: FeatureCollection<MultiPolygon>;

  if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {
    const filteredPolygons = polygons.features.filter((feature) => {
      return (
        feature.geometry.type === "Polygon" &&
        turf.booleanWithin(feature.geometry as Polygon, geojsonPolygon)
      );
    });
    polygons = turf.featureCollection(filteredPolygons);
  } else if (bbox && isValidBBox(bbox)) {
    const bboxPolygonGeometry = turf.bboxPolygon(bbox);
    const filteredPolygons = polygons.features.filter((feature) => {
      return (
        feature.geometry.type === "Polygon" &&
        turf.booleanWithin(feature.geometry as Polygon, bboxPolygonGeometry)
      );
    });
    polygons = turf.featureCollection(filteredPolygons);
  }

  const multiPolygonFeatures = polygons.features.map((feature) => ({
    type: "Feature" as const, // Ensure type is the literal "Feature"
    geometry: {
      type: "MultiPolygon",
      coordinates: [(feature.geometry as Polygon).coordinates],
    },
    properties: feature.properties,
  })) as Feature<MultiPolygon>[];

  if (limit) {
    if (multiPolygonFeatures.length <= limit) {
      finalPolygons = turf.featureCollection(
        multiPolygonFeatures
      ) as FeatureCollection<MultiPolygon>;
    } else if (limit < 1000) {
      finalPolygons = turf.featureCollection(
        multiPolygonFeatures.slice(0, limit)
      ) as FeatureCollection<MultiPolygon>;
    } else if (limit > 1000) {
      finalPolygons = turf.featureCollection(
        multiPolygonFeatures
      ) as FeatureCollection<MultiPolygon>;
    } else {
      return GetBadRequestErrorResponse(
        "Invalid input. Provide a valid limit number."
      );
    }
  } else {
    finalPolygons = turf.featureCollection(
      multiPolygonFeatures
    ) as FeatureCollection<MultiPolygon>;
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
  const { limit, geojsonPolygon, bbox } = body;

  let multiPolygonStrings: FeatureCollection<MultiPolygon> = {
    type: "FeatureCollection",
    features: [],
  };

  let polygonStrings: Feature<Polygon>[] = turf.randomPolygon(1000).features;

  // Generate random polygon strings within the geojsonPolygon or bbox
  if (
    geojsonPolygon &&
    geojsonPolygon.type === "Feature" &&
    geojsonPolygon.geometry.type === "Polygon"
  ) {
    const bboxPoly = turf.bbox(geojsonPolygon);
    polygonStrings = turf.randomPolygon(1000, { bbox: bboxPoly }).features;
  } else if (bbox && Array.isArray(bbox) && bbox.length === 4) {
    polygonStrings = turf.randomPolygon(1000, { bbox: bbox as BBox }).features;
  } else if (!limit) {
    return GetBadRequestErrorResponse(
      "Invalid input. Provide either a valid GeoJSON polygon or a bbox."
    );
  }

  // Apply limit if specified
  if (limit && limit < polygonStrings.length) {
    polygonStrings = polygonStrings.slice(0, limit);
  }

  // Create a MultiLineString feature for each lineString feature up to the limit
  polygonStrings.forEach((polygon) => {
    const multiPolygonFeature: Feature<MultiPolygon> = {
      type: "Feature",
      geometry: {
        type: "MultiPolygon",
        coordinates: [polygon.geometry.coordinates], // Wrap coordinates as MultiLineString
      },
      properties: {}, // Add properties if needed
    };
    multiPolygonStrings.features.push(multiPolygonFeature);
  });

  // Add properties if requested
  if (withProperties) {
    const multiPolygonsWithProperties =
      populateGeoJsonFeatureCollectionWithProperties(multiPolygonStrings);
    return multiPolygonsWithProperties;
  }

  return multiPolygonStrings;
}
