# AgriPredict AI — Database Design

## 1. Database Technology

AgriPredict uses MongoDB Atlas with Mongoose. Data is stored as documents in collections rather than rows in relational SQL tables.

The documented core entities are:
- User
- Farm
- Prediction

Exact schema definitions must be taken from the final Mongoose model files. This document describes the fields and relationships supported by project notes, not a substitute for source-code inspection.

## 2. User Entity

| Field | Purpose |
|---|---|
| `_id` | MongoDB document identifier |
| `name` | User's display name |
| `email` | User email; project schema notes specify unique, lowercase and trimmed |
| `password` | Password credential field; store a secure hash, never plaintext |
| `createdAt` / `updatedAt` | Timestamps if enabled |

## 3. Farm Entity

| Field | Purpose |
|---|---|
| `_id` | Unique farm identifier |
| `user` | Reference to the owning user |
| `name` | Farm name |
| `latitude` | Farm latitude |
| `longitude` | Farm longitude |
| `description` | Optional farm description |
| `createdAt` / `updatedAt` | Registration/update timestamps |

A farm belongs to one user. All farm operations must verify that the authenticated user owns the requested farm.

## 4. Prediction Entity

| Field | Purpose |
|---|---|
| `_id` | Unique prediction identifier |
| `user` | Reference to the user who requested the prediction |
| `farm` | Farm reference where multi-farm association is enabled |
| `nitrogen` | Nitrogen input |
| `phosphorus` | Phosphorus input |
| `potassium` | Potassium input |
| `temperature` | Weather temperature input |
| `humidity` | Weather humidity input |
| `rainfall` | Weather rainfall/precipitation input |
| `ph` | Soil pH input |
| `recommendedCrop` | Predicted crop label |
| `confidence` | Model confidence value |
| `createdAt` | Prediction timestamp |

Older prediction records may not have a farm reference if they were created before multi-farm functionality. Code must handle such historical records safely.

## 5. Relationships

```text
User 1 -------- * Farm
User 1 -------- * Prediction
Farm 1 -------- * Prediction (when farm association is enabled)
```

A user can own multiple farms and create multiple predictions. A farm can be associated with multiple predictions over time.

## 6. Data Integrity and Access Rules

- Use authenticated user identity to scope user-owned records.
- Validate farm ownership on the backend before associating a farm with a prediction.
- Do not allow one user to view, update or delete another user's farm.
- Preserve historical predictions during schema updates.
- Validate numeric fields and required values.
- Keep password hashes and sensitive credentials out of API responses.
- Use timestamps for history ordering where enabled.

## 7. Indicative Soil Health Data

The soil-health assessment is calculated from the N, P, K and pH values stored in a prediction. The Day 36 design notes specify equal weights (25% each) and overall bands of 80–100 Good, 60–79 Moderate and 0–59 Needs Improvement.

This is a project-defined index, not an official government composite score. The exact component score mapping must be verified against the soil-health service implementation before publishing a detailed formula.

## 8. Example Conceptual Documents

### Farm

```json
{
  "_id": "ObjectId",
  "user": "ObjectId",
  "name": "North Field",
  "latitude": 18.52,
  "longitude": 73.85,
  "description": "Optional farm description"
}
```

### Prediction

```json
{
  "_id": "ObjectId",
  "user": "ObjectId",
  "farm": "ObjectId",
  "nitrogen": 90,
  "phosphorus": 42,
  "potassium": 43,
  "temperature": 25.5,
  "humidity": 80,
  "rainfall": 180,
  "ph": 6.5,
  "recommendedCrop": "example-label",
  "confidence": 0.91
}
```

These values are illustrative schema examples only, not records copied from the live database. Do not present them as real user data.

## 9. Backup and Migration

Before changing schemas or deploying database changes:
1. Confirm the target environment.
2. Back up production data.
3. Test the migration on development data.
4. Preserve old prediction records.
5. Verify user/farm references after migration.
6. Run regression tests before release.
