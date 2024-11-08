import react from "react"
import { BrowserRouter, Routes, Route, Navigate, createBrowserRouter } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import Dashboard from "./pages/Dashboard"
import ProtectedLayout from "./components/layout/ProtectedLayout"
import UnProtectedLayout from "./components/layout/UnprotectedLayout"
import { RouterProvider } from "react-router-dom"
import './index.css'
import Pricing from "./pages/Pricing"


function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}



const routes = createBrowserRouter([
  {
    path: "/dashboard",
    element: <ProtectedLayout/>,
    children: [
      {
        path: "/dashboard",
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>
      }
    ]
  },
  {
    path: "/test",
    element: <div>test</div>
  },
  {
    path: "/",
    element: <UnProtectedLayout />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/logout",
        element: <Logout />
      },
      {
        path: "/register",
        element: <RegisterAndLogout />
      }, 
      {
        path: "/pricing",
        element: <Pricing />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
  ]
)





function App() {
  return (
    <RouterProvider router={routes} />
  )
}

export default App
