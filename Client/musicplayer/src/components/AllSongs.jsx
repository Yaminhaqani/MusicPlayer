import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import './Slider.css';
import { CiMusicNote1, CiTimer } from 'react-icons/ci';
import { FaEllipsisV, FaPlay } from "react-icons/fa";
import { IoPause, IoClose } from "react-icons/io5"; // Import Close Icon for popups
import { toast } from 'react-toastify';
import { AudioContext } from '../context/AudioContext';
import UseAuth from '../utils/UseAuth';
import { useNavigate } from 'react-router-dom';
import useAdminAuth from '../utils/UseAdminAuth';

const AllSongs = () => {
  UseAuth();
  const [loading, setLoading] = useState(true);
  const [selectedSong, setSelectedSong] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [showOptionsMenu, setShowOptionsMenu] = useState(null); // Track which song's options menu is open (by song id)
  const [showPlaylistPopup, setShowPlaylistPopup] = useState(false); // Track if playlist selection popup is open

  const navigate = useNavigate();
  const { songs, setSongs, currentSong, isPlaying, handlePlayPause, formatDuration, query } = useContext(AudioContext);
  const {isAdmin} = useAdminAuth()

  const url = `${process.env.REACT_APP_API_URL}/allSongs`;


  // Fetch all songs from the backend
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(url);
        console.log(response);
        setSongs(response.data.songs);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        toast.error(
          error.response?.data?.message ||
          error.message ||
          "Failed to load songs"
        );
      }
    };
    fetchSongs();
  }, [setSongs]);

  // Fetch user's playlists from backend
  const fetchUserPlaylists = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token missing. Please log in again.");
        return;
      }
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/playlists`, {
  headers: { Authorization: `Bearer ${token}` },
});
      setPlaylists(response.data);
      setShowPlaylistPopup(true); // Open playlist selection popup
    } catch (error) {
      console.error("Error fetching playlists:", error.response?.data || error.message);
    }
  };

  // Handle click on "Add to Playlist" option from the options menu
  const handleAddToPlaylistClick = (song) => {
    setSelectedSong(song);
    fetchUserPlaylists();
    setShowOptionsMenu(null); // Close options menu
  };

  // Add song to a selected playlist
  const addToPlaylist = async (playlistId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return toast.error("Authentication token missing. Please log in again.");
      }
     await axios.post(
  `${process.env.REACT_APP_API_URL}/${playlistId}/add-song`,
  { songId: selectedSong._id },
  { headers: { Authorization: `Bearer ${token}` } }
);
      toast.success("Song added to playlist!");
      setShowPlaylistPopup(false); // Close the playlist selection popup
    } catch (error) {
      console.error("Error adding song:", error);
      toast.error(error.response?.data || "Failed to add song");
    }
  };

  // Handle removing a song (only available for admin)
  const handleRemoveSong = async (songId) => {
    
    console.log(`Remove song: ${songId}`);
    setShowOptionsMenu(null); // Close options menu after removal action
  };

  if (loading) {
    return (
      <p className='text-gray-600 flex absolute right-0 left-0 bottom-0 top-20 justify-center items-center border border-red-700 font-bold text-4xl'>
        Loading...
      </p>
    );
  }

  // Filter songs based on the shared query (by title or artist)
  const filteredSongs = songs.filter((song) => {
    const lowerQuery = query.toLowerCase();
    return (
      song.title.toLowerCase().includes(lowerQuery) ||
      song.artist.toLowerCase().includes(lowerQuery)
    );
  });

  return (
    <div className='songs-container flex flex-col items-center py-3 bg-gray-950 overflow-y-auto font-roboto pb-[3.25rem] w-full h-[88.6vh]'>

      {/* Header Row */}
      <div className="flex justify-between text-gray-300 w-[85%] sm:w-[50%] py-2 border-b border-gray-700 mb-4">
        <div className="flex items-center">
          <CiMusicNote1 className="w-6 h-6 mr-2" />
        </div>
        <div className="flex items-center">
          <CiTimer className="w-6 h-6 mr-2" />
        </div>
      </div>

      {/* Render Each Song */}
      {filteredSongs.map((song) => (
        <div key={song._id} className="relative song-item flex flex-shrink-0 items-center justify-between h-[60px] border border-white w-[85%] text-gray-300 mb-4 hover:bg-gray-800 group transition-all duration-100 sm:w-[50%]">
          
          {/* Song Thumbnail */}
          <img src={song.img} alt="thumbnail" className='w-[60px] h-[100%] object-cover flex-shrink-0 group-hover:brightness-[40%] transition-all duration-300' />

          {/* Play/Pause Button */}
          <button 
            onClick={() => handlePlayPause(song)} 
            className={`absolute left-0 text-white ml-[1.4rem] transition-all duration-300 ${currentSong === song._id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
          >
            {currentSong === song._id && isPlaying ? <IoPause /> : <FaPlay />}
          </button>

          {/* Song Details */}
          <div className="song-details w-[80%] truncate flex flex-col justify-center">
            <h4 className="text-sm sm:text-base">{song.title}</h4>
            <p className="text-xs sm:text-sm">{song.artist}</p>
          </div>

          {/* Song Duration */}
          <span className="text-xs sm:text-base">{formatDuration(song.duration)}</span>

          {/* Three-dot Menu Button */}
          <button onClick={() => setShowOptionsMenu(song._id)} className="text-gray-400 hover:text-white">
            <FaEllipsisV />
          </button>

          {/* Options Menu Popup */}
          {showOptionsMenu === song._id && (
            <div className="absolute right-0 top-10 bg-gray-800 p-2 rounded shadow-lg w-48 z-50">
              {/* X Icon to close options menu */}
              <div className="flex justify-end">
                <button onClick={() => setShowOptionsMenu(null)} className="text-gray-400 hover:text-white">
                  <IoClose size={16} />
                </button>
              </div>
              <button onClick={() => handleAddToPlaylistClick(song)} className="block w-full text-left p-2 hover:bg-gray-700">
                Add to Playlist
              </button>
              {isAdmin && (
                <button onClick={() => handleRemoveSong(song._id)} className="block w-full text-left p-2 text-red-400 hover:bg-gray-700">
                  Remove
                </button>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Playlist Selection Popup */}
      {showPlaylistPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="bg-gray-800 p-4 rounded shadow-lg text-white w-80">
            {/* Header with X Icon to close the popup */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Select a Playlist</h3>
              <button onClick={() => setShowPlaylistPopup(false)} className="text-gray-400 hover:text-white">
                <IoClose size={20} />
              </button>
            </div>
            {/* List of Playlists */}
            {playlists.length === 0 ? (
              <p className="text-center mb-2">No playlists found</p>
            ) : (
              playlists.map((playlist) => (
                <button key={playlist._id} onClick={() => addToPlaylist(playlist._id)} className="block w-full text-left p-2 hover:bg-gray-700">
                  {playlist.name}
                </button>
              ))
            )}
            {/* Create Playlist Button (always visible) */}
            <button onClick={() => navigate("/user/createPlaylist")} className="mt-4 bg-blue-500 px-4 py-2 w-full hover:bg-blue-600 transition-all duration-200">
              Create Playlist
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllSongs;
