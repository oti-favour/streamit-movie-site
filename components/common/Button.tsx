/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FaPlay } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface ButtonProps {
  movieId?: number;
  seriesId?: number;
  padding?: string;
  fontWeight?: string;
  fontSize?: string;
  width?: string;
}

const Button: React.FC<ButtonProps> = ({
  movieId,
  seriesId,
  padding = "px-4 py-2",
  fontWeight = "font-light",
  fontSize = "text-sm",
  width = "w-full",
}) => {
  const router = useRouter();

  const handlePlayNow = () => {
    const type = movieId ? "movie" : seriesId ? "tv" : null;
    const id = movieId || seriesId;

    if (!type || !id) {
      alert("No valid ID provided for movie or series.");
      return;
    }

    router.push(`/play/${type}/${id}`);
  };

  return (
    <button
      onClick={handlePlayNow}
      className={`bg-red-600 uppercase flex items-center text-center whitespace-nowrap gap-x-2 text-white hover:bg-red-700 transition-colors ${padding} ${fontWeight} ${fontSize} ${width}`}
    >
      <FaPlay />
      Play Now
    </button>
  );
};

export default Button;
