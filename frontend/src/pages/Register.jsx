import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../services/auth.js'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSuccessMessage('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    try {
      await registerUser({
        name,
        email,
        password,
      })

      setSuccessMessage('Registration successful. Redirecting to login...')

      setTimeout(() => {
        navigate('/login')
      }, 1200)
    } catch (error) {
      setError(
        error.response?.data?.message ||
          'Could not register user. Please try again.'
      )
    }
  }

  return (
    
      <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 text-[#1f5c4d] shadow-sm">

        <h1 className="text-4xl font-semibold tracking-tight">Register</h1>
        <p className="mt-3 text-lg text-[#8ba095]">
          Create an account to use protected features in PlanEat.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Name"
            className="w-full rounded-2xl border border-[#d9e7dd] px-5 py-4 text-lg text-[#1f5c4d] outline-none"
          />

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

          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Confirm password"
            className="w-full rounded-2xl border border-[#d9e7dd] px-5 py-4 text-lg text-[#1f5c4d] outline-none"
          />

          {error ? (
            <div className="rounded-2xl bg-[#fdf1ec] p-4">
              <p className="text-lg text-[#a35f4b]">{error}</p>
            </div>
          ) : null}

          {successMessage ? (
            <div className="rounded-2xl bg-[#eaf6ee] p-4">
              <p className="text-lg text-[#2b6a58]">{successMessage}</p>
            </div>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-2xl bg-[#1f5c4d] px-6 py-4 text-xl font-semibold text-white"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-lg text-[#7f958a]">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-[#1f5c4d]">
            Log in
          </Link>
        </p>
      </div>
   
  )
}

export default Register
