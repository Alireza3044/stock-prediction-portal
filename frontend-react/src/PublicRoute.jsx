import { useContext } from "react"
import { AuthContext } from "./Contexts"
import { Navigate } from "react-router-dom"

function PublicRoute({children}) {
  const {isLoggedIn} = useContext(AuthContext)

  return !isLoggedIn ? (
    children
  ) : (
    <Navigate to="/dashboard" />
  )
}

export default PublicRoute
