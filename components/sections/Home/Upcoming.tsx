"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import UpcomingMovieCard from "@/components/common/UpcomingMovieCard";
import { FaSpinner } from "react-icons/fa";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

const UpcomingGrid = () => {
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

        setMovies(data.results.slice(0, 3)); // Limit to 9 movies for display
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
    <div className="py-8 px-16">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-lg lg:text-xl font-semibold">
          Upcoming Movies
        </h2>
        <Link
          href="/movies/upcoming"
          className="text-red-500 text-sm hover:underline"
        >
          View All
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {movies.map((movie, index) => (
          <UpcomingMovieCard
            key={`${movie.id}-${index}`}
            title={movie.title}
            releaseDate={new Date(movie.release_date).toLocaleDateString()}
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            id={movie.id}
            mediaType={"movie"}
          />
        ))}
      </div>
    </div>
  );
};

export default UpcomingGrid;
