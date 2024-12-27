import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';
import FakeGeoMapLibreHomeMap from '../components/MapExamples/FakeGeoMapLibreHomeMap';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
      <img src={require('@site/static/img/FakeGeoLogo.png').default} style={{width: 230, height: 230, borderRadius:"10px"}} alt={"FakeGeo"} className={styles.featureImage} />
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <FakeGeoMapLibreHomeMap/>
        <br/>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/introduction">
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
      <><iframe src="https://docs.google.com/forms/d/e/1FAIpQLScRpuRnOkAdtZa4dYO4Ne3S1-Rt8XQo4UDBisld3514SlNNJA/viewform?embedded=true" width="100%" height="329" style={{border:"1px solid", borderRadius: "10px", borderColor: "#9b59b6"}}>Loading…</iframe></>
    </Layout>
  );
}
