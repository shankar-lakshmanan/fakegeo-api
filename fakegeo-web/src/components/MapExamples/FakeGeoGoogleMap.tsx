import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const containerStyle = {
  width: "100%",
  height: "300px",
};

const center = {
  lat: 0, // Default center (latitude)
  lng: 0, // Default center (longitude)
};

const FakeGeoGoogleMap: React.FC = () => {
  const [geoJsonData, setGeoJsonData] = useState<any>(null);
  const [googleMap, setGoogleMap] = useState<any>(null);
  const {
    siteConfig: {customFields},
  } = useDocusaurusContext();

  useEffect(() => {
    // Fetch GeoJSON data from FakeGeo API
    const fetchGeoJson = async () => {
      try {
        const response = await fetch(`${customFields.fakegeoApiUrl}/prod/feature/point`,  {
          headers: {
            //@ts-ignore
              'X-API-KEY': customFields?.xApiKey,
              'Content-Type': 'application/json'
          }
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
    if(geoJsonData && googleMap){
      // Add the GeoJSON layer to the map
      googleMap.data.addGeoJson(geoJsonData);

      // Optionally, adjust the map view to fit the GeoJSON data
      const bounds = new window.google.maps.LatLngBounds();
      googleMap.data.forEach((feature) => {
        feature.getGeometry()?.forEachLatLng((latLng) => {
          bounds.extend(latLng);
        });
      });

      setTimeout(()=> {
        googleMap.fitBounds(bounds);
        googleMap.setZoom(5)
      }, 1000);
    }
  }, [geoJsonData, googleMap]);

  const onLoad = (map: google.maps.Map) => {
    setGoogleMap(map);
  };

  return (
    //@ts-ignore
    <LoadScript googleMapsApiKey={customFields?.googleMapsApiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={2} // Default zoom level
        onLoad={onLoad}
      >
        {/* Map children, if needed */}
      </GoogleMap>
    </LoadScript>
  );
};

export default FakeGeoGoogleMap;
