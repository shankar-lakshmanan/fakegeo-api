import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import CodeBlock from "@theme/CodeBlock";

export const FakeGeoGoogleMapCodeExample: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const { fakegeoApiUrl, xApiKey } = siteConfig.customFields as {
    fakegeoApiUrl: string;
    xApiKey: string;
  };

  return (
    <pre>
   <CodeBlock language="javascript">
{`const response = await fetch("${fakegeoApiUrl}/feature/point", {
  headers: {
    'X-API-KEY': '${xApiKey}',
    'Content-Type': 'application/json',
  },
});
const geoJsonData = await response.json();
googleMap.data.addGeoJson(geoJsonData);`}
    </CodeBlock>
    </pre>
  );
};