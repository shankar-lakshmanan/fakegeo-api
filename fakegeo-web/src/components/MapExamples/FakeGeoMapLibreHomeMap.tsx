import React, { useEffect, useRef } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const containerStyle = {
  margin: "auto",
  width: "50%",
  height: "300px",
  "border-radius": "10px"
};

const FakeGeoMapLibreHomeMap: React.FC = () => {
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
        // Fetch lines data from your API
        const linesResponse = await fetch(`${customFields.fakegeoApiUrl}/prod/featureCollection/lines`, {
          method: 'POST',
          headers: {
            //@ts-ignore
            "X-API-KEY": customFields?.xApiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "limit": 10,
            "bbox": [-56.250000, -22.593726, 43.769531, 37.996163]
          })
        });
        const linesGeoJson = await linesResponse.json();

        // Fetch points data from your API
        const pointsResponse = await fetch(`${customFields.fakegeoApiUrl}/prod/featureCollection/points`, {
          method: 'POST',
          headers: {
            //@ts-ignore
            "X-API-KEY": customFields?.xApiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "limit": 10,
            "bbox": [-56.250000, -22.593726, 43.769531, 37.996163]
          })
        });
        const pointsGeoJson = await pointsResponse.json();

        // Fetch polygons data from your API
        const polygonsResponse = await fetch(`${customFields.fakegeoApiUrl}/prod/featureCollection/polygons`, {
          method: 'POST',
          headers: {
            //@ts-ignore
            "X-API-KEY": customFields?.xApiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "limit": 10,
            "bbox": [-56.250000, -22.593726, 43.769531, 37.996163]
          })
        });
        const polygonsGeoJson = await polygonsResponse.json();

        if (mapRef.current) {
          const map = mapRef.current;

          // Add lines source and layer
          map.addSource("lines-source", {
            type: "geojson",
            data: linesGeoJson,
          });
          map.addLayer({
            id: "lines-layer",
            type: "line",
            source: "lines-source",
            paint: {
              "line-color": "blue",
              "line-width": 3,
            },
          });

          // Add points source and layer
          map.addSource("points-source", {
            type: "geojson",
            data: pointsGeoJson,
          });
          map.addLayer({
            id: "points-layer",
            type: "circle",
            source: "points-source",
            paint: {
              "circle-color": "red",
              "circle-radius": 5,
            },
          });

          // Add polygons source and layer
          map.addSource("polygons-source", {
            type: "geojson",
            data: polygonsGeoJson,
          });
          map.addLayer({
            id: "polygons-layer",
            type: "fill",
            source: "polygons-source",
            paint: {
              "fill-color": "green",
              "fill-opacity": 0.4,
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

export default FakeGeoMapLibreHomeMap;
