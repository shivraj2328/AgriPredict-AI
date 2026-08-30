# Day 19 - User Profile API and Backend Integration

## Date 

30 August 2026

## Objective

Implement the authentication user profile functionality by connecting the exisiting React Profile page with the backend User API and MongoDB.

## Work Completed

- Designed the User Profile API architecture.
- Created the user controller for authenticated user operations.
- Implemented `getCurrentUser()` to retrive the logged-in user's profile.
- Connected the authenticated user's ID from the verified JWT to the User controller.
- Updated `/api/auth/me` endpoint to return real user information from MongoDB.
- Implemented the Update Profile API.
- Added profile update functionality for name and email.
- Added email validation and normalization.
- Prevented duplicate email addresses during profile updates.
- Ensured passwords are never returned through profile APIs.
- Protected profile APIs using JWT authentication middleware.
- Tested profile APIs using Postman.
- Connected the React Profile page with backend.
- Displayed real authenticated user information on the Profile page.
- Verified the Profile -> Backend -> MongoDB flow.
- Verified that unauthenticated profile requests are rejected.

### Profile API

| Method | Endpoint | Purpose | Authentication |
| :--- | :--- | :--- | :--- |
| GET | `/api/auth/me` | Fetch current user profile | JWT Required |
| PUT | `/api/auth/me` | Update current user profile | JWT Required |

## Profile Data Flow

* React Profile Page
* ↓
* Axios
* ↓
* JWT Authorization
* ↓
* JWT Middleware
* ↓
* `req.user.userId`
* ↓
* User Controller
* ↓
* MongoDB
* ↓
* User Profile
* ↓
* React Profile Page

### Update Profile Flow

* Profile Form
* ↓
* PUT `/api/auth/me`
* ↓
* JWT Middleware
* ↓
* Authenticated User ID
* ↓
* Validate Name & Email
* ↓
* Check Duplicate Email
* ↓
* Update MongoDB
* ↓
* Return Updated Profile

### Security 

- Profile APIs require a valid JWT.
- User ID is obtained from the verified JWT.
- User ID is not accepted from the request body.
- Password is excluded from profile responses.
- Email is normalized before storage.
- Duplicate email addresses are prevented.
- Password modification is not handled through the profile API.

### Testing

| Test | Result |
| :--- | :--- |
| GET profile with valid JWT | ✅ |
| Profile data retrieved from MongoDB | ✅ |
| PUT profile with valid JWT | ✅ |
| MongoDB profile updated | ✅ |
| Request without JWT | ✅ Rejected |
| Invalid email | ✅ Rejected |
| Duplicate email | ✅ Rejected |
| Password exposed | ❌ Not exposed |

### Frontend Integration

The Profile page now uses authenticated backend data instead of relying entirely on dummy/static user information.

Real data displayed:

`Name`
`Email`
`Member Since`

Prediction statistics remain placeholder data because the Prediction API has not yet been implemented.


### Outcome

The AgriPredict user profile system is now connected across the complete stack:

* React
* ↓
* Axios
* ↓
* Express API
* ┨
* JWT Middleware
* ↓
* User Controller
* ↓
* Mongoose
* ↓
* MongoDB Atlas

## Time Spent

1 day

### Day 19 Status

* User Profile API ✅
* Get Current User ✅
* Update Profile ✅
* JWT Protection ✅
* MongoDB Integration ✅
* Postman Testing ✅
* React Profile Integration ✅



