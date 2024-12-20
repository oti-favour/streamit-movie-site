/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";

import { FaSpinner } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";
import Button from "@/components/common/Button";
import TrailerButton from "@/components/common/TrailerButton";

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
        const limitedMovies = data.results.slice(0, 3);

        const detailedMovies = await Promise.all(
          limitedMovies.map(async (movie: any) => {
            const movieDetails = await fetchMovieDetails(movie.id); // Fetching additional details
            return {
              id: movie.id,
              title: movie.title,
              rating: movie.vote_average,
              description: movie.overview,
              backgroundImage: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
              ...movieDetails,
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
    <section className="relative w-full  ">
      {loading ? (
        <div className="flex justify-center items-center">
          <FaSpinner className="animate-spin text-red-500 text-6xl" />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-screen text-red-500 text-xl">
          {error}
        </div>
      ) : (
        <div className="relative min-h-[500px] lg:min-h-[600px] xl:min-h-[700px] h-[100vh]">
          <IoIosArrowDroprightCircle
            className="swiper-button-next hidden lg:block"
            size={100}
            color="rgba(255, 255, 255, 0.2)"
          />
          <IoIosArrowDropleftCircle
            className="swiper-button-prev hidden lg:block"
            size={100}
            color="rgba(255, 255, 255, 0.2)"
          />
          <Swiper
            modules={[Pagination, Navigation]}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={true}
            loop={true}
            color=""
            className="h-full w-full"
          >
            {movies.slice(0, 3).map((movie, index) => (
              <SwiperSlide key={index} className="relative h-full ">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${movie.backgroundImage})` }}
                ></div>
                <div className="absolute inset-0 h-full bg-black bg-opacity-50"></div>

                <div className="relative z-10 flex h-full px-9 lg:px-20 lg:py-20 xl:py-24">
                  <div className="w-full lg:w-1/2 text-white flex flex-col justify-center">
                    <h1
                      className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold uppercase mb-4 ${
                        movie.title.length > 25
                          ? "lg:text-4xl xl:text-4xl"
                          : "lg:text-6xl xl:text-6xl"
                      }`}
                    >
                      {movie.title}
                    </h1>

                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center text-red-500">
                        {getStars(movie.rating)}
                      </div>
                      <span className="text-lg">{movie.rating} (IMDb)</span>
                      <span className="text-lg">{movie.duration}</span>
                    </div>
                    <p className="hidden lg:block mb-4 leading-loose text-sm">
                      {truncateText(movie.description, 300)}
                    </p>
                    <p className="block lg:hidden mb-2 text-sm">
                      {truncateText(movie.description, 200)}
                    </p>
                    <div className="mb-2">
                      <strong className="text-red-500">Starring:</strong>{" "}
                      {movie.starring}
                    </div>
                    <div className="mb-4">
                      <strong className="text-red-500">Genre:</strong>{" "}
                      {movie.genre}
                    </div>
                    <Button
                      movieId={movie.id}
                      padding="px-4 py-2"
                      fontWeight="font-normal"
                      fontSize="text-lg"
                      width=" w-3/5 lg:w-1/3"
                    />
                  </div>
                  <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
                    <TrailerButton movieId={movie.id} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
