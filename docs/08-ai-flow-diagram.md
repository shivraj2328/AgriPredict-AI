# AgriPredict AI — AI and Prediction Flow

## 1. Purpose

This document describes how AgriPredict obtains the inputs for crop recommendation, prepares the model input, runs TensorFlow.js inference and stores the result.

## 2. Model Inputs

The project uses seven features:

| Feature | Source |
|---|---|
| Nitrogen (N) | Entered by the user |
| Phosphorus (P) | Entered by the user |
| Potassium (K) | Entered by the user |
| Temperature | Weather service using selected coordinates |
| Humidity | Weather service using selected coordinates |
| Rainfall | Weather service using selected coordinates |
| Soil pH | Entered by the user |

The model's feature order and preprocessing must match the training pipeline and saved preprocessing metadata.

## 3. End-to-End Flow

```text
+-----------------------------+
| User enters N, P, K and pH  |
| Selects farm/location       |
+--------------+--------------+
               |
               v
+-----------------------------+
| Frontend validation         |
+--------------+--------------+
               |
               v
+-----------------------------+
| Authenticated prediction API|
| Validate token and request  |
| Verify farm ownership       |
+--------------+--------------+
               |
               v
+-----------------------------+
| Open-Meteo weather request  |
| Latitude / longitude        |
+--------------+--------------+
               |
               v
+-----------------------------+
| Weather values              |
| Temperature, humidity,      |
| rainfall/precipitation      |
+--------------+--------------+
               |
               v
+-----------------------------+
| Prepare seven model inputs  |
| Match training feature order|
| Apply saved preprocessing  |
+--------------+--------------+
               |
               v
+-----------------------------+
| TensorFlow.js inference     |
+--------------+--------------+
               |
               v
+-----------------------------+
| Crop label + confidence     |
+--------------+--------------+
               |
               v
+-----------------------------+
| Save Prediction in MongoDB  |
| User + farm + inputs +      |
| output + timestamp          |
+--------------+--------------+
               |
               v
+-----------------------------+
| Return result to frontend   |
| Update history/dashboard    |
+-----------------------------+
```

## 4. Dataset and Model Documentation

Project planning notes refer to the Kaggle Crop Recommendation Dataset, commonly described in the project as approximately 2,200 records, seven input features and 22 crop classes.

The reviewed project notes do not establish the exact downloaded dataset version, source file checksum, train/test split, training hyperparameters, evaluation results or final accuracy. Add these from the actual training scripts and model artifacts. Do not infer or invent performance metrics.

## 5. Preprocessing and Inference

The project model integration uses preprocessing metadata and normalization before inference. The deployed inference pipeline must:
1. Validate the input values.
2. Obtain weather values from the selected location.
3. Arrange all seven features in the exact training order.
4. Apply the same normalization/scaling used during training.
5. Pass the prepared tensor to the TensorFlow.js model.
6. Interpret the output using the correct crop-label mapping.
7. Return the predicted crop and confidence value.

Changing feature order, normalization constants or crop-label mapping can produce incorrect results.

## 6. Weather Aggregation Assumption

Project notes mention a mean-monthly rainfall assumption. The exact weather API query, aggregation window and units must be checked against the current implementation and training data. Do not describe the rainfall value as monthly or daily unless the final code confirms it.

## 7. Indicative Soil Health Is Separate

The soil-health assessment is not the crop model output. It uses the prediction's recorded N, P, K and pH values and applies the project's own scoring methodology. Temperature, humidity and rainfall are crop-model weather features, not inputs to the four-parameter soil-health score.

The score is indicative only and is not a laboratory soil test or official government soil-health classification.

## 8. Failure Handling

- If weather retrieval fails, do not silently insert fabricated values.
- If the model fails to load or infer, return a controlled error.
- If the request is invalid, stop before inference.
- If farm association is requested, verify ownership.
- Save a prediction only after a valid prediction result has been produced.

## 9. Model Validation To Complete

Before publishing scientific or academic performance claims, document:
- Exact dataset citation and version.
- Data cleaning and missing-value treatment.
- Train/validation/test split.
- Feature order and normalization parameters.
- Model architecture and training configuration.
- Accuracy and suitable per-class metrics from held-out evaluation.
- Model file/version used by the deployed backend.
