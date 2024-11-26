"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import TrailerButton from "@/components/common/TrailerButton";
import Image from "next/image";
import { useEffect, useState } from "react";

// Define Params and DetailsPageProps
type Params = { media_type: string; id: string };

interface DetailsPageProps {
  params: Awaited<Params>; // Ensure params is treated as a resolved (synchronous) type
}

// Fetch function for movie/series details
async function fetchDetails(media_type: string, id: string) {
  const response = await fetch(
    `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch details");
  }

  return response.json();
}

// Main component
const DetailsPage: React.FC<DetailsPageProps> = ({ params }) => {
  const { media_type, id } = params;
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch details on component mount
  useEffect(() => {
    fetchDetails(media_type, id)
      .then((details) => setData(details))
      .catch(() => setError("Could not load details"));
  }, [media_type, id]);

  // Error handling
  if (error) {
    return <div className="text-white text-center mt-32">{error}</div>;
  }

  // Loading state
  if (!data) {
    return <div className="text-white text-center mt-32">Loading...</div>;
  }

  // Render details
  return (
    <div className="py-32 px-16 text-white min-h-screen">
      <h1 className="text-4xl font-bold">{data.title || data.name}</h1>
      <p className="mt-4 text-gray-300 text-sm sm:text-base md:text-base">
        {data.overview}
      </p>
      <div className="w-full mx-auto flex flex-col sm:flex-row justify-between gap-6 sm:gap-8 mt-6">
        {data.poster_path && (
          <Image
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt={data.title || data.name}
            className="w-full sm:w-2/5 mt-6 rounded-lg"
            width={250}
            height={375}
          />
        )}
        <TrailerButton
          movieId={media_type === "movie" ? parseInt(id, 10) : undefined}
          seriesId={media_type === "tv" ? parseInt(id, 10) : undefined}
        />
      </div>
    </div>
  );
};

export default DetailsPage;
