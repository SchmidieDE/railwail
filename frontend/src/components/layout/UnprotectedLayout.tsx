import UnProtectedNavigation from "./UnprotectedNavigation"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"
import { Rocket, Star } from "lucide-react";
import BackgroundSpace from "../background/BackgroundSpace";
import TrackPageView from "../custom/trackPageView";
import { Toaster } from "@/components/ui/toaster";

const UnProtectedLayout = () => {

  
  return <div className="min-h-screen flex flex-col relative">
    <Toaster />
    {  /* Google Analytics Verbindung */}
    <TrackPageView />
    <UnProtectedNavigation />
    <BackgroundSpace /> 
    <main className="flex flex-col flex-grow relative">
      <Outlet />
    </main>
    <Footer />
  </div>
}

export default UnProtectedLayout