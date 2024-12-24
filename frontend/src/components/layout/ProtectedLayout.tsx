import Footer from "./Footer"
import ProtectedNavigation from "./ProtectedNavigation"
import { Navigate, Outlet } from "react-router-dom"

import { Toaster } from "@/components/ui/toaster";


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
    <Toaster />
    <main className="min-h-screen my-6">
      <Outlet />
    </main>
  </>
  )
    
  
}

export default ProtectedLayout