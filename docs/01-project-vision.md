# Vision
 To empower farmers with an intelligent, accessible, and data-driven platform that recommends suitable crops, analyzes soil health, and provides actionable farming insights using artificial intelligence.


# Problem Statement
 Farmers often make crops selection decisions based on experience and traditional practices rather than scientific analysis of soil nutrients and environmental conditions. This can reduce crop yeild and increase resource wastage. There is need for an intelligent system that analyzes the soil characteristics and weather conditions to recommend suitable crops while also providing soil health analysis and irrigation guidance.


 # Objectives
 * Primary Objectives
- Recommend the most suitable crop using Machine Learning.
- Analyze soil health based on NPK values and pH.
- Suggest irrigation requirements.
- Display current weather information.
- Maintain user prediction history.
- Provide an intuitive dashboard.

* Secondary Objectives
- Improve farmers' decision-making.
- Reduce resource wastage.
- Demonstrate practical AI integration in a web application.


# Project Scope
* Included (MVP)
- User authentication
- Crop recommendation
- Soil health analysis
-Weather integration
- Irrigation suggestions
- Dashboard
- Charts
- Prediction history
- Feedback system

* Future Scope
- Disease prediction from images
- Fertilizer recommendation
- Live market prices
- Crop calendar
- Multi-language support
- Admin panel
- Dark mode
- IoT integration


# Functional Requirements
* The system shall allow users to:
- Register an account.
- Log in securely.
- Manage their profile.
- Enter soil parameters.
- Receive crop recommendations.
- View prediction confidence.
- Analyze soil health.
- View weather information.
- Access previous predictions.
- Submit feedback.


# Non-Functional Requirements
* The application should be:
- Responsive
- Secure
- Fast
- Reliable
- Maintainable
- Scalable
- Easy to use


# System Architecture
                 User
                   │
                   ▼
        HTML / CSS / JavaScript
                   │
              Fetch API
                   │
                   ▼
        Express REST API Server
        │          │          │
        │          │          │
        ▼          ▼          ▼
 MongoDB      AI Module     Weather API
                │
                ▼
        TensorFlow.js Model
                │
                ▼
          Prediction Result
                │
                ▼
          JSON Response
                │
                ▼
            Dashboard


# User-Flow Diagram            
Home

↓

Register/Login

↓

Dashboard

↓

Crop Prediction

↓

Prediction Result

↓

Save

↓

History

↓

Logout


# Wireframes
Home

↓

Register/Login

↓

Dashboard

↓

Crop Prediction

↓

Prediction Result

↓

Save

↓

History

↓

Profile

↓

About

↓

Contact

# Responsive Layout
| Device  | Width      |
| ------- | ---------- |
| Mobile  | <576px     |
| Tablet  | 576–768px  |
| Laptop  | 768–1200px |
| Desktop | >1200px    |

# Navigation Planning
Home
│
├── Login
│
├── Register
│
├── Dashboard
│      │
│      ├── Crop Prediction
│      ├── Prediction History
│      ├── Profile
│      ├── Weather
│      └── Feedback
│
└── Logout