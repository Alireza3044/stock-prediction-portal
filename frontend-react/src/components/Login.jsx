import { useContext, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { AuthContext } from "../Contexts"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../axiosInstance"

function Login() {
  const [userData, setUserData] = useState({
    username: "",
    password: ""
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { setIsLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate()

  function handleChange(e) {
    setUserData(data => ({ ...data, [e.target.name]: e.target.value }))
  }

  async function handleLogin(e) {
    e.preventDefault()
    try {
      setError("")
      setIsLoading(true)
      const response = await axiosInstance.post("auth/token/", userData)

      localStorage.setItem("accessToken", response.data.access)
      localStorage.setItem("refreshToken", response.data.refresh)
      setIsLoggedIn(true)
      navigate("/dashboard")
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
              {isLoading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin={true} />
                  <span>Logging In</span>
                </>
              ) : <span>Login</span>}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
