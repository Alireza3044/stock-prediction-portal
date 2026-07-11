import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../Contexts"

function Header() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    setIsLoggedIn(false)
    navigate("/")
  }

  return (
    <header className="header m-3 align-items-start">
      <nav className="navbar">
        <Link className="navbar-brand text-light" to="/">Stock Prediction Portal</Link>

        {isLoggedIn ? (
          <div>
            <Link className="btn btn-info" to="/dashboard">Dashboard</Link>
            &nbsp;
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <Link className="btn btn-outline-info" to="/login">Login</Link>
            &nbsp;
            <Link className="btn btn-info" to="/register">Register</Link>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header