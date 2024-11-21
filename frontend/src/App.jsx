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
import ReactGA from "react-ga4";
import ImageModelsOverview from "./pages/ImageModels/index.tsx"
import ImageModel from "./pages/ImageModels/ImageModel/index.tsx"
import Pricing from "./pages/Pricing"
import ModelPage from "./pages/Home/modelPage.tsx"

ReactGA.initialize("G-QS3J0FX7ZC"); 


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
        path: "/image-models",
        element: <ImageModelsOverview />
      },
      {
        path: "/image-models/:modelName",
        element: <ImageModel />
      },
      {
        path: "/model/:id",
        element: <ModelPage />
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
