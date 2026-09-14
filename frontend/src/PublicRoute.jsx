import { useContext } from "react"
import { Outlet, Navigate } from "react-router"
import { AuthContext } from "./Contexts"

function PublicRoute() {
  const { isLoggedIn } = useContext(AuthContext)

  return isLoggedIn ? (
    <Navigate to="/dashboard" />
  ) : (
    <Outlet />
  )
}

export default PublicRoute
