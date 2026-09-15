# Day 24 — Frontend Prediction Integration

## Date

8 September 2026

## Phase

Phase 5 — AI & Integration

## Objective

Connect the React Prediction page with the backend Prediction API and complete the end-to-end crop prediction flow.

## Work Completed

* Connected the React Prediction page to the backend Prediction API.
* Integrated the frontend prediction form with the API using Axios.
* Sent the seven required prediction features from the frontend.
* Used JWT authentication for the prediction request.
* Connected the frontend request to the backend Prediction Controller.
* Integrated the AI prediction service into the complete prediction workflow.
* Generated crop predictions and confidence scores using the TensorFlow.js model.
* Stored prediction results in MongoDB.
* Returned the prediction result from the backend to the frontend.
* Displayed the predicted crop and confidence in the Prediction UI.
* Tested the complete prediction workflow from user input to final result.

## Prediction Features

The prediction request uses:

* Nitrogen (N)
* Phosphorus (P)
* Potassium (K)
* Temperature
* Humidity
* Rainfall
* Soil pH

## Final End-to-End Flow

```text
User Input
    ↓
React Prediction Form
    ↓
Axios Request
    ↓
JWT Authentication
    ↓
Prediction API
    ↓
Prediction Controller
    ↓
AI Prediction Service
    ↓
Feature Normalization
    ↓
TensorFlow.js Model
    ↓
Predicted Crop + Confidence
    ↓
MongoDB
    ↓
API Response
    ↓
Prediction Result UI
```

## Outcome

The AgriPredict prediction system is now connected end-to-end.

A user can enter the required soil and environmental parameters in the React application, submit the prediction request, and receive an AI-generated crop recommendation with a confidence score.

This completes the frontend integration of the AI-powered prediction workflow.

## Current Status

* React Prediction UI: ✅
* Axios API integration: ✅
* JWT authentication: ✅
* Prediction API: ✅
* Prediction Controller: ✅
* AI Prediction Service: ✅
* TensorFlow.js Model: ✅
* MongoDB Prediction Storage: ✅
* Prediction Result UI: ✅
* End-to-End Prediction Flow: ✅

## Next Goal

Move toward weather API integration and automatically obtain environmental parameters such as temperature, humidity, and rainfall based on the farmer's selected farm location.
