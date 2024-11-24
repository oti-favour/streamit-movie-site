/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import SeriesCard from "@/components/common/SeriesCard"; // Adjust import path
import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

const GenreSeriesSection: React.FC = () => {
  const [genres, setGenres] = useState<any[]>([]);
  const [selectedGenreSeries, setSelectedGenreSeries] = useState<any[]>([]);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [loadingSeries, setLoadingSeries] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
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
    setLoadingSeries(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=${genreId}&language=en-US`
      );
      const data = await response.json();

      const seriesWithDetails = await Promise.all(
        data.results.map(async (series: any) => {
          const detailsResponse = await fetch(
            `https://api.themoviedb.org/3/tv/${series.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
          );
          const detailsData = await detailsResponse.json();

          return {
            title: series.name,
            seasons: detailsData.number_of_seasons,
            image: `https://image.tmdb.org/t/p/w500${series.poster_path}`,
            seriesId: series.id, // Add seriesId here
          };
        })
      );

      setSelectedGenreSeries(seriesWithDetails);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSeries(false);
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
    <div className="py-8 lg:px-16 px-5">
      <h2 className="text-white text-xl font-semibold mb-4">
        TV Series Genres
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
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

      {loadingSeries ? (
        <div className="flex justify-center items-center h-screen">
          <FaSpinner className="animate-spin text-red-500 text-6xl" />
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {selectedGenreSeries.map((series) => (
            <SeriesCard
              key={series.seriesId} // Use seriesId as key
              title={series.title}
              seasons={series.seasons}
              image={series.image}
              seriesId={series.seriesId} // Pass seriesId here
              id={series.seriesId}
              mediaType={"tv"}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GenreSeriesSection;
