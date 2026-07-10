import { useState } from "react"
import axiosInstance from "../axiosInstance"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

const rootURL = import.meta.env.VITE_BACKEND_ROOT_URL

function Dashboard() {
  const [ticker, setTicker] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [basePlot, setBasePlot] = useState("")
  const [maPlot, setMaPlot] = useState("")
  const [predPlot, setPredPlot] = useState("")
  const [evaluations, setEvaluations] = useState({})

  async function getPrediction(e) {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    setBasePlot("")

    try {
      const response = await axiosInstance.post("predict/", { ticker })

      if (response.data.error) {
        setError(response.data.error)
      }
      setBasePlot(rootURL + response.data.base_plot_path)
      setMaPlot(rootURL + response.data.ma_plot_path)
      setPredPlot(rootURL + response.data.pred_plot_path)
      setEvaluations({
        mse: response.data.mse,
        rmse: response.data.rmse,
        r2Score: response.data.r2_score
      })
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
        <div>
          {basePlot && <img className="plot-image" src={basePlot} alt="plot_image" />}
          {maPlot && <img className="plot-image" src={maPlot} alt="plot_image" />}
          {predPlot && <img className="plot-image" src={predPlot} alt="plot_image" />}
        </div>
        {evaluations.mse && (
          <div className="pt-3 text-light col-md-6 mx-auto">
            <p>MSE: {evaluations.mse}</p>
            <p>RMSE: {evaluations.rmse}</p>
            <p>R<sup>2</sup> Score: {evaluations.r2Score}</p>
          </div>
        )}
      </div>
    </main>
  )
}

export default Dashboard
