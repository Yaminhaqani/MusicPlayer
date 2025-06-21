import React, { useContext, useState } from 'react'
import './Register.css'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MyContext } from '../context/Context';

const Login = () => {

  const {setLoggedIn} = useContext(MyContext);

     const [email , setEmail] = useState("");
      const [password , setPassword] = useState("");

      const navigate = useNavigate();

      const handleLogin = async (e)=>{
        e.preventDefault();

        const url = `${process.env.REACT_APP_API_URL}/user/login`;
        const formData = {email , password};

        try {

          const response = await axios.post(url , formData);
          console.log(response);

          if(response.status === 200){
            const token = response.data.token; 
            localStorage.setItem('token', token);
            setLoggedIn(true);
            toast.success(response.data.message);
            setTimeout(() => {
              navigate('/AllSongs');
            }, 3000);

          } else{
            toast.error(response.data.message)
          }
          
          
        } catch (error) {
          console.log(error);

           if (error.response && error.response.data) {
                    // If there is a response from the server and it contains data
                    toast.error(error.response.data.message);  
                  }else if (error.response) {
                            
                            toast.error("An error occurred with status: " + error.response.status);
                          } else {
                          
                            toast.error("Network error or request timeout");
                          }

          
          
        }
      }

  return (
    <div className='Register flex w-full h-[88.3vh] justify-center items-center bg-gray-950 border-t-2 border-gray-800 font-roboto'>

        <form className='w-[300px] border border-gray-700 px-2 rounded-xl sm:w-[450px]'>

          <h1 className='mb-4 text-gray-200 text-2xl text-center'>Welcome back</h1>

            <label htmlFor="email" className='text-gray-300'>Email</label>
            <input className='sm:h-[45px] h-[35px]' type="email" id='email' placeholder="Enter email address" value={email} onChange={(e)=>setEmail(e.target.value)} required/>

            <label htmlFor="password" className='text-gray-300'>Password</label>
            <input className='sm:h-[45px] h-[35px]' type="password" id='password' placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>

            <button className='bg-blue-800 text-gray-300 h-[35px] rounded-[10px] sm:h-[45px]' onClick={handleLogin}>Login</button>
            <p className='text-gray-300 text-center py-2'>Or</p>
            <p className="text-gray-300">
            Don't have an account? <Link to="/user/register" className="text-blue-500">Register with us</Link>
          </p>
          <p className="text-gray-300">
           <Link to="/user/forgotPass" className="text-blue-500">Forgot password?</Link>
          </p>
          

        </form>

    </div>
    
  )
}

export default Login
