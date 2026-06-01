import Button from "./Button"

function Header() {
  return (
    <header className="header m-3 align-items-start">
      <nav className="navbar">
        <a className="navbar-brand text-light">Stock Prediction Portal</a>

        <div>
          <Button className="btn-outline-info">Login</Button>
          &nbsp;
          <Button className="btn-info">Register</Button>
        </div>
      </nav>
    </header>
  )
}

export default Header