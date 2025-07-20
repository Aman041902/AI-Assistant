import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = ({ userdata, setUserData }) => {
  const navigate = useNavigate();
  const handlelogout = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/auth/logout", {
        withCredentials: true,
      });
      setUserData(null);
      navigate("/signup");
      console.log("Logout successful:", res.data);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div className="w-full h-[100vh] bg-gradient-to-b from-[#212121] to-[#433f3f] flex items-center justify-center flex-col gap-[10px]">
      <button
        className="absolute top-[25px] right-[20px] bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg shadow-blue-500/50 cursor-pointer"
        onClick={() => navigate("/customize")}
      >
        Customize Avatar
      </button>

      <button
        className="absolute top-[25px] left-[20px] bg-green-700 text-white px-4 py-2 rounded-lg shadow-lg shadow-green-500/50 cursor-pointer"
        onClick={handlelogout}
      >
        Logout
      </button>
      <div className="w-[300px] h-[350px] flex justify-center items-center rounded-lg overflow-hidden shadow-lg shadow-blue-500/50">
        <img
          src={userdata?.assistantImg}
          alt=""
          className="h-full object-cover"
        />
      </div>

      <h1 className="text-white text-2xl font-bold">
        I am {userdata?.userAssistant}
      </h1>
    </div>
  );
};

export default Home;
