# AgriPredict AI — Development Standards

## 1. Purpose

This document defines the engineering standards for developing and maintaining AgriPredict AI.

The goal is to keep the project readable, secure, maintainable, testable, and consistent as the application grows.

---

## 2. Architecture Standards

Use the established separation of responsibilities.

### Frontend

```text
React
  ↓
Pages / Components
  ↓
Services
  ↓
Axios API Client
  ↓
Express REST API
```

### Backend

```text
Routes
  ↓
Middleware
  ↓
Controllers
  ↓
Services
  ↓
Models
  ↓
MongoDB
```

AI-specific code belongs under:

```text
server/src/ai/
```

Do not move or restructure the established project architecture without a genuine architectural reason.

---

## 3. Project Structure

The current documentation structure is:

```text
docs/
├── 01-project-vision.md
├── 02-feature-list.md
├── 03-product-backlog.md
├── 04-development-standards.md
├── 05-system-design.md
├── 06-database-design.md
├── 07-api-design.md
├── 08-ai-flow-diagram.md
├── 09-design-system.md
└── 10-ui-components.md
```

The application is organized into:

```text
client/
server/
datasets/
docs/
journal/
tests/
```

---

## 4. Naming Conventions

### JavaScript / React

- Components: `PascalCase`
- Component files: `PascalCase.jsx`
- Functions: `camelCase`
- Variables: `camelCase`
- Constants: `UPPER_SNAKE_CASE` only for true constants
- Hooks: `use` prefix, e.g. `useAuth`

Examples:

```text
Prediction.jsx
Profile.jsx
authService.js
getCurrentUser()
isAuthenticated()
```

### Backend

- Controllers: `camelCase` function names
- Models: `PascalCase`
- Middleware: descriptive `camelCase` names
- Routes: resource-oriented paths

Examples:

```text
User.js
Prediction.js
auth.controller.js
user.controller.js
auth.middleware.js
```

---

## 5. React Standards

- Use functional components.
- Use React hooks where required.
- Keep reusable UI in components.
- Keep page-level composition in `pages/`.
- Use layouts for shared page structure.
- Keep API communication in `services/`.
- Avoid placing API calls directly throughout unrelated UI components.
- Avoid duplicated UI logic.
- Use React Router for application routing.
- Keep public and authenticated layouts separate.

---

## 6. HTTP / API Client Standard

The frontend uses **Axios** for backend communication.

Use the centralized Axios client in:

```text
client/src/services/api.js
```

Do not introduce `fetch()` for normal application API communication unless the architecture is deliberately changed.

JWT handling should remain centralized through the Axios configuration/interceptor rather than duplicated in every request.

---

## 7. Backend Standards

### Routes

Routes should:

- Define HTTP method and endpoint.
- Apply required middleware.
- Delegate business logic to controllers.

Routes should not contain large business-logic blocks.

### Controllers

Controllers should:

- Read request data.
- Call the required service/model logic.
- Return appropriate HTTP responses.
- Avoid unnecessary business logic.

### Services

Services should contain reusable business logic when the operation becomes complex or needs separation from request/response handling.

### Models

Mongoose models should:

- Define the document structure.
- Define validation rules where appropriate.
- Define timestamps when useful.
- Avoid exposing sensitive fields in API responses.

---

## 8. Authentication and Authorization Standards

Authentication uses:

- `bcryptjs` for password hashing.
- JWT for authentication.
- Express middleware for token verification.

### Rules

- Never store plaintext passwords.
- Never return passwords from user APIs.
- Never expose `JWT_SECRET` to the frontend.
- Keep secrets in environment variables.
- Do not trust a user ID supplied by the client for ownership decisions.
- Use the verified JWT identity from `req.user`.
- Protected endpoints must require valid authentication.
- Frontend protected routes improve UX but do not replace backend authorization.

For prediction records:

```text
JWT
 ↓
auth middleware
 ↓
req.user.userId
 ↓
Prediction ownership
```

---

## 9. Environment Variable Standards

Sensitive configuration belongs in `.env`.

Examples include:

```text
PORT
MONGO_URI
JWT_SECRET
```

The frontend should only receive variables intentionally exposed through the Vite `VITE_` prefix.

Never commit:

```text
.env
```

Commit only safe examples such as:

```text
.env.example
```

Never place secrets directly in source code.

---

## 10. Database Standards

- Use Mongoose for MongoDB access.
- Validate important input at the application/schema level.
- Use timestamps for records where historical tracking matters.
- Associate predictions with the authenticated user.
- Do not allow a client to assign another user's prediction ownership.
- Avoid returning sensitive fields.
- Use indexes where query patterns justify them.
- Keep schema naming consistent across frontend, backend, and documentation.

---

## 11. API Standards

Use REST-style endpoints.

Examples:

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
PUT  /api/auth/me

POST /api/predictions
GET  /api/predictions
GET  /api/predictions/:id
```

Use appropriate status codes:

```text
200 OK
201 Created
400 Bad Request
401 Unauthorized
404 Not Found
409 Conflict
500 Internal Server Error
```

Return consistent JSON response structures.

Do not expose internal stack traces or sensitive implementation details to clients.

---

## 12. Validation Standards

Validate data on the backend even when frontend validation exists.

Prediction inputs include:

- Nitrogen
- Phosphorus
- Potassium
- Temperature
- Humidity
- Rainfall
- Soil pH

Validation should reject:

- Missing required values
- Invalid data types
- Invalid email addresses
- Invalid authentication tokens
- Invalid identifiers
- Unsupported values where domain rules apply

Frontend validation is for user experience; backend validation is authoritative.

---

## 13. Error Handling

Errors should:

- Be handled intentionally.
- Return meaningful HTTP status codes.
- Return safe messages.
- Avoid leaking secrets, stack traces, passwords, or database internals.

Do not silently ignore errors.

---

## 14. Git Standards

Use small, meaningful commits.

Preferred format:

```text
feat: add prediction creation API
fix: correct protected route handling
docs: update database design
chore: configure backend environment
test: add prediction API tests
refactor: simplify authentication service
```

Avoid vague messages such as:

```text
update
changes
done
final
```

Push regularly.

Do not commit:

```text
.env
node_modules/
dist/
coverage/
```

---

## 15. Testing Standards

Test important application flows, including:

### Authentication

- Registration success
- Duplicate email
- Invalid input
- Login success
- Wrong password
- Unknown email
- Missing JWT
- Invalid JWT

### Profile

- Get current user
- Update valid profile
- Invalid email
- Duplicate email
- Missing JWT

### Prediction

- Valid prediction creation
- Missing fields
- Invalid values
- Missing JWT
- Prediction ownership
- Prediction retrieval
- Invalid prediction ID

---

## 16. Documentation Standards

When architecture or product behavior changes:

- Update the relevant document.
- Update the backlog.
- Update the development journal when part of daily work.
- Update README/status information when appropriate.
- Record important architectural decisions.

Documentation should describe the actual implemented system, not an outdated planned version.

---

## 17. Code Quality Standards

Before considering a task complete:

- Remove unused imports.
- Remove dead code.
- Avoid unnecessary duplication.
- Use clear names.
- Keep functions focused.
- Keep files reasonably scoped.
- Handle errors.
- Validate external input.
- Check browser/server console errors.
- Verify API behavior with appropriate testing.

---

## 18. Security Checklist

Before committing backend changes:

- [ ] No secrets in source code.
- [ ] `.env` is ignored.
- [ ] Passwords are hashed.
- [ ] Passwords are never returned.
- [ ] JWT secret is backend-only.
- [ ] Protected routes use authentication middleware.
- [ ] User ownership comes from verified JWT identity.
- [ ] Client input is validated.
- [ ] Errors do not expose sensitive internals.

---

## 19. Product Scope Rule

AgriPredict AI currently does **not** include a feedback feature.

Do not add:

- Feedback UI
- Feedback API
- Feedback model
- Feedback database collection

unless the product scope is explicitly changed in the future.

---

## 20. Standard of Completion

A feature is not considered complete merely because the code runs.

Completion requires:

```text
Implementation
    ↓
Validation
    ↓
Testing
    ↓
Error handling
    ↓
Documentation
    ↓
Git commit
```

This standard should be followed throughout the project.
