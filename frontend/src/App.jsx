import { useEffect, useState } from "react";
import Login from "./Login/Login";
import Navbar from "./Navbar";
import { getUserById } from "./Api/UtilsService";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkIfLoggedIn = async () => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      try {
        await getUserById(userId);
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    }
    return false;
  };

  useEffect(() => {
    checkIfLoggedIn().then(setIsLoggedIn);
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Navbar/>
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}

export default App;
