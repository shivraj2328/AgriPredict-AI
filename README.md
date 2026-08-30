# 🌱 AgriPredict AI

## Version

v0.19.0 (MVP)

## Status

### Frontend — Completed ✅

### Backend — In Progress 🚧

# 🌱 AgriPredict AI

> An AI-powered Smart Farming Assistant that helps farmers make data-driven farming decisions.

## 📌 Overview

AgriPredict AI is a full-stack smart farming application designed to help farmers make better agricultural decisions using soil parameters, weather conditions, and AI-powered recommendations.

The project combines a React frontend, Node.js/Express backend, MongoDB database, JWT authentication, and JavaScript-based AI technologies.

---

## 🎯 Project Goal

To provide farmers with an intelligent and accessible platform that can:

- Recommend suitable crops
- Analyze soil health
- Provide weather information
- Suggest irrigation requirements
- Maintain prediction history
- Provide useful farming insights

---

## ✨ Features

### Authentication

- User Registration
- User Login
- Password Hashing
- JWT Authentication
- Protected API Routes
- Authenticated User Identification

### Crop Prediction

- Soil parameter input
- Crop recommendation
- Prediction confidence
- Prediction explanation

### Soil Health

- NPK analysis
- Soil health score
- Soil improvement suggestions

### Weather

- Current weather information
- Temperature
- Humidity
- Rainfall
- Location-based weather

### Irrigation

- Water requirement suggestion
- Irrigation frequency suggestion
- Weather-based irrigation insights

### Dashboard

- Welcome section
- Statistics
- Weather widget
- Recent predictions
- Quick prediction

### Prediction History

- Previous predictions
- Search
- Filtering
- Prediction confidence

### Profile

- User information
- Profile statistics

---

## 🛠️ Technology Stack

### Frontend

- React
- Vite
- JavaScript
- Bootstrap
- React Router
- Axios
- Chart.js

### Backend

- Node.js
- Express.js
- REST API
- JWT
- bcryptjs

### Database

- MongoDB Atlas
- Mongoose

### AI / Data Processing

- TensorFlow.js
- Danfo.js

### Development Tools

- Git
- GitHub
- Postman
- VS Code

---

## 🏗️ System Architecture

```text
                    User
                     │
                     ▼
             React Frontend
                     │
                HTTP / Axios
                     │
                     ▼
            Node.js + Express
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
   Authentication   APIs       AI Services
        │            │            │
        └────────────┼────────────┘
                     ▼
                Mongoose
                     │
                     ▼
                MongoDB Atlas