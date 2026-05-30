# Status Report - PlanEat

---

## Project Description

PlanEat is a web application that helps users plan meals based on ingredients they already have at home. The goal is to reduce food waste, simplify planning, and create a clear connection between inventory, meal plan, and shopping list.

---

## Live Deployment

- **Live application:** [https://planeatnow.vercel.app](https://planeatnow.vercel.app)
- **Backend API:** [https://planeat-1.onrender.com](https://planeat-1.onrender.com)
- **API Health:** [https://planeat-1.onrender.com/api/health](https://planeat-1.onrender.com/api/health)

---

## Repository

- **GitLab repository:** [https://gitlab.lnu.se/1dv613/student/tt222yi/workspace/planeat](https://gitlab.lnu.se/1dv613/student/tt222yi/workspace/planeat)
- **GitHub repository:** [https://github.com/TatevikTadevosyan86/PlanEat](https://github.com/TatevikTadevosyan86/PlanEat)

> The project has been moved to a public GitHub repository. A link is also available in the GitLab README.

---

## Deployment & CI/CD History

| Phase | Platform | CI/CD | Status |
|-------|----------|-------|--------|
| Phase 1 | School server (LNU) | GitLab CI/CD + Docker | ✅ Completed |
| Phase 2 | Vercel (frontend) + Render (backend) | GitHub Actions | ✅ Completed |

**Details:**
1. **Initial deployment** – Deployed on school server using GitLab CI/CD pipeline with Docker containers
2. **Migration** – Project moved from GitLab to GitHub
3. **Current deployment** – GitHub Actions CI/CD pipeline deploying frontend to Vercel and backend to Render

---

## Implemented Features

### Backend
- ✅ Register and login
- ✅ JWT-based authentication
- ✅ Protected routes in backend
- ✅ MongoDB persistence
- ✅ Docker and deployment setup
- ✅ Automated tests with Vitest

### Frontend
- ✅ Inventory where users can add, view, and delete ingredients
- ✅ Meal plan generation based on available ingredients
- ✅ Shopping list based on the latest saved meal plan
- ✅ Routing between Home, Inventory, Meal Plan, and Shopping List
- ✅ Smart Mode (batch cooking, leftovers +3 bonus)
- ✅ Fresh Mode (variety, leftovers -2 penalty)
- ✅ Recipe detail page with instructions
- ✅ Ingredient highlight (green/red based on inventory)
- ✅ Save and load meal plan from backend

### Deployment
- ✅ GitLab CI/CD + Docker (school server)
- ✅ GitHub Actions CI/CD
- ✅ Frontend on Vercel
- ✅ Backend on Render

---

## What Remains

| Priority | Task | Status |
|----------|------|--------|
| Medium | More automated tests | ⏳ Planned |
| Medium | Better error handling and user feedback | ⏳ Planned |
| Low | Continued UI/UX improvements | ⏳ Planned |
| Low | User allergies – avoid certain ingredients in meal plan | 💡 Future idea |
| Low | Dislike products – user can mark ingredients to avoid | 💡 Future idea |
| Low | Like/Dislike button on meals – personalize future recommendations | 💡 Future idea |
| Low | Expand recipe database with more meals and variety | 💡 Future idea |

---

## Development Status

The project is in a functioning **MVP / further development** state.

---

## Test Status

| Test type | Tests | Passed | Failed | Pass rate |
|-----------|-------|--------|--------|-----------|
| Unit tests (backend) | 19 | 19 | 0 | 100% |
| Unit tests (frontend) | 43 | 43 | 0 | 100% |
| Integration tests | 13 | 13 | 0 | 100% |
| Manual Test Cases | 29 | 29| 0 | 100% |
| **Total** | **104** | **104** | **0** | **100%** |

All tests pass. Full test reports are available in the GitLab Wiki.

---

## Known Issues

| Issue | Severity | Status |
|-------|----------|--------|
| Button click visual feedback (loading state) | Low | Not fixed |

No critical or medium severity issues remain.

---

## Future Development

If PlanEat is developed further after the course, there are several useful features that could improve the application.

### Inventory improvements
- Add due dates for ingredients in the inventory
- Prioritize ingredients that are about to expire
- Calculate exact missing amounts in the shopping list  
  *Example: if the user has 3 tomatoes but a recipe needs 5, the shopping list should show 2 tomatoes missing*
- Allow users to add more detailed ingredient information
- Scan QR codes or barcodes to get product information automatically

### Personalization
- **User allergies** – avoid certain ingredients in meal plan generation
- **Dislike products** – user can mark specific ingredients to avoid
- **Like/Dislike button on meals** – personalize future recipe recommendations based on user feedback


### Meal planning improvements
- Generate meals using ingredients with the nearest due date first
- Add vegan and vegetarian options
- Expand the recipe database with more meals
- Improve Fresh Mode so it creates more variety


### Recipe improvements
- Add more detailed step-by-step instructions
- Allow users to add their own recipes

### Social and usability features
- Share meal plans or shopping lists with family or friends

### Technical improvements
- Add more automated tests
- Improve data validation and error handling
- Continue refining ingredient matching and shopping list logic

---

## Conclusion

PlanEat has been developed into a functioning full-stack application with a clear basic structure and core features in place. 

**Deployment journey:** Started with GitLab CI/CD + Docker on school server → migrated to GitHub → now using GitHub Actions deploying to Vercel (frontend) and Render (backend).

All tests pass (104/104). The project is ready to be handed over as a base for further development, with several natural areas for improvement in the future.

---

