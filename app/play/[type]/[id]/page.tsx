/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import ReactPlayer from "react-player";

const VideoPlayerPage = () => {
  const { type, id } = useParams(); // Get route params
  const router = useRouter();
  const [videoKey, setVideoKey] = useState<string | null>(null);

  const fetchVideoKey = async () => {
    if (!type || !id) return;

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      const data = await response.json();

      const video = data.results.find(
        (vid: any) => vid.type === "Trailer" || vid.type === "Teaser"
      );

      setVideoKey(video ? video.key : null);
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  useEffect(() => {
    fetchVideoKey();
  }, [type, id]);

  if (!videoKey) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <p>
          <FaSpinner className="animate-spin" />
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-black mt-16">
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoKey}`}
        playing
        controls
        width="100%"
        height="100%"
      />
      <button
        onClick={() => router.back()}
        className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2"
      >
        Close
      </button>
    </div>
  );
};

export default VideoPlayerPage;
