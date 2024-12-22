---
sidebar_position: 2
---

FakeGeo provides a RESTful API designed to generate realistic geospatial data for development, testing, and showcasing maps. This API lets you request specific geometries such as points, lines, polygons, and more, or define custom bounding boxes to generate data tailored to your needs. Responses are delivered in GeoJSON format, making it easy to integrate with map libraries and GIS tools. All API access is over HTTPS, ensuring secure communication, and all data is sent and received as JSON for straightforward parsing and usage.

Check out the full API documentation **[here](./../api)**.

## Making an API request

Here is a basic request example that can be used to get a single point feature using curl:

```bash title="Request: Single point feature"
curl -X GET "https://api.fakegeo.com/feature/point" -H "Accept: application/json"
```
```json
{
  "type": "Feature",
  "properties": {},
  "geometry": { "type": "Point", "coordinates": [-101.278818, 40.816337] }
}
```

Here is an example to get the feature with random properties
```bash title="Request: Single point feature with properties"
curl -X GET "https://api.fakegeo.com/feature/point/properties" -H "Accept: application/json"
```
```json
{
  "type": "Feature",
  "properties": {
    "name": "Location-66",
    "height_meters": 21.4,
    "isPublic": false,
    "tags": ["landmark", "museum"],
    "details": {
      "architect": "Architect-83",
      "yearCompleted": 1860,
      "constructionCost": { "amount": 8679002, "currency": "EUR" },
      "renovationHistory": [
        {
          "year": 1938,
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "cost": { "amount": 3821185.39, "currency": "USD" }
        },
        {
          "year": 1922,
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "cost": { "amount": 118329.02, "currency": "GBP" }
        },
        {
          "year": 2010,
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "cost": { "amount": 4296883.5, "currency": "GBP" }
        }
      ]
    },
    "contact": {
      "phone": "+1-966-3627061",
      "email": "contact7@example.com",
      "website": "https://example37.com"
    },
    "timestamp": 1734494317816,
    "lastRenovated": "2024-10-16T06:47:16.697Z",
    "visitorHours": {
      "monday": "09:00-17:00",
      "tuesday": "09:00-17:00",
      "wednesday": "09:00-17:00",
      "thursday": "09:00-17:00",
      "friday": "09:00-17:00",
      "saturday": "Closed",
      "sunday": "Closed"
    },
    "numberOfVisitors": 2693937,
    "rating": 1.6,
    "security": { "fenced": true, "guards": 15, "surveillanceCameras": 87 },
    "weather": {
      "currentTemperatureCelsius": 7.7,
      "forecast": [
        {
          "day": "Thursday",
          "condition": "Cloudy",
          "highC": 37.38,
          "lowC": 13.86
        },
        { "day": "Wednesday", "condition": "Rainy", "highC": 38.03, "lowC": 6 }
      ]
    },
    "historicalSignificance": [
      "Important cultural landmark",
      "Major tourist attraction"
    ],
    "emergencyContacts": [
      { "type": "Fire Department", "number": "911" },
      { "type": "Police Department", "number": "911" }
    ],
    "accessibility": {
      "wheelchairAccessible": true,
      "languagesAvailable": ["English"]
    },
    "powerSources": [
      { "type": "Grid", "percentage": 81 },
      { "type": "Solar", "percentage": 21 }
    ],
    "detailedDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "tourExperience": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  "geometry": { "type": "Point", "coordinates": [-101.278818, 40.816337] }
}
```
Many more endpoints with example responses are **[here](./../api)**.