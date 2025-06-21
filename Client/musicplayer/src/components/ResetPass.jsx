import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPass = () => {
  const [newPass, setNewPass] = useState("");
  const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();


  const handleResetPassword = async (e) => {
    e.preventDefault();

   const url = `${process.env.REACT_APP_API_URL}/user/resetPass/${id}`;

    try {
      const response = await axios.post(url, {
        newPass,
      });
setMessageType("success");
      setMessage(response.data.message);
      setTimeout(() => navigate("/user/login"), 3000);
    } catch (error) {
        setMessageType("error");
      setMessage(error.response?.data?.message || "Something went wrong.");
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Reset Password</h2>
        {message && (
  <p
    className={`text-center ${
      messageType === "success" ? "text-green-500" : "text-red-500"
    }`}
  >
    {message}
  </p>
)}

        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2">New Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Reset Password
          </button>
        </form>
    
      </div>
    </div>
  );
};

export default ResetPass;
