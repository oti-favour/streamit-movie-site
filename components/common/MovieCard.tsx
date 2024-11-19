"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Button from "./Button";

interface MovieCardProps {
  id: number;
  title: string;
  time: string;
  image: string;
  mediaType: "movie" | "tv";
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  time,
  image,
  mediaType,
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/${mediaType}/${id}`);
  };

  return (
    <div
      className="relative w-full h-64 overflow-hidden transition-transform duration-500 ease-in-out transform hover:scale-x-110 hover:scale-y-105 hover:border-l-4 hover:border-red-700 shadow-lg cursor-pointer"
      onClick={handleCardClick}
    >
      <Image
        src={image}
        alt={title}
        layout="fill"
        objectFit="cover"
        className=""
      />

      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-start text-center px-10">
        <h3 className="text-white text-base font-semibold">{title}</h3>
        <p className="text-gray-300 text-sm mb-2">{time}</p>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Button movieId={id} />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
