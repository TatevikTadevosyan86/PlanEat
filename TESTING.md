# Testing Documentation - PlanEat

## Test Environment

| Aspect | Details |
|--------|---------|
| Test Runner | Vitest v4.1.7 |
| HTTP Testing | Supertest v7.2.2 |
| Test Database | MongoDB Atlas |
| Browser | Chrome (latest) |
| OS | Windows 11 |

---

## Test Results Summary

| Test type | Tests | Passed | Failed | Pass rate |
|-----------|-------|--------|--------|-----------|
| Unit tests (backend) | 19 | 19 | 0 | 100% |
| Unit tests (frontend) | 43 | 43 | 0 | 100% |
| Integration tests | 13 | 13 | 0 | 100% |
| Manual Test Cases (System + Features + Deployment) | 29 | 29 | 0 | 100% |
| **Total** | **104** | **104** | **0** | **100%** |

---

## Deployment Tests (Vercel + Render)

| Test | Description | Status |
|------|-------------|--------|
| TC-DEPLOY-1 | Backend health check | ✅ Pass |
| TC-DEPLOY-2 | Frontend homepage loads | ✅ Pass |
| TC-DEPLOY-3 | API calls from frontend | ✅ Pass |
| TC-DEPLOY-4 | Page refresh (SPA routing) | ✅ Pass |
| TC-DEPLOY-5 | Full user flow | ✅ Pass |
| TC-DEPLOY-6 | Image loading | ✅ Pass |

---

## Manual System Tests

| Test ID | Description | Status |
|---------|-------------|--------|
| TC-BR1-1 | Generate 7-Day Meal Plan | ✅ Pass |
| TC-BR2-1 | Shopping List – Only Missing Ingredients | ✅ Pass |
| TC-BR3-1 | Smart Mode – Prioritize Leftovers | ✅ Pass |
| TC-BR3-2 | Fresh Mode – Variety Every Day | ✅ Pass |
| TC-BR4-1 | Register New User | ✅ Pass |
| TC-BR4-2 | Login – Wrong Password | ✅ Pass |
| TC-BR4-3 | User Data is Private | ✅ Pass |
| TC-BR5-1 | Add Fresh Ingredient (no state) | ✅ Pass |
| TC-BR5-2 | Add Leftover Ingredient (with state) | ✅ Pass |

---

## Known Remaining Issue (Low Priority)

| Bug | Priority | Status |
|-----|----------|--------|
| Button click visual feedback | Low | Not fixed |

---

## Detailed Test Reports


Full test reports  are available in GitLab Wiki:

| Iteration | Test Report Link |
|-----------|------------------|
| Iteration 1 | [Test Report 1](https://gitlab.lnu.se/1dv613/student/tt222yi/project-hub/-/wikis/Testning/Test-Report-1) |
| Iteration 2 | [Test Report 2](https://gitlab.lnu.se/1dv613/student/tt222yi/project-hub/-/wikis/Testning/Test-Report-2) |
| Iteration 3 | [Test Report 3](https://gitlab.lnu.se/1dv613/student/tt222yi/project-hub/-/wikis/Testning/Test-Report-3) |
| Iteration 4 | [Test Report 4](https://gitlab.lnu.se/1dv613/student/tt222yi/project-hub/-/wikis/Testning/Test-Report-4) |
| Iteration 5 | [Test Report 5](https://gitlab.lnu.se/1dv613/student/tt222yi/project-hub/-/wikis/Testning/Test-Report-5) |
| Iteration 6 | [Test Report 6](https://gitlab.lnu.se/1dv613/student/tt222yi/project-hub/-/wikis/Testning/Test-Report-6) |