import React from "react"
import {Link} from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
          <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
            Impressum
          </Link>
          <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
            Terms and Conditions
          </Link>
          <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer