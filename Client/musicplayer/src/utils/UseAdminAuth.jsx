import { useState, useEffect } from "react";
import axios from "axios";

const useAdminAuth = () => {
  const [isAdmin, setIsAdmin] = useState(false); // null indicates verification in progress
  const [loading, setLoading] = useState(true); // To track if the verification process is ongoing
  const [error, setError] = useState(null); // To capture any error message


  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming token exists
        if (!token) {
          setError("No token found.");
          setLoading(false);
          return;
        }

        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/admin`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`, // Sending token with Bearer scheme
            },
          }
        );
      
        setIsAdmin(response.status === 200);
          
      } catch (err) {
        console.log("Admin verification failed:", err.response?.data?.message);
        setError(err.response?.data?.message || "Admin verification failed."); 
        setIsAdmin(false); 
      } finally {
        setLoading(false); 
      }
    };

    verifyAdmin();
  }, [isAdmin]);

  return { isAdmin, setIsAdmin, loading, error }; // Return admin status, loading, and error
};

export default useAdminAuth;
