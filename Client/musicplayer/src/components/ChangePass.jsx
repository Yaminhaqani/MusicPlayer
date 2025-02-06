import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";

const ChangePass = () => {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPass !== confirmNewPass) {
      toast.error("New passwords do not match.");
      return;
    }

    const formData ={
         currentPass,
         newPass,
         confirmNewPass, };

    try {
      setLoading(true);
      const url = "http://localhost:4000/user/passChange";
      const response = await axios.post(
        url, formData,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      toast.success(response.data.message);

      setTimeout(() => {
        navigate("/AllSongs");
      }, 3000);

    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to change password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" min-h-screen w-full bg-gray-950 flex justify-center">
    <div className="ChangePassword flex w-[85%] h-fit justify-center bg-gray-950 mt-12 font-roboto sm:w-[30%]">
      <form
        onSubmit={handleChangePassword}
        className="w-full border border-gray-700 px-2 py-4 rounded-xl"
      >
        <h1 className="mb-4 text-gray-200 text-2xl text-center">
          Change Password
        </h1>

        <label htmlFor="currentPass" className="text-gray-300">
          Current Password
        </label>
        <input
          type="password"
          id="currentPass"
          placeholder="Enter current password"
          value={currentPass}
          onChange={(e) => setCurrentPass(e.target.value)}
          required
          className="sm:h-[36.5px] h-[35px] mb-2 w-full px-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 text-gray-200"
        />

        <label htmlFor="newPass" className="text-gray-300">
          New Password
        </label>
        <input
          type="password"
          id="newPass"
          placeholder="Enter new password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          required
          className="sm:h-[36.5px] h-[35px] mb-2 w-full px-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 text-gray-200"
        />

        <label htmlFor="confirmNewPass" className="text-gray-300">
          Confirm New Password
        </label>
        <input
          type="password"
          id="confirmNewPass"
          placeholder="Confirm new password"
          value={confirmNewPass}
          onChange={(e) => setConfirmNewPass(e.target.value)}
          required
          className="sm:h-[36.5px] h-[35px] mb-4 w-full px-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 text-gray-200"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-800 text-gray-300 h-[35px] rounded-[10px] sm:h-[36.5px] w-full transition-all duration-300 hover:bg-blue-700"
        >
          {loading ? "Changing..." : "Change Password"}
        </button>

      </form>
    </div>
    </div>
  );
};

export default ChangePass;
