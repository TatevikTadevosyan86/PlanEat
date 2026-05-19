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
import { getCurrentUser } from './services/auth.js'
import ProtectedRoute from './components/ProtectedRoute.jsx'



function App() {
  const [planningMode, setPlanningMode] = useState('smart')
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
    useEffect(() => {
    async function restoreSession() {
      if (!token) {
        setIsCheckingAuth(false)
        return
      }

      try {
        const data = await getCurrentUser(token)
        setUser(data.user)
      } catch {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
      } finally {
        setIsCheckingAuth(false)
      }
    }

    restoreSession()
  }, [token])

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#f7faf7] px-6 py-10 text-[#1f5c4d]">
        <div className="mx-auto max-w-4xl">
          <p className="text-xl text-[#8ba095]">Checking session...</p>
        </div>
      </div>
    )
  }
function handleLogout() {
  localStorage.removeItem('token')
  setToken(null)
  setUser(null)
}

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
                user={user}
                handleLogout={handleLogout}
              />
            </Layout>
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute user={user}>
              <Layout>
              <Inventory />
            </Layout>
             </ProtectedRoute>
          }
        />
        <Route
          path="/meal-plan"
          element={
             <ProtectedRoute user={user}>
              <Layout>
              <MealPlan planningMode={planningMode} />
            </Layout>
            </ProtectedRoute>
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
           <ProtectedRoute user={user}>
             <Layout>
              <ShoppingListPage />
            </Layout>
             </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App