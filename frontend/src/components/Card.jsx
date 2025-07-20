import React from "react";

const Card = ({
  image,
  setSelectedImage,
  selectedImage,
  setFrontendImage,
  setBackendImage,
}) => {
  return (
    <div
      className={`w-[150px] h-[200px] bg-[#212121] border-2 border-[blue] rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer ${
        selectedImage === image ? "border-yellow-500" : ""
      }`}
      onClick={() => {
        setSelectedImage(image);
        setFrontendImage(null);
        setBackendImage(null);
      }}
    >
      <img src={image} alt="" className="h-full object-cover" />
    </div>
  );
};

export default Card;
