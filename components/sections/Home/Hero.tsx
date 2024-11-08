/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";

interface Movie {
  id: number;
  title: string;
  rating: number;
  duration: string;
  description: string;
  starring: string;
  genre: string;
  tags: string[];
  backgroundImage: string;
}

const HeroSection = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data = await response.json();
        const limitedMovies = data.results.slice(0, 1);

        const detailedMovies = await Promise.all(
          limitedMovies.map(async (movie: any) => {
            const movieDetails = await fetchMovieDetails(movie.id); // Fetching additional details
            return {
              id: movie.id,
              title: movie.title,
              rating: movie.vote_average,
              description: movie.overview,
              backgroundImage: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
              ...movieDetails, // Spread the detailed info into this object
            };
          })
        );

        setMovies(detailedMovies);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    const fetchMovieDetails = async (movieId: number) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&append_to_response=credits`
        );
        const movieData = await response.json();

        const genres = movieData.genres.map((g: any) => g.name).join(", ");
        const runtime = `${Math.floor(movieData.runtime / 60)}hr ${
          movieData.runtime % 60
        }min`;
        const cast = movieData.credits.cast
          .slice(0, 3)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((c: any) => c.name)
          .join(", ");

        return {
          duration: runtime,
          starring: cast || "Cast not available",
          genre: genres || "Genre not available",
          tags: movieData.genres.slice(0, 3).map((g: any) => g.name),
        };
      } catch (error) {
        console.error("Failed to fetch movie details", error);
        return { duration: "N/A", starring: "N/A", genre: "N/A", tags: [] };
      }
    };

    fetchMovies();
  }, []);

  const getStars = (rating: number) => {
    const fullStars = Math.floor(rating / 2);
    const emptyStars = 5 - fullStars;
    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="mr-1 text-red-500">
            ★
          </span>
        ))}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="mr-1 text-gray-400">
            ★
          </span>
        ))}
      </>
    );
  };

  return (
    <div className=" ">
      <div className="w-full h-auto lg:h-screen">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <FaSpinner className="animate-spin text-red-500 text-6xl" />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-screen text-red-500 text-xl">
            {error}
          </div>
        ) : (
          movies.slice(0, 1).map((movie, index) => (
            <div key={index} className="relative lg:py-8 lg:px-14">
              <div
                className="absolute inset-0 bg-cover bg-center lg:h-screen"
                style={{
                  backgroundImage: `url(${movie.backgroundImage})`,
                }}
              ></div>

              <div className="absolute inset-0 bg-black bg-opacity-50 h-auto lg:h-screen"></div>

              <div className="relative z-10 flex h-full px-8 py-20 lg:py-0">
                <div className="w-full lg:w-1/2 text-white flex flex-col lg:pt-32 justify-center">
                  <h1 className="text-4xl lg:text-7xl font-bold mb-4">
                    {movie.title}
                  </h1>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center text-red-500">
                      {getStars(movie.rating)}
                    </div>
                    <span className="text-lg">{movie.rating} (IMDb)</span>
                    <span className="text-lg ">{movie.duration}</span>
                  </div>
                  <p className="hidden lg:mb-4 text-sm ">
                    {truncateText(movie.description, 300)}
                  </p>
                  <p className="block lg:hidden mb-2 text-sm ">
                    {truncateText(movie.description, 200)}
                  </p>
                  <p className="mb-2 ">
                    <strong className="text-red-500">Starring:</strong>{" "}
                    {movie.starring}
                  </p>
                  <p className="mb-2 ">
                    <strong className="text-red-500">Genre:</strong>{" "}
                    {movie.genre}
                  </p>
                  <div className="flex space-x-2 mb-6">
                    <strong className="text-red-500">Tags:</strong>
                    {movie.tags.map((tag, i) => (
                      <span key={i} className="py-1 text-white text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="px-6 py-2 w-1/2 lg:w-1/3 bg-red-600 text-white font-semibold hover:bg-red-700">
                    Play Now
                  </button>
                </div>

                <div className="hidden lg:flex w-1/2 items-center justify-center">
                  <button className="flex items-center text-gray-200 space-x-2 ">
                    <AiOutlinePlayCircle
                      size={90}
                      className="hover:text-red-500"
                    />
                    <span className="text-xl font-medium">Watch Trailer</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HeroSection;
