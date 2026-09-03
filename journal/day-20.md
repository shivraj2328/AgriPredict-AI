# Day 20 — Prediction Database Model

## Date

3 September 2026

## Objective

Create the MongoDB/Mongoose Prediction Model that will serve as the database foundation for the AgriPredict crop prediction feature.

## Work Completed

- Designed the Prediction data structure based on the existing Crop Prediction UI.
- Created the `Prediction.js` Mongoose model.
- Added the authenticated user relationship to each prediction.
- Added soil and environmental input fields required for crop prediction.
- Added schema validation for prediction inputs.
- Added timestamps for prediction records.
- Reviewed the Prediction model structure for future API and AI integration.
- Kept the model aligned with the existing Crop Prediction frontend fields.

## Prediction Data

The Prediction model is designed to store:

- User
- Nitrogen (N)
- Phosphorus (P)
- Potassium (K)
- Temperature
- Humidity
- Rainfall
- Soil pH
- Recommended crop
- Confidence score
- Created/updated timestamps

## Architecture

```text
Authenticated User
       ↓
Prediction Request
       ↓
JWT Middleware
       ↓
Prediction Controller
       ↓
Prediction Model
       ↓
MongoDB
```

## Database Structure

```text
User
 │
 └── Prediction
       ├── Soil Parameters
       ├── Weather Parameters
       ├── Recommended Crop
       ├── Confidence
       └── Timestamps
```

## Security

- Prediction records are associated with an authenticated user.
- User identity will be obtained from the verified JWT rather than trusting a user ID supplied by the frontend.
- Password information is not stored in the Prediction document.

## Outcome

The Prediction database layer is now ready for the next stage of development.

```text
User Model          ✅
Authentication      ✅
JWT Middleware      ✅
Profile API         ✅
Prediction Model    ✅
```

## Next Step

Build the Prediction Controller and API endpoints to receive prediction inputs and store prediction results.

## Time Spent

1 day
