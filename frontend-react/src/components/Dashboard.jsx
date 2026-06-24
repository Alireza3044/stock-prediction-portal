import { useState } from "react"
import axiosInstance from "../axiosInstance"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

function Dashboard() {
  const [ticker, setTicker] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  async function getPrediction(e) {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await axiosInstance.post("v1/predict/", { ticker })
      console.log(response.data)
      
      if (response.data.error) {
        setError(response.data.error)
      }
    } catch (err) {
      console.error("There was an error with the API request", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <form onSubmit={getPrediction}>
            <input
              type="text"
              className="form-control"
              placeholder="Enter the ticker"
              value={ticker}
              onChange={e => setTicker(e.target.value)}
            />
            {error && <small className="text-danger d-block">{error}</small>}
            <button className="btn btn-info mt-3" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin={true} />
                  <span>Please Wait</span>
                </>
              ) : <span>See Prediction</span>}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Dashboard
