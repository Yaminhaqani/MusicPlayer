import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import './Slider.css'
import { CiMusicNote1, CiTimer } from 'react-icons/ci';
import { FaEllipsisV, FaPlay } from "react-icons/fa";
import { IoPause } from "react-icons/io5";
import { toast } from 'react-toastify';
import { AudioContext } from '../context/AudioContext';
import UseAuth from '../utils/UseAuth';

const AllSongs = () => {
  UseAuth();
  const [loading , setLoading] = useState(true);
  const [selectedSong, setSelectedSong] = useState(null);
  const [playlists, setPlaylists] = useState([]);


  const {songs, setSongs, currentSong, isPlaying, handlePlayPause, formatDuration, showPlaylistMenu, setShowPlaylistMenu,  query,} = useContext(AudioContext)

  const url = "http://localhost:4000/allSongs";

  useEffect(()=>{
    const fetchSongs = async()=>{
      try {
        const response = await axios.get(url);
        console.log(response);

        setSongs(response.data.songs);
        setLoading(false);
        
        
      } catch (error) {
        console.error(error);
        setLoading(false);
        toast.error(      error.response?.data?.message || 
          error.message || 
          "Failed to load songs");
        
      }
    }
    fetchSongs();
  }, [setSongs]);

 

  const fetchUserPlaylists = async () => {
    try {
      const token = localStorage.getItem("token");

if (!token) {
  toast.error("Authentication token missing. Please log in again.");
  return;
}
      const response = await axios.get("http://localhost:4000/user/playlists", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setPlaylists(response.data);
      setShowPlaylistMenu(true);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching playlists:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to fetch playlists");
    } 
  };
  

  const handleAddToPlaylistClick = (song) => {
    setSelectedSong(song);
    fetchUserPlaylists();
  };


  const addToPlaylist = async (playlistId) => {
    try {
      const token = localStorage.getItem("token");
      if(!token){
        return toast.error("Authentication token missing. Please log in again.");
      }
      await axios.post(
        `http://localhost:4000/${playlistId}/add-song`,
        { songId: selectedSong._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Song added to playlist!");
      setShowPlaylistMenu(false);
    } catch (error) {
      console.error("Error adding song:", error);
      toast.error(error.response?.data || "Failed to add song");
    }
  };




  if(loading){
    return <p>Loading...</p>
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
    <div className='songs-container flex flex-col items-center py-3 bg-gray-950 overflow-y-auto font-roboto pb-[3.25rem] w-full h-[87.3vh]'>

       <div className="flex justify-between  text-gray-300 w-[85%] sm:w-[50%] py-2 border-b border-gray-700 mb-4">
              <div className="flex items-center">
                <CiMusicNote1 className="w-6 h-6 mr-2" />
              </div>
              <div className="flex items-center">
                <CiTimer className="w-6 h-6 mr-2" />
              </div>
            </div>
      {filteredSongs.map((song)=>(
        <div className="song-item relative flex flex-shrink-0 items-center justify-between h-[60px] border border-white w-[85%] text-gray-300 mb-4 hover:bg-gray-800 group transition-all duration-100 sm:w-[50%]" key={song._id}>
          
          <img src={song.img} alt="thumbnail" className='w-[60px] h-[100%] object-cover flex-shrink-0 group-hover:brightness-[40%] transition-all duration-300'/>
          <button 
        onClick={() => handlePlayPause(song)} 
        className={`absolute left-0 text-white ml-[1.4rem] transition-all duration-300 
          ${currentSong === song._id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
      >
        {currentSong === song._id && isPlaying ? <IoPause /> : <FaPlay />}
      </button>

          <div className="song-details w-[80%] truncate flex flex-col justify-center">
            <h4 className="text-sm sm:text-base">{song.title}</h4>
            <p className="text-xs sm:text-sm">{song.artist}</p>
          </div>
          <span className="text-xs sm:text-base">{formatDuration(song.duration)}</span>
          <button onClick={() => handleAddToPlaylistClick(song)} className="sm:ml-4 text-gray-400 hover:text-white">
            <FaEllipsisV />
          </button>
        </div>
      ))}

      



      {/* Playlist Selection Dropdown */}
      {showPlaylistMenu &&(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-4 rounded shadow-lg text-white w-80">
            <h3 className="text-lg font-bold mb-4">Select a Playlist</h3>
            {playlists.length === 0 ? (
              <p>No playlists found</p>
            )  : (
              playlists.map((playlist) => (
                <button 
                  key={playlist._id} 
                  onClick={() => addToPlaylist(playlist._id)}
                  className="block w-full text-left p-2 hover:bg-gray-700"
                >
                  {playlist.name}
                </button>
              ))
            )}
             <button onClick={() => setShowPlaylistMenu(false)} className="mt-4 bg-red-600 px-4 py-2 w-full">
              Cancel
            </button>
          </div>
        </div>
      )}
    


    </div>

    
  )
}

export default AllSongs