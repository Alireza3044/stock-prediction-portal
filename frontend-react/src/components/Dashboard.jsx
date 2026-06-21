import { useState } from "react"
import axiosInstance from "../axiosInstance"

function Dashboard() {
  const [ticker, setTicker] = useState("")

  async function getPrediction(e) {
    e.preventDefault()

    const response = await axiosInstance.post("v1/predict/", { ticker })
    console.log(response)
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
            <button className="btn btn-info mt-3" type="submit">See Prediction</button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Dashboard
