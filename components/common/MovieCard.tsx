import Image from "next/image";
import React from "react";

interface MovieCardProps {
  title: string;
  time: string;
  image: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, time, image }) => {
  return (
    <div className="relative w-full h-64 overflow-hidden transition-transform transform hover:scale-x-110 hover:scale-y-105 hover:border-l-4 hover:border-red-700 shadow-lg">
      <Image
        src={image}
        alt={title}
        layout="fill"
        objectFit="cover"
        className=""
      />

      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col px-10 pt-20 gap-y-1">
        <h3 className="text-white text-sm font-semibold">{title}</h3>
        <p className="text-gray-300 text-sm mb-2">{time}</p>
        <button className="bg-red-600 text-sm w-1/2 text-white px-2 py-2  hover:bg-red-700 transition-colors">
          Play Now
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
