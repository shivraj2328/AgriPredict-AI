# AgriPredict AI — System Design

## 1. Overview

AgriPredict AI is a client-server web application. The React/Vite client communicates with a Node.js/Express REST API. The backend coordinates authentication, database operations, weather retrieval and TensorFlow.js inference.

## 2. High-Level Architecture

```text
+--------------------------+
| Farmer / Web Browser     |
| React + Vite             |
| Dashboard, Prediction,   |
| History, Profile, Farms  |
+------------+-------------+
             |
             | HTTPS / REST (Axios)
             v
+--------------------------+
| Node.js + Express API    |
| Routes / Controllers     |
| JWT Middleware           |
| Validators / Services    |
+-----+---------------+----+
      |               |
      |               +--------------------+
      |                                    |
      v                                    v
+------------------+              +--------------------+
| MongoDB Atlas    |              | Open-Meteo API     |
| Mongoose Models  |              | Weather by         |
| Users, Farms,    |              | latitude/longitude |
| Predictions      |              +--------------------+
+------------------+
      ^
      |
+--------------------------+
| TensorFlow.js            |
| Model + preprocessing    |
| Crop class + confidence  |
+--------------------------+
```

The diagram is a logical architecture; actual runtime placement and exact service boundaries should be checked against the deployed source.

## 3. Main Components

### 3.1 Frontend

React and Vite provide the browser interface. Main areas include authentication, dashboard, crop prediction, prediction history, profile/settings and farm management.

### 3.2 Backend

Node.js and Express expose REST endpoints. Routes delegate to controllers and services. JWT middleware protects authenticated operations. Validators check user input before business logic executes.

### 3.3 Database

MongoDB Atlas stores user, farm and prediction documents. Mongoose provides schema definitions and database interaction.

### 3.4 AI Inference

TensorFlow.js loads the crop classification model. The inference workflow must use the feature ordering and preprocessing expected by the saved model.

### 3.5 Weather Service

Open-Meteo is queried using the selected farm's latitude and longitude. The returned weather values provide temperature, humidity and rainfall/precipitation inputs.

## 4. Main User Workflows

### 4.1 Authentication

```text
User -> React UI -> Auth API -> JWT verification/session
                           -> MongoDB user record
```

### 4.2 Crop Prediction

```text
User
 -> Enter N, P, K, pH and select farm/location
 -> Frontend sends authenticated request
 -> Backend validates request and farm ownership
 -> Backend obtains weather values from Open-Meteo
 -> Backend prepares seven model features
 -> TensorFlow.js inference
 -> Backend stores prediction in MongoDB
 -> Frontend displays crop and confidence
```

### 4.3 Prediction History

The backend retrieves prediction documents scoped to the authenticated user. Farm-specific filtering and farm-name display are part of the multi-farm workflow.

### 4.4 Indicative Soil Health

The assessment uses N, P, K and pH recorded for a prediction. Each prediction can have its own assessment. A new prediction is a new measurement/input record; it does not automatically mean the physical soil condition has changed.

## 5. Deployment Architecture

The documented hosting setup is:

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

The stable core version was reported deployed. Multi-farm changes were developed separately while Render Auto-Deploy was disabled. Confirm the final branch and deployed version before claiming that later changes are live.

## 6. Reliability and Security

- JWT authentication for protected API operations.
- Server-side ownership checks for user and farm data.
- Environment-based configuration for secrets and service URLs.
- Explicit handling of weather API and model failures.
- Persistent storage of prediction inputs and outputs.
- Regression testing before production deployment.

## 7. Design Constraints

- Crop predictions depend on model training data and preprocessing.
- Weather service availability and aggregation affect prediction inputs.
- The soil-health assessment is indicative and limited to four inputs.
- The application does not guarantee crop yield or replace professional agronomic advice.
