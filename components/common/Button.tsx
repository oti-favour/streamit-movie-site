/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import ReactPlayer from "react-player";

interface ButtonProps {
  movieId: number;
  padding?: string;
  fontWeight?: string;
  fontSize?: string;
  width?: string;
}
const Button: React.FC<ButtonProps> = ({
  movieId,
  padding = "px-4 py-2",
  fontWeight = "font-light",
  fontSize = "text-sm",
  width = "w-auto",
}) => {
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);

  const fetchMovieVideo = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      const data = await response.json();

      const video = data.results.find(
        (vid: any) => vid.type === "Trailer" || vid.type === "Teaser"
      );

      if (video) {
        setVideoKey(video.key);
        setShowPlayer(true);
      } else {
        alert("No videos available for this movie.");
      }
    } catch (error) {
      console.error("Error fetching video:", error);
      alert("Failed to load video. Please try again.");
    }
  };

  return (
    <div>
      <button
        onClick={fetchMovieVideo}
        className={`bg-red-600 uppercase flex  items-center whitespace-nowrap  gap-x-2 text-white hover:bg-red-700 transition-colors ${padding} ${fontWeight} ${fontSize} ${width}`}
      >
        <FaPlay />
        Play Now
      </button>

      {showPlayer && videoKey && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="relative w-full h-screen">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${videoKey}`}
              playing
              controls
              width="100%"
              height="100%"
            />
            <button
              onClick={() => setShowPlayer(false)}
              className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Button;
