/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import { FaPlay } from "react-icons/fa";
import ReactPlayer from "react-player";

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
  width = "w-auto",
}) => {
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);

  // UseRef with proper type for div element
  const playerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Function to handle clicks outside of the player container
    const handleClickOutside = (event: MouseEvent) => {
      if (
        playerRef.current &&
        !playerRef.current.contains(event.target as Node)
      ) {
        setShowPlayer(false);
      }
    };

    // Add event listener for clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowPlayer]);

  const fetchMovieVideo = async () => {
    try {
      const type = movieId ? "movie" : seriesId ? "tv" : null;
      const id = movieId || seriesId;

      if (!type || !id) {
        alert("No valid ID provided for movie or series.");
        return;
      }

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
        className={`bg-red-600 uppercase flex items-center whitespace-nowrap gap-x-2 text-white hover:bg-red-700 transition-colors ${padding} ${fontWeight} ${fontSize} ${width}`}
      >
        <FaPlay />
        Play Now
      </button>

      {showPlayer && videoKey && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center lg:pt-16">
          <div className="relative w-full h-screen" ref={playerRef}>
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
