# Day 12 - Backend Foundation & MongoDB Integration

## Date 
15 Aug 2026 to 16 Aug 2026

## Today's Goal

Begin Phase 2 of AgriPredict AI by establishing the backend foundation using Node.js, Express.js, Mongoose and MongoDB Atlas.

The main objective was to create a working backend server, REST API foundation, environment configuration and database connection.

## Phase 

Phase 2 - Backend Development

## What I completed

### 1. Backend Architecture

Understood the overall bakcend request-response architecture:

React Frontend
-> Express Server
-> Route
-> Controller
-> Service
-> Model
-> MongoDB

The response follows the reverse flow back to the frontend.

### 2. Backend Initialization

Initialized the backend environment inside the `server` directory and configured the required Node.js dependencies.

### 3. Express Server Setup

Created the basic Express server and configured it to run on port 5000.

The server can now start successfully using the development command.

### 4. Environment Variables

Configured enivronment variables using `.env`.

Important configuration values includes:

- PORT
- MONGO_URI

Sensitive database credentials are stored in `.env` instead of being hard-coded into the application.

### 5. Health Check API

Created the first backend API endpoint:

GET /api/health

This endpoint verifies that the AgriPredict backend API is running correctly.

### 6. CORS configuration

Configured CORS so that the React frontend and Express backend can communicate even though they run on different development ports.

Frontend:
http://localhost:5173

Backend:
http://localhost:5000

### 7. Mongoose Integration 

Installed and configured Mongoose as the ODM used to communicate between the Node.js backend and MongoDB.

### 8. MongoDB Atlas Setup

Created the AgriPredict MongoDB Atlas cluster and configured the database connection using the MongoDB connection string.

### 9. MongoDB Connection

Created the database configuration and connected the Express backend to MongoDB Atlas through Mongoose.

The connection was successfully verified.

## Final Backend Status

The backend foundation is now working.

Current Architecture:

React Frontend
      ↓
Express Backend
      ↓
REST API
      ↓
Mongoose
      ↓
MongoDB Atlas

## What I learned

- Backend architecture
- Node.js runtime
- Express.js
- REST APIs 
- HTTP requests and responses
- Routes 
- Controllers and services
- Environment variables
- CORS
- MongoDB
- MongoDB Atlas
- Mongoose 
- Database connection string

## Important Concepts Understood

### Routes 

Defines and API endpoint amd determine which backend logic should handle a request.

### Controller 

Handles the request and response and coordinates the required application logic.

### Service

Contains business logic seperately from the controller.

### Model

Defines the structure used to interact with the application data stored in MongoDB.

### Mongoose 

Provides an abstraction layer for working with MongoDB from the Node.js application.

### Current Limitations

The backend currently contains the foundation only.

The following features are not implemented yet:

- User model
- User registration API
- Login API
- JWT authentication
- Prediction APIs
- Prediction model
- Profile APIs
- Weather API integration 
- AI/ML integration

These will be implemented in subsequent backend development days.

### Day 12 Outcomes

The AgriPredict backend is successfully initialized and
connected to MongoDB Atlas.

The application has now moved from frontend-only development
to full-stack development.

## Tomorrow's Goal

Design the database structure and create the first Mongoose
model for users.

## Time Spent

1 day

## Status

✅ Completed