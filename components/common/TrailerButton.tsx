/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { useRouter } from "next/navigation";

interface TrailerButtonProps {
  movieId?: number;
  seriesId?: number;
  padding?: string;
  fontWeight?: string;
  fontSize?: string;
  iconSize?: number;
  textColor?: string;
  hoverColor?: string;
  label?: string; // Button text
}

const TrailerButton: React.FC<TrailerButtonProps> = ({
  movieId,
  seriesId,
  padding = "px-4 py-2",
  fontWeight = "font-medium",
  fontSize = "text-2xl",
  iconSize = 90,
  textColor = "text-gray-200",
  hoverColor = "hover:text-red-500",
  label = "Watch Trailer",
}) => {
  const router = useRouter();

  const handleWatchTrailer = () => {
    const type = movieId ? "movie" : seriesId ? "tv" : null;
    const id = movieId || seriesId;

    if (!type || !id) {
      alert("No valid ID provided for trailer.");
      return;
    }

    router.push(`/play/${type}/${id}`);
  };

  return (
    <button
      onClick={handleWatchTrailer}
      className={`flex items-center space-x-2 ${padding} ${textColor}`}
    >
      <AiOutlinePlayCircle size={iconSize} className={`${hoverColor}`} />
      <span className={`uppercase ${fontWeight} ${fontSize}`}>{label}</span>
    </button>
  );
};

export default TrailerButton;
