import { Routes, Route, useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import "./assets/css/app.css"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Main from "./components/Main"
import Register from "./components/Register"
import Login from "./components/Login"
import { AuthContext } from "./Contexts"
import Dashboard from "./components/Dashboard"
import PrivateRoute from "./PrivateRoute"
import PublicRoute from "./PublicRoute"

function App() {
  const { setIsLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const handleAuthRedirect = () => {
      setIsLoggedIn(false)
      navigate("/login")
    }
    window.addEventListener("refresh-token-expired", handleAuthRedirect)

    return () => {
      window.removeEventListener("refresh-token-expired", handleAuthRedirect)
    }
  }, [navigate, setIsLoggedIn])

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
