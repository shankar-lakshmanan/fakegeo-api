import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const containerStyle = {
  width: "100%",
  height: "300px",
};

const FakeGeoMapboxMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [geoJsonData, setGeoJsonData] = useState<any>(null);
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  useEffect(() => {
    // Fetch GeoJSON data from FakeGeo API
    const fetchGeoJson = async () => {
      try {
        const response = await fetch(`${customFields.fakegeoApiUrl}/prod/feature/line`, {
          headers: {
            //@ts-ignore
            "X-API-KEY": customFields.xApiKey,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setGeoJsonData(data);
      } catch (error) {
        console.error("Error fetching GeoJSON data:", error);
      }
    };

    fetchGeoJson();
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Mapbox map
    mapboxgl.accessToken = customFields.mapboxAccessToken as string;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/satellite-streets-v11", // Mapbox style URL
      center: [-101.278818, 40.816337], // Initial center coordinates
      zoom: 5, // Initial zoom level
    });

    mapRef.current = map;

    return () => {
      // Clean up map instance
      map.remove();
    };
  }, [customFields]);

  useEffect(() => {
    if (geoJsonData && mapRef.current) {
      const map = mapRef.current;

      // Add GeoJSON data to the map
      map.on("load", () => {
        if (map.getSource("geojson")) {
          map.removeLayer("geojson-layer");
          map.removeSource("geojson");
        }

        map.addSource("geojson", {
            type: "geojson",
            data: geoJsonData,
          });
          
        map.addLayer({
            id: "geojson-layer",
            type: "line", // Change from "circle" to "line"
            source: "geojson",
            paint: {
                "line-width": 4, // Set the width of the line
                "line-color": "#007cbf", // Set the color of the line
            },
        });

        // Adjust map view to fit GeoJSON data
        const bounds = new mapboxgl.LngLatBounds();
        // If the GeoJSON contains a LineString, iterate through the coordinates
        geoJsonData.geometry.coordinates.forEach((coordinate) => {
            bounds.extend(coordinate as [number, number]);
        });
        map.fitBounds(bounds, { padding: 100 });
        // map.setZoom(5)
      });
    }
  }, [geoJsonData]);

  return <div style={containerStyle} ref={mapContainerRef}></div>;
};

export default FakeGeoMapboxMap;
