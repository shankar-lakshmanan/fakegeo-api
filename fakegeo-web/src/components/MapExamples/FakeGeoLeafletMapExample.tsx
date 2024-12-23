import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import CodeBlock from "@theme/CodeBlock";

export const FakeGeoLeafletMapExample: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const { fakegeoApiUrl, xApiKey } = siteConfig.customFields as {
    fakegeoApiUrl: string;
    xApiKey: string;
  };

  return (
    <pre>
   <CodeBlock language="javascript">
{`const response = await fetch("${fakegeoApiUrl}/polygon/random/properties", {
  headers: {
    'X-API-KEY': '${xApiKey}',
    'Content-Type': 'application/json',
  },
});
const geoJsonData = await response.json();

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
      ? '<b>Name</b>: {feature.properties.name}<br/><b>Description</b>: {feature.properties.detailedDescription}'
      : "No additional information";

    layer.bindPopup(popupContent)
  },
}).addTo(map);

geoJsonLayer.eachLayer(function(layer){
  layer.openPopup();
});
`}
    </CodeBlock>
    </pre>
  );
};