import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("Male");
  const [dob, setDOB] = useState("Male");

  const formData = {
    username,
    email,
    password,
    gender,
    birthDate: dob,
  };

  const url = "http://localhost:4000/user/register";

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(url, formData);
      console.log(response);

      if (response.status === 201) {
        // Success response
        toast.success(response.data.message);

        setTimeout(() => {
          navigate("/user/login");
        }, 3000);
      } else {
        // If the response is not 201, show error message
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);

      if (error.response && error.response.data) {
        // If there is a response from the server and it contains data
        toast.error(error.response.data.message); // Show error message from server
      } else if (error.response) {
        // If there is no specific message from the server
        toast.error("An error occurred with status: " + error.response.status);
      } else {
        // Network or other issues
        toast.error("Network error or request timeout");
      }
    }
  };

  return (
    <div className="Register flex w-full h-auto justify-center items-center bg-gray-950 border-t-2 border-gray-800 font-roboto">
      <form className="w-[300px] border border-gray-700 px-2 rounded-xl sm:w-[450px]">
        <h1 className="mb-4 text-gray-200 text-2xl text-center ">
          Create your account
        </h1>
        <label htmlFor="username" className="text-gray-300">
          Username
        </label>
        <input
          className="sm:h-[36.5px] h-[35px]"
          type="text"
          id="username"
          placeholder="Enter a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="email" className="text-gray-300">
          Email
        </label>
        <input
          className="sm:h-[36.5px] h-[35px]"
          type="email"
          id="email"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password" className="text-gray-300">
          Password
        </label>
        <input
          className="sm:h-[36.5px] h-[35px]"
          type="password"
          id="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="gender" className="text-gray-300">
          Gender
        </label>
        <select
          className="sm:h-[36.5px] h-[35px]  text-gray-300"
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option className="sm:h-[36.5px] h-[35px]" value="male">
            Male
          </option>
          <option className="sm:h-[36.5px] h-[35px]" value="female">
            Female
          </option>
          <option className="sm:h-[36.5px] h-[35px]" value="other">
            Other
          </option>
        </select>

        <label htmlFor="date" className="text-gray-300 mt-[15px]">
          DOB
        </label>
        <input
          className="text-gray-300 sm:h-[36.5px] h-[35px]"
          type="date"
          id="date"
          placeholder="Enter DOB"
          value={dob}
          onChange={(e) => setDOB(e.target.value)}
          required
        />
        <button
          className="bg-blue-800 text-gray-300 h-[35px] rounded-[10px] sm:h-[36.5px]"
          onClick={handleRegister}
        >
          Register
        </button>
        <p className="text-gray-300 text-center py-2">Or</p>
        <p className="text-gray-300">
          Already have an account?{" "}
          <Link to="/user/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
