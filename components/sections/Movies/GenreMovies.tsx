/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import MovieCard from "@/components/common/MovieCard";
import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

const GenreMoviesSection: React.FC = () => {
  const [genres, setGenres] = useState<any[]>([]);
  const [selectedGenreMovies, setSelectedGenreMovies] = useState<any[]>([]);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [loadingMovies, setLoadingMovies] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
        );
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingGenres(false);
      }
    };
    fetchGenres();
  }, []);

  const handleGenreClick = async (genreId: number) => {
    setLoadingMovies(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=${genreId}&language=en-US`
      );
      const data = await response.json();

      const moviesWithDetails = await Promise.all(
        data.results.map(async (movie: any) => {
          const detailsResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
          );
          const detailsData = await detailsResponse.json();

          const runtime = detailsData.runtime
            ? `${Math.floor(detailsData.runtime / 60)} hr : ${
                detailsData.runtime % 60
              } mins`
            : "N/A";

          const releaseDate = new Date(movie.release_date);
          const isUpcoming = releaseDate > new Date();

          return {
            title: movie.title,
            time: isUpcoming ? releaseDate.toLocaleDateString() : runtime,
            image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            id: movie.id,
            mediaType: "movie",
          };
        })
      );

      setSelectedGenreMovies(moviesWithDetails);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMovies(false);
    }
  };

  if (loadingGenres) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-red-500 text-6xl" />
      </div>
    );
  }

  return (
    <div className="py-8 px-16">
      <h2 className="text-white text-xl font-semibold mb-4">Movie Genres</h2>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenreClick(genre.id)}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            {genre.name}
          </button>
        ))}
      </div>

      {loadingMovies ? (
        <div className="flex justify-center items-center h-screen">
          <FaSpinner className="animate-spin text-red-500 text-6xl" />
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {selectedGenreMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              time={movie.time}
              image={movie.image}
              mediaType={movie.mediaType}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GenreMoviesSection;
