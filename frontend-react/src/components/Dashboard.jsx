import { useEffect } from "react"
import axiosInstance from "../axiosInstance"

function Dashboard() {
  const accessToken = localStorage.getItem("accessToken")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("v1/sample/", {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        })
        console.log(response.data)
      }
      catch(error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  return (
    <h1 className="text-light">Dashboard Component</h1>
  )
}

export default Dashboard
