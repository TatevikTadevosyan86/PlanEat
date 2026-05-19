
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
import { useEffect, useState } from 'react'




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
            <Layout user={user}
                handleLogout={handleLogout}>
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
            <ProtectedRoute user={user}>
              <Layout user={user} handleLogout={handleLogout}>
                <Inventory token={token} />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/meal-plan"
          element={
            <ProtectedRoute user={user}>
              <Layout user={user} handleLogout={handleLogout}>
                <MealPlan planningMode={planningMode} token={token} />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/meal-plan/:id"
          element={
            <Layout user={user} handleLogout={handleLogout}>
              <MealDetail />
            </Layout>
          }
        />
        <Route
          path="/shopping-list"
          element={
            <ProtectedRoute user={user}>
              <Layout user={user} handleLogout={handleLogout}>
                <ShoppingListPage token={token} />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
  path="/login"
  element={
    <Layout user={user} handleLogout={handleLogout}>
      <Login setUser={setUser} setToken={setToken} />
    </Layout>
  }
/>
<Route
  path="/register"
  element={
    <Layout user={user} handleLogout={handleLogout}>
      <Register />
    </Layout>
  }
/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
