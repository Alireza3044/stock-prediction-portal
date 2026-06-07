import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./assets/css/app.css"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Main from "./components/Main"
import Register from "./components/Register"
import Login from "./components/Login"
import AuthProvider from "./Contexts"
import Dashboard from "./components/Dashboard"
import PrivateRoute from "./PrivateRoute"
import PublicRoute from "./PublicRoute"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
