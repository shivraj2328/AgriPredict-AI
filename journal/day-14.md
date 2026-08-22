# Day 14 — Authentication Backend: User Registration

## Today's Goal

Implement the backend registration flow for AgriPredict AI.

## Phase

Phase 2 — Backend Development

## What I Completed

### 1. Authentication Architecture

Understood the registration request flow:

React
→ POST /api/auth/register
→ Route
→ Controller
→ Validation
→ Password Hashing
→ User Model
→ MongoDB
→ JSON Response

### 2. Password Hashing

Installed and configured `bcryptjs`.

User passwords are hashed before being stored in MongoDB.

Plain-text passwords are never stored or returned in API responses.

### 3. Authentication Controller

Created:

`server/src/controllers/auth.controller.js`

The controller handles:

- Reading registration data
- Input validation
- Email normalization
- Duplicate email checking
- Password hashing
- User creation
- API responses
- Error handling

### 4. Registration Route

Created:

`server/src/routes/auth.routes.js`

Implemented:

POST /api/auth/register

### 5. Registration Validation

Implemented validation for:

- Required name
- Required email
- Valid email format
- Minimum password length
- Duplicate email

### 6. Database Integration

Connected the registration flow to the existing Mongoose User model.

New users are stored in MongoDB Atlas.

### 7. Error Handling

Implemented appropriate HTTP responses:

- 400 — Invalid input
- 409 — Duplicate email
- 500 — Unexpected server error

Internal server errors are logged on the backend instead of being exposed to the client.

### 8. Email Normalization

Registration emails are trimmed and converted to lowercase before database operations.

Example:

Farmer@Example.com

becomes:

farmer@example.com

## API Created

### Register User

POST `/api/auth/register`

## What I Learned
Authentication architecture
Password hashing
bcryptjs
Express controllers
Express routes
Request validation
HTTP status codes
Duplicate record handling
Email normalization
Secure API error handling
MongoDB user creation
Postman API testing