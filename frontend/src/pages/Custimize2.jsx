import React from "react";
import { useState } from "react";
import axios from "axios";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const Custimize2 = ({ userdata, backendImage, selectedImage, setUserData }) => {
  const [assistantName, setAssistantName] = useState(
    userdata?.userAssistant || ""
  );
  const navigate = useNavigate();

  const handleAssistantCreation = async () => {
    try {
      let formdata = new FormData();
      formdata.append("userAssistant", assistantName);
      if (backendImage) {
        formdata.append("assistantImg", backendImage);
      } else {
        formdata.append("imageurl", selectedImage);
      }

      const response = await axios.post(
        "http://localhost:8000/api/user/updateassistant",
        formdata,
        { withCredentials: true }
      );
      console.log("Assistant created successfully:", response.data);
      setUserData(response.data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full h-[100vh] bg-gradient-to-b from-[#212121] to-[#433f3f] flex items-center justify-center flex-col p-[20px]">
      <IoArrowBackCircle
        className="text-white text-2xl font-bold mb-[20px]"
        onClick={() => navigate("/customize")}
      />
      <h1 className="text-white text-2xl font-bold mb-[20px]">
        Enter your Assistant's Name
      </h1>
      <input
        type="text"
        placeholder="eg: John"
        value={assistantName}
        className="w-full max-w-[60%] p-2 rounded-full border border-white   bg-transparent placeholder:text-yellow-200 text-white px-[20px] py-[10px] "
        onChange={(e) => setAssistantName(e.target.value)}
      />
      {assistantName && (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-[20px] transition duration-300 ease-in-out cursor-pointer"
          onClick={handleAssistantCreation}
        >
          Create Assistant
        </button>
      )}
    </div>
  );
};

export default Custimize2;
