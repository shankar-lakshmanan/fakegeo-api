import React, { useEffect, useRef, useState } from "react";
import StaticMap  from "react-map-gl";
import { DeckGL } from "@deck.gl/react";
import { GeoJsonLayer } from "@deck.gl/layers";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const containerStyle = {
  width: "100%",
  height: "300px",
  position: "relative",
};

// Initial viewport configuration for Deck.gl
const initialViewState = {
  longitude: 0,
  latitude: 0,
  zoom: 1,
  pitch: 0,
  bearing: 0,
};

const FakeGeoDeckGLMap: React.FC = () => {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  useEffect(() => {
    const fetchGeoJsonData = async () => {
      try {
        // Fetch the GeoJSON FeatureCollection from your API
        const response = await fetch(`${customFields.fakegeoApiUrl}/prod/featureCollection/polygons`, {
          headers: {
            //@ts-ignore
            "X-API-KEY": customFields?.xApiKey,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setGeoJsonData(data);
      } catch (error) {
        console.error("Error fetching GeoJSON data:", error);
      }
    };

    fetchGeoJsonData();
  }, [customFields]);

  // Define a GeoJsonLayer to render polygons
  const geoJsonLayer = new GeoJsonLayer({
    id: "geojson-layer",
    data: geoJsonData,
    filled: true,
    stroked: true,
    lineWidthMinPixels: 2,
    getFillColor: [255, 0, 0, 100], // Red with transparency
    getLineColor: [255, 255, 255], // White border
  });

  return (
    <DeckGL
      // @ts-ignore
      initialViewState={initialViewState}
      controller={true}
      layers={geoJsonData ? [geoJsonLayer] : []}
      style={containerStyle}

    >
      {/* Base map from MapLibre or Mapbox (optional) */}
      <StaticMap mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json" />
    </DeckGL>
  );
};

export default FakeGeoDeckGLMap;
