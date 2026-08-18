# Day 13 — Database Design & User Model

## Date
17 July 2026 to 18 July 2026

## Today's Goal

Design the first application database entity and create the
Mongoose User model.

## Phase

Phase 2 — Backend Development

## What I Completed

### MongoDB Concepts

Learned the relationship between:

- Database
- Collection
- Document
- Field
- `_id`

### User Data Design

Designed the structure of the User entity for AgriPredict AI.

The User model will provide the database foundation required
for future authentication functionality.

### Mongoose

Learned how Mongoose provides a schema and model-based
approach for working with MongoDB.

### User Model

Created:

`server/src/models/User.js`

The model defines the structure and validation rules for
User documents.

### Schema vs Model

Understood that:

- Schema defines the structure and rules of the data.
- Model provides the interface used by the application to
  work with that data.

### MongoDB Atlas Troubleshooting

During testing, the MongoDB connection failed because the
current IP address was not allowed by MongoDB Atlas Network
Access.

The issue was resolved by updating the allowed IP address
and verifying the database connection again.

## Architecture After Day 13

Express
    ↓
Mongoose
    ↓
User Model
    ↓
MongoDB Atlas

## What I Learned

- MongoDB database structure
- Collections and documents
- Mongoose
- Mongoose Schema
- Mongoose Model
- Data validation
- MongoDB Atlas Network Access
- Database connectivity troubleshooting

## What This Enables

The User model provides the database foundation required for:

- User registration
- Login
- Password authentication
- JWT authentication
- User profile management

These features will be implemented in upcoming backend work.

## Current Limitations

Authentication APIs are not implemented yet.

The following are still pending:

- Registration API
- Login API
- Password hashing
- JWT authentication
- Authentication middleware

## Day 13 Outcome

The first application database model for AgriPredict AI has
been created successfully.

The backend can now move from database structure into
authentication development.

## Status

✅ Completed