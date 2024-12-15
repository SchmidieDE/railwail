import api from "../../lib/api"
import { useEffect, useState } from "react"

const Dashboard = () => {


  const [users, setUsers] = useState([])

  const getAllUsers = async() => {

    const response = await api.get('/users/')
    const respJson = await response.json() 
    console.log(respJson)
    setUsers(respJson)
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      Dashboard 
      <div>
        <h1>Users</h1>
        <div>
          {users.map((user) => (
            <div key={user.id}>{user.email}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard