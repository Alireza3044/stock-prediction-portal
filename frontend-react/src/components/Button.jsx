import { Link } from "react-router-dom"

function Button({ children, className, url }) {
  return (
    <Link className={"btn " + className} to={url}>
      {children}
    </Link>
  )
}

export default Button