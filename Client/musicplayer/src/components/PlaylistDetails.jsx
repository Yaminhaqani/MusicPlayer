// PlaylistDetails.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { CiMusicNote1, CiTimer } from "react-icons/ci";
import { FaEllipsisV, FaPlay } from "react-icons/fa";
import { IoPause } from "react-icons/io5";
import { AudioContext } from "../context/AudioContext";

const PlaylistDetails = () => {
  const { playlistId } = useParams(); //getting this Id from UserPlaylists.jsx
  const navigate = useNavigate();

  // Local state for playlist details
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeMenu , setActiveMenu] = useState(null);

  // Get audio-related state and handlers from the global AudioContext
  const {
    setSongs,
    currentSong,
    isPlaying,
    handlePlayPause,
    formatDuration,
    query,
  } = useContext(AudioContext);

//Delete song from playlist
  const handleRemoveSong = async (songId) => {
    try {
      console.log("Deleting song from playlist:", { playlistId, songId });
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token missing. Please log in again.");
        return;
      }

      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/${playlistId}/remove-song`,
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { songId },
        }
      );
      toast.success(response.data.message);
      // Update playlist with the returned updated playlist object
      setPlaylist(response.data.playlist);

      if (response.data.playlist.songs) {
        setSongs(response.data.playlist.songs);
      }
    } catch (error) {
      console.error("Error removing song:", error);
      toast.error(
        error.response?.data || "Failed to remove the song from the playlist"
      );
    } finally {
      setActiveMenu(null); // Close menu after action
    }
  };

 
  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Authentication token missing. Please log in again.");
          return;
        }
        const response = await axios.get(
         `${process.env.REACT_APP_API_URL}/playlist/${playlistId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPlaylist(response.data);
        // Update the global songs list with the playlist's songs
        if (response.data.songs) {
          setSongs(response.data.songs);
        }
      } catch (error) {
        console.error("Error fetching playlist:", error);
        toast.error(
          error.response?.data?.message || "Failed to fetch playlist details"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylist();
  }, [playlistId, setSongs]);

  if (loading)
    return <p className="text-center text-white">Loading playlist...</p>;
  if (!playlist)
    return <p className="text-center text-white">Playlist not found.</p>;


  // Filter songs based on the global query (by title or artist)
  const filteredSongs = playlist.songs.filter((song) => {
    const lowerQuery = query.toLowerCase();
    return (
      song.title.toLowerCase().includes(lowerQuery) ||
      song.artist.toLowerCase().includes(lowerQuery)
    );
  });


  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-950 overflow-y-auto font-roboto pb-[3.25rem] text-gray-200">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
      >
        Back
      </button>
      <h2 className="text-2xl font-bold mb-2">{playlist.name}</h2>
      {playlist.desc && <p className="mb-4">{playlist.desc}</p>}

      {/* Header row for song list */}
      <div className="flex justify-between  text-gray-300 w-[85%] sm:w-[50%] py-2 border-b border-gray-700 mb-4">
        <div className="flex items-center">
          <CiMusicNote1 className="w-6 h-6 mr-2" />
        </div>
        <div className="flex items-center">
          <CiTimer className="w-6 h-6 mr-2" />
        </div>
      </div>

      {/* List of songs */}
      <div className="w-[85%] sm:w-[50%]">
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song) => (
            <div
              key={song._id}
              className="relative flex items-center justify-between h-[3.8rem] w-[100%] border border-white text-gray-300 mb-4 hover:bg-gray-800 group transition-all duration-100"
            >
              <div className="flex items-center h-full">
                <img
                  src={song.img}
                  alt="thumbnail"
                  className="w-[60px] h-[100%] object-cover group-hover:brightness-[40%] transition-all duration-300"
                />
                <div className="flex flex-col min-w-0 truncate  justify-center pl-1 sm:w-[80%]">
                  <h4 className="text-sm sm:text-base">{song.title}</h4>
                  <p className="text-xs sm:text-sm">{song.artist}</p>
                </div>
              </div>
             
              <button
                onClick={() => handlePlayPause(song)}
                className={`absolute left-4 text-white transition duration-300 ml-[8px] ${
                  currentSong === song._id
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              >
                {currentSong === song._id && isPlaying ? (
                  <IoPause />
                ) : (
                  <FaPlay />
                )}
              </button>

              <div className="flex items-center space-x-1 shrink-0 sm:mr-1">
  
  <span className="text-xs sm:text-base text-gray-300">
    {formatDuration(song.duration)}
  </span>

  
  <button
    onClick={() => setActiveMenu(activeMenu === song._id ? null : song._id)}
    className="text-gray-400 hover:text-white"
  >
    <FaEllipsisV />
  </button>
</div>


              {/* Dropdown Menu for Removing */}
{activeMenu === song._id && (
  <div className="absolute right-8 top-5 bg-blue-900 text-white rounded shadow-lg p-1">
    <button
      onClick={() => handleRemoveSong(song._id)}
      className="block px-4 py-2 text-left w-full hover:bg-blue-800"
    >
      Remove
    </button>
  </div>
)}

            </div>


          ))
        ) : (
          <p className="text-center">No songs in this playlist.</p>
        )}
      </div>
    </div>
  );
};

export default PlaylistDetails;
