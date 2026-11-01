# AgriPredict AI — Project Vision

**Product name:** AgriPredict AI  
**Product type:** AI-powered smart farming web application  
**Primary users:** Farmers and users exploring data-informed crop selection  
**Project stage:** Core application deployed; multi-farm enhancement documented as active development work

## 1. Vision

AgriPredict AI aims to provide a single web application through which a farmer can enter soil nutrient information, use weather conditions associated with a farm location, receive a crop recommendation, and review previous recommendations.

The product combines a React-based user interface, a Node.js/Express API, MongoDB persistence, TensorFlow.js model inference, and the Open-Meteo weather service.

## 2. User Need

Crop selection involves multiple factors. AgriPredict focuses on bringing a defined set of soil and weather inputs into one repeatable workflow rather than requiring the user to consult separate tools for each step.

## 3. Product Promise

The application provides:
- Crop recommendations based on seven model inputs.
- Location-based weather inputs.
- Saved prediction history for authenticated users.
- Dashboard summaries and chart-based analytics.
- User profile functionality.
- Farm management capabilities.
- An indicative soil-health assessment based on N, P, K and pH.

AgriPredict is a decision-support application. It does not guarantee crop yield, profitability, or agronomic suitability in every local context.

## 4. Target Workflow

1. A user registers or logs in.
2. The user enters soil nutrient values and pH.
3. The user selects a farm/location.
4. The application retrieves weather information using coordinates.
5. The crop model processes seven features and returns a crop label and confidence value.
6. The prediction is saved and made available in the user's history and dashboard.

## 5. Product Principles

- **Data-informed:** use recorded soil inputs and weather data.
- **Traceable:** save prediction inputs and outputs for later review.
- **User-specific:** protect profile, farm and prediction data by authenticated ownership.
- **Transparent:** distinguish model recommendations from guarantees and distinguish indicative soil health from laboratory analysis.
- **Incremental:** protect the stable deployed application while developing larger enhancements separately.

## 6. Current Boundaries

The project notes confirm a deployed core workflow in which crop prediction, prediction history and dashboard updates worked. Multi-farm management and farm-specific prediction history were subsequently planned/developed on a separate feature branch while Render Auto-Deploy was disabled. Verify the final branch and deployment before claiming every multi-farm integration is live.

The project notes do not establish a verified model accuracy score or a complete agronomic validation study. Do not publish an accuracy percentage unless it is measured from the final evaluation artifacts.

## 7. Success Indicators

- Authenticated users can request crop predictions.
- Weather and model inputs are passed in the expected feature order.
- Prediction results are persisted in MongoDB.
- Users can review their own saved predictions.
- Dashboard statistics are derived from stored data.
- Farm operations enforce ownership.
- UI clearly explains the indicative nature of the soil-health result.
