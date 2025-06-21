import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
// react-chartjs-2 is a wrapper for Chart.js that makes it easy to integrate charts in React.
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import useAdminAuth from '../utils/UseAdminAuth';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { MyContext } from '../context/Context';
import { useNavigate } from 'react-router-dom';


 const BASE_URL = process.env.REACT_APP_API_URL;



// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
// This registration step is necessary for Chart.js to know which components it can use when rendering a chart.

const AnalyticsDashboard = () => {

  const { isAdmin, loading } = useAdminAuth();

  const [userChartData, setUserChartData] = useState({ labels: [], datasets: [] });
  const [songChartData, setSongChartData] = useState({ labels: [], datasets: [] });
  const {totalUsers , totalSongs } = useContext(MyContext)


  const navigate = useNavigate();

  useEffect(() => {
    fetchUserAnalytics();
    fetchSongAnalytics();
  }, []);

  const fetchUserAnalytics = async () => {
    try {

        const token = localStorage.getItem("token");
        
        if (!token) {
          toast.error("Authentication token missing. Please log in again.");
          return;
        }

      const res = await axios.get(`${BASE_URL}/api/analytics/users/daily`,
       { headers: {
        Authorization: `Bearer ${token}`,
          },}
      );
      
      const dates = res.data.map(item => item._id);
      const counts = res.data.map(item => item.count);

      setUserChartData({
        labels: dates, //X-axis
        datasets: [
          {
            label: 'Daily User Sign-ups',
            data: counts, //Y-axis
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
            fill: true,
          },
        ],
      });
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSongAnalytics = async () => {
    try {

        const token = localStorage.getItem("token");
        
        if (!token) {
          toast.error("Authentication token missing. Please log in again.");
          return;
        }

      const res = await axios.get('`${BASE_URL}/api/analytics/songs/daily`,
        { headers: {
            Authorization: `Bearer ${token}`,
              },}
      );
      const dates = res.data.map(item => item._id);
      const counts = res.data.map(item => item.count);

      setSongChartData({
        labels: dates,
        datasets: [
          {
            label: 'Daily Song Uploads',
            data: counts,
            borderColor: 'rgba(255,99,132,1)',
            backgroundColor: 'rgba(255,99,132,0.2)',
            fill: true,
          },
        ],
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=>{
    if(!loading && !isAdmin){
      setTimeout(() => {
        navigate('/AllSongs');
      }, 3000);
    }
  },[loading,isAdmin,navigate]);

  if (loading) {
    return <div className='flex  h-[87.3vh] justify-center items-center text-3xl font-bold font-roboto'>Loading admin verification...</div>;
  }


  if (!isAdmin) {
    return <div className='flex  h-[87.3vh] justify-center items-center text-3xl font-bold font-roboto'>You do not have admin access to view this page. Redirecting...</div>; 
  }


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 mb-20">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Analytics Dashboard</h2>

      {/* User Sign-ups Chart */}
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-1">Daily New Users</h3>
        <Link className='flex w-fit' to="/admin/allUserInfo"><h5 className='text-l font-semibold text-gray-700 mb-4'>Total Users: <span className='text-[rgba(75,192,192,1)]'>{totalUsers}</span></h5></Link>
        <div className="w-full h-[300px] md:h-[400px]">
          {userChartData.labels.length > 0 ? (
            <Line
              data={userChartData}
              options={{
                maintainAspectRatio: false,
                scales: {
                  y: {
                    ticks: {
                      stepSize: 1, //forces y-axis to increment by 1
                      callback: function (value) { //value passed automatically for each tick it needs to render on y-axis
                        return Number(value).toFixed(0); //Ensures whole number only. The toFixed(0) method converts the number into a string, formatting it with 0 digits after the decimal point. Essentially, it rounds the number to the nearest whole number and returns it as a string.
                      }
                    }
                  }
                }
              }}
            />
          ) : (
            <p className="text-gray-500 text-center">Loading user analytics...</p>
          )}
        </div>
      </div>

      {/* Song Uploads Chart */}
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Daily New Songs</h3>
        <Link className='flex w-fit' to="/AllSongs"><h5 className='text-l font-semibold text-gray-700 mb-4'>Total Songs: <span className='text-[rgba(255,99,132,1)]'>{totalSongs}</span></h5></Link>
        <div className="w-full h-[300px] md:h-[400px]">
          {songChartData.labels.length > 0 ? (
            <Line
              data={songChartData}
              options={{
                maintainAspectRatio: false,
                scales: {
                  y: {
                    ticks: {
                      stepSize: 1,
                      callback: function (value) {
                        return Number(value).toFixed(0);
                      }
                    }
                  }
                }
              }}
            />
          ) : (
            <p className="text-gray-500 text-center">Loading song analytics...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
