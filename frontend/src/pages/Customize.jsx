import React from "react";
import Card from "../components/Card";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import authBg from "../assets/authBg.png";
import { FaFileUpload } from "react-icons/fa";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Customize = ({frontendImage,setFrontendImage,backendImage,setBackendImage,selectedImage,setSelectedImage}) => {
 
  const inputimg = useRef(null);
  const navigate = useNavigate();

  const handleimg = (e) => {
    const file = e.target.files?.[0]; // safer optional chaining
    if (!file) return; // exit early if no file selected

    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  return (
    <div className="w-full h-[100vh] bg-gradient-to-b from-[#212121] to-[#433f3f] flex items-center justify-center flex-col p-[20px]">
      <h1 className="text-white text-2xl font-bold mb-[20px]">
        Select your Assistant's Avatar
      </h1>
      <div className="w-[90%] max-w-[60%]  flex justify-center items-center flex-wrap gap-[20px]">
        <Card
          image={image1}
          setSelectedImage={setSelectedImage}
          selectedImage={selectedImage}
          setFrontendImage={setFrontendImage}
          setBackendImage={setBackendImage}
        ></Card>
        <Card
          image={image2}
          setSelectedImage={setSelectedImage}
          selectedImage={selectedImage}
          setFrontendImage={setFrontendImage}
          setBackendImage={setBackendImage}
        ></Card>

        <Card
          image={authBg}
          setSelectedImage={setSelectedImage}
          selectedImage={selectedImage}
          setFrontendImage={setFrontendImage}
          setBackendImage={setBackendImage}
        ></Card>
        <div
          className={`w-[150px] h-[200px] bg-[#212121] border-2 border-[blue] rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 flex items-center justify-center ${
            selectedImage === "input" ? "border-yellow-500" : ""
          }`}
          onClick={() => {
            inputimg.current.click();
            setSelectedImage("input");
          }}
        >
          {frontendImage && (
            <img
              src={frontendImage}
              alt=""
              className="h-full object-cover"
            ></img>
          )}
          {!frontendImage && (
            <div className="w-full h-full flex items-center justify-center flex-col cursor-pointer hover:bg-[#212121]/80 transition duration-300">
              <FaFileUpload className="text-4xl text-blue-500 mb-2" />
              <p className="text-white text-sm ">Upload your image</p>
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          hidden
          ref={inputimg}
          onChange={handleimg}
        />
      </div>
      {selectedImage && (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-[20px] transition duration-300 ease-in-out cursor-pointer"
          onClick={() => navigate("/customize2")}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Customize;
