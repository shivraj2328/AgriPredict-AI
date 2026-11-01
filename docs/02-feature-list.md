# AgriPredict AI — Feature List

This document records features supported by the project progress notes. A feature described as implemented should still be checked against the final submission branch before release.

## 1. Authentication and User

| Feature | Description | Progress recorded |
|---|---|---|
| Registration and login | User account creation and authentication | Implemented |
| JWT protection | Protect authenticated API routes | Implemented |
| Profile | Retrieve and update the logged-in user's profile | Implemented |
| Profile statistics | Show statistics calculated from real prediction records | Implemented in project progress notes |
| Logout | End the authenticated frontend session | Implemented |

## 2. Crop Prediction

| Feature | Description | Progress recorded |
|---|---|---|
| Soil input | Accept N, P, K and pH from the user | Implemented |
| Weather input | Retrieve temperature, humidity and rainfall using location coordinates | Integrated using Open-Meteo |
| ML inference | TensorFlow.js crop classification using seven features | Integrated |
| Prediction response | Return crop recommendation and confidence | Implemented |
| Prediction persistence | Save prediction records in MongoDB | Implemented |
| Prediction history | Retrieve and display the user's previous predictions | Implemented; production workflow reported successful |

### Model input features

1. Nitrogen (N)
2. Phosphorus (P)
3. Potassium (K)
4. Temperature
5. Humidity
6. Rainfall
7. Soil pH

The order and normalization must remain consistent with the model's training metadata.

## 3. Dashboard and Analytics

- Total predictions and other available profile/dashboard statistics.
- Recent prediction information.
- Crop distribution and prediction activity charts using Chart.js.
- Confidence-related visualization where available.
- Dashboard updates after a successful prediction.

Statistics must be calculated from stored records rather than hard-coded demonstration values.

## 4. Farm Management

| Feature | Description | Progress recorded |
|---|---|---|
| Farm registration | Save farm name, coordinates and optional description | Day 34 backend work |
| Farm listing | Retrieve farms belonging to the authenticated user | Day 34 backend work |
| Farm update/delete | Manage owned farms | Day 34 backend work |
| Ownership validation | Prevent users from accessing another user's farms | Required and implemented in backend work notes |
| Farm management UI | My Farms page with create/list/details/edit/delete actions | Day 35 work |
| Farm selection in prediction | Associate a prediction with a selected farm | Day 36 integration work |
| Farm-specific history | Display farm name and filter history by farm | Day 36 integration work |

**Status note:** Farm management and farm-aware prediction tasks were developed on `feature/multi-farm` while the stable deployment was protected. Check the final branch for the exact completion state.

## 5. Indicative Soil Health

The feature estimates a score from the N, P, K and pH values recorded with a prediction. It is not a laboratory soil test, a complete Soil Health Card assessment, or an official government composite score.

The project's methodology uses equal weighting:
- N: 25%
- P: 25%
- K: 25%
- pH: 25%

The Day 36 notes specify score bands:
- 80–100: Good
- 60–79: Moderate
- 0–59: Needs Improvement

The exact component scoring must be kept consistent with the implementation. Do not silently substitute another scoring table.

## 6. Explicitly Out of Scope / Not Confirmed

- Prediction feedback/rating: removed from the project scope in earlier planning notes.
- Fertilizer recommendation, disease prediction, market prices and crop calendar: proposed ideas only; not confirmed as implemented.
- Multilingual support: future enhancement.
- Offline operation: not confirmed.
