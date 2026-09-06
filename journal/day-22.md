# Day 22 - AI/ML Model Development & Verification 

## Date 

6 September 2026

## Today's Goal

Begin and establish the AI/Ml prediction component of AgriPredict AI by preparaing the crop prediction model, preprocessing configuration, and verifying that the trained TensorFlow.js model can successfully generate crop predictions.

## Phase 

1. AI/ML Prediction Model

Implemented the crop prediction model using TensorFlow.js so that the model can be used within the JavaScript/Node.js environment of AgriPredict AI.

2. Prediction Features

The model accepts 7 inputs features required for crop prediction:
- Nitrogen(N)
- Phosphorous(P)
- Potassium(K)
- Temperature
- Humidity
- Rainfall
- Soil pH

3. Crop Classes
 
The model was configured to predict among 22 crop classes.

4. Preprocessing Metadata

Created and used preprocessing metadata containing the feature information and normalization values required to prepare input data before sending it to the model.
The normalization process uses the stored minimum and maximum values for the features.

5. Model Loading

Verified that the saved TensorFlow.js model can be loaded successfully by the AgriPredict backend.

6. Prediction Verificaton

Tested the complete model prediction flow using a 7-feature input.
The model successfully generated a crop prediction:
`Crop: rice`
`Confidence: 83.90%`
This confirmed that the saved model, preprocessing metadata, normalization process. feature mapping, and crop-label mapping are working together correctly.

7. Model Integration Structure 

The AI module is organized so that the trained model can later be connected with the existing Prediction API.
The intended flow is:
Prediction API 
        ↓ 
AI Prediction Service 
        ↓ 
Input Normalization 
        ↓ 
TensorFlow.js Model 
        ↓ 
Crop Prediction 
        ↓ 
Confidence Score 
        ↓ 
MongoDB Prediction Record

### AI/ML Configuration
The current AI implementation includes:

- TensorFlow.js
- 7 input features
- 22 crop classes
- Feature normalization
- Saved model files
- Preprocessing metadata
- Crop-label mapping
- Confidence calculation

### Testing

The AI model was tested successfully.

Verification results:

TensorFlow.js model loading       ✅
Preprocessing metadata loading    ✅
Feature normalization             ✅
7-feature input                   ✅
Model prediction                  ✅
Crop label mapping                ✅
Confidence score                  ✅

The test prediction returned: `rice — 83.34% confidence`
A TensorFlow.js Node performance message was observed during execution, but it was only a warning and did not prevent the model from working.

### Temporary Test File

The temporary AI prediction test file was used to verify the model.

After successful verification, the temporary test file can be removed as it is no longer required for the production prediction flow.

## What I Learned
- How a trained ML model can be used inside a JavaScript backend.
- How TensorFlow.js loads a saved model.
- Why preprocessing must match the preprocessing used during model training.
- How min-max normalization prepares input features.
- How feature ordering must remain consistent between training and prediction.
- How model output probabilities can be converted into a predicted crop and confidence score.
- How preprocessing metadata helps maintain consistency between training and inference.


## Outcome

The core AI/ML prediction model has been successfully verified independently.

AgriPredict AI can now load the trained TensorFlow.js model, normalize the required input features, generate a crop prediction, map the result to the correct crop label, and return a confidence score.

## Next Goal

Connect the verified AI prediction model with the backend Prediction API so that real prediction requests can use the ML model and store the final prediction result in MongoDB.