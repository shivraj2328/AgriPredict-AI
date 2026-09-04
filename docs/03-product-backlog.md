# AgriPredict AI — Product Backlog

## 1. Backlog Purpose

This backlog defines the planned product work for AgriPredict AI and tracks implementation progress from the initial product foundation through AI integration, testing, and deployment.

Priority levels:

- **P0 — Critical:** Required for the core product.
- **P1 — High:** Important for the MVP.
- **P2 — Medium:** Useful enhancement.
- **P3 — Future:** Post-MVP/future scope.

Status values:

- **Done**
- **In Progress**
- **Pending**
- **Future**

---

## 2. Product Backlog

| ID | Epic | Backlog Item | Priority | Status |
|---|---|---|---|---|
| PB-01 | Foundation | Define project vision and scope | P0 | Done |
| PB-02 | Foundation | Establish repository and project structure | P0 | Done |
| PB-03 | Documentation | Maintain project documentation and journal | P1 | In Progress |
| PB-04 | Frontend | React + Vite application setup | P0 | Done |
| PB-05 | Frontend | Public navigation and layouts | P0 | Done |
| PB-06 | Frontend | Home page | P1 | Done |
| PB-07 | Frontend | About page | P2 | Done |
| PB-08 | Frontend | Contact page | P2 | Done |
| PB-09 | Frontend | 404 page | P2 | Done |
| PB-10 | Authentication | Register UI | P0 | Done |
| PB-11 | Authentication | Login UI | P0 | Done |
| PB-12 | Authentication | User registration API | P0 | Done |
| PB-13 | Authentication | Password hashing | P0 | Done |
| PB-14 | Authentication | Login API | P0 | Done |
| PB-15 | Authentication | JWT generation and validation | P0 | Done |
| PB-16 | Authentication | Protected frontend routes | P0 | Done |
| PB-17 | Authentication | Logout | P1 | Done |
| PB-18 | Profile | Current user API | P1 | Done |
| PB-19 | Profile | Update profile API | P1 | Done |
| PB-20 | Profile | Frontend profile integration | P1 | Done |
| PB-21 | Dashboard | Dashboard UI | P1 | Done |
| PB-22 | Prediction | Crop prediction form | P0 | Done |
| PB-23 | Prediction | Prediction validation | P0 | Done |
| PB-24 | Database | User Mongoose model | P0 | Done |
| PB-25 | Database | Prediction Mongoose model | P0 | Done |
| PB-26 | Prediction | Create prediction API | P0 | Done |
| PB-27 | Prediction | Associate prediction with authenticated user | P0 | Done |
| PB-28 | Prediction | Save prediction to MongoDB | P0 | Done |
| PB-29 | Prediction | Get authenticated user's predictions | P0 | Pending |
| PB-30 | Prediction | Get prediction by ID | P1 | Pending |
| PB-31 | Prediction | Frontend prediction API integration | P0 | Pending |
| PB-32 | Prediction | Frontend prediction result integration | P0 | Pending |
| PB-33 | AI/ML | Prepare crop recommendation dataset | P0 | Pending |
| PB-34 | AI/ML | Data cleaning and preprocessing | P0 | Pending |
| PB-35 | AI/ML | Train crop recommendation model | P0 | Pending |
| PB-36 | AI/ML | Evaluate model | P0 | Pending |
| PB-37 | AI/ML | Integrate TensorFlow.js model | P0 | Pending |
| PB-38 | AI/ML | Connect AI prediction to prediction API | P0 | Pending |
| PB-39 | AI/ML | Return recommended crop and confidence | P0 | Pending |
| PB-40 | Weather | Integrate weather API | P1 | Pending |
| PB-41 | Weather | Display weather information | P1 | Pending |
| PB-42 | Weather | Use weather data in prediction workflow where appropriate | P1 | Pending |
| PB-43 | Soil | Soil health analysis | P1 | Pending |
| PB-44 | Irrigation | Irrigation suggestion | P1 | Pending |
| PB-45 | Dashboard | Dynamic prediction statistics | P1 | Pending |
| PB-46 | Dashboard | Prediction charts | P2 | Pending |
| PB-47 | Dashboard | Weather/soil trend visualization | P2 | Pending |
| PB-48 | History | Search prediction history | P2 | Pending |
| PB-49 | History | Filter prediction history | P2 | Pending |
| PB-50 | Testing | Backend API tests | P0 | Pending |
| PB-51 | Testing | Frontend integration tests | P1 | Pending |
| PB-52 | Testing | Authentication/security testing | P0 | Partially Done |
| PB-53 | Testing | End-to-end application testing | P0 | Pending |
| PB-54 | Deployment | Production environment configuration | P0 | Pending |
| PB-55 | Deployment | Deploy frontend | P0 | Pending |
| PB-56 | Deployment | Deploy backend | P0 | Pending |
| PB-57 | Deployment | Verify production database connectivity | P0 | Pending |
| PB-58 | Deployment | Production smoke testing | P0 | Pending |

---

## 3. Current Sprint/Phase Position

### Completed

- Product foundation
- UI/UX foundation
- Frontend development
- Backend foundation
- MongoDB Atlas connection
- User model
- Authentication
- JWT middleware
- Profile API
- Prediction model
- Prediction creation API
- Prediction validation
- Prediction storage in MongoDB

### Current Focus

Complete the Prediction API layer:

1. `GET /api/predictions`
2. `GET /api/predictions/:id`
3. Test all prediction endpoints
4. Then integrate the AI/ML prediction flow

---

## 4. Definition of Done

A backlog item is considered **Done** when:

- The implementation is complete.
- The feature follows the project architecture.
- Input validation is present where required.
- Authentication/authorization is applied where required.
- Errors are handled appropriately.
- The feature has been manually or automatically tested as appropriate.
- Documentation is updated when the architecture or behavior changes.
- Changes are committed with a meaningful Git commit.

---

## 5. Backlog Rules

- Keep the backlog aligned with the actual product scope.
- Do not add features only for demonstration purposes.
- Do not implement future-scope features before MVP priorities.
- Break large features into small, testable backlog items.
- Keep authentication and data ownership server-controlled.
- Prediction records must always belong to the authenticated user.
- Update the backlog when a feature changes status.
- Remove obsolete items rather than leaving misleading planned work.

---

## 6. Out-of-Scope / Future Backlog

These are not part of the current MVP:

- Satellite imagery
- IoT sensor integration
- Drone monitoring
- Live market prices
- Crop disease detection
- Deep-learning-based fertilizer recommendation
