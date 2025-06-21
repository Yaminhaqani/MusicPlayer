import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = `${process.env.REACT_APP_API_URL}/user/forgotPass`;
      const response = await axios.post(url, { email });
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to send reset link."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full justify-center bg-gray-950 border-t-2 border-gray-800 font-roboto">
      <form 
        onSubmit={handleForgotPassword} 
        className="w-[300px] h-fit mt-10 border border-gray-700 px-2 rounded-xl py-4 sm:w-[450px]"
      >
        <h1 className="mb-4 text-gray-200 text-2xl text-center">
          Forgot Password
        </h1>
        <label htmlFor="email" className="text-gray-300">
          Enter your email address
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="sm:h-[36.5px] h-[35px] mb-4 w-full px-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 text-gray-200"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-800 hover:bg-blue-700 rounded transition-all duration-300"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
        <p className="text-gray-300 text-center py-2">
          Remembered your password?
          <Link to="/user/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPass;
