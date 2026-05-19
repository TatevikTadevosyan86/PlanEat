import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home.jsx'
import Inventory from './pages/Inventory.jsx'
import MealPlan from './pages/MealPlan.jsx'
import ShoppingListPage from './pages/ShoppingListPage.jsx'
import MealDetail from './pages/MealDetail.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'


function App() {
  const [planningMode, setPlanningMode] = useState('smart')

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home
                planningMode={planningMode}
                setPlanningMode={setPlanningMode}
              />
            </Layout>
          }
        />
        <Route
          path="/inventory"
          element={
            <Layout>
              <Inventory />
            </Layout>
          }
        />
        <Route
          path="/meal-plan"
          element={
            <Layout>
              <MealPlan planningMode={planningMode} />
            </Layout>
          }
        />
        <Route
          path="/meal-plan/:id"
          element={
            <Layout>
              <MealDetail />
            </Layout>
          }
        />
        <Route
          path="/shopping-list"
          element={
            <Layout>
              <ShoppingListPage />
            </Layout>
          }
        />
        <Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App