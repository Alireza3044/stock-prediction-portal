import { useState } from "react"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

function Register() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    password2: ""
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e) => {
    setUserData(data => ({ ...data, [e.target.name]: e.target.value }))
  }

  async function handleRegister(e) {
    e.preventDefault()

    const url = "http://127.0.0.1:8000/api/auth/register/"
    setIsLoading(true)
  
    try {
      setErrors({})
      const response = await axios.post(url, userData)
      setIsSuccess(true)
    }
    catch (error) {
      setErrors(error.response.data)
      setIsSuccess(false)
      console.error(error.response.data)
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-light-dark p-5 rounded">
          <h3 className="text-light text-center mb-4">Create an Account</h3>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Username"
                value={userData.username}
                onChange={handleChange}
              />
              {errors.username &&
                <small className="text-danger">{errors.username}</small>
              }
            </div>

            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email"
                value={userData.email}
                onChange={handleChange}
              />
              {errors.email &&
                <small className="text-danger">{errors.email}</small>
              }
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
              {errors.password &&
                <small className="text-danger">{errors.password}</small>
              }
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                name="password2"
                placeholder="Repeat Password"
                value={userData.password2}
                onChange={handleChange}
              />
              {errors.password2 &&
                <small className="text-danger">{errors.password2}</small>
              }
            </div>
            {isSuccess && <div className="alert alert-success">Registration Was Successful.</div>}
            <button type="submit" className="btn btn-info d-block mx-auto mt-4" disabled={isLoading}>
              {isLoading && <FontAwesomeIcon icon={faSpinner} spin={true} />}
              {isLoading ? "Please Wait" : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
