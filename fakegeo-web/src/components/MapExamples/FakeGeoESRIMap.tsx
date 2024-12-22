import React, { useEffect, useRef, useState } from "react";
import "@arcgis/core/assets/esri/themes/light/main.css";
import  WebMap  from "@arcgis/core/WebMap";
import  MapView  from "@arcgis/core/views/MapView";
import  GeoJSONLayer  from "@arcgis/core/layers/GeoJSONLayer";
import  useDocusaurusContext  from '@docusaurus/useDocusaurusContext';

const FakeGeoESRIMap: React.FC = () => {
  const mapDivRef = useRef<HTMLDivElement | null>(null);
  const [geoJsonData, setGeoJsonData] = useState<any>(null);
  const { siteConfig: { customFields } } = useDocusaurusContext();

  useEffect(() => {
    // Fetch GeoJSON data from FakeGeo API with custom headers
    const fetchGeoJsonWithHeaders = async () => {
      try {
        const response = await fetch(`${customFields.fakegeoApiUrl}/prod/feature/line`, {
          headers: {
            //@ts-ignore
            "X-API-KEY": customFields.xApiKey,  // Add your custom header here
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setGeoJsonData(data);
      } catch (error) {
        console.error("Error fetching GeoJSON data:", error);
      }
    };

    fetchGeoJsonWithHeaders();
  }, [customFields]);

  useEffect(() => {
    if (mapDivRef.current && geoJsonData) {
      // Create a temporary GeoJSON file by converting the GeoJSON data into a Blob
      const geoJsonBlob = new Blob([JSON.stringify(geoJsonData)], { type: 'application/json' });
      const geoJsonUrl = URL.createObjectURL(geoJsonBlob); // Create a URL for the Blob

      const geoJsonLayer = new GeoJSONLayer({
        url: geoJsonUrl, // Use the Blob URL as the layer URL
      });

      const map = new WebMap({
        basemap: "gray-vector"
      });

      const view = new MapView({
        container: mapDivRef.current,
        map: map,
        center: [-101.278818, 40.816337], // Center coordinates for the map
        zoom: 5, // Zoom level
      });

      // Add GeoJSON Layer to the map
      view.when(() => {
        map.add(geoJsonLayer);
        geoJsonLayer.when(() => {
          view.goTo(geoJsonLayer.fullExtent);
        }).catch((err) => {
          console.error("Error loading GeoJSON layer:", err);
        });
      });

      return () => {
        view.destroy();
      };
    }
  }, [geoJsonData, customFields]);

  return <div ref={mapDivRef} style={{ width: "100%", height: "500px" }}></div>;
};

export default FakeGeoESRIMap;
