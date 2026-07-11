import { useContext } from "react"
import { Outlet, Navigate } from "react-router"
import { AuthContext } from "./Contexts"

function PrivateRoute() {
  const { isLoggedIn } = useContext(AuthContext)

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  )
}

export default PrivateRoute
