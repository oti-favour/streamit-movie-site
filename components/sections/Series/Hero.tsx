/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";

interface Series {
  title: string;
  rating: number;
  seasons: string;
  description: string;
  genre: string;
  backgroundImage: string;
}

const SeriesHero = () => {
  const [series, setSeries] = useState<Series | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  useEffect(() => {
    const fetchPopularSeries = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
        );
        const data = await response.json();

        const topSeries = data.results[0];

        const detailsResponse = await fetch(
          `https://api.themoviedb.org/3/tv/${topSeries.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
        );
        const detailsData = await detailsResponse.json();

        setSeries({
          title: detailsData.name,
          rating: detailsData.vote_average,
          seasons: `${detailsData.number_of_seasons} Seasons`,
          description: detailsData.overview,
          genre:
            detailsData.genres?.map((genre: any) => genre.name).join(", ") ||
            "Unknown",
          backgroundImage: `https://image.tmdb.org/t/p/original${detailsData.backdrop_path}`,
        });
      } catch (err) {
        console.error("Error fetching the popular series:", err);
        setError("Failed to load series. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPopularSeries();
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <AiOutlinePlayCircle className="animate-spin text-red-500 text-6xl" />
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
    <section className="relative w-full min-h-screen">
      {series && (
        <div className="relative w-full min-h-screen">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${series.backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>

          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between h-full px-6 md:px-12 lg:px-24 py-10 lg:py-20">
            <div className="w-full lg:w-1/2 text-white">
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold mb-4">
                {series.title}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center text-red-500">
                  {getStars(series.rating)}
                </div>
                <span className="text-lg">{series.rating} (IMDb)</span>
                <span className="text-lg">{series.seasons}</span>
              </div>
              <p className="hidden lg:block mb-4 leading-loose text-sm lg:text-base">
                {truncateText(series.description, 300)}
              </p>
              <p className="block lg:hidden mb-2 text-sm">
                {truncateText(series.description, 200)}
              </p>
              <p className="mb-2">
                <strong className="text-red-500">Genre:</strong> {series.genre}
              </p>
              <button className="px-2 lg:px-1 py-2 flex items-center justify-center gap-x-2 uppercase lg:mb-4 w-1/2 md:w-1/2 lg:w-1/3 bg-red-600 text-white font-semibold hover:bg-red-700">
                <FaPlay /> Play Now
              </button>
            </div>
            <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
              <button className="flex items-center text-gray-200 space-x-2">
                <AiOutlinePlayCircle size={90} className="hover:text-red-500" />
                <span className="text-2xl uppercase font-medium">
                  Watch Trailer
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SeriesHero;
