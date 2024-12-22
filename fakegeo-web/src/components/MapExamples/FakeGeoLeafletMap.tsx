import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const containerStyle = {
  width: "55vw",
  height: "300px",
};

const FakeGeoLeafletMap: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);
  const [geoJsonData, setGeoJsonData] = useState<any>(null);
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  useEffect(() => {
    // Fetch GeoJSON data from FakeGeo API
    const fetchGeoJson = async () => {
      try {
        const response = await fetch(`${customFields.fakegeoApiUrl}/prod/feature/polygon/properties`, {
          headers: {
            "X-API-KEY": customFields.xApiKey as string,
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
    if (!mapRef.current) {
      // Initialize the Leaflet map
      mapRef.current = L.map("leaflet-map2", {
        center: [40.816337, -101.278818], // Initial center coordinates
        zoom: 5, // Initial zoom level
      });

      // Add OpenStreetMap tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapRef.current);
    }

    const map = mapRef.current;

    if (geoJsonData) {
      // Remove any existing layers to avoid duplication
      map.eachLayer((layer) => {
        if ((layer as any).feature) map.removeLayer(layer);
      });

        // Add GeoJSON layer to the map with popups
        const geoJsonLayer = L.geoJSON(geoJsonData, {
          style: {
            color: "#007cbf", // Line color
            weight: 2, // Line thickness
            fillColor: "#007cbf", // Fill color for polygons
            fillOpacity: 0.5, // Fill opacity
          },
          onEachFeature: (feature, layer) => {
            // Add a popup with properties from GeoJSON
            const popupContent = feature.properties
              ? `<b>Name</b>: ${feature.properties.name}<br/><b>Description</b>: ${feature.properties.detailedDescription}`
              : "No additional information";
  
            layer.bindPopup(popupContent)
          },
        }).addTo(map);

        geoJsonLayer.eachLayer(function(layer){
          layer.openPopup();
        });

      // Adjust map view to fit the bounds of the GeoJSON data
      map.fitBounds(geoJsonLayer.getBounds(), { padding: [20, 20] });
    }
  }, [geoJsonData]);

  return <div id="leaflet-map2" style={containerStyle}></div>;
};

export default FakeGeoLeafletMap;
