import Footer from "./Footer"
import ProtectedNavigation from "./ProtectedNavigation"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedLayout = () => {


  const token = localStorage.getItem('token')
  // We dont make client side check, because we do it on backend for each api call!
  // So we only check if token is in local storage!

  if (!token) {
    return <Navigate to="/login" />
  }


  return (
  <>
    <ProtectedNavigation />
    <main className="min-h-screen">
      <Outlet />
    </main>
  </>
  )
    
  
}

export default ProtectedLayout