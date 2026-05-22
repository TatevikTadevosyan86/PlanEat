import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

function Layout({ children, user, handleLogout }) {
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
                className="h-20 w-20 object-contain"
              />
              <span className="text-4xl font-semibold tracking-tight text-[#1f5c4d]">
                PlanEat
              </span>
            </div>

            <nav className="hidden items-center text-lg font-medium text-[#7c9488] md:flex">
  <div className="flex items-center gap-8">
              <Link to="/" className="hover:text-[#1f5c4d]">Home</Link>
              <Link to="/inventory" className="hover:text-[#1f5c4d]">Inventory</Link>
              <Link to="/meal-plan" className="hover:text-[#1f5c4d]">Meal Plan</Link>
              <Link to="/shopping-list" className="hover:text-[#1f5c4d]">Shopping List</Link>
              {user ? (
   <div className="ml-6 flex items-center gap-4 border-l border-[#dbe7de] pl-6">
  <div className="flex flex-col leading-tight">
    <span className="text-sm text-[#8ba095]">Welcome</span>
    <span className="font-medium text-[#1f5c4d]">
      {user.name || user.email}
    </span>
  </div>

  <button
    type="button"
    onClick={handleLogout}
    className="rounded-full bg-[#eef6f1] px-4 py-2 text-sm font-medium text-[#1f5c4d] transition hover:bg-[#dfeee5]"
  >
    Logout
  </button>
</div>
  ) : (
    
    <div className="ml-6 flex items-center gap-3 border-l border-[#dbe7de] pl-6">
  <Link
    to="/login"
    className="px-4 py-2 text-[#5f776c] transition hover:text-[#1f5c4d]"
  >
    Login
  </Link>

  <Link
    to="/register"
    className="rounded-full bg-[#1f5c4d] px-5 py-2 text-white transition hover:bg-[#17463b]"
  >
    Register
  </Link>
</div>
  )}    </div>
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
        <footer className="mt-16 border-t border-[#dbe7de] bg-white">
  <div className="mx-auto max-w-7xl px-6 py-12">
    <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
  {/* Brand Column */}
  <div>
    <h3 className="text-xl font-semibold text-[#1f5c4d]">
      PlanEat
    </h3>

    <p className="mt-3 text-sm text-[#8ba095]">
      Smart meal planning to reduce food waste and save money.
    </p>

    <p className="mt-4 text-sm text-[#8ba095]">
      © 2026 PlanEat. All rights reserved.
    </p>
  </div>

  {/* Support Column */}
  <div className="md:text-right">
    <h4 className="font-semibold text-[#1f5c4d]">
      Support
    </h4>

    <ul className="mt-3 space-y-2 text-sm text-[#8ba095]">
      <li>
        <a
          href="#"
          className="transition hover:text-[#1f5c4d]"
        >
          FAQ
        </a>
      </li>

      <li>
        <a
          href="#"
          className="transition hover:text-[#1f5c4d]"
        >
          Contact Us
        </a>
      </li>
    </ul>
  </div>
</div>
    {/* Bottom Bar */}
    <div className="mt-8 pt-6 text-center text-xs text-[#8ba095] border-t border-[#dbe7de]">
      <p>Made with 💚 for a waste-free kitchen</p>
    </div>
  </div>
</footer>
      </div>
    </div>
  )
}

export default Layout