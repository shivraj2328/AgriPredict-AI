# AgriPredict AI — Database Design

## 1. Database Overview

AgriPredict AI uses **MongoDB Atlas** as the database and **Mongoose** as the ODM.

The current application requires two primary collections:

1. `users`
2. `predictions`

The database is designed around authenticated users and their prediction records.

---

## 2. Database Architecture

```text
MongoDB Atlas
│
├── users
│
└── predictions
       │
       └── user → users._id
```

Each prediction belongs to one authenticated user.

---

## 3. User Collection

### Purpose

Stores authenticated user account information.

### Logical Structure

```text
User
├── _id
├── name
├── email
├── password
└── createdAt
```

### Fields

| Field | Type | Required | Description |
|---|---|---:|---|
| `_id` | ObjectId | Yes | MongoDB document identifier |
| `name` | String | Yes | User's display/name value |
| `email` | String | Yes | User's unique email address |
| `password` | String | Yes | bcryptjs password hash |
| `createdAt` | Date | Yes | Account creation timestamp |

Mongoose timestamps may also provide `updatedAt` when enabled.

---

## 4. User Constraints

### Name

- Required
- Stored as a string
- Should be validated before persistence

### Email

- Required
- Normalized before lookup/storage
- Must be a valid email format
- Must be unique

### Password

- Required during registration
- Must be hashed using bcryptjs
- Plaintext password must never be stored
- Password hash must never be returned in normal API responses

---

## 5. Prediction Collection

### Purpose

Stores prediction inputs and the resulting crop recommendation for an authenticated user.

### Logical Structure

```text
Prediction
├── _id
├── user
├── soil
│   ├── nitrogen
│   ├── phosphorus
│   ├── potassium
│   ├── temperature
│   ├── humidity
│   ├── rainfall
│   └── ph
├── recommendedCrop
├── confidence
└── createdAt
```

---

## 6. Prediction Fields

| Field | Type | Required | Description |
|---|---|---:|---|
| `_id` | ObjectId | Yes | Prediction document identifier |
| `user` | ObjectId | Yes | Reference to the authenticated user |
| `soil.nitrogen` | Number | Yes | Nitrogen input |
| `soil.phosphorus` | Number | Yes | Phosphorus input |
| `soil.potassium` | Number | Yes | Potassium input |
| `soil.temperature` | Number | Yes | Temperature input in °C |
| `soil.humidity` | Number | Yes | Humidity input in % |
| `soil.rainfall` | Number | Yes | Rainfall input in mm |
| `soil.ph` | Number | Yes | Soil pH |
| `recommendedCrop` | String | No initially | AI-recommended crop |
| `confidence` | Number | No initially | AI prediction confidence |
| `createdAt` | Date | Yes | Prediction creation timestamp |

`recommendedCrop` and `confidence` are expected to become populated by the AI prediction workflow.

---

## 7. Relationship

The relationship is:

```text
User 1 ──────────── * Predictions
```

One user can have many prediction records.

A prediction stores the user's ObjectId:

```text
Prediction.user
        ↓
User._id
```

This allows the backend to retrieve only the authenticated user's predictions.

---

## 8. Ownership Rule

The backend must derive prediction ownership from the verified JWT.

Correct:

```text
Authorization Header
        ↓
JWT Middleware
        ↓
req.user.userId
        ↓
Prediction.user
```

The client must not be trusted to choose the owner of a prediction.

For example, the backend must not accept an arbitrary `userId` from the request body and use it as the prediction owner.

---

## 9. Indexing Strategy

### User

The email field should be uniquely indexed because it is used for authentication and duplicate-user checks.

Conceptually:

```text
users.email → unique index
```

### Prediction

The primary query pattern is retrieving predictions for the authenticated user.

A user-based index is therefore appropriate:

```text
predictions.user
```

A timestamp-aware index can also be considered when prediction history is frequently sorted by newest first.

---

## 10. Timestamps

Prediction records require creation timestamps because prediction history depends on when each prediction was generated.

Recommended Mongoose configuration:

```text
timestamps: true
```

This provides:

```text
createdAt
updatedAt
```

The application primarily uses `createdAt` for prediction history.

---

## 11. Validation

Prediction values must be validated before storage.

Required inputs:

```text
Nitrogen
Phosphorus
Potassium
Temperature
Humidity
Rainfall
pH
```

Validation should check:

- Required values
- Numeric data types
- Reasonable domain ranges
- Invalid or missing values

Backend validation remains authoritative even if the frontend performs validation.

---

## 12. Data Lifecycle

### User

```text
Register
  ↓
Validate
  ↓
Hash password
  ↓
Save user
  ↓
Login
  ↓
JWT issued
```

### Prediction

```text
Authenticated user
  ↓
Submit prediction inputs
  ↓
Validate inputs
  ↓
AI prediction
  ↓
Create prediction document
  ↓
Save to MongoDB
  ↓
Return result
```

---

## 13. Prediction History Query

Target query behavior:

```text
Authenticated User
       ↓
req.user.userId
       ↓
Prediction.find({ user: req.user.userId })
       ↓
Sort by createdAt descending
       ↓
Return user's prediction history
```

The history endpoint must not return predictions belonging to other users.

---

## 14. Prediction Detail Query

For:

```text
GET /api/predictions/:id
```

the backend should verify both:

1. The prediction ID is valid.
2. The prediction belongs to the authenticated user.

Conceptually:

```text
Prediction.findOne({
  _id: predictionId,
  user: req.user.userId
})
```

This prevents unauthorized access to another user's prediction.

---

## 15. Sensitive Data

Sensitive information includes:

- User password hash
- JWT secret
- MongoDB connection string
- Other private environment configuration

These must not be exposed in:

- API responses
- Frontend code
- Git commits
- Public documentation

---

## 16. Current Collections

### Implemented

```text
users
predictions
```

### Not part of the current database design

A separate feedback collection is **not** part of the current AgriPredict AI product scope.

---

## 17. Future Database Extensions

Future versions may add collections or fields for:

- Weather records
- Soil analysis results
- Irrigation recommendations
- Model/version metadata
- Agricultural analytics

These should only be added when the corresponding product feature is approved and implemented.

---

## 18. Database Design Summary

```text
                MongoDB Atlas
                     |
          +----------+----------+
          |                     |
        users              predictions
          |                     |
          |                     |
          +------ 1 : N --------+
                    |
                 user ref
                    |
                    v
              User's History
```

The database design prioritizes:

- Clear ownership
- Secure authentication data
- Prediction history
- Mongoose validation
- Query efficiency
- Future extensibility
