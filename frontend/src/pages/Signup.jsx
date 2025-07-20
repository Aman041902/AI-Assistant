import React from "react";
import bg from "../assets/authBg.png";
import { IoEye } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const signup = ({ userdata, setUserData }) => {
  const [showPassword, setShowPassword] = useState(true);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlesignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response = await axios.post(
        "http://localhost:8000/api/auth/register",
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      );
      setLoading(false);
      console.log("Registration successful:", response);
      setUserData(response.data);
      navigate("/customize");
    } catch (error) {
      console.error("Error during registration:", error);
      setLoading(false);
      setUserData(null);
      alert(`error: ${error.response.data.error}`);
    }
  };

  return (
    <div
      className="w-full h-[100vh] bg-cover flex items-center justify-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        action=""
        className="w-[90%] h-[600px] bg-[#00000009] max-w-[600px] backdrop-blur-md shadow-lg rounded-lg   gap-4  shadow-blue-500/50 justify-center flex flex-col items-center p-[20px] text-center"
        onSubmit={handlesignup}
      >
        <h1 className="text-3xl text-white font-bold mb-4">
          Register to <span className="text-black">Virtual Assistant</span>
        </h1>
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full p-2 rounded-full border border-white   bg-transparent placeholder:text-yellow-200 text-white px-[20px] py-[10px] "
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter your email"
          className="w-full p-2 rounded-full border border-white   bg-transparent placeholder:text-yellow-200 text-white px-[20px] py-[10px] "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="w-full rounded-full border border-white   bg-transparent placeholder:text-yellow-200 text-white px-[20px] py-[10px]">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full  rounded-full   bg-transparent placeholder:text-yellow-200 text-white  outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {showPassword ? (
            <IoEye
              className="absolute right-[30px] top-[58.4%] transform -translate-y-1/2 text-2xl cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <IoEyeOffSharp
              className="absolute right-[30px] top-[58.4%] transform -translate-y-1/2 text-2xl cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>

        <button
          className="min-w-1/2 p-2 rounded-full bg-yellow-400 cursor-pointer text-black font-semibold hover:bg-yellow-500 transition duration-300 ease-in-out"
          disabled={loading}
        >
          {loading ? "Loading..." : "Register"}
        </button>
        <p className="text-white text-md">
          Already have an account?{" "}
          <span
            className="text-yellow-400 underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default signup;
