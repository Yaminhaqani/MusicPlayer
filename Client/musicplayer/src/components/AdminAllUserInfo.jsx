import React, { useContext, useEffect, useState } from "react";
import useAdminAuth from "../utils/UseAdminAuth";
import axios from "axios";
import { toast } from "react-toastify";
import { AudioContext } from "../context/AudioContext";
import { IoMdPerson } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import { MyContext } from "../context/Context";

const AdminAllUsers = () => {
  useAdminAuth();

  const { query } = useContext(AudioContext);
  const [allUsers, setAllUsers] = useState([]);
  const [loadingUserId , setLoadingUserId] = useState(null);
  const {fetchTotalUsers, } = useContext(MyContext);
  // fetchTotalSongs

  useEffect(() => {
    const fetchAllUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Authentication token missing. Please log in again.");
          return;
        }

        const url = `${process.env.REACT_APP_API_URL}/admin/allUserInfo`;
        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAllUsers(res.data?.allUsers || []);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch user data.");
      }
    };

    fetchAllUserInfo();
  }, []);

  const filteredUser = allUsers.filter((user) => {
    const lowerQuery = query.toLowerCase();
    return (
      user.name.toLowerCase().includes(lowerQuery) ||
      user.email.toLowerCase().includes(lowerQuery)
    );
  });

  const handleDeleteUser = async(userId)=>{
    
try {
  setLoadingUserId(userId);
  const token = localStorage.getItem("token");
  if(!token){
    return toast.error("Authentication token missing. Please log in again.");
  }

  const url = `${process.env.REACT_APP_API_URL}/admin/${userId}/delete`;
  const res = await axios.delete(url,{
    headers:{Authorization : `Bearer ${token}`},
  });
  setLoadingUserId(false);
  fetchTotalUsers();
  toast.success(res.data.message);

  setAllUsers((prevUsers)=>prevUsers.filter((user)=>user._id!==userId)); //removing user from state to refresh list
  fetchTotalUsers(); //trigger total use count
  
} catch (error) {
  setLoadingUserId(false);
  console.error("Error deleting user:", error.response?.data?.message || error.message);
    toast.error(error.response?.data?.message || "Failed to delete user.");
}  finally {
  setLoadingUserId(null); 
}
  }

  return (
    <div className="songs-container flex flex-col items-center py-3 bg-gray-950 overflow-y-auto font-roboto pb-[3.25rem] w-full h-[88.5vh]">

      <div className="flex justify-between text-gray-300 w-[85%] sm:w-[50%] py-2 border-b border-gray-700 mb-4">
        <div className="flex items-center">
          
          <IoMdPerson className="w-5 h-5"/>
          <h2 className="text-lg font-semibold ml-2">All Users</h2>
        </div>
      </div>

      {/* Users List */}
      {filteredUser.map((user) => (
        <div
          key={user._id}
          className="user-item relative flex items-center justify-between h-[60px] border border-white w-[85%] text-gray-300 mb-4 hover:bg-gray-800 group transition-all duration-100 sm:w-[50%] px-4"
        >
          <div className="user-details flex flex-col justify-center">
            <h4 className="text-sm sm:text-base">{user.name}</h4>
            <p className="text-xs sm:text-sm">{user.email}</p>
          </div>
          <button
            onClick={() => handleDeleteUser(user._id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded flex items-center"
            disabled={loadingUserId === user._id} // disable while deleting
          >
            <FaTrash className="mr-1" />
            {loadingUserId === user._id ? "Deleting...":"Delete"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminAllUsers;
