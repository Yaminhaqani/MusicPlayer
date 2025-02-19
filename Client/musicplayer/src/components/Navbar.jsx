import React, { useContext, useState } from "react";
import { MdHomeFilled, MdLogout } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import SearchBar from "./Search";
import { FiSearch } from "react-icons/fi";
import "animate.css";
import { MyContext } from "../context/Context";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
  const [showSideNav, setShowSideNav] = useState(false);
  const [searchWidth, setSearchWidth] = useState(false);
  const [profileChange, setProfileChange] = useState(false)
  const {user, loggedIn, logout} = useContext(MyContext);
  


  const navigate = useNavigate();

  const handleNav = () => {
    setShowSideNav(!showSideNav);
  };

  const handleSearch = () => {
    setSearchWidth(!searchWidth);
  };

  const handleLogout = () => {
    logout(); // Clear token and update state
    navigate('/user/login'); // Redirect to login
};

const handleprofileChange = ()=>{
  setProfileChange(!profileChange);
}

  //  const token = localStorage.getItem('token');
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     setLoggedIn(true);
  //   }
  // }, []);

  return (
    <nav className="w-full bg-black h-20">
      <div className="flex items-center h-full justify-between">
        <div
          onClick={handleNav}
          className="sm:hidden flex justify-end items-center ml-2 w-fit h-full z-10"
        >
          <GiHamburgerMenu className="text-white w-7 h-7" />

          <ul
          // divide-y divide-red-300 → Adds a red border between all direct children (<li> elements).
          // [&>li]:border [&>li]:border-red-300 selects all li elements
            className={`flex flex-col [&>li]:py-1 divide-y divide-cyan-400  absolute top-20 left-0 w-[70%] h-fit p-4 bg-black
              ${
                showSideNav
                  ? "animate__animated animate__slideInLeft"
                  : "animate__animated animate__slideOutLeft"
              } 
              transition-transform duration-300 ease-in-out`}  //transition is used so that it does'nt unmount instantly and animation can work.
          >
            <li className="w-full h-fit hover:bg-[rgb(42,42,42)]">
            <Link to="/AllSongs">
              <button className="flex items-center"> 
                <MdHomeFilled className="text-gray-50 h-5 w-5" />
                <span className="text-white ml-2">Home</span>    
              </button>
              </Link>
              
            </li>

            
            {loggedIn && (
              <li  className="w-full h-fit hover:bg-[rgb(42,42,42)]">
                <button 
                    onClick={handleLogout}
                    className="flex items-center"
                >
                    <MdLogout className="text-white h-5 w-5" />
                    <span className="text-white ml-2">Logout</span>
                </button>
                </li>
                
            )}
            {/* Add more navigation items */}
          </ul>
        </div>

        <div className="flex absolute h-16 w-fit left-16 sm:relative sm:left-2">
          <img
            className=""
            src="https://res.cloudinary.com/dcqbwl3nk/image/upload/v1736581461/Screenshot_2025-01-10_125627-removebg-preview_xwstdo.png"
            alt=""
          />
        </div>

        <ul
          className={`hidden sm:flex w-fit h-full justify-between items-center ${
            loggedIn ? "-ml-24" : "ml-0"
          }`}
        >
          <li className="border-none rounded-full flex bg-[rgb(42,42,42)] p-2 mr-4">
            <button>
              <Link to="/AllSongs">
              <MdHomeFilled className="text-gray-50 h-6 w-6" />
              </Link>
            </button>
          </li>
          {loggedIn && (
            <li>
              <SearchBar />
            </li>
          )}
        </ul>

        {loggedIn && (
          <div
            onClick={handleSearch}
            className="flex w-fit h-fit items-center sm:hidden absolute right-[20.5vw]"
          >
            <FiSearch className="text-gray-300 w-5 h-5" />
          </div>
        )}

        <div
          className={`absolute top-4 left-1/2 transform -translate-x-1/2 bg-transparent flex items-center justify-center sm:hidden transition-all duration-300 ease-in-out ${
            searchWidth ? "w-[80%] opacity-100" : "w-0 opacity-0"
          } overflow-hidden`}
        >
          <SearchBar
            searchWidth={searchWidth}
            setSearchWidth={setSearchWidth}
          />
        </div>

        <div className="">
        {loggedIn && user &&(
          <div className=" flex gap-20 items-center">
                <button 
                    onClick={handleLogout}
                    className=" hidden sm:flex text-gray-200 bg-blue-800 px-[3px] rounded-md hover:shadow-[1px_1px_6px_purple]"
                >
                    Logout
                </button>

                <div onClick={handleprofileChange} className=" flex items-center mr-2 w-9 h-9 rounded-full overflow-hidden border border-transparent ring-2 ring-cyan-400 ring-offset-1 shadow-[0_0_10px_cyan] animate-none">
 <img className="w-full h-full object-cover object-center bg-white" src={user.profilePic} alt="Profile" />
</div>

<ul
onClick={()=>setProfileChange(!profileChange)}
  className={`bg-blue-500 text-white p-4 rounded-lg absolute top-[70px] right-1
    ${profileChange
      ? "animate__animated animate__fadeInDown opacity-100 visible"
      : "animate__animated animate__fadeOutUp opacity-0 invisible"}
    transition-all duration-300 ease-in-out`}
>
{user.isAdmin &&<li>
    <Link to="/admin/dashboard">Dashboard</Link>
  </li>}

<li>
    <Link to="/user/settings">Settings</Link>
  </li>
  <li>
    <Link to="/user-playlists">Playlists</Link>
  </li>
  
  
</ul>
      
                </div>
            )}
        </div>

  
       
      </div>
    </nav>
  );
};

export default Navbar;
