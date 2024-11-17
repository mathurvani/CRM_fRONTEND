import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
function PublicRoute({ children }) {
    const { token } = useSelector((state) => state.auth)
  
    if (token === null) {
      return children
    } else {
      return <Navigate to="/home" />
    }
  }
  
  export default PublicRoute