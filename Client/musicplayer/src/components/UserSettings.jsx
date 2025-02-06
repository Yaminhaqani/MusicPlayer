import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaLock, FaCog } from "react-icons/fa"; // Icons for settings

const Settings = () => {
  const settingsOptions = [
    { name: "Change Profile Picture", path: "/user/profilePicture", icon: <FaUserCircle /> },
    { name: "Change Password", path: "/user/passChange", icon: <FaLock /> },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-roboto p-6 flex justify-center">
      <div className="flex flex-col w-[95%] h-fit py-2 sm:w-[40%] border-2 border-blue-800 rounded-xl mt-20 px-2 shadow-[1px_1px_5px_purple]">
        <div className="flex items-center mb-6">
          <FaCog className="text-3xl text-blue-400 mr-2" />
          <h2 className="text-2xl font-bold">Settings</h2>
        </div>

        {/* Updated UL: w-full so that each LI can take the full width */}
        <ul className="w-full">
          {settingsOptions.map((option, index) => (
            <li
              key={index}
              className="flex w-full items-center border space-x-3 hover:bg-gray-800 rounded px-4 py-2 mb-2 last:mb-0 transition-all duration-300"
            >
              <span className="text-xl text-blue-400">{option.icon}</span>
              <Link
                to={option.path}
                className="block w-full text-white text-md sm:text-xl"
              >
                {option.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Settings;
