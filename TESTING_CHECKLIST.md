# AgriPredict AI — Testing Checklist

## 1. Authentication
| # | Test case                         | Status   |
| - | --------------------------------- | -------- |
| 1 | User registration                 | ✅ Passed |
| 2 | Duplicate email registration      | ✅ Passed |
| 3 | Password length validation        | ✅ Passed |
| 4 | Password mismatch validation      | ✅ Passed |
| 5 | Login with valid credentials      | ✅ Passed |
| 6 | Login with invalid credentials    | ✅ Passed |
| 7 | Protected routes after logout     | ✅ Passed |
| 8 | Session persistence after refresh | ✅ Passed |
| 9 | Logout functionality              | ✅ Passed |


## 2. Dashboard
| #  | Test case                   | Status   |
| -- | --------------------------- | -------- |
| 10 | Dashboard loads correctly   | ✅ Passed |
| 11 | Total prediction count      | ✅ Passed |
| 12 | Soil health display         | ✅ Passed |
| 13 | Latest recommended crop     | ✅ Passed |
| 14 | Weather information display | ✅ Passed |
| 15 | Recent predictions display  | ✅ Passed |
| 16 | Empty dashboard state       | ✅ Passed |


## 3. Crop Prediction
| #  | Test Case                                    | Result |
| -- | -------------------------------------------- | ------ |
| 17 | Prediction form required-field validation    | ✅ PASS |
| 18 | Farm location selection                      | ✅ PASS |
| 19 | Weather data fetching                        | ✅ PASS |
| 20 | Successful crop prediction                   | ✅ PASS |
| 21 | Recommended crop display                     | ✅ PASS |
| 22 | Confidence score display                     | ✅ PASS |
| 23 | Negative nitrogen validation                 | ✅ PASS |
| 24 | Nitrogen maximum validation (201)            | ✅ PASS |
| 25 | Phosphorus maximum validation (201)          | ✅ PASS |
| 26 | Potassium maximum validation (251)           | ✅ PASS |
| 27 | Temperature range validation through Postman | ✅ PASS |
| 28 | Humidity range validation through Postman    | ✅ PASS |
| 29 | pH range validation through Postman          | ✅ PASS |
| 30 | Rainfall range validation through Postman    | ✅ PASS |
| 31 | Latitude validation through Postman          | ✅ PASS |
| 32 | Longitude validation through Postman         | ✅ PASS |
| 33 | Missing prediction fields through Postman    | ✅ PASS |
| 34 | Non-numeric prediction input through Postman | ✅ PASS |



## 4. Backend and API
| #  | Test Case                                  | Result    |
| -- | ------------------------------------------ | --------- |
| 35 | Backend starts successfully                | ✅ PASS    |
| 36 | Backend root endpoint                      | ✅ PASS    |
| 37 | Missing authentication token               | ✅ PASS    |
| 38 | Invalid authentication token               | ✅ PASS    |
| 39 | Prediction endpoint without authentication | ✅ PASS    |
| 40 | Nonexistent API route                      | ✅ CHECKED |
| 41 | Valid prediction API request               | ✅ PASS    |
| 42 | Invalid prediction values rejected         | ✅ PASS    |
| 43 | Prediction records saved successfully      | ✅ PASS    |
| 44 | Predictions returned newest first          | ✅ PASS    |
| 45 | User-specific prediction isolation         | ✅ PASS    |
|


## 5. Database and Prediction History
| #  | Test Case                            | Result                                 |
| -- | ------------------------------------ | -------------------------------------- |
| 46 | Prediction saved in database         | ✅ PASS                                 |
| 47 | User-specific prediction retrieval   | ✅ PASS                                 |
| 48 | Empty prediction history             | ✅ PASS                                 |
| 49 | Prediction History page loads        | ✅ PASS                                 |
| 50 | Correct crop names displayed         | ✅ PASS                                 |
| 51 | Correct confidence scores displayed  | ✅ PASS                                 |
| 52 | API records match Prediction History | ✅ PASS                                 |
| 53 | Prediction deletion                  | ➖ NOT APPLICABLE — no deletion feature |



## 6. Profile and Analytics
| #  | Test Case                      | Result                                        |
| -- | ------------------------------ | --------------------------------------------- |
| 54 | Profile page loads             | ✅ PASS                                        |
| 55 | Real prediction statistics     | ✅ PASS                                        |
| 56 | Profile update                 | ✅ PASS                                        |
| 57 | Duplicate email validation     | ✅ PASS                                        |
| 58 | Invalid email validation       | ✅ PASS                                        |
| 59 | Empty profile field validation | ✅ PASS                                        |
| 60 | Profile update persists        | ✅ PASS                                        |
| 61 | Crop distribution chart        | ✅ PASS                                        |
| 62 | Profile API failure handling   | ⚠️ ISSUE FOUND — remains on "Loading Profile" |



## 7. Settings
| #  | Test Case                          | Result |
| -- | ---------------------------------- | ------ |
| 63 | Settings page loads                | ✅ PASS |
| 64 | Dark mode toggle                   | ✅ PASS |
| 65 | Temperature unit conversion        | ✅ PASS |
| 66 | Rainfall unit conversion           | ✅ PASS |
| 67 | Hide confidence scores             | ✅ PASS |
| 68 | Reset settings                     | ✅ PASS |
| 69 | Settings persist after refresh     | ✅ PASS |
| 70 | Settings persist during navigation | ✅ PASS |


## 8. Contact Form Testing
| #  | Test Case                  | Result |
| -- | -------------------------- | ------ |
| 71 | Contact page loads         | ✅ PASS |
| 72 | Empty form validation      | ✅ PASS |
| 73 | Invalid email validation   | ✅ PASS |
| 74 | Valid form submission      | ✅ PASS |
| 75 | Submission success message | ✅ PASS |


## 9. General UI Testing
| #  | Test Case              | Result                 |
| -- | ---------------------- | ---------------------- |
| 76 | Home page              | ✅ PASS                 |
| 77 | About page             | ✅ PASS                 |
| 78 | Contact page           | ✅ PASS                 |
| 79 | Navbar navigation      | ✅ PASS                 |
| 80 | Footer links           | ✅ PASS                 |
| 81 | 404 Not Found page     | ✅ PASS                 |
| 82 | Desktop layout         | ✅ PASS                 |
| 83 | Tablet layout          | ✅ PASS                 |
| 84 | Mobile layout          | ✅ PASS                 |
| 85 | Browser console errors | ✅ PASS — none observed |



## 10. | #  | Test Case                              | Result         |
| -- | -------------------------------------- | -------------- |
| 86 | Weather API successful response        | ✅ PASS         |
| 87 | Weather API failure message            | ✅ PASS         |
| 88 | Weather API recovery                   | ✅ PASS         |
| 89 | Crop prediction API failure message    | ✅ PASS         |
| 90 | Crop prediction API recovery           | ✅ PASS         |
| 91 | Profile API failure handling           | ⚠️ ISSUE FOUND |
| 92 | Profile recovery after API restoration | ✅ PASS         |
API Failure Handling and Recovery 



## 11. Final Verification
| #  | Test Case                                        | Result |
| -- | ------------------------------------------------ | ------ |
| 93 | Frontend production build                        | ✅ PASS |
| 94 | Complete end-to-end workflow                     | ✅ PASS |
| 95 | Dashboard, History, and Profile data consistency | ✅ PASS |
| 96 | Settings persistence during final workflow       | ✅ PASS |
| 97 | Logout after final workflow                      | ✅ PASS |


## Final Testing Summary
| Status                      |  Count |
| --------------------------- | -----: |
| Passed                      |     94 |
| Issue found                 |      2 |
| Checked                     |      1 |
| Not applicable              |      1 |
| **Total checklist entries** | **98** |
