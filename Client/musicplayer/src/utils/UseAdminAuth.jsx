import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useAdminAuth = () => {
  const [isAdmin, setIsAdmin] = useState(null); // null indicates verification in progress
  const [loading, setLoading] = useState(true); // To track if the verification process is ongoing
  const [error, setError] = useState(null); // To capture any error message
  const navigate = useNavigate();

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
          "http://localhost:4000/admin",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`, // Sending token with Bearer scheme
            },
          }
        );

        if (response.status === 200) {
          setIsAdmin(true); // Admin access granted
        }
      } catch (err) {
        setError(err.response?.data?.message || "Admin verification failed."); // Capture error message
        setIsAdmin(false); // If the error occurs, we assume it's a non-admin
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    verifyAdmin();
  }, [navigate]);

  return { isAdmin, loading, error }; // Return admin status, loading, and error
};

export default useAdminAuth;
