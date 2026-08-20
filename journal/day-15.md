# Day 15 — Login Authentication Backend

## Date
20 August 2026

## Objective

Implement the login authentication backend for AgriPredict AI using bcrypt password verification and JSON Web Tokens (JWT).

## Work Completed

- Implemented the login authentication flow.
- Installed `jsonwebtoken`.
- Added `loginUser` controller.
- Normalized login email input.
- Added email and password validation.
- Retrieved users from MongoDB using email.
- Verified passwords using `bcrypt.compare()`.
- Generated JWT tokens after successful authentication.
- Configured JWT expiration to 1 day.
- Added `POST /api/auth/login` route.
- Configured `JWT_SECRET` through environment variables.
- Tested the Login API using Postman.
- Tested successful login, invalid password, unknown email, and missing credentials.
- Ensured passwords are never returned in API responses.
- Ensured the JWT payload contains the user ID rather than the password.

## Authentication Flow

Login Request
    ↓
POST /api/auth/login
    ↓
Auth Route
    ↓
Login Controller
    ↓
Find User by Email
    ↓
bcrypt.compare()
    ↓
Verify Password
    ↓
Generate JWT
    ↓
Return Token + User Information

## API Endpoint

### Login

Method: POST

Endpoint:

/api/auth/login

## Error Handling

| Scenario | Status |
|---|---:|
| Missing email/password | 400 |
| Unknown email | 401 |
| Incorrect password | 401 |
| Successful login | 200 |
| Unexpected server error | 500 |

## Security Measures

- Passwords are verified using bcrypt.
- Passwords are never returned in the login response.
- JWT contains the user ID rather than the password.
- JWT secret is stored in an environment variable.
- JWT expiration is configured for 1 day.
- Actual `.env` credentials are not committed to GitHub.

## Testing

The Login API was tested using Postman.

Tests performed:

- Valid credentials
- Incorrect password
- Unknown email
- Missing credentials
- JWT generation

## Outcome

The AgriPredict backend now supports both:

Registration ✅
Login ✅
Password Hashing ✅
JWT Generation ✅
MongoDB Storage ✅

## Next Step

Implement JWT authentication middleware to protect private API routes.