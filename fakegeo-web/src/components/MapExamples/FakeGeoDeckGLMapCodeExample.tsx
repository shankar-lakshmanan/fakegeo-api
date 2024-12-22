import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import CodeBlock from "@theme/CodeBlock";

export const FakeGeoDeckGLMapCodeExample: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const { fakegeoApiUrl, xApiKey } = siteConfig.customFields as {
    fakegeoApiUrl: string;
    xApiKey: string;
  };

  return (
    <pre>
   <CodeBlock language="javascript">
{`const response = await fetch("${fakegeoApiUrl}/featureCollection/polygons", {
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

React Element:
<DeckGL layers={geoJsonData ? [geoJsonLayer] : []}/>

`}
    </CodeBlock>
    </pre>
  );
};