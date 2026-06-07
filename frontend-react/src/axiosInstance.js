import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_BASE_URL

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json"
  }
})

const refreshInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json"
  }
})

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`
    }
    return config
  }, (error) => {
    return Promise.reject(error)
  })

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  }, async (error) => {
    const originalConfig = error.config
    
    if (error.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true
      
      const refreshToken = localStorage.getItem("refreshToken")

      if (!refreshToken) {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        return Promise.reject(error)
      }
      
      // Refresh the accessToken by the refreshToken
      try {
        const response = await refreshInstance.post("auth/token/refresh/", { refresh: refreshToken })
        
        localStorage.setItem("accessToken", response.data.access)
        originalConfig.headers.Authorization = `Bearer ${response.data.access}`
        
        return axiosInstance(originalConfig)
      }
      // Otherwise the refreshToken is invalid and user needs to sign in
      catch (error) {
        // TODO: Gets stuck in a loop of requests if
        //       doesn't redirect by external components
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        window.location.href = "/login"
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  })

export default axiosInstance
