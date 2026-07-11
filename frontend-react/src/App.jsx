import { Routes, Route, useNavigate } from "react-router"
import { useContext, useEffect } from "react"
import "./assets/css/app.css"
import { AuthContext } from "./Contexts"
import Index from "./components/Index"
import Register from "./components/Register"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import PrivateRoute from "./PrivateRoute"
import PublicRoute from "./PublicRoute"
import Header from "./components/Header"
import Footer from "./components/Footer"

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
        <Route index element={<Index />} />
        <Route element={<PublicRoute />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
