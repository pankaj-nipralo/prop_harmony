import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate()

  return <div>
    <button onClick={()=> {
      navigate('/auth/login')
    }}
    className="border-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 cursor-pointer"
    style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
    > 
      Login
    </button>
  </div>;
};

export default Landing;