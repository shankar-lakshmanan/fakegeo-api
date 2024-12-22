import React, { useEffect, useState } from "react";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Map as PigeonMap, Marker } from "pigeon-maps";

const containerStyle = {
  width: "100%",
  height: "300px",
};

const FakeGeoPigeonMap: React.FC = () => {
  const [geoJsonData, setGeoJsonData] = useState<any>(null);
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  useEffect(() => {
    const fetchGeoJsonAndSetData = async () => {
      try {
        // Fetch GeoJSON FeatureCollection from your API
        const response = await fetch(`${customFields.fakegeoApiUrl}/prod/featureCollection/points`, {
          headers: {
            //@ts-ignore
            "X-API-KEY": customFields?.xApiKey,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setGeoJsonData(data); // Set the fetched GeoJSON data to state
      } catch (error) {
        console.error("Error fetching GeoJSON data:", error);
      }
    };

    fetchGeoJsonAndSetData();
  }, [customFields]);

  const renderGeoJsonPoints = (geoJsonData: any) => {
    return geoJsonData.features.map((feature: any, index: number) => {
      const coordinates = feature.geometry.coordinates;
      const [longitude, latitude] = coordinates;

      return (
        <Marker
          key={index}
          anchor={[latitude, longitude]} // Place the marker at the coordinates
          payload={{ featureId: feature.id }}
        />
      );
    });
  };

  return (
    <div style={containerStyle}>
      {geoJsonData && (
        <PigeonMap
          height={300}
          defaultCenter={[0, 0]} // Default center [latitude, longitude]
          defaultZoom={2} // Default zoom level
        >
          {/* Render custom markers from GeoJSON data */}
          {renderGeoJsonPoints(geoJsonData)}
        </PigeonMap>
      )}
    </div>
  );
};

export default FakeGeoPigeonMap;
