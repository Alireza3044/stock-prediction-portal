import { createContext, useState } from "react";

const AuthContext = createContext()

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken")
  )

  return (
    <AuthContext value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext>
  )
}

export default AuthProvider
export { AuthContext }
