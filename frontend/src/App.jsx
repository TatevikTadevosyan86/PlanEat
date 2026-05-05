import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Inventory from './pages/Inventory.jsx'
import MealPlan from './pages/MealPlan.jsx'

function App() {
  const [planningMode, setPlanningMode] = useState('smart')

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              planningMode={planningMode}
              setPlanningMode={setPlanningMode}
            />
          }
        />
        <Route path="/inventory" element={<Inventory />} />
        <Route
          path="/meal-plan"
          element={<MealPlan planningMode={planningMode} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
