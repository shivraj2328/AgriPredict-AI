# Day 36 — Farm-Specific Prediction History & Soil Health

**Date:** 26 October 2026 to 27 October
**Phase:** Multi-Farm Management & Prediction Integration

## Objective

Integrate Multi-Farm Management with crop prediction, Prediction History, and Indicative Soil Health so farmers can track predictions and assessments for individual farms.

## Work Completed

* Integrated registered farms with the crop prediction workflow.
* Associated predictions with the selected farm.
* Implemented backend farm ownership validation.
* Added farm selection to the Prediction page.
* Connected the selected farm ID to prediction requests.
* Updated Prediction History to display farm names.
* Implemented farm-based prediction filtering.
* Connected Indicative Soil Health calculations to individual prediction records.
* Used recorded nitrogen, phosphorus, potassium, and soil pH values for soil-health assessments.
* Updated the Dashboard to identify the farm associated with the latest prediction and assessment.
* Tested prediction and history workflows across multiple farms.

## Soil Health Assessment

The project uses a weighted scoring approach based on four parameters:

* Nitrogen (N): 25%
* Phosphorus (P): 25%
* Potassium (K): 25%
* Soil pH: 25%

The resulting score is classified as:

* 80–100: Good
* 60–79: Moderate
* 0–59: Needs Improvement

This is an AgriPredict project-specific heuristic, not an official government classification or a substitute for laboratory soil testing.

## Outcome

Crop predictions can be associated with individual farms, making it easier to identify where each prediction originated.

Farm-based history and individual Indicative Soil Health assessments provide more useful context for farmers managing multiple farms.

## Current Status

**Farm-Specific Prediction Integration — Complete**

The multi-farm workflow now connects farm selection, crop prediction, prediction records, history, and soil-health assessment.

## Day 36 Milestone

**Farm Selection + Farm-Specific Predictions + History + Soil Health = Complete**
