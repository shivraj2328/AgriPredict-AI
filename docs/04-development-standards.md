# AgriPredict AI — Development Standards

## 1. Project Structure

Use the established repository structure and numbered documentation convention:

```text
AgriPredict-AI/
├── client/
├── datasets/
├── docs/
│   ├── 01-project-vision.md
│   ├── 02-feature-list.md
│   ├── 03-product-backlog.md
│   ├── 04-development-standards.md
│   ├── 05-system-design.md
│   ├── 06-database-design.md
│   ├── 07-api-design.md
│   └── 08-ai-flow-diagram.md
├── journal/
├── server/
│   └── src/
│       ├── ai/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── services/
│       ├── utils/
│       ├── validators/
│       └── app.js
├── tests/
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 2. Naming and Organization

- Use descriptive file and variable names.
- Keep Express routes, controllers, services, models, middleware and validators separated according to their responsibilities.
- Keep reusable frontend API calls in the API/service layer rather than duplicating request logic in components.
- Keep AI model loading, preprocessing and inference logic within the existing `server/src/ai/` structure.
- Preserve existing naming conventions when modifying established modules.

## 3. Backend Standards

- Validate all request data on the server.
- Use authenticated user identity from verified JWT middleware; do not trust a user ID supplied by the client for ownership.
- Scope user-owned records to the authenticated user.
- Check farm ownership for farm read/update/delete and farm-linked prediction operations.
- Return consistent JSON responses and suitable HTTP status codes.
- Handle external weather-service and model-inference failures explicitly.
- Avoid logging passwords, tokens, database credentials or other secrets.

## 4. Frontend Standards

- Keep form validation and error messages understandable.
- Show loading, success, empty and error states.
- Do not treat frontend validation as a substitute for backend validation.
- Fetch dashboard/profile statistics from real API data.
- Keep API base URL configurable for development and production.
- Confirm responsive behaviour for desktop, tablet and mobile layouts.

## 5. Database and Data Safety

- Use Mongoose models and schema validation.
- Preserve existing user and prediction records when changing schemas.
- Avoid destructive migrations or deletes without a verified backup and explicit plan.
- Keep farm ownership references consistent.
- Do not assume every historical prediction has a farm reference; older records may predate multi-farm support.

## 6. AI and Data Standards

- Keep the inference feature order identical to the training feature order.
- Use the matching preprocessing/normalization metadata.
- Do not claim accuracy or performance metrics without measured evaluation evidence.
- Do not silently substitute missing weather values with fabricated values.
- Keep dataset source, license, version and preprocessing steps documented.

## 7. Soil-Health Wording

Use the label **Indicative Soil Health Assessment**. The score is a project-defined heuristic based on N, P, K and pH, not a laboratory soil test or official government composite classification. Clearly disclose this in the UI and documentation.

## 8. Environment and Secrets

- Store secrets in environment variables.
- Commit `.env.example`, never a real `.env`.
- Never include MongoDB connection strings, JWT secrets, API credentials or private deployment tokens in Git.
- Verify production CORS and API URL configuration before release.

## 9. Git and Deployment

- Use meaningful commit messages, preferably `feat:`, `fix:`, `docs:`, `test:`, `refactor:` and `chore:`.
- Use feature branches for larger changes.
- Keep the stable deployed version protected while developing multi-farm changes.
- Test the intended release before merging/deploying.
- Deployment completion requires a real production smoke test, not only a successful build.

## 10. Testing Expectations

Test validation, authentication, authorization, persistence, weather failures, model failures, user-specific history, farm ownership, empty states and the full prediction workflow. Record actual outcomes rather than marking unexecuted tests as passed.
