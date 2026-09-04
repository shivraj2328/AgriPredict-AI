# Day 21 — Prediction API Foundation

## Date

4 September 2026

## Objective

Implement the backend foundation for the AgriPredict crop prediction API, including authentication, validation, prediction storage, and MongoDB integration.

## Work Completed

- Established Prediction API architecture.
- Implemented the Prediction controller.
- Implemented `POST /api/predictions`.
- Protected the Prediction API using JWT authentication middleware.
- Retrieved the authenticated user's ID from the verified JWT.
- Validated prediction input parameters.
- Stored prediction records in MongoDB.
- Tested the Prediction API using Postman.
- Reviewed the API request and response structure.
- Kept the API structure aligned with the existing Crop Prediction frontend.

## Prediction Inputs

- Nitrogen
- Phosphorus
- Potassium
- Temperature
- Humidity
- Rainfall
- Soil pH

## Request Flow

```text
Prediction Request
        ↓
POST /api/predictions
        ↓
JWT Authentication
        ↓
Prediction Controller
        ↓
Input Validation
        ↓
Prediction Model
        ↓
MongoDB
        ↓
API Response
```

## Security

- Prediction requests require JWT authentication.
- User identity is obtained from the verified JWT.
- Clients do not provide an arbitrary user ID for ownership.
- Invalid or missing authentication is rejected.
- Prediction data is associated with the authenticated user.

## Testing

The Prediction API was tested using Postman for:

- Valid authenticated request
- Missing JWT
- Invalid JWT
- Invalid prediction input
- Successful MongoDB storage
- Prediction response verification

## Outcome

The AgriPredict backend now has a functional Prediction API foundation connected to the authenticated user and MongoDB.

```text
Prediction Model       ✅
Prediction Controller  ✅
Prediction API         ✅
JWT Protection         ✅
Input Validation       ✅
MongoDB Storage        ✅
API Testing            ✅
```

## Next Step

Continue with the remaining Prediction API endpoints and then move toward AI/ML integration.

## Time Spent

1 day

