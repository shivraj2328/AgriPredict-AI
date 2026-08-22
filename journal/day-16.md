# Day 16 — JWT Authentication Middleware

## Date

22 August 2026

## Theme

JWT Authentication Middleware and Protected API Routes

---

## Objective

Implement JWT authentication middleware to protect private API routes in the AgriPredict AI backend.

The middleware verifies JWT tokens sent by authenticated clients, identifies the authenticated user, and allows only valid requests to access protected routes.

---

## Previous Authentication Progress

Before Day 16, the backend already supported:

- User registration
- Password validation
- Password hashing with bcrypt
- MongoDB user storage
- User login
- Password verification
- JWT generation

Day 16 extends this authentication system by adding JWT verification and protected routes.

---

## Work Completed

- Created JWT authentication middleware.
- Read the `Authorization` header from incoming requests.
- Implemented the `Bearer <JWT>` authorization format.
- Extracted the JWT from the Authorization header.
- Verified JWT tokens using `jwt.verify()`.
- Used `JWT_SECRET` from environment variables for token verification.
- Added authentication error handling.
- Rejected requests without authentication.
- Rejected invalid JWT tokens.
- Rejected expired JWT tokens.
- Attached the authenticated user's ID to `req.user`.
- Created the protected `GET /api/auth/me` endpoint.
- Connected the protected route with `authMiddleware`.
- Tested the protected route using Postman.
- Verified requests without tokens return `401 Unauthorized`.
- Verified invalid tokens return `401 Unauthorized`.
- Verified valid tokens return `200 OK`.
- Confirmed the authenticated user's ID is available through `req.user`.

---

# JWT Authentication Flow

```text
User Login
    ↓
POST /api/auth/login
    ↓
Verify Email + Password
    ↓
bcrypt.compare()
    ↓
Generate JWT
    ↓
Client receives JWT
    ↓
Protected API Request
    ↓
Authorization: Bearer <JWT>
    ↓
authMiddleware
    ↓
jwt.verify()
    ↓
Valid Token?
   / \
 No   Yes
 ↓     ↓
401   req.user
       ↓
      next()
       ↓
Protected Route
       ↓
Response