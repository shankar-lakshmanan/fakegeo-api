import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import CodeBlock from "@theme/CodeBlock";

export const FakeGeoESRIMapCodeExample: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const { fakegeoApiUrl, xApiKey } = siteConfig.customFields as {
    fakegeoApiUrl: string;
    xApiKey: string;
  };

  return (
    <pre>
   <CodeBlock language="javascript">
{`const response = await fetch("${fakegeoApiUrl}/feature/line", {
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
});
`}
    </CodeBlock>
    </pre>
  );
};