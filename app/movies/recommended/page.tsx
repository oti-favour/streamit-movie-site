/* eslint-disable @typescript-eslint/no-explicit-any */
// /app/movies/recommended/page.tsx
"use client";
import MovieCard from "@/components/common/MovieCard";
import React, { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";

interface Movie {
  id: number;
  title: string;
  time: string;
  image: string;
  mediaType: "movie" | "tv";
}

const RecommendedMoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const movieId = 500;
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch recommended movies.");
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
              title: movie.title,
              time: runtime,
              image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            };
          })
        );

        setMovies(moviesWithDetails);
      } catch (error) {
        console.error("Error fetching recommended movies:", error);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedMovies();
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
    <div className="py-8 px-16">
      <h2 className="text-white text-xl font-semibold mb-4">
        Recommended Movies
      </h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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

export default RecommendedMoviesPage;
