/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import SeriesCard from "@/components/common/SeriesCard";
import React, { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import Link from "next/link";

interface Series {
  seriesId: number;
  title: string;
  seasons: number;
  image: string;
}
const TopRatedSeriesGrid = () => {
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopRatedSeries = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch top-rated series.");
        }

        const data = await response.json();

        const seriesWithDetails = await Promise.all(
          data.results.slice(0, 3).map(async (show: any) => {
            const detailsResponse = await fetch(
              `https://api.themoviedb.org/3/tv/${show.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
            );
            const detailsData = await detailsResponse.json();

            return {
              title: show.name,
              seasons: detailsData.number_of_seasons || 1,
              image: `https://image.tmdb.org/t/p/w500${show.poster_path}`,
              seriesId: show.id,
            };
          })
        );

        setSeries(seriesWithDetails);
      } catch (error) {
        console.error("Error fetching top-rated series:", error);
        setError("Failed to load series. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedSeries();
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
    <div className="py-8 lg:px-16 px-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-lg lg:text-xl font-semibold">
          Top Rated Series
        </h2>
        <Link
          href="/series/top-rated"
          className="text-red-500 text-sm hover:underline"
        >
          View All
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {series.map((show, index) => (
          <SeriesCard
            key={index}
            title={show.title}
            seasons={show.seasons}
            image={show.image}
            seriesId={show.seriesId}
            id={show.seriesId}
            mediaType={"tv"}
          />
        ))}
      </div>
    </div>
  );
};

export default TopRatedSeriesGrid;
