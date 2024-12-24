import api from "../../lib/api"
import { useEffect, useState } from "react"
import SelectModel from "./comp/SelectModel"

const Dashboard = () => {






  return (
    <div className="flex flex-col items-center min-h-screen w-full">
      <div className="w-full px-4">
        <SelectModel />
      </div>

    </div>
  )
}

export default Dashboard