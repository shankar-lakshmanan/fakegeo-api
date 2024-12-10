import * as turf from "@turf/turf";
import { FeatureCollection } from "geojson";
import { isGeoJSONPolygon, isValidBBox } from "../../util/geojsonHelper";
import { GetBadRequestErrorResponse } from "../../util/stringify";
import { thousandLines } from "../geojsonData/thousandLines";
import { populateGeoJsonFeatureCollectionWithProperties } from "../properties/properties";

export function LinesOrLinesWithProperties(withProperties: boolean) {
  const lines: FeatureCollection = thousandLines;
  const thirtyLines = lines.features.slice(970);
  const reducedLines: FeatureCollection = {
    ...lines,
    features: [...thirtyLines],
  };

  if (withProperties) {
    const lineWithProperties =
      populateGeoJsonFeatureCollectionWithProperties(reducedLines);
    return lineWithProperties;
  }
  return reducedLines;
}

export function LinesLimitAndWithinOrLinesLimitAndWithinWithProperties(
  body: any,
  withProperties: boolean
) {
  const { limit, geojsonPolygon, bbox } = body;

  let lines: FeatureCollection = thousandLines;
  let finalLines: FeatureCollection;

  if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {
    const filteredLines = lines.features.filter((feature) => {
      return (
        feature.geometry.type === "LineString" &&
        turf.booleanWithin(feature.geometry, geojsonPolygon)
      );
    });
    lines = turf.featureCollection(filteredLines);
  } else if (bbox && isValidBBox(bbox)) {
    const bboxPolygonGeometry = turf.bboxPolygon(bbox);
    const filteredLines = lines.features.filter((feature) => {
      return (
        feature.geometry.type === "LineString" &&
        turf.booleanWithin(feature.geometry, bboxPolygonGeometry)
      );
    });
    lines = turf.featureCollection(filteredLines);
  }

  if (limit) {
    if (lines.features.length <= limit) {
      finalLines = lines;
    } else if (limit < 1000) {
      const limitedLines = lines.features.slice(0, limit);
      finalLines = {
        ...lines,
        features: limitedLines,
      };
    } else if (limit > 1000) {
      finalLines = lines;
    } else {
      return GetBadRequestErrorResponse(
        "Invalid input. Provide a valid limit number."
      );
    }
  } else {
    finalLines = lines;
  }

  if (withProperties) {
    const finalLinesWithProperties =
      populateGeoJsonFeatureCollectionWithProperties(finalLines);
    return finalLinesWithProperties;
  }

  return finalLines;
}

export function RandomLinesOrRandomLinesWithProperties(
  withProperties: boolean
) {
  const thirtyLines: FeatureCollection = turf.randomLineString(30, {
    bbox: [-180, -90, 180, 90],
  });

  if (withProperties) {
    const linesWithProperties =
      populateGeoJsonFeatureCollectionWithProperties(thirtyLines);
    return linesWithProperties;
  }

  return thirtyLines;
}

export function RandomLinesLimitAndWithinOrRandomLinesLimitAndWithinWithProperties(
  body: any,
  withProperties: boolean
) {
  const { limit, geojsonPolygon, bbox } = body;

  let lines: FeatureCollection = { features: [], type: "FeatureCollection" };
  let finalLines: FeatureCollection;

  if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {
    const bboxPoly = turf.bbox(geojsonPolygon);
    lines = turf.randomLineString(1000, { bbox: bboxPoly });
  } else if (bbox && isValidBBox(bbox)) {
    lines = turf.randomLineString(1000, { bbox: bbox });
  }

  if (limit) {
    if (lines.features.length <= limit) {
      finalLines = lines;
    } else if (limit < 1000) {
      const limitedLines = lines.features.slice(0, limit);
      finalLines = {
        ...lines,
        features: limitedLines,
      };
    } else if (limit > 1000) {
      finalLines = lines;
    } else {
      return GetBadRequestErrorResponse(
        "Invalid input. Provide a valid limit number."
      );
    }
  } else {
    finalLines = lines;
  }

  if (withProperties) {
    const finalLinesWithProperties =
      populateGeoJsonFeatureCollectionWithProperties(finalLines);
    return finalLinesWithProperties;
  }

  return finalLines;
}
