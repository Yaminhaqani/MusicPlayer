import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Register from "./components/Register";
import Login from "./components/Login";
import UploadSong from "./components/UploadSong";
import AllSongs from "./components/AllSongs";
import UserPlaylist from "./components/UserPlaylist";
import { MyContext } from "./context/Context";
import ProfilePic from "./components/ProfilePic";
import UserPlaylists from "./components/UserPlaylists";
import PlaylistDetails from "./components/PlaylistDetails";
import AudioControls from "./components/AudioControls";
import ChangePass from "./components/ChangePass";
import UserSettings from "./components/UserSettings";
import ForgotPass from "./components/ForgotPass";
import ResetPass from "./components/ResetPass";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import AdminAllUserInfo from "./components/AdminAllUserInfo";
import { AudioProvider } from "./context/AudioContext";


const App = () => {

  const {loggedIn} = useContext(MyContext);
  return (
    <>

      <AudioProvider loggedIn={loggedIn}>
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route path="/" element={<Navigate to="/Allsongs" />} /> {/*setting as default page*/}
          <Route path="/about" element={<About />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/admin/UploadSong" element={<UploadSong />} />
          <Route path="/admin/dashboard" element={<AnalyticsDashboard />} />
          <Route path="/AllSongs" element={<AllSongs />} />
          <Route path="/user/createPlaylist" element={<UserPlaylist />} />
          <Route path="/user-playlists/" element={<UserPlaylists />} />
          <Route path="/playlist/:playlistId" element={<PlaylistDetails />} />
          <Route path="/user/settings" element={<UserSettings />} />
          <Route path="/user/profilePicture" element={<ProfilePic />} />
          <Route path="/user/passChange" element={<ChangePass />} />
          <Route path="/user/forgotPass" element={<ForgotPass />} />
          <Route path="/user/resetPass/:id" element={<ResetPass />} />
          <Route path="/admin/allUserInfo" element={<AdminAllUserInfo />} />
          
        </Routes>
        <ToastContainer />
       <AudioControls/>
      </BrowserRouter>
      </AudioProvider>
    
    </>
  );
};

export default App;
