import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import CodeBlock from "@theme/CodeBlock";

export const FakeGeoMapLibreMapCodeExample: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const { fakegeoApiUrl, xApiKey } = siteConfig.customFields as {
    fakegeoApiUrl: string;
    xApiKey: string;
  };

  return (
    <pre>
   <CodeBlock language="javascript">
{`const response = await fetch("${fakegeoApiUrl}/featureCollection/lines", {
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

// Add GeoJSON source
map.addSource("lines-source", {
  type: "geojson",
  data: geoJsonData,
});

// Add a layer to style the lines
map.addLayer({
  id: "lines-layer",
  type: "line",
  source: "lines-source",
  paint: {
    "line-color": "blue", // Line color
    "line-width": 3, // Line width
  },
});

`}
    </CodeBlock>
    </pre>
  );
};