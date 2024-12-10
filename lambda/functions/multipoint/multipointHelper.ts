import * as turf from "@turf/turf";
import { isGeoJSONPolygon, isValidBBox } from "../../util/geojsonHelper";
import { GetBadRequestErrorResponse } from "../../util/stringify";
import { populateGeoJsonFeatureWithProperties } from "../properties/properties";

export function MultiPointOrMultiPointWithProperties(withProperties: boolean) {
  const multipoint = turf.multiPoint([
    [-101.278818, 40.816337],
    [-99.40157045143154, 39.19210754121596],
  ]);

  if (withProperties) {
    const multiPointWithProperties =
      populateGeoJsonFeatureWithProperties(multipoint);
    return multiPointWithProperties;
  }
  return multipoint;
}

export function RandomMultiPointOrRandomMultiPointWithProperties(
  withProperties: boolean
) {
  const points = turf.randomPoint(2, { bbox: [-180, -90, 180, 90] });
  const coordinates = points.features.map(
    (feature) => feature.geometry.coordinates
  );
  const multipoint = turf.multiPoint(coordinates);

  if (withProperties) {
    const multiPointWithProperties =
      populateGeoJsonFeatureWithProperties(multipoint);
    return multiPointWithProperties;
  }
  return multipoint;
}

export function WithinMultiPointOrWithinMultiPointWithProperties(
  body: any,
  withProperties: boolean
) {
  let multipoint;
  const { geojsonPolygon, bbox } = body;

  if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {
    const point = turf.center(geojsonPolygon);
    const [x, y] = point.geometry.coordinates;

    // Offset the second point slightly to the right (east) of the first
    const secondPoint = [x + 0.01, y];

    multipoint = turf.multiPoint([point.geometry.coordinates, secondPoint]);
  } else if (bbox && isValidBBox(bbox)) {
    const bboxPolygon = turf.bboxPolygon(bbox);
    const point = turf.center(bboxPolygon);
    const [x, y] = point.geometry.coordinates;

    // Offset the second point slightly to the right (east) of the first
    const secondPoint = [x + 0.01, y];

    multipoint = turf.multiPoint([point.geometry.coordinates, secondPoint]);
  } else {
    return GetBadRequestErrorResponse(
      "Invalid input. Provide either a valid GeoJSON polygon or a bbox."
    );
  }

  if (withProperties) {
    const pointWithProperties =
      populateGeoJsonFeatureWithProperties(multipoint);
    return pointWithProperties;
  }

  return multipoint;
}

export function WithinRandomMultiPointOrWithinRandomMultiPointWithProperties(
  body: any,
  withProperties: boolean
) {
  let multipoint;
  const { geojsonPolygon, bbox } = body;

  if (geojsonPolygon && isGeoJSONPolygon(geojsonPolygon)) {
    const bboxOfPolygon = turf.bbox(geojsonPolygon);
    const randomPointsOfBboxOfPolygon = turf.randomPoint(50, {
      bbox: bboxOfPolygon,
    });
    const pointsWithinPolygon = randomPointsOfBboxOfPolygon.features.filter(
      (point) => turf.booleanWithin(point, geojsonPolygon)
    );
    multipoint = turf.multiPoint(
      pointsWithinPolygon.map((point) => point.geometry.coordinates)
    );
  } else if (bbox && isValidBBox(bbox)) {
    const randomPoints = turf.randomPoint(2, { bbox });
    multipoint = turf.multiPoint(
      randomPoints.features.map((point) => point.geometry.coordinates)
    );
  } else {
    return GetBadRequestErrorResponse(
      "Invalid input. Provide either a valid GeoJSON polygon or a bbox."
    );
  }

  if (withProperties) {
    const multiPointWithProperties =
      populateGeoJsonFeatureWithProperties(multipoint);
    return multiPointWithProperties;
  }

  return multipoint;
}
