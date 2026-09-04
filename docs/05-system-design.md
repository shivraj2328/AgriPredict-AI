# AgriPredict AI — System Design

## 1. System Overview

AgriPredict AI is a full-stack web application designed to recommend suitable crops from soil and environmental inputs while maintaining prediction history for authenticated users.

The system consists of:

- React frontend
- Node.js + Express backend
- REST APIs
- JWT authentication
- MongoDB Atlas database
- Mongoose ODM
- AI/ML prediction module
- Weather integration
- Dashboard and profile modules

---

## 2. High-Level Architecture

```text
                         User
                           |
                           v
                React + Vite Frontend
                           |
                    React Router
                           |
                    Axios API Client
                           |
                           v
                 Node.js + Express API
                           |
              +------------+------------+
              |            |            |
              v            v            v
          Auth API    Prediction API  Weather API
              |            |
              v            v
        JWT Middleware   Prediction
              |          Controller
              |            |
              v            v
          User Model   AI/ML Module
              |            |
              +------v-----+
                     |
                  Mongoose
                     |
                     v
                MongoDB Atlas
```

---

## 3. Frontend Architecture

The frontend uses React with Vite.

Current structure:

```text
client/
└── src/
    ├── assets/
    ├── components/
    ├── context/
    ├── hooks/
    ├── layouts/
    ├── pages/
    ├── routes/
    ├── services/
    ├── styles/
    ├── utils/
    ├── App.jsx
    └── main.jsx
```

### Main responsibilities

#### Pages

Application screens such as:

- Home
- Login
- Register
- Dashboard
- Prediction
- History
- Profile
- About
- Contact
- NotFound

#### Components

Reusable UI elements such as:

- Navbar
- Hero
- Footer
- FeatureCard
- Authentication components
- Dashboard components

#### Layouts

Shared page structures:

- `MainLayout`
- `AuthLayout`
- `DashboardLayout`

#### Routes

`AppRoutes.jsx` defines public and protected navigation.

#### Services

API communication is centralized through Axios services.

#### Utils

Shared frontend utility logic such as authentication state handling.

---

## 4. Backend Architecture

The backend follows a layered Express architecture:

```text
Request
  ↓
Route
  ↓
Middleware
  ↓
Controller
  ↓
Service / Model / AI Module
  ↓
MongoDB / External API
  ↓
Controller
  ↓
JSON Response
```

### Backend folders

```text
server/src/
├── ai/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
├── validators/
└── app.js
```

---

## 5. Authentication Flow

### Registration

```text
User
 ↓
Register Form
 ↓
POST /api/auth/register
 ↓
Validate input
 ↓
Check duplicate email
 ↓
Hash password with bcryptjs
 ↓
Create User
 ↓
MongoDB
 ↓
Safe response
```

### Login

```text
User
 ↓
Login Form
 ↓
POST /api/auth/login
 ↓
Find user
 ↓
Compare password
 ↓
Generate JWT
 ↓
Return token + safe user data
```

### Protected Request

```text
Frontend
 ↓
Axios
 ↓
Authorization: Bearer <JWT>
 ↓
JWT Middleware
 ↓
Verify token
 ↓
req.user.userId
 ↓
Controller
 ↓
Authorized operation
```

The backend is authoritative for authentication and ownership.

---

## 6. Profile Flow

```text
Authenticated User
        ↓
GET /api/auth/me
        ↓
JWT Middleware
        ↓
req.user.userId
        ↓
User.findById(...)
        ↓
Safe User Response
```

Profile updates follow the same authenticated flow:

```text
PUT /api/auth/me
        ↓
JWT Middleware
        ↓
Validate name/email
        ↓
Check duplicate email
        ↓
Update User
        ↓
Return safe user data
```

Password changes are separate from normal profile updates.

---

## 7. Prediction Flow

### Current implemented foundation

```text
Prediction Form
      ↓
POST /api/predictions
      ↓
JWT Middleware
      ↓
Authenticated user ID
      ↓
Validate prediction inputs
      ↓
Prediction Controller
      ↓
Prediction Model
      ↓
MongoDB Atlas
      ↓
Prediction Response
```

### Target AI-enabled flow

```text
Prediction Form
      ↓
POST /api/predictions
      ↓
JWT Middleware
      ↓
Validate inputs
      ↓
AI/ML Prediction Module
      ↓
Recommended Crop
      ↓
Confidence Score
      ↓
Prediction Model
      ↓
MongoDB Atlas
      ↓
JSON Response
      ↓
Frontend Result Card
```

---

## 8. Prediction Inputs

The prediction workflow accepts:

```text
N  = Nitrogen
P  = Phosphorus
K  = Potassium
Temperature
Humidity
Rainfall
pH
```

The AI model will use the approved dataset/model feature representation when the ML layer is integrated.

---

## 9. Prediction History Flow

Target flow:

```text
History Page
    ↓
GET /api/predictions
    ↓
JWT Middleware
    ↓
Authenticated User ID
    ↓
Query only that user's predictions
    ↓
MongoDB
    ↓
Prediction List
    ↓
Frontend Table
```

Individual prediction:

```text
GET /api/predictions/:id
        ↓
JWT Middleware
        ↓
Verify authenticated ownership
        ↓
MongoDB
        ↓
Prediction Detail
```

A user must never be able to retrieve another user's prediction through a manipulated ID.

---

## 10. AI/ML Architecture

The AI module is organized under:

```text
server/src/ai/
```

Target flow:

```text
Dataset
   ↓
Data Cleaning
   ↓
Data Preprocessing
   ↓
Feature Preparation
   ↓
TensorFlow.js
   ↓
Model Training
   ↓
Model Evaluation
   ↓
Saved Model
   ↓
Prediction Service
   ↓
Prediction API
```

Danfo.js may be used for JavaScript-based data processing where appropriate.

The AI layer should remain separated from HTTP route/controller concerns.

---

## 11. Weather Integration

Target architecture:

```text
Frontend
   ↓
Weather Request
   ↓
Express Weather API
   ↓
Weather Service
   ↓
External Weather API
   ↓
Normalize Response
   ↓
Frontend
```

Weather data may include:

- Temperature
- Humidity
- Rainfall/precipitation

The external weather provider has not been fixed in the current system design and should be selected during implementation.

---

## 12. Dashboard Architecture

The dashboard will combine data from multiple application modules.

```text
Dashboard
   |
   +--> User Information
   |
   +--> Prediction Statistics
   |
   +--> Recent Predictions
   |
   +--> Weather
   |
   +--> Soil Information
   |
   +--> Charts
```

Chart.js is planned for visualization.

---

## 13. Data Ownership and Security

Prediction ownership is determined by the authenticated JWT identity.

Correct:

```text
JWT
 ↓
req.user.userId
 ↓
Prediction.user
```

Incorrect:

```text
Client sends arbitrary userId
 ↓
Backend trusts userId
```

The second pattern must never be used for protected data ownership.

---

## 14. Error Handling Flow

```text
Request
  ↓
Validation
  ↓
Authentication
  ↓
Business Logic
  ↓
Database / External Service
  ↓
Success Response
```

If an operation fails:

```text
Error
 ↓
Appropriate HTTP status
 ↓
Safe JSON message
 ↓
Frontend error handling
```

Internal secrets, stack traces, passwords, and database details must not be exposed to users.

---

## 15. Environment Configuration

Sensitive values are stored outside source code.

Example:

```text
Backend .env
├── PORT
├── MONGO_URI
└── JWT_SECRET
```

Frontend configuration uses Vite environment variables such as:

```text
VITE_API_URL
```

Actual secret values must never be committed to GitHub.

---

## 16. Deployment Architecture

Target production architecture:

```text
User
 ↓
Frontend — Vercel
 ↓
Backend API — Render
 ↓
MongoDB Atlas
```

The AI model and weather service will operate through the backend application.

Production configuration and deployment security will be finalized during the deployment phase.

---

## 17. Non-Functional Design Goals

### Security

- JWT authentication
- Password hashing
- Environment-based secrets
- Protected APIs
- User-level data ownership

### Performance

- Lightweight REST APIs
- Efficient database queries
- Avoid unnecessary frontend requests
- Use indexes where justified

### Maintainability

- Layered backend architecture
- Reusable React components
- Centralized API client
- Separate AI module
- Numbered project documentation

### Scalability

The architecture should allow future additions such as:

- More prediction models
- More weather services
- Additional dashboards
- Additional agricultural analytics

without replacing the core architecture.

---

## 18. Current Implementation State

### Implemented

- React + Vite frontend
- React Router
- Responsive UI
- Authentication UI
- Express backend
- REST API foundation
- MongoDB Atlas
- Mongoose
- User model
- Registration API
- Login API
- JWT middleware
- Protected frontend routes
- Logout
- Current user API
- Profile update API
- Prediction model
- Prediction creation API
- Prediction validation
- Prediction storage

### Pending

- Prediction list API
- Prediction detail API
- AI/ML model
- Dataset preprocessing
- TensorFlow.js integration
- Weather API integration
- Soil health analysis
- Irrigation suggestions
- Dynamic dashboard data
- Charts integration
- Full frontend-backend prediction integration
- Automated testing
- Production deployment
