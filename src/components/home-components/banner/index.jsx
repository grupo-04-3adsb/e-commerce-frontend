import React from "react";
import image from "../../../assets/images/Banner-home.png";

const BannerHome = () => {
  return (
    <div className="relative flex items-center justify-center h-[60vh] w-full mt-5">
      <img src={image} alt="" className="absolute w-full h-full object-cover" />
      <div className="relative text-center text-white z-10">
        <h1 className="text-4xl md:text-3xl sm:text-2xl font-bold mb-4">
          ESCREVA SEUS SONHOS AGORA
        </h1>
        <button className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg shadow-md transition duration-300">
          COMPRE AGORA
        </button>
      </div>
    </div>
  );
};

export default BannerHome;
