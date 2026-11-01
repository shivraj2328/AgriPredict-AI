# AgriPredict AI — API Design

## 1. Overview

The backend uses Node.js and Express to expose REST APIs. The frontend communicates with the backend through an Axios-based API layer. Authenticated endpoints use JWT protection.

**Important:** The project materials reviewed confirm the feature areas and some route behaviour, but do not provide a complete authoritative route inventory with every HTTP path, request schema and response schema. The endpoint matrix below is a logical API contract summary. Verify exact paths and names against the current `server/src/routes/` files before treating them as final.

## 2. API Conventions

- JSON request and response bodies.
- JWT authentication for protected operations.
- Server-side validation of all user-supplied values.
- User-owned data is scoped to the authenticated user.
- Farm ownership is verified by the backend.
- Use appropriate HTTP status codes and consistent error messages.
- Do not expose passwords, tokens or secrets in responses.

## 3. Endpoint Groups

| Area | Operation | Authentication | Purpose |
|---|---|---|---|
| Health | Health check | Public | Check backend availability |
| Auth | Register | Public | Create a user account |
| Auth | Login | Public | Authenticate and issue token |
| Auth | Current user | Required | Retrieve logged-in user's profile |
| Auth | Update profile | Required | Update profile fields |
| Farms | Create farm | Required | Register a farm for the current user |
| Farms | List farms | Required | List only the current user's farms |
| Farms | Update farm | Required | Update an owned farm |
| Farms | Delete farm | Required | Delete an owned farm |
| Predictions | Create prediction | Required | Validate inputs, obtain weather/model output and save result |
| Predictions | List history | Required | Retrieve current user's prediction history |
| Predictions | Filter by farm | Required | Retrieve predictions associated with a selected farm, where implemented |
| Soil Health | Get assessment | Required | Calculate/read the indicative assessment for a prediction, according to current implementation |

## 4. Crop Prediction Request

The logical prediction workflow requires:
- Soil inputs: nitrogen, phosphorus, potassium and pH.
- Farm identifier or location coordinates, depending on the current API contract.
- Authenticated user context.

The backend obtains weather inputs and prepares the model's seven features:
1. Nitrogen
2. Phosphorus
3. Potassium
4. Temperature
5. Humidity
6. Rainfall
7. pH

The backend returns the predicted crop and confidence and persists the prediction.

Do not assume the exact JSON property names or URL path from this conceptual description. Copy them from the final frontend API service and backend route/controller.

## 5. Farm API Behaviour

- Create: accept farm name, latitude, longitude and optional description.
- List: return farms owned by the authenticated user.
- Update: verify the farm belongs to the authenticated user before modifying it.
- Delete: verify ownership before deletion.
- Prediction association: if a farm ID is supplied, verify that it belongs to the authenticated user before saving the prediction.

## 6. Authorization Rules

- Public endpoints: registration, login and health check, subject to current implementation.
- Protected endpoints: profile, farms, predictions, history and soil-health operations.
- Never trust a client-supplied owner/user ID as authorization.
- A user must not access another user's profile, farms or predictions.

## 7. Error Handling Cases

| Condition | Expected handling |
|---|---|
| Missing/invalid token | Reject protected request |
| Invalid numeric input | Return validation error |
| Invalid coordinates | Reject request |
| Farm does not exist | Return not-found response |
| Farm belongs to another user | Reject access |
| Weather API failure | Return controlled error; do not fabricate weather values |
| Model loading/inference failure | Return controlled prediction error |
| No prediction history | Return a valid empty result/empty state |
| Database failure | Return controlled server error |

## 8. API Verification Checklist

Before release, inspect the actual route files and verify:
- Exact HTTP method and path.
- Required authentication middleware.
- Request body/query parameters.
- Response JSON shape.
- Status codes.
- Ownership checks.
- Validation rules.
- Error handling.
- Frontend API service mapping.

## 9. Security

Keep JWT secrets, MongoDB credentials and production URLs out of source control. Use HTTPS in production and configure CORS for the intended frontend origin.
