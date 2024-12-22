import React, { useEffect, useRef } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import { Tile as TileLayer } from "ol/layer";
import { OSM } from "ol/source";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { fromLonLat } from "ol/proj";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Style, Circle as CircleStyle, Fill } from "ol/style";

const containerStyle = {
  width: "100%",
  height: "300px",
};

const OpenLayersMap: React.FC = () => {
  const mapDivRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  useEffect(() => {
    if (!mapDivRef.current) return;

    // Initialize the OpenLayers map
    const map = new Map({
      target: mapDivRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([0, 0]), // Default center [longitude, latitude]
        zoom: 2, // Default zoom level
      }),
    });

    mapRef.current = map;

    return () => {
      map.setTarget(null); // Clean up the map on unmount
    };
  }, []);

  useEffect(() => {
    const fetchGeoJsonAndAddToMap = async () => {
      try {
        // Fetch the GeoJSON FeatureCollection from your API
        const response = await fetch(`${customFields.fakegeoApiUrl}/prod/featureCollection/points`, {
          headers: {
            //@ts-ignore
            "X-API-KEY": customFields?.xApiKey,
            "Content-Type": "application/json",
          },
        });

        const geoJsonData = await response.json();

        // Create a vector source and layer
        const vectorSource = new VectorSource({
          features: new GeoJSON().readFeatures(geoJsonData, {
            featureProjection: "EPSG:3857", // Ensure projection matches the map's projection
          }),
        });

        // Define a style for the points
        const pointStyle = new Style({
          image: new CircleStyle({
            radius: 6, // Radius of the point
            fill: new Fill({
              color: "red", // Set the color to red
            }),
          }),
        });

        const vectorLayer = new VectorLayer({
          source: vectorSource,
          style: pointStyle, // Apply the style to the layer
        });

        if (mapRef.current) {
          const map = mapRef.current;
          map.addLayer(vectorLayer);

          // Zoom to the extent of the features in the GeoJSON
          const extent = vectorSource.getExtent();
          map.getView().fit(extent, { duration: 1000, padding: [50, 50, 50, 50] });
        }
      } catch (error) {
        console.error("Error fetching or adding GeoJSON data to the map:", error);
      }
    };

    fetchGeoJsonAndAddToMap();
  }, [customFields]);

  return <div ref={mapDivRef} style={containerStyle}></div>;
};

export default OpenLayersMap;
