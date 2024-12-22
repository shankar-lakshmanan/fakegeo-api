import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import CodeBlock from "@theme/CodeBlock";

export const FakeGeoOpenLayersCodeExample: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const { fakegeoApiUrl, xApiKey } = siteConfig.customFields as {
    fakegeoApiUrl: string;
    xApiKey: string;
  };

  return (
    <pre>
   <CodeBlock language="javascript">
{`const response = await fetch("${fakegeoApiUrl}/featureCollection/points", {
  headers: {
    'X-API-KEY': '${xApiKey}',
    'Content-Type': 'application/json',
  },
});
const geoJsonData = await response.json();

const geoJsonBlob = new Blob([JSON.stringify(geoJsonData)], { type: 'application/json' });
const geoJsonUrl = URL.createObjectURL(geoJsonBlob); // Create a URL for the Blob

const geoJsonLayer = new GeoJSONLayer({
  url: geoJsonUrl, // Use the Blob URL as the layer URL
});

// Create a vector source and layer
const vectorSource = new VectorSource({
  features: new GeoJSON().readFeatures(geoJsonData, {
    featureProjection: "EPSG:3857", // Ensure projection matches the map's projection
  }),
});

// Define a style for the points
const pointStyle = new Style({
  image: new CircleStyle({
    radius: 6, // Radius of the point
    fill: new Fill({
      color: "red", // Set the color to red
    }),
  }),
});

const vectorLayer = new VectorLayer({
  source: vectorSource,
  style: pointStyle, // Apply the style to the layer
});

map.addLayer(vectorLayer);

`}
    </CodeBlock>
    </pre>
  );
};