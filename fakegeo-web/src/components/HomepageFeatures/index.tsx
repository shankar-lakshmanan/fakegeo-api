import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  imageUrl?: string; 
  // Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use API',
    // Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    imageUrl: require('@site/static/img/EasyImage.png').default,
    description: (
      <>
        Get started with simple API calls to generate realistic geospatial data in seconds.
        Focus on showcasing your map designs without the hassle of stubbing or manual GeoJSON creation.
        Effortlessly test, develop, and iterate with our reliable and ready-to-use endpoints!
      </>
    ),
  },
  {
    title: 'Flexible',
    // Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    imageUrl: require('@site/static/img/FlexibleImage.png').default,
    description: (
      <>
        Tailor your geospatial data needs with ease. Generate as much or as little as required.
        Specify any area to get data from and control them via simple API calls.
        Optionally include random properties for map popup visualization or stick to pure geometries.
      </>
    ),
  },
  {
    title: 'Customizable Outputs',
    // Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    imageUrl: require('@site/static/img/CustomizableImage.png').default,
    description: (
      <>
        Fine-tune your geospatial data to match your project needs.
        Choose from a variety of geometry types such as points, lines, 
        or polygons features or feature collections to fit your use case.
      </>
    ),
  },
];

function Feature({ title, imageUrl, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {/* Render the image using the imageUrl */}
        <img src={imageUrl} alt={title} className={styles.featureImage} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
