import React, { useEffect, useRef } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const containerStyle = {
  width: "100%",
  height: "300px",
};

const FakeGeoMapLibreMap: React.FC = () => {
  const mapDivRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  useEffect(() => {
    if (!mapDivRef.current) return;

    // Initialize the MapLibre map
    const map = new maplibregl.Map({
      container: mapDivRef.current,
      style: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json", // Default style
      center: [0, 0], // [longitude, latitude]
      zoom: 1,
    });

    mapRef.current = map;

    return () => {
      map.remove(); // Clean up the map on unmount
    };
  }, []);

  useEffect(() => {
    const fetchGeoJsonAndAddToMap = async () => {
      try {
        // Fetch the GeoJSON FeatureCollection from your API
        const response = await fetch(`${customFields.fakegeoApiUrl}/prod/featureCollection/lines`, {
          headers: {
            //@ts-ignore
            "X-API-KEY": customFields?.xApiKey,
            "Content-Type": "application/json",
          },
        });

        const geoJsonData = await response.json();

        if (mapRef.current) {
          const map = mapRef.current;

          // Add GeoJSON source
          map.addSource("lines-source", {
            type: "geojson",
            data: geoJsonData,
          });

          // Add a layer to style the lines
          map.addLayer({
            id: "lines-layer",
            type: "line",
            source: "lines-source",
            paint: {
              "line-color": "blue", // Line color
              "line-width": 3, // Line width
            },
          });
          
        }
      } catch (error) {
        console.error("Error fetching or adding GeoJSON data to the map:", error);
      }
    };

    fetchGeoJsonAndAddToMap();
  }, [customFields]);

  return <div ref={mapDivRef} style={containerStyle}></div>;
};

export default FakeGeoMapLibreMap;
