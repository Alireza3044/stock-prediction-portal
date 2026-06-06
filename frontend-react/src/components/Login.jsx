import { useContext, useState } from "react"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { AuthContext } from "../Contexts"
import { useNavigate } from "react-router-dom"

function Login() {
  const [userData, setUserData] = useState({
    username: "",
    password: ""
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)
  const navigate = useNavigate()

  function handleChange(e) {
    setUserData(data => ({ ...data, [e.target.name]: e.target.value }))
  }

  async function handleLogin(e) {
    e.preventDefault()
    const url = "http://127.0.0.1:8000/api/auth/token/"

    try {
      setError("")
      setIsLoading(true)
      const response = await axios.post(url, userData)
      
      localStorage.setItem("accessToken", response.data.access)
      localStorage.setItem("refreshToken", response.data.access)
      setIsLoggedIn(true)
      navigate("/")
    }
    catch (err) {
      setError(err.response.data.detail)
      console.error(err.response.data.detail)
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-light-dark p-5 rounded">
          <h3 className="text-light text-center mb-4">Login</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Username"
                value={userData.username}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                value={userData.password}
                onChange={handleChange}
              />
              {error && <small className="text-danger">{error}</small>}
            </div>

            <button type="submit" className="btn btn-info d-block mx-auto mt-4" disabled={isLoading}>
              {isLoading && <FontAwesomeIcon icon={faSpinner} spin={true} />}
              {isLoading ? "Logging In..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
