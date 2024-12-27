import React, { useEffect, useRef } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const containerStyle = {
  margin: "auto",
  width: "50%",
  height: "300px",
  borderRadius: "10px"
};

const FakeGeoMapLibreHomeMap: React.FC = () => {
  const mapDivRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  const fetchGeoJson = async (endpoint: string, body: object) => {
    try {
      const response = await fetch(`${customFields.fakegeoApiUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          //@ts-ignore
          "X-API-KEY": customFields?.xApiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      return await response.json();
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      return null;
    }
  };

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
        const body = {
          "limit": 10,
          "bbox": [-56.25, -22.593726, 43.769531, 37.996163],
        };

        const [linesGeoJson, pointsGeoJson, polygonsGeoJson] = await Promise.all([
          fetchGeoJson("/prod/featureCollection/lines/properties", body),
          fetchGeoJson("/prod/featureCollection/points/properties", body),
          fetchGeoJson("/prod/featureCollection/polygons/properties", body),
        ]);

        if (mapRef.current) {
          const map = mapRef.current;

          // Add lines source and layer
          if (linesGeoJson) {
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
          }

          // Add points source and layer
          if (pointsGeoJson) {
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
          }

          // Add polygons source and layer
          if (polygonsGeoJson) {
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

          // Add popup interaction
          map.on("click", (e) => {
            const features = map.queryRenderedFeatures(e.point);
            if (features.length > 0) {
              const feature = features[0];
              const { name, detailedDescription } = feature.properties || {};
              new maplibregl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(
                  `<div style='color: black;'><strong>Name:</strong> ${name || "N/A"}<br><strong>Description:</strong> ${detailedDescription || "N/A"}</div>`
                )
                .addTo(map);
            }
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
