import Footer from "./Footer"
import ProtectedNavigation from "./ProtectedNavigation"
import { Outlet } from "react-router-dom"

const ProtectedLayout = () => {
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