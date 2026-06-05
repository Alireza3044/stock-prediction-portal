import Button from "./Button"
import { Link } from "react-router-dom"

function Header() {
  return (
    <header className="header m-3 align-items-start">
      <nav className="navbar">
        <Link className="navbar-brand text-light" to="/">Stock Prediction Portal</Link>

        <div>
          <Button className="btn-outline-info" url="login/">Login</Button>
          &nbsp;
          <Button className="btn-info" url="register/">Register</Button>
        </div>
      </nav>
    </header>
  )
}

export default Header