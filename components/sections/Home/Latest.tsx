/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import MovieCard from "@/components/common/MovieCard";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";

interface Movie {
  id: number;
  title: string;
  time: string;
  image: string;
  mediaType: "movie" | "tv";
}

const LatestGrid: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch the latest movies.");
        }

        const data = await response.json();

        const moviesWithDetails = await Promise.all(
          data.results.slice(0, 3).map(async (movie: any) => {
            const detailsResponse = await fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
            );
            const detailsData = await detailsResponse.json();
            const runtime = detailsData.runtime
              ? `${Math.floor(detailsData.runtime / 60)} hr : ${
                  detailsData.runtime % 60
                } mins`
              : "N/A";

            return {
              id: movie.id,
              title: movie.title,
              time: runtime,
              image: movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/fallback-image.jpg",
              mediaType: "movie",
            };
          })
        );

        setMovies(moviesWithDetails);
      } catch (error) {
        console.error("Error fetching latest movies:", error);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-red-500 text-6xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-8 lg:px-16">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-lg lg:text-xl font-semibold">
          Latest Movies
        </h2>
        <Link
          href="/movies/latest"
          className="text-red-500 text-sm hover:underline"
        >
          View All
        </Link>
      </div>
      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {movies.map((movie, index) => (
          <MovieCard
            key={`${movie.id}-${index}`}
            id={movie.id}
            title={movie.title}
            time={movie.time}
            image={movie.image}
            mediaType={movie.mediaType}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestGrid;
