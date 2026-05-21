// backend/tests/auth.test.js
import { describe, it, expect } from 'vitest'

// ============ REGISTER TESTS ============
describe('User Registration', () => {
  // Simple validation functions 
  function isValidEmail(email) {
  if (!email) return false  // ← Add this line
  return email.includes('@') && email.includes('.')
}

  function isValidPassword(password) {
    if(!password) return false
    return  password.length >= 6
  }

  function passwordsMatch(password, confirmPassword) {
    return password === confirmPassword
  }

  describe('Email validation', () => {
    it('accepts valid email', () => {
      expect(isValidEmail('user@example.com')).toBe(true)
      expect(isValidEmail('test@domain.se')).toBe(true)
    })

    it('rejects invalid email', () => {
      expect(isValidEmail('')).toBe(false)
      expect(isValidEmail('userexample.com')).toBe(false)
      expect(isValidEmail('user@')).toBe(false)
      expect(isValidEmail('user@domain')).toBe(false)
    })
  })

  describe('Password validation', () => {
    it('accepts password with 6+ characters', () => {
      expect(isValidPassword('123456')).toBe(true)
      expect(isValidPassword('password123')).toBe(true)
    })

    it('rejects password with less than 6 characters', () => {
      expect(isValidPassword('12345')).toBe(false)
      expect(isValidPassword('')).toBe(false)
    })
  })

  describe('Password confirmation', () => {
    it('passes when passwords match', () => {
      expect(passwordsMatch('123456', '123456')).toBe(true)
    })

    it('fails when passwords do not match', () => {
      expect(passwordsMatch('123456', '12345')).toBe(false)
      expect(passwordsMatch('password', 'passworD')).toBe(false)
    })
  })
})

// ============ LOGIN TESTS ============
describe('User Login', () => {

  const mockUsers = [
    { email: 'user@example.com', password: '123456' },
    { email: 'test@domain.se', password: 'password123' }
  ]

  function findUser(email, password) {
    const user = mockUsers.find(u => u.email === email)
    if (!user) return { success: false, message: 'User not found' }
    if (user.password !== password) return { success: false, message: 'Invalid password' }
    return { success: true, message: 'Login successful' }
  }

  describe('Successful login', () => {
    it('returns success for correct email and password', () => {
      const result = findUser('user@example.com', '123456')
      expect(result.success).toBe(true)
      expect(result.message).toBe('Login successful')
    })

    it('returns success for another valid user', () => {
      const result = findUser('test@domain.se', 'password123')
      expect(result.success).toBe(true)
    })
  })

  describe('Failed login', () => {
    it('returns error when user does not exist', () => {
      const result = findUser('wrong@email.com', '123456')
      expect(result.success).toBe(false)
      expect(result.message).toBe('User not found')
    })

    it('returns error when password is incorrect', () => {
      const result = findUser('user@example.com', 'wrongpassword')
      expect(result.success).toBe(false)
      expect(result.message).toBe('Invalid password')
    })

    it('returns error when email is empty', () => {
      const result = findUser('', '123456')
      expect(result.success).toBe(false)
    })

    it('returns error when password is empty', () => {
      const result = findUser('user@example.com', '')
      expect(result.success).toBe(false)
    })
  })
})

// ============ REGISTER NEW USER TESTS ============
describe('Register New User', () => {
  let users = []  // Simulate database

  function registerUser(email, password, confirmPassword) {
    // Validation checks
    if (!email || !email.includes('@')) {
      return { success: false, message: 'Invalid email' }
    }
    if (!password || password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters' }
    }
    if (password !== confirmPassword) {
      return { success: false, message: 'Passwords do not match' }
    }
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Email already exists' }
    }

    // Create new user
    users.push({ email, password })
    return { success: true, message: 'User registered successfully' }
  }


  describe('Successful registration', () => {
    it('registers new user with valid data', () => {
      const result = registerUser('new@example.com', '123456', '123456')
      expect(result.success).toBe(true)
      expect(result.message).toBe('User registered successfully')
      expect(users.length).toBe(1)
    })
  })

  describe('Failed registration', () => {
    it('fails when email is invalid', () => {
      const result = registerUser('invalid-email', '123456', '123456')
      expect(result.success).toBe(false)
      expect(result.message).toBe('Invalid email')
    })

    it('fails when password is too short', () => {
      const result = registerUser('new@example.com', '12345', '12345')
      expect(result.success).toBe(false)
      expect(result.message).toBe('Password must be at least 6 characters')
    })

    it('fails when passwords do not match', () => {
      const result = registerUser('new@example.com', '123456', '654321')
      expect(result.success).toBe(false)
      expect(result.message).toBe('Passwords do not match')
    })

    it('fails when email already exists', () => {
      registerUser('exists@example.com', '123456', '123456')
      const result = registerUser('exists@example.com', '123456', '123456')
      expect(result.success).toBe(false)
      expect(result.message).toBe('Email already exists')
    })
  })
})