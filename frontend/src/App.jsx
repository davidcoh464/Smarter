import { useEffect, useState } from "react"
import Login from "./Login/Login"
import Navbar from "./Navbar"

function App() {
  const [is_register, set_is_register] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("user_id")) {
      set_is_register(true);
    }
  }, [])

  return (
    <div>
      {is_register ? <Navbar/> : <Login />}
    </div>
  )
}

export default App
