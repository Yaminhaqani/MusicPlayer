import React, { useState } from 'react'
import UseAuth from '../utils/UseAuth'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoImagesOutline } from "react-icons/io5";

const UserPlaylist = () => {
    UseAuth();

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [imgFile, setImgFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [_fileKey, setFileKey] = useState(Date.now());

    const handleFileChange = (e) => {
        setImgFile(e.target.files[0]);
      };

      const handleClose = () => {
        navigate("/AllSongs");
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setMessageType("");
    
        if (!name) {
          setLoading(false);
          setMessageType("error");
          setMessage("Playlist name is required.");
          return;
        }


    try {

        const formData = new FormData();
        formData.append("name", name);
        formData.append("desc", desc);
        if (imgFile) formData.append("img", imgFile);
        
        const token = localStorage.getItem("token"); //necessary for backend logic of playlist user._id
        const url="http://localhost:4000/user/createPlaylist";

        const response = await axios.post(url , formData , {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          })

          setLoading(false);
          setMessageType("success");
          setMessage(response.data.message);

          setName("");
          setDesc("");
          setImgFile(null);
          setFileKey(Date.now());
    

    } catch (error) {
        
        setLoading(false);
        setMessageType("error");
        setMessage("Error creating playlist: " + (error.response?.data?.message || error.message));

    }
}


  return (
    <div className="Register flex flex-col w-full min-h-screen justify-center items-center bg-gray-950 border-t-2 border-gray-800 font-roboto">
    <form
      onSubmit={handleSubmit}
      className="w-[300px] border border-gray-700 px-2 rounded-xl sm:w-[450px] flex flex-col justify-evenly gap-[2px]"
    >
      <h1 className="mb-4 text-gray-200 text-2xl text-center">Create Playlist</h1>

      <label className="text-gray-300">Playlist Name</label>
      <input
        className="sm:h-[45px] h-[35px]"
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label className="text-gray-300">Description</label>
      <textarea
        className="sm:h-[45px] h-[35px]"
        name="desc"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Optional description"
      ></textarea>

      <label className="text-gray-300 flex gap-6">
        Image File <IoImagesOutline className="mt-[2.5px]" />
      </label>
      <input
        className="sm:h-[45px] h-[35px]"
        key={_fileKey}
        type="file"
        name="img"
        accept="image/*"
        onChange={handleFileChange}
      />

      <div className="buttons w-full flex gap-11">
        <button onClick={handleSubmit}
          className="bg-blue-800 text-gray-300 h-[35px] rounded-[10px] sm:h-[45px] flex-1"
          type="submit"
        >
          Create
        </button>

        <button
          onClick={handleClose}
          className="bg-gray-600 text-gray-300 h-[35px] rounded-[10px] sm:h-[45px] flex-1"
        >
          Close
        </button>
      </div>
    </form>

    {loading && <p className="text-gray-300">Creating...</p>}
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


export default UserPlaylist;