import Image from "next/image";
import React from "react";

interface UpcomingMovieCardProps {
  title: string;
  releaseDate: string; // Display the release date
  image: string; // Poster image
}

const UpcomingMovieCard: React.FC<UpcomingMovieCardProps> = ({
  title,
  releaseDate,
  image,
}) => {
  return (
    <div className="relative w-full h-64 overflow-hidden transition-transform duration-500 ease-in-out transform hover:scale-x-110 hover:scale-y-105 hover:border-l-4 hover:border-red-700 shadow-lg cursor-pointer">
      <Image
        src={image}
        alt={title}
        layout="fill"
        objectFit="cover"
        className=""
      />

      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-start text-center px-10">
        <h3 className="text-white text-base font-semibold">{title}</h3>
        <p className="text-gray-300 text-sm mb-2">
          Release Date: {releaseDate}
        </p>
        <span className="text-red-500 text-xs uppercase font-semibold">
          Coming Soon
        </span>
      </div>
    </div>
  );
};

export default UpcomingMovieCard;
