import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const UseAuth = () => {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token"); // Get token inside the effect
      if (!token) {
        console.log("No token found! Please log in."); // Log error if no token
        navigate("/user/login"); // Redirect to login if token is missing
        return;
      }

      try {
        const url = `${process.env.REACT_APP_API_URL}/user/verify`;

        // for get method
        // const response = await axios.get(url, {
        //   headers: {
        //     Authorization: `Bearer ${token}`, // Send token with Bearer scheme
        //   },
        // });

        // for post method 
        const response = await axios.post(
          url, 
          {}, // Empty body for the request
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send token in Authorization header
            },
          }
        );
        

        if (response.status === 200) {
          // Log success message from backend if token is valid
          console.log(response.data.message);
          setIsVerified(true); // Set verified status
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        const errorMessage = error.response?.data?.message; // Get backend error message
        if (errorMessage) {
          console.log(errorMessage); // Log backend error message
        } else {
          console.log("An unknown error occurred."); // Log if no message from backend
        }
        navigate("/user/login"); // Redirect to login if token verification fails
      }
    };

    verifyToken(); // Call the function immediately
  }, [navigate]); // Dependency array only includes navigate since token is read inside the effect

  if (!isVerified) {
    return <div>Loading...</div>;// Optionally, show a loading state or redirect during verification
  }

  return null; // No UI returned by this hook; it only handles the token verification and redirection
};

export default UseAuth;
