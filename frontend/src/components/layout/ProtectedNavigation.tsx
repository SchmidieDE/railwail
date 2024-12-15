import React from "react"
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";
import { useState } from "react";
import api from "@/lib/api";
import { useNavigate } from "react-router-dom";

const ProtectedNavigation = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    ["Dashboard", "/dashboard", "/dashboard"],
    ["Account", "/dashboard/account", "Account"],
    ["Usage", "/dashboard/usage", "Usage"],
  ];

  const handleLogout = async() => {
    // We remove token from DB! 
    await api.post('/logout/', {
      // token is already included in the headers! so we dont have to pass any extra infod 
    }) 
    // and from local storage of course 
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
  <header className="w-full h-auto md:h-[80px] bg-black border-b border-white shadow-primary/50 shadow-lg">
    <nav className="flex flex-col md:flex-row justify-between items-center text-secondary max-w-6xl w-full mx-auto h-full px-6 py-4 md:py-0">
      <div className="flex w-full md:w-auto justify-between items-center">
        <Link to="/dashboard">
          <img 
            src={"./logo/Logowhite.svg"} 
            alt="logo" 
            className="w-28 md:w-32 h-auto cursor-pointer hover:opacity-80 transition-opacity" 
          />
        </Link>
        <Button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
        </Button>
      </div>
      <div className={`${
          isMenuOpen ? 'flex' : 'hidden'
        } md:flex flex-col md:flex-row items-center gap-4 md:gap-8 order-last md:order-none w-full md:w-auto mt-4 md:mt-0`}>
          {navLinks.map(([text, path, link]) => (
            <Link 
              key={path}
              to={path} 
              className={`text-lg md:text-xl hover:text-primary hover:drop-shadow-[0_0_1rem_#5AC0FE] transition-all duration-300 w-full md:w-auto text-center py-2 md:py-0 bg-transparent ${
                location.pathname === link ? 'text-purple-500' : 'text-gray-200'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {text}
            </Link>
          ))}
        <Button className="text-white p-2 px-4" onClick={handleLogout}>
            <LogOutIcon className="w-4 h-4" /> 
            Logout 
        </Button>
      </div>
    </nav>
  </header>
  )
}

export default ProtectedNavigation
