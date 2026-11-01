# AgriPredict AI — Product Backlog

## 1. Backlog Status Legend

- **Done (reported):** project conversation records completion or successful use.
- **In progress / branch work:** planned or developed after the stable deployment; verify final code.
- **To verify:** implementation details or test evidence are not available in the project notes.
- **Future:** enhancement, not part of the confirmed current feature set.

## 2. Completed Core Work (reported)

| ID | Backlog item | Status |
|---|---|---|
| AP-01 | Set up React/Vite frontend | Done |
| AP-02 | Set up Node.js/Express backend | Done |
| AP-03 | Connect MongoDB Atlas through Mongoose | Done |
| AP-04 | Implement user registration/login and JWT protection | Done |
| AP-05 | Implement profile read/update APIs | Done |
| AP-06 | Create prediction persistence model and API | Done |
| AP-07 | Integrate TensorFlow.js crop model | Done |
| AP-08 | Integrate Open-Meteo weather data by coordinates | Done |
| AP-09 | Save prediction results and show prediction history | Done |
| AP-10 | Build dashboard and real-data statistics | Done |
| AP-11 | Add Chart.js analytics | Done |
| AP-12 | Add indicative soil-health calculation | Done |
| AP-13 | Deploy frontend/backend/database using Vercel, Render and MongoDB Atlas | Done for core version; production workflow reported successful |

## 3. Multi-Farm Backlog

| ID | Backlog item | Status in progress notes |
|---|---|---|
| AP-14 | Create Farm Mongoose model | Day 34 work |
| AP-15 | Implement farm registration/list APIs | Day 34 work |
| AP-16 | Implement farm update/delete and owner checks | Day 34 work |
| AP-17 | Build My Farms UI | Day 35 work |
| AP-18 | Connect farm selection to prediction request | Day 36 plan/work |
| AP-19 | Associate prediction records with farm | Day 36 plan/work |
| AP-20 | Show farm name and filter prediction history | Day 36 plan/work |
| AP-21 | Show latest farm's indicative soil-health assessment on dashboard | Day 36 plan/work |
| AP-22 | Test multiple farms and ensure historical data remains safe | Day 36 plan/work |

These items were being developed on `feature/multi-farm`; Render Auto-Deploy was kept OFF to avoid unintentionally changing the stable deployed version.

## 4. Release Readiness / To Verify

- Confirm all multi-farm changes are merged or included in the intended submission branch.
- Confirm the deployed frontend and backend versions match the intended release.
- Verify all environment variable names and production API URLs.
- Verify model files and preprocessing metadata are included in deployment.
- Capture genuine screenshots from the running application.
- Run and record the test cases in the testing document.
- Confirm at least five genuine prediction records are available if required for academic report screenshots.
- Confirm dataset citation, version, preprocessing and measured evaluation metrics.

## 5. Future Enhancements

| Priority | Enhancement | Reason |
|---|---|---|
| Medium | Add multilingual interface | Improve accessibility |
| Medium | Improve regional dataset coverage | Better regional relevance |
| Medium | Add downloadable prediction reports | Easier record keeping |
| Medium | Add automated regression/integration tests | Improve release confidence |
| Low | Model monitoring and version display | Improve traceability |
| Low | Low-bandwidth/offline-friendly input workflow | Improve usability in rural settings |

## 6. Change Control

New features should be added only after reviewing project scope and protecting the stable deployment. Avoid describing proposed backlog items as completed features.
