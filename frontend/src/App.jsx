import react from "react"
import { BrowserRouter, Routes, Route, Navigate, createBrowserRouter } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home/index.tsx"
import Account from "./pages/Dashboard/Account"
import Usage from "./pages/Dashboard/Usage"
import NotFound from "./pages/NotFound"
import Dashboard from "./pages/Dashboard"
import ProtectedLayout from "./components/layout/ProtectedLayout"
import UnProtectedLayout from "./components/layout/UnprotectedLayout"
import { RouterProvider } from "react-router-dom"
import './index.css'
import ReactGA from "react-ga4";
import ImageModelsOverview from "./pages/ImageModels/index.tsx"
import ImageModel from "./pages/ImageModels/ImageModel/index.tsx"
import Pricing from "./pages/Pricing"
import PasswortReset from "./pages/PasswortReset"
import PasswortResetToken from "./pages/PasswordResetToken"
ReactGA.initialize("G-QS3J0FX7ZC"); 


const Logout = async () => {
  // clear localStorage, clear DB and get redirected to login page
  const resp = await api.post('/logout/')
  if (resp.ok) {
    localStorage.clear()
    return <Navigate to="/login" />
  } else {
    return <Navigate to="/dashboard" />
  }
  
}




const routes = createBrowserRouter([
  {
    path: "/dashboard",
    element: <ProtectedLayout/>, // All Routes in ProtectedLayout are protected automatically
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/dashboard/account",
        element: <Account />
      },
      {
        path: "/dashboard/usage",
        element: <Usage />
      }
    ]
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
        path: "/register",
        element: <Register />
      },
      {
        path: "/passwort-reset/:token", //dynamic route 
        element: <PasswortResetToken />
      },
      {
        path: "/passwort-reset",
        element: <PasswortReset />
      },
      {
        path: "/logout",
        element: <Logout />
      },
      {
        path: "/pricing",
        element: <Pricing />
      },
      {
        path: "/image-models",
        element: <ImageModelsOverview />
      },
      {
        path: "/image-models/:modelName",
        element: <ImageModel />
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
    <>
    <RouterProvider router={routes} />
    </>
    
  )
}

export default App
