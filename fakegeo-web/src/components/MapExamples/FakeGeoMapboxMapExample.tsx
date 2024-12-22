import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import CodeBlock from "@theme/CodeBlock";

export const FakeGeoMapboxMapExample: React.FC = () => {
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

map.addSource("geojson", {
            type: "geojson",
            data: geoJsonData,
          });
          
map.addLayer({
    id: "geojson-layer",
    type: "line",
    source: "geojson",
    paint: {
        "line-width": 4, // Set the width of the line
        "line-color": "#007cbf", // Set the color of the line
    },
});
`}
    </CodeBlock>
    </pre>
  );
};