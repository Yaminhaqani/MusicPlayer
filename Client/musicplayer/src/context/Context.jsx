import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAdminAuth from "../utils/UseAdminAuth";





export const MyContext = createContext();

const MyProvider = ({children})=>{
    const [loggedIn , setLoggedIn] = useState(false);
    const [totalUsers, setTotalUsers] = useState();
      const [totalSongs, setTotalSongs] = useState();
      const {isAdmin, setIsAdmin} = useAdminAuth();

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
        setIsAdmin(false);
    };


    const [user, setUser] = useState(null);

    // Fetch user from backend (if logged in)
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/details`, {
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

const totalUsersUrl = `${process.env.REACT_APP_API_URL}/admin/total-users`;
const totalSongsUrl = `${process.env.REACT_APP_API_URL}/admin/total-songs`;

  

 

    // Fetch total users count
    const fetchTotalUsers = async () => {
      try {
        const token = localStorage.getItem("token");
  
        if (!token) {
          toast.error("Authentication token missing. Please log in again.");
          return;
        }
        const res = await axios.get(totalUsersUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTotalUsers(res.data?.totalUsers || "No users");
      } catch (error) {
        console.error(error);
        setTotalUsers(error.response?.data?.message || "Failed to fetch user count");
      }
    };
  
    // Fetch total songs count
    const fetchTotalSongs = async () => {
      try {
        const token = localStorage.getItem("token");
  
        if (!token) {
          toast.error("Authentication token missing. Please log in again.");
          return;
        }
  
        const res = await axios.get(totalSongsUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        setTotalSongs(res.data?.totalSongs || "No songs");
      } catch (error) {
        console.error(error);
        setTotalSongs(error.response?.data?.message || "Failed to fetch song count");
      }
    };

    useEffect(()=>{
      if(isAdmin){
        fetchTotalUsers();
        fetchTotalSongs();
      }
    },[isAdmin]);

    return(
        <MyContext.Provider value={{loggedIn, setLoggedIn, logout, user, setUser, totalUsers , setTotalUsers, fetchTotalUsers, totalSongs, setTotalSongs,  fetchTotalSongs, isAdmin }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyProvider;
