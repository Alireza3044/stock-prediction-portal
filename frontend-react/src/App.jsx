import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./assets/css/app.css"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Main from "./components/Main"
import Register from "./components/Register"
import Login from "./components/Login"
import AuthProvider from "./Contexts"
import Dashboard from "./components/Dashboard"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="register/" element={<Register />} />
          <Route path="login/" element={<Login />} />
          <Route path="dashboard/" element={<Dashboard />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
