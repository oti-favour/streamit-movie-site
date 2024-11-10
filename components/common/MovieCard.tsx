import Image from "next/image";
import React from "react";
import Button from "./Button";

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
        <h3 className="text-white text-base font-semibold">{title}</h3>
        <p className="text-gray-300 text-sm mb-2">{time}</p>
        <Button />
      </div>
    </div>
  );
};

export default MovieCard;
