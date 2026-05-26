import { Navigate } from 'react-router-dom'

/**
 * Blocks access to protected pages when there is no authenticated user in app state.
 *
 * @param {{ user: object | null, children: React.ReactNode }} props
 * @returns {JSX.Element}
 */
function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
