import Button from "./Button"
import { useContext } from "react"
import { AuthContext } from "./../Contexts"

function Main() {
  const { isLoggedIn } = useContext(AuthContext)

  return (
    <main className="container">
      <div className="p-4 text-center bg-light-dark rounded">
        <h1 className="text-light">Stock Prediction Portal</h1>
        <p className="text-light lead">
          This stock prediction application utilizes machine learning techniques, specifically
          employing Keras, LSTM model, integrated within the Django framework. It forecasts future stock
          prices by analyzing 100-day and 200-day moving averages, essential indicators widely used by
          stock analysts to inform trading and investment decisions.
        </p>
        <Button className="btn-outline-info" url="/dashboard">
          {isLoggedIn ? "Explore Now" : "Login Now"}
        </Button>
      </div>
    </main>
  )
}

export default Main
