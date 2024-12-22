import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import CodeBlock from "@theme/CodeBlock";

export const FakeGeoPigeonMapCodeExample: React.FC = () => {
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
setGeoJsonData(data); // Set the fetched GeoJSON data to a react state

Set the geojson data binding in the react component:
<PigeonGeoJSON data={geoJsonData} />

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

<PigeonMap
          height={300}
          defaultCenter={[0, 0]} // Default center [latitude, longitude]
          defaultZoom={2} // Default zoom level
        >
  {/* Render custom markers from GeoJSON data */}
  {renderGeoJsonPoints(geoJsonData)}
</PigeonMap>

`}
    </CodeBlock>
    </pre>
  );
};