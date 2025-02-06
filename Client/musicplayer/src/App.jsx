import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Register from "./components/Register";
import Login from "./components/Login";
import UploadSong from "./components/UploadSong";
import AllSongs from "./components/AllSongs";
import UserPlaylist from "./components/UserPlaylist";
import MyProvider from "./context/Context";
import ProfilePic from "./components/ProfilePic";
import UserPlaylists from "./components/UserPlaylists";
import PlaylistDetails from "./components/PlaylistDetails";
import AudioControls from "./components/AudioControls";
import ChangePass from "./components/ChangePass";
import UserSettings from "./components/UserSettings";
import ForgotPass from "./components/ForgotPass";
import ResetPass from "./components/ResetPass";


const App = () => {
  return (
    <>
    <MyProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/admin/UploadSong" element={<UploadSong />} />
          <Route path="/AllSongs" element={<AllSongs />} />
          <Route path="/user/createPlaylist" element={<UserPlaylist />} />
          <Route path="/user-playlists/" element={<UserPlaylists />} />
          <Route path="/playlist/:playlistId" element={<PlaylistDetails />} />
          <Route path="/user/settings" element={<UserSettings />} />
          <Route path="/user/profilePicture" element={<ProfilePic />} />
          <Route path="/user/passChange" element={<ChangePass />} />
          <Route path="/user/forgotPass" element={<ForgotPass />} />
          <Route path="/user/resetPass/:id" element={<ResetPass />} />
          
        </Routes>
        <ToastContainer />
       <AudioControls/>
      </BrowserRouter>
      </MyProvider>
    </>
  );
};

export default App;
