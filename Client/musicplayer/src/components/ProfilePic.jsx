import React, { useContext, useEffect, useState } from 'react';
import UseAuth from '../utils/UseAuth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MyContext } from '../context/Context';

const ProfilePic = () => {
  UseAuth();
  const { user, setUser } = useContext(MyContext);

  const [profilePic, setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Clean up object URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const uploadProfilePic = async () => {
    if (!profilePic) {
      setMessageType('error');
      return setMessage('Please select an image first!');
    }

    const formData = new FormData();
    formData.append('img', profilePic);
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const url = `${process.env.REACT_APP_API_URL}/user/profilePicture`; // use env
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setLoading(false);
      setMessageType('success');
      setMessage(response.data.message);

      setUser((prevUser) => ({
        ...prevUser,
        profilePic: response.data.profilePic,
      }));

      setProfilePic(null);
      setPreviewUrl(null); // reset preview

      setTimeout(() => {
        navigate('/allSongs');
      }, 2000);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setMessageType('error');
      setMessage(
        'Error uploading profile picture: ' +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className='flex flex-col gap-3 w-full h-[87.3vh] justify-center items-center bg-gray-950 border-t-2 border-gray-800 font-roboto pb-[4rem] text-gray-200'>
      <h2 className='mb-4 text-2xl text-center'>Update Profile Picture</h2>

      {/* Show preview if new image selected, else show current profile */}
      {previewUrl ? (
        <img
          src={previewUrl}
          alt='Preview'
          className='w-[250px] h-[250px] rounded-full sm:w-[300px] sm:h-[300px]'
        />
      ) : (
        user?.profilePic && (
          <img
            src={user.profilePic}
            alt='Profile'
            className='w-[250px] h-[250px] rounded-full sm:w-[300px] sm:h-[300px]'
          />
        )
      )}

      <input
        type='file'
        onChange={(e) => {
          const file = e.target.files[0];
          setProfilePic(file);
          setPreviewUrl(file ? URL.createObjectURL(file) : null);
        }}
        accept='image/*'
        className='flex border w-[250px] rounded-md'
      />

      <button
        onClick={uploadProfilePic}
        disabled={loading}
        className='bg-blue-800 px-2 py-[1px] rounded-md'
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>

      {message && (
        <p
          className={`text-lg bg-gray-950 w-full text-center pb-[2px] ${
            messageType === 'success' ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default ProfilePic;
