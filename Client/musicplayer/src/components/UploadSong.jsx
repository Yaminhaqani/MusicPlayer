import axios from 'axios';
import React, { useState } from 'react';
import { FaRegFolderOpen } from "react-icons/fa";
import { IoImagesOutline } from "react-icons/io5";
import './Register.css'

const UploadSong = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [songFile, setSongFile] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); //Tracks message type ('success' or 'error')
  const [_fileKey, setFileKey] = useState(Date.now()); // Unique key to force re-render

  // Handle file change for both song and image
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'song') {
      setSongFile(files[0]);
    } else if (name === 'img') {
      setImgFile(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    setMessage('');
    setMessageType(''); 

    if (!songFile || !imgFile) {
      setLoading(false);
      setMessageType('error');
      setMessage('Both song and image files are required.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('artist', artist);
      formData.append('song', songFile); // This is the song file
      formData.append('img', imgFile); // This is the image file

      const url = 'http://localhost:4000/admin/UploadSong';

      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Let the browser handle file uploads
        },
      });

      setLoading(false);
      setMessageType('success');
      setMessage(response.data.message);

      // Clear the form
      setTitle('');
      setArtist('');
      setSongFile(null);
      setImgFile(null);

      // Update the key to force re-render of file inputs
      setFileKey(Date.now());
    } catch (error) {
      setLoading(false);
      setMessageType('error');
      console.log(error);
      
      setMessage('Error uploading song: ' + error.response.data.message);
    }
  };

  return (
    <div className='Register flex flex-col w-full h-[87.3vh] justify-center items-center bg-gray-950 border-t-2 border-gray-800 font-roboto'>
      <form onSubmit={handleSubmit} className='w-[300px] border border-gray-700 px-2 rounded-xl sm:w-[450px] flex flex-col justify-evenly gap-[2px]'>

      <h1 className='mb-4 text-gray-200 text-2xl text-center'>Upload Song</h1>
        
          <label className='text-gray-300'>Title</label>
          <input 
          className='sm:h-[45px] h-[35px]'
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        
        
          <label className='text-gray-300'>Artist</label>
          <input
          className='sm:h-[45px] h-[35px]'
            type="text"
            name="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          />
       
        
          <label className='text-gray-300 flex gap-6'>Song File <FaRegFolderOpen className=' mt-[2.5px]' /></label>
          <input
          className='sm:h-[45px] h-[35px]'
            key={_fileKey} // Force re-render for the song input
            type="file"
            name="song"
            accept="audio/*"
            onChange={handleFileChange}
            required
          />
        
        
          <label className='text-gray-300 flex gap-6'>Image File <IoImagesOutline className=' mt-[2.5px]'/></label>
          <input
          className='sm:h-[45px] h-[35px]'
            key={_fileKey + 1} // Force re-render for the image input
            type="file"
            name="img"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        
        <button className='bg-blue-800 text-gray-300 h-[35px] rounded-[10px] sm:h-[45px]' type="submit">Upload</button>
      </form>

      {loading && <p className="text-gray-300">Uploading...</p>}
      {message && (
        <p
          className={`text-lg mt-4 pb-[2px] ${
            messageType === 'success' ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default UploadSong;
