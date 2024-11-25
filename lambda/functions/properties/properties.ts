import { Feature, FeatureCollection} from "geojson";

function generateRandomGeoJSONProperties(): any {
  const lorem = (length: number) => Array(length).fill("Lorem ipsum dolor sit amet, consectetur adipiscing elit.").join(" ");
  const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  const randomFloat = (min: number, max: number, decimals: number = 2) => 
    parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
  const randomBoolean = () => Math.random() > 0.5;
  const randomArray = <T>(items: T[], count: number) => 
    Array.from({ length: count }, () => items[Math.floor(Math.random() * items.length)]);
  const randomDate = () => new Date(Date.now() - randomInt(0, 1e10)).toISOString();

  return {
    name: `Location-${randomInt(1, 1000)}`,
    height_meters: randomFloat(5, 100),
    isPublic: randomBoolean(),
    tags: randomArray(["landmark", "park", "historical", "museum", "mountain"], randomInt(1, 3)),
    details: {
      architect: `Architect-${randomInt(1, 100)}`,
      yearCompleted: randomInt(1800, 2023),
      constructionCost: {
        amount: randomFloat(100000, 10000000),
        currency: randomArray(["USD", "EUR", "GBP"], 1)[0]
      },
      renovationHistory: Array.from({ length: randomInt(1, 3) }, () => ({
        year: randomInt(1900, 2023),
        description: lorem(1),
        cost: {
          amount: randomFloat(50000, 5000000),
          currency: randomArray(["USD", "EUR", "GBP"], 1)[0]
        }
      }))
    },
    contact: {
      phone: `+1-${randomInt(100, 999)}-${randomInt(1000000, 9999999)}`,
      email: `contact${randomInt(1, 100)}@example.com`,
      website: `https://example${randomInt(1, 100)}.com`
    },
    timestamp: Date.now(),
    lastRenovated: randomDate(),
    visitorHours: {
      monday: "09:00-17:00",
      tuesday: "09:00-17:00",
      wednesday: "09:00-17:00",
      thursday: "09:00-17:00",
      friday: "09:00-17:00",
      saturday: randomBoolean() ? "Closed" : "10:00-15:00",
      sunday: "Closed"
    },
    numberOfVisitors: randomInt(500, 5000000),
    rating: randomFloat(1, 5, 1),
    security: {
      fenced: randomBoolean(),
      guards: randomInt(0, 50),
      surveillanceCameras: randomInt(0, 100)
    },
    weather: {
      currentTemperatureCelsius: randomFloat(-10, 40),
      forecast: Array.from({ length: 2 }, () => ({
        day: randomArray(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], 1)[0],
        condition: randomArray(["Sunny", "Cloudy", "Rainy"], 1)[0],
        highC: randomFloat(0, 40),
        lowC: randomFloat(-10, 20)
      }))
    },
    historicalSignificance: randomArray([
      "Important cultural landmark",
      "Historic wartime site",
      "Presidential residence",
      "Major tourist attraction"
    ], randomInt(1, 3)),
    emergencyContacts: [
      { type: "Fire Department", number: "911" },
      { type: "Police Department", number: "911" }
    ],
    accessibility: {
      wheelchairAccessible: randomBoolean(),
      languagesAvailable: randomArray(["English", "Spanish", "French", "Mandarin"], randomInt(1, 3))
    },
    powerSources: [
      { type: "Grid", percentage: randomInt(50, 100) },
      { type: "Solar", percentage: randomInt(0, 50) }
    ],
    detailedDescription: lorem(3),
    tourExperience: lorem(2)
  };
}

export function populateGeoJsonFeatureWithProperties(feature: Feature): Feature {
    feature = {
        ...feature,
        properties:generateRandomGeoJSONProperties()
    }
    return feature;
  };


export function populateGeoJsonFeatureCollectionWithProperties(
  featureCollection: FeatureCollection
): FeatureCollection {
  const updatedFeatures = featureCollection.features.map((feature) => ({
    ...feature,
    properties: generateRandomGeoJSONProperties(),
  }));

  return {
    ...featureCollection,
    features: updatedFeatures,
  };
}

