import React, { useEffect, useState } from "react";
import { MdHomeFilled } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import SearchBar from "./search";
import { FiSearch } from "react-icons/fi";
import "animate.css";

const Navbar = () => {
  const [showSideNav, setShowSideNav] = useState(false);
  const [searchWidth, setSearchWidth] = useState(false);

  const handleNav = () => {
    setShowSideNav(!showSideNav);
  };

  const handleSearch = () => {
    setSearchWidth(!searchWidth);
  };

  const [loggedIn, setLoggedIn] = useState(false);

  //  const token = localStorage.getItem('token');
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <nav className="w-full bg-black h-20">
      <div className="flex items-center h-full justify-between">
        <div
          onClick={handleNav}
          className="sm:hidden flex justify-end items-center ml-2 w-fit h-full"
        >
          <GiHamburgerMenu className="text-white w-7 h-7" />

          <ul
            className={`flex flex-col gap-2 absolute top-20 left-0 w-[70%] h-fit p-4 bg-black
              ${
                showSideNav
                  ? "animate__animated animate__slideInLeft"
                  : "animate__animated animate__slideOutLeft"
              } 
              transition-transform duration-300 ease-in-out`}
          >
            <li className="w-full h-fit flex items-center border border-red-500 hover:bg-[rgb(42,42,42)]">
              <button>
                <MdHomeFilled className="text-gray-50 h-6 w-6" />
              </button>
              <span className="text-white">Home</span>
            </li>
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
              <MdHomeFilled className="text-gray-50 h-6 w-6" />
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
            className="flex w-fit h-fit items-center sm:hidden border absolute right-[20.5vw]"
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

        <div className="h-full flex items-center mr-2">
          <img className="w-9 h-9 rounded-full bg-white" src="" alt="Profile" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
