import { Link } from "react-router-dom"
import React from "react"
import { Button } from "../ui/button"

const UnProtectedNavigation = () => {
  return (
    <header className="w-full h-[80px] bg-black border-b border-white shadow-primary/50 shadow-lg">
      <nav className="flex justify-between items-center text-secondary max-w-6xl w-full mx-auto h-full px-6">
        <div className="flex items-center ">
          <img 
            src={"./logo/Logowhite.svg"} 
            alt="logo" 
            className="w-32 h-auto" 
          />
        </div>
        
        <div className="flex items-center gap-8">
        {
            [["Home", "/"], ["Login", "/login"], ["Register", "/register"]].map(([text, path]) => (
              <Link 
                key={path}
                to={path} 
                className="text-gray-200 text-xl hover:text-primary hover:drop-shadow-[0_0_1rem_#5AC0FE] transition-all duration-300 shadow-lg shadow-primary/50"
              >
                {text}
              </Link>
            ))
          }
          <Button className="bg-primary hover:bg-primary/90 text-white px-6 border border-white shadow-primary/50 shadow-lg">
            Get Started
          </Button>
        </div>
      </nav>
    </header>
  )
}

export default UnProtectedNavigation