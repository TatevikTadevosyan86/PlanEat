import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/auth.js'

function Login({ setUser, setToken }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    try {
      const data = await loginUser({
        email,
        password,
      })

      localStorage.setItem('token', data.token)
      setToken(data.token)
setUser(data.user)
      navigate('/')
    } catch (error) {
      setError(
        error.response?.data?.message ||
          'Could not log in. Please try again.'
      )
    }
  }

  return (
    <div className="min-h-screen bg-[#f7faf7] px-6 py-10 text-[#1f5c4d]">
      <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 text-[#1f5c4d] shadow-sm">

        <h1 className="text-4xl font-semibold tracking-tight">Login</h1>
        <p className="mt-3 text-lg text-[#8ba095]">
          Log in to access your protected PlanEat pages.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            className="w-full rounded-2xl border border-[#d9e7dd] px-5 py-4 text-lg text-[#1f5c4d] outline-none"
          />

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            className="w-full rounded-2xl border border-[#d9e7dd] px-5 py-4 text-lg text-[#1f5c4d] outline-none"
          />

          {error ? (
            <div className="rounded-2xl bg-[#fdf1ec] p-4">
              <p className="text-lg text-[#a35f4b]">{error}</p>
            </div>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-2xl bg-[#1f5c4d] px-6 py-4 text-xl font-semibold text-white"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-lg text-[#7f958a]">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-semibold text-[#1f5c4d]">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
