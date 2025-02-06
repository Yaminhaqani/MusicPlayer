import React, { useContext, useState } from 'react'
import UseAuth from '../utils/UseAuth'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MyContext } from '../context/Context';


const ProfilePic = () => {
    UseAuth();
    const { user, setUser } = useContext(MyContext);

    const [profilePic, setProfilePic] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const uploadProfilePic = async()=>{
        if(!profilePic){
            setMessageType("error");
            return setMessage("Please select an image first!")
        }

        const formData = new FormData();
        formData.append("img", profilePic);

        setLoading(true);

        try {
            const token= localStorage.getItem("token");
            const url = "http://localhost:4000/user/profilePicture";
            const response = await axios.post(url, formData,{
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${token}`,
                },
              })

              setLoading(false);
              setMessageType("success");
          setMessage(response.data.message);

          setUser((prevUser) => ({
            ...prevUser,
            profilePic: response.data.profilePic,  // The updated profile pic URL

        }));

          setProfilePic(null);

          setTimeout(() => {
            navigate("/allSongs");
          }, 2000); 
            
        } catch (error) {
console.error(error);

            setLoading(false);
        setMessageType("error");
        setMessage("Error uploading profile picture: " + (error.response?.data?.message || error.message));
            
        }
    }

       

     

  return (
    <div className='flex flex-col gap-3 w-full h-[87.3vh] justify-center items-center bg-gray-950 border-t-2 border-gray-800 font-roboto pb-[4rem] text-gray-200'>
        <h2 className='mb-4 text-2xl text-center'>Update Profile Picture</h2>

         {/* Profile Picture Preview */}
         {user && user.profilePic && <img src={user.profilePic} alt="Profile" className="profile-pic w-[250px] h-[250px] rounded-full sm:w-[300px] sm:h-[300px]" />}

         <input
                type="file"
                onChange={(e) => setProfilePic(e.target.files[0])}
                accept="image/*"
                className='flex border w-[250px] rounded-md'
            />

<button onClick={uploadProfilePic} disabled={loading} className='bg-blue-800 px-2 py-[1px] rounded-md'>
                {loading ? "Uploading..." : "Upload"}
            </button>

            {message && (
      <p
        className={`text-lg bg-gray-950 w-full text-center pb-[2px] ${
          messageType === "success" ? "text-green-500" : "text-red-500"
        }`}
      >
        {message}
      </p>
    )}

    </div>
  )
}

export default ProfilePic