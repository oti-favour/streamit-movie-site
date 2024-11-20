/* eslint-disable @typescript-eslint/no-explicit-any */
// /app/movies/upcoming/page.tsx
"use client";

import UpcomingMovieCard from "@/components/common/UpcomingMovieCard";
import React, { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  runtime: string;
}

const UpcomingMoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch the upcoming movies.");
        }

        const data = await response.json();

        const moviesWithDetails = await Promise.all(
          data.results.slice(0, 15).map(async (movie: any) => {
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
              id: movie.id, // Ensure `id` is included for the key
              title: movie.title,
              release_date: movie.release_date,
              poster_path: movie.poster_path,
              runtime: runtime,
            };
          })
        );

        setMovies(moviesWithDetails);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingMovies();
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
    <div className="py-8 mt-16 px-16">
      <h2 className="text-white text-xl font-semibold mb-4">Upcoming Movies</h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {movies.map((movie, index) => {
          console.log("Movie data:", movie); // Debug the movie object
          return (
            <UpcomingMovieCard
              key={`${movie.id}-${index}`}
              id={movie.id}
              title={movie.title}
              releaseDate={new Date(movie.release_date).toLocaleDateString()}
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              mediaType="movie" // Hardcoded here; ensure you pass the correct type
            />
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingMoviesPage;
