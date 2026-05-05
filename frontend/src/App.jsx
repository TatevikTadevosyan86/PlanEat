import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Inventory from './pages/Inventory.jsx'
import MealPlan from './pages/MealPlan.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/meal-plan" element={<MealPlan />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
