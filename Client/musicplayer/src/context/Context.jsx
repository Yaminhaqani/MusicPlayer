import axios from "axios";
import { createContext, useEffect, useState } from "react";




export const MyContext = createContext();

const MyProvider = ({children})=>{
    const [loggedIn , setLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setLoggedIn(true);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
        setUser(null);
    };


    const [user, setUser] = useState(null);

    // Fetch user from backend (if logged in)
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:4000/user/details", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user", error);
        }
      }
    };
    fetchUser();
  }, [loggedIn]);

    return(
        <MyContext.Provider value={{loggedIn, setLoggedIn, logout, user, setUser}}>
            {children}
        </MyContext.Provider>
    );
};

export default MyProvider;