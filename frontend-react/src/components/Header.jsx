import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import Button from "./Button"
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
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        ) : (
          <div>
            <Button className="btn-outline-info" url="login/">Login</Button>
            &nbsp;
            <Button className="btn-info" url="register/">Register</Button>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header