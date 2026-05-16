import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#f7faf7] text-[#1f5c4d]">
      <div className="flex min-h-screen flex-col">
        {/* Header */}
        <header className="h-24 border-b border-[#dbe7de] bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <img
                src={logo}
                alt="PlanEat logo"
                className="h-22 w-22 object-contain"
              />
              <span className="text-4xl font-semibold tracking-tight text-[#1f5c4d]">
                PlanEat
              </span>
            </div>

            <nav className="hidden items-center gap-10 text-xl font-medium text-[#7c9488] md:flex">
              <Link to="/" className="hover:text-[#1f5c4d]">Home</Link>
              <Link to="/inventory" className="hover:text-[#1f5c4d]">Inventory</Link>
              <Link to="/meal-plan" className="hover:text-[#1f5c4d]">Meal Plan</Link>
              <Link to="/shopping-list" className="hover:text-[#1f5c4d]">Shopping List</Link>
            </nav>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 px-6 py-10">
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 border-t border-[#dbe7de] bg-white px-6 py-6">
          <div className="mx-auto grid max-w-7xl gap-6 text-center text-2xl font-medium text-[#1f5c4d] md:grid-cols-3">
            <p>PlanEat</p>
            <p>Quick Links</p>
            <p>Support</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Layout