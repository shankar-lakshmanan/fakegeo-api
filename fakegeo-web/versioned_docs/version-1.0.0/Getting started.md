---
sidebar_position: 2
---

FakeGeo provides a RESTful API designed to generate realistic geospatial data for development, testing, and showcasing maps. This API lets you request specific geometries such as points, lines, polygons, and more, or define custom bounding boxes to generate data tailored to your needs. Responses are delivered in GeoJSON format, making it easy to integrate with map libraries and GIS tools. All API access is over HTTPS, ensuring secure communication, and all data is sent and received as JSON for straightforward parsing and usage.

Check out the full API documentation **[here](./../api)**.

## Point feature
Here is a basic request example that can be used to get a single point feature using curl.
/random helps to get a different random point everytime the request is made.

```bash title="Request: Single random point feature"
curl -X GET "https://api.fakegeo.com/feature/point/random" -H "Accept: application/json"
```
```json
{
  "type": "Feature",
  "properties": {},
  "geometry": { "type": "Point", "coordinates": [-101.278818, 40.816337] }
}
```
## Point feature with random properties
Here is an example to get the feature with random properties:
```bash title="Request: Single random point feature with properties"
curl -X GET "https://api.fakegeo.com/feature/point/random/properties" -H "Accept: application/json"
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

## Polygon feature collection with a specified feature limit
Here is an endpoint to get multiple features in a feature collection. Specify a limit optionally via params:
```bash title="Request: Feature collection random polygons feature"
curl -X POST "https://api.fakegeo.com/featureCollection/polygons/random" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
    "limit": 2
}'
```
```json
{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            -135.90460171612264,
                            -66.42956616363837
                        ],
                        [
                            -134.67946289550775,
                            -70.25441097517796
                        ],
                        [
                            -139.05021567247005,
                            -74.9991707063565
                        ],
                        [
                            -140.86065819660203,
                            -79.52691036090067
                        ],
                        [
                            -141.06988583262583,
                            -79.49182607099371
                        ],
                        [
                            -142.21228022606616,
                            -74.58236082682961
                        ],
                        [
                            -145.97744528573813,
                            -78.51712684908252
                        ],
                        [
                            -145.0136168835437,
                            -73.99888292085852
                        ],
                        [
                            -143.4588607053766,
                            -73.77263605709487
                        ],
                        [
                            -142.40537751944615,
                            -72.72159022766584
                        ],
                        [
                            -135.90460171612264,
                            -66.42956616363837
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            -86.7437206570793,
                            8.318536871690903
                        ],
                        [
                            -82.1549168626249,
                            12.32380833697237
                        ],
                        [
                            -80.3539409359871,
                            11.938158260247295
                        ],
                        [
                            -86.50674617802214,
                            7.4490176572966185
                        ],
                        [
                            -81.5116082965444,
                            5.997811450650362
                        ],
                        [
                            -84.13007492074874,
                            0.362677348305926
                        ],
                        [
                            -90.34968346247032,
                            2.977440260048945
                        ],
                        [
                            -88.88593524056334,
                            6.336308593463015
                        ],
                        [
                            -93.49579434810478,
                            9.358227850953593
                        ],
                        [
                            -90.17170481160188,
                            9.79806034601285
                        ],
                        [
                            -86.7437206570793,
                            8.318536871690903
                        ]
                    ]
                ]
            }
        }
    ]
}
```
## Polygon feature collection with a specified feature limit within a bounding box
Here is an endpoint to get multiple features in a feature collection within a bounding box. Specify the bbox and a limit optionally via params:
```bash title="Request: Feature collection random polygons feature"
curl -X POST "https://api.fakegeo.com/featureCollection/polygons/random" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
    "limit": 2,
    "bbox": [-104.35959912130382, 40.186854567133594, -99.75483802782351, 36.870115044295346]
}'
```
```json
{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            -101.10951647485292,
                            39.734273863091204
                        ],
                        [
                            -100.97085570773326,
                            39.668178068173404
                        ],
                        [
                            -100.9976971648599,
                            39.6215407558426
                        ],
                        [
                            -101.04897952451013,
                            39.57537999356334
                        ],
                        [
                            -100.86372961666964,
                            39.570231838994765
                        ],
                        [
                            -100.93328308333321,
                            39.272893292915896
                        ],
                        [
                            -101.16204048111675,
                            39.35481082534271
                        ],
                        [
                            -101.48132963401223,
                            38.71561876572087
                        ],
                        [
                            -102.00656812880457,
                            39.56975689298966
                        ],
                        [
                            -101.31737821679089,
                            39.80180875942848
                        ],
                        [
                            -101.10951647485292,
                            39.734273863091204
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            -102.46095205562754,
                            38.54143720649258
                        ],
                        [
                            -102.71925335594426,
                            37.637775268002194
                        ],
                        [
                            -102.84268285439173,
                            37.576928463674655
                        ],
                        [
                            -102.95746384364402,
                            36.78455570325921
                        ],
                        [
                            -103.00807146158208,
                            37.18407857032622
                        ],
                        [
                            -103.25790595209006,
                            36.79679083746743
                        ],
                        [
                            -103.11175203341928,
                            37.69691330697496
                        ],
                        [
                            -103.5884435389688,
                            38.307482787851555
                        ],
                        [
                            -103.09548488587788,
                            38.39702165882314
                        ],
                        [
                            -102.91608853406203,
                            38.1545633329699
                        ],
                        [
                            -102.46095205562754,
                            38.54143720649258
                        ]
                    ]
                ]
            }
        }
    ]
}
```
Many more endpoints with example responses are **[here](./../api)**.