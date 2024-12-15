import React from "react"
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";

const ProtectedNavigation = () => {


  const navLinks = [
    ["Images", "/"],
    ["Videos", "/pricing"],
    ["Text", "/logout"],
    ["Audio", "/logout"],
  ];

  return (
  <header className="w-full h-auto md:h-[80px] bg-black border-b border-white shadow-primary/50 shadow-lg">
    <div className="flex flex-col md:flex-row justify-between items-center text-secondary max-w-6xl w-full mx-auto h-full px-6 py-4 md:py-0">
      <img src={"./logo/Logowhite.svg"} alt="logo" className="w-28 md:w-32 h-auto" />
      <div className="flex flex-row gap-4">
      {
        navLinks.map(([text, path]) => (
          <Link to={path} key={text}>{text}</Link>
        ))
      }
      </div>
      <div className="flex flex-row gap-4"> 
        <Button className="text-white p-2 px-4">
          <LogOutIcon className="w-4 h-4" /> 
          <Link to="/logout">
          Logout</Link>
        </Button>
      </div>
    </div>
  </header>
  )
}

export default ProtectedNavigation
