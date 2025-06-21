import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AudioContext } from "../context/AudioContext";

const UserPlaylists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const { query } = useContext(AudioContext);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return toast.error("Authentication token missing. Please log in again.");
        }
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/playlists`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlaylists(response.data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
        toast.error(
          error.response?.data?.message || "Failed to fetch playlists"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  if (loading) return <p>Loading playlists...</p>;

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="user-playlists p-4 min-h-screen">
      <h2 className="text-xl font-bold mb-4">Your Playlists</h2>

      {filteredPlaylists.length === 0 ? (
        <p className="text-gray-500 text-center">No playlists created.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {filteredPlaylists.map((playlist) => (
            <Link
              key={playlist._id}
              to={`/playlist/${playlist._id}`} // Sending playlist ID to PlaylistDetails as params.
              className="border border-gray-300 rounded-lg p-4 text-center w-48 hover:shadow-lg transition-shadow"
            >
              {playlist.img && (
                <img
                  src={playlist.img}
                  alt={playlist.name}
                  className="w-full rounded-md mb-2"
                />
              )}
              <h3 className="text-lg font-medium">{playlist.name}</h3>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPlaylists;
