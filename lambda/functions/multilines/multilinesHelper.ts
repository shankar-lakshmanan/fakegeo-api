import * as turf from "@turf/turf";
import {
  BBox,
  Feature,
  FeatureCollection,
  LineString,
  MultiLineString,
} from "geojson";
import {
  isGeoJSONPolygon,
  isValidBBox,
  toMultiLineString,
} from "../../util/geojsonHelper";
import { GetBadRequestErrorResponse } from "../../util/stringify";
import { thousandLines } from "../geojsonData/thousandLines";
import { populateGeoJsonFeatureCollectionWithProperties } from "../properties/properties";

export function RandomMultiLinesLimitAndWithinOrRandomMultiLinesLimitAndWithinWithProperties(
  body: any,
  withProperties: boolean
) {
  const { limit, geojsonPolygon, bbox } = body;

  let multiLineStrings: FeatureCollection<MultiLineString> = {
    type: "FeatureCollection",
    features: [],
  };

  let lineStrings: Feature<LineString>[] = [];

  if (
    geojsonPolygon &&
    geojsonPolygon.type === "Feature" &&
    geojsonPolygon.geometry.type === "Polygon"
  ) {
    const bboxPoly = turf.bbox(geojsonPolygon);
    lineStrings = turf.randomLineString(1000, { bbox: bboxPoly }).features;
  } else if (bbox && Array.isArray(bbox) && bbox.length === 4) {
    lineStrings = turf.randomLineString(1000, { bbox: bbox as BBox }).features;
  } else {
    return GetBadRequestErrorResponse(
      "Invalid input. Provide either a valid GeoJSON polygon or a bbox."
    );
  }

  if (limit && limit < lineStrings.length) {
    lineStrings = lineStrings.slice(0, limit);
  }

  const multiLineFeature = toMultiLineString(lineStrings);
  multiLineStrings.features.push(multiLineFeature);

  if (withProperties) {
    const multiLinesWithProperties =
      populateGeoJsonFeatureCollectionWithProperties(multiLineStrings);
    return multiLinesWithProperties;
  }

  return multiLineStrings;
}

export function MultiLinesOrMultiLinesWithProperties(withProperties: boolean) {
  const lines: FeatureCollection = thousandLines; // Assuming thousandLines is defined elsewhere
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
            coordinates: [feature.geometry.coordinates], // Wrap LineString coordinates in an array
          },
          properties: feature.properties,
        };
      } else {
        // Handle unexpected feature types, you can return null or an empty MultiLineString
        return {
          type: "Feature",
          geometry: {
            type: "MultiLineString",
            coordinates: [], // Return empty coordinates for non-LineString geometries
          },
          properties: feature.properties,
        };
      }
    }),
  };

  if (withProperties) {
    const multiLinesWithProperties =
      populateGeoJsonFeatureCollectionWithProperties(reducedMultiLines);
    return multiLinesWithProperties;
  }
  return reducedMultiLines;
}

export function MultiLinesLimitAndWithinOrMultiLinesLimitAndWithinWithProperties(
  body: any,
  withProperties: boolean
) {
  const { limit, geojsonPolygon, bbox } = body;

  let lines: FeatureCollection = thousandLines;
  let finalLines: FeatureCollection<MultiLineString>;

  if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {
    const filteredLines = lines.features.filter((feature) => {
      return (
        feature.geometry.type === "LineString" &&
        turf.booleanWithin(feature.geometry as LineString, geojsonPolygon)
      );
    });
    lines = turf.featureCollection(filteredLines);
  } else if (bbox && isValidBBox(bbox)) {
    const bboxPolygonGeometry = turf.bboxPolygon(bbox);
    const filteredLines = lines.features.filter((feature) => {
      return (
        feature.geometry.type === "LineString" &&
        turf.booleanWithin(feature.geometry as LineString, bboxPolygonGeometry)
      );
    });
    lines = turf.featureCollection(filteredLines);
  }

  const multiLineFeatures = lines.features.map((feature) => ({
    type: "Feature" as const, // Ensure type is the literal "Feature"
    geometry: {
      type: "MultiLineString",
      coordinates: [(feature.geometry as LineString).coordinates],
    },
    properties: feature.properties,
  })) as Feature<MultiLineString>[];

  if (limit) {
    if (multiLineFeatures.length <= limit) {
      finalLines = turf.featureCollection(
        multiLineFeatures
      ) as FeatureCollection<MultiLineString>;
    } else if (limit < 1000) {
      finalLines = turf.featureCollection(
        multiLineFeatures.slice(0, limit)
      ) as FeatureCollection<MultiLineString>;
    } else if (limit > 1000) {
      finalLines = turf.featureCollection(
        multiLineFeatures
      ) as FeatureCollection<MultiLineString>;
    } else {
      return GetBadRequestErrorResponse(
        "Invalid input. Provide a valid limit number."
      );
    }
  } else {
    finalLines = turf.featureCollection(
      multiLineFeatures
    ) as FeatureCollection<MultiLineString>;
  }

  if (withProperties) {
    const multiLinesWithProperties =
      populateGeoJsonFeatureCollectionWithProperties(finalLines);
    return multiLinesWithProperties;
  }

  return finalLines;
}

export function RandomMultiLinesOrRandomMultiLinesWithProperties(
  withProperties: boolean
) {
  // Generate 30 random LineStrings within the specified bbox
  const randomLineStrings: FeatureCollection = turf.randomLineString(30, {
    bbox: [-180, -90, 180, 90],
  });

  // Convert each LineString into a MultiLineString by wrapping the coordinates in an array
  const multiLineFeatures = randomLineStrings.features.map((feature) => ({
    type: "Feature" as const,
    geometry: {
      type: "MultiLineString",
      coordinates: [(feature.geometry as LineString).coordinates], // Wrap coordinates to form MultiLineString
    },
    properties: feature.properties,
  })) as Feature<MultiLineString>[];

  // Create a FeatureCollection of MultiLineString features
  const multiLineFeatureCollection = turf.featureCollection(
    multiLineFeatures
  ) as FeatureCollection<MultiLineString>;

  if (withProperties) {
    const multiLinesWithProperties =
      populateGeoJsonFeatureCollectionWithProperties(
        multiLineFeatureCollection
      );
    return multiLinesWithProperties;
  }
  return multiLineFeatureCollection;
}
