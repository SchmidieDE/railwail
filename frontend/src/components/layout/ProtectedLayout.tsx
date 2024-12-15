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
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
  )
    
  
}

export default ProtectedLayout