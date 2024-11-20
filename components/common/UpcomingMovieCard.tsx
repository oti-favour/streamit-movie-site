import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

interface UpcomingMovieCardProps {
  id: number;
  title: string;
  releaseDate: string;
  image: string;
  mediaType: "movie" | "tv";
}

const UpcomingMovieCard: React.FC<UpcomingMovieCardProps> = ({
  id,
  title,
  releaseDate,
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
