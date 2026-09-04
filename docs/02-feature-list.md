# AgriPredict AI — Feature List

## 1. Product Overview

AgriPredict AI is an AI-powered Smart Farming Assistant that helps users make crop-selection decisions using soil parameters and environmental conditions.

The product is designed as a web application with:

- React frontend
- Node.js + Express backend
- MongoDB Atlas database
- JWT-based authentication
- AI/ML crop recommendation
- Weather integration
- Prediction history
- Dashboard and profile management

---

## 2. Core Features

### 2.1 User Authentication

Users can:

- Register an account
- Login securely
- Logout
- Access protected application pages
- Maintain an authenticated session using JWT
- Retrieve the currently authenticated user
- Update their profile name and email

**Status:** Partially/mostly implemented. Registration, login, JWT middleware, protected routes, current-user API, logout, and profile update are implemented.

---

### 2.2 Dashboard

The dashboard provides a central view of the user's farming information.

Planned dashboard capabilities:

- Welcome message
- Prediction statistics
- Recent predictions
- Weather information
- Quick access to crop prediction
- Soil-related summaries
- Prediction-related charts

**Status:** Frontend UI implemented. Live backend statistics and complete dynamic data integration are pending.

---

### 2.3 Crop Prediction

The core feature of AgriPredict AI.

Users can provide:

- Nitrogen (N)
- Phosphorus (P)
- Potassium (K)
- Temperature (°C)
- Humidity (%)
- Rainfall (mm)
- Soil pH

The system will:

1. Validate the input.
2. Authenticate the user.
3. Process the prediction request.
4. Run the AI/ML prediction model.
5. Return the recommended crop.
6. Return a confidence score.
7. Store the prediction for future history.

**Status:** Prediction UI, database model, authenticated prediction creation API, validation, and MongoDB storage are implemented. AI/ML prediction integration is pending.

---

### 2.4 Prediction History

Users can view previously generated predictions.

Planned capabilities:

- List authenticated user's predictions
- Display prediction date
- Display recommended crop
- Display confidence
- View an individual prediction
- Search prediction history
- Filter prediction history

**Status:** Frontend UI implemented. Backend list/detail APIs and full frontend integration are pending.

---

### 2.5 User Profile

Users can:

- View their name
- View their email
- Update their name
- Update their email
- View prediction-related statistics

**Status:** Profile API and frontend profile integration are implemented. Dynamic prediction statistics are pending.

---

### 2.6 Weather Information

The application will provide weather information relevant to farming decisions.

Planned capabilities:

- Retrieve weather information
- Display temperature
- Display humidity
- Display rainfall/precipitation where available
- Support location/city-based weather lookup
- Use weather information as an input/supporting factor for farming decisions

**Status:** Weather widget UI exists. Weather API integration is pending.

---

### 2.7 Soil Health Analysis

The system is planned to provide a simple interpretation of soil-related inputs.

Planned capabilities:

- Analyze soil nutrient values
- Provide a soil health score/summary
- Display useful soil suggestions
- Present soil information through dashboard visualizations

**Status:** Planned. Detailed backend/AI implementation is pending.

---

### 2.8 Irrigation Suggestion

The application is planned to provide irrigation guidance using available environmental and prediction inputs.

**Status:** Planned.

---

### 2.9 Charts and Visualization

Planned dashboard visualizations include:

- Most recommended crops
- Prediction history
- Soil nutrient information
- Weather trends

**Technology:** Chart.js

**Status:** Planned/dynamic integration pending.

---

### 2.10 Responsive User Interface

The application should work across:

- Desktop
- Tablet
- Mobile

Frontend includes:

- Responsive navigation
- Responsive dashboard layout
- Responsive forms
- Responsive cards
- Responsive tables
- Mobile-friendly layouts

**Status:** Implemented and tested during frontend development.

---

### 2.11 Public Pages

The application includes:

- Home
- About
- Contact
- 404 Not Found

**Status:** Implemented.

---

## 3. Security Features

The application includes/plans:

- Password hashing using bcryptjs
- JWT authentication
- Protected backend routes
- Protected frontend routes
- Server-side authentication checks
- Environment variables for secrets
- No password storage in frontend local storage
- No client-controlled user identity for protected prediction ownership
- Safe user responses without returning password hashes

**Status:** Core authentication security implemented.

---

## 4. AI/ML Features

The AI module is intended to:

- Process crop prediction inputs
- Use a trained machine-learning model
- Recommend a suitable crop
- Produce a confidence score
- Integrate with the prediction API

Planned data/ML stack:

- Dataset stored under `datasets/`
- Data processing with Danfo.js where required
- Model development with TensorFlow.js
- AI code organized under `server/src/ai/`

**Status:** Planned/in development.

---

## 5. Feature Status Summary

| Feature | Status |
|---|---|
| Home Page | Complete |
| About Page | Complete |
| Contact Page | Complete |
| 404 Page | Complete |
| Login UI | Complete |
| Register UI | Complete |
| User Registration API | Complete |
| Login API | Complete |
| JWT Authentication | Complete |
| Protected Frontend Routes | Complete |
| Logout | Complete |
| Current User API | Complete |
| Profile Update API | Complete |
| Dashboard UI | Complete |
| Crop Prediction UI | Complete |
| Prediction Model | Complete |
| Prediction Creation API | Complete |
| Prediction Validation | Complete |
| Prediction MongoDB Storage | Complete |
| Prediction History API | Pending |
| Prediction Detail API | Pending |
| AI/ML Model | Pending |
| Weather API Integration | Pending |
| Soil Health Analysis | Pending |
| Irrigation Suggestion | Pending |
| Dynamic Dashboard Statistics | Pending |
| Charts / Dynamic Visualization | Pending |
| Full Frontend-Backend Prediction Integration | Pending |
| Automated Testing | Pending |
| Production Deployment | Pending |

---

## 6. Future Scope

The following are outside the current MVP scope:

- Satellite imagery
- IoT sensor integration
- Drone monitoring
- Live market prices
- Crop disease detection
- Deep-learning-based fertilizer recommendation

These may be considered in future versions.
