/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import SeriesCard from "@/components/common/SeriesCard";
import React, { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import Link from "next/link";

interface Series {
  title: string;
  seasons: number;
  image: string;
}

const PopularSeriesGrid = () => {
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularSeries = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.themoviedb.org/3/tv/popular?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch popular series.");
        }

        const data = await response.json();

        const seriesWithDetails = data.results.slice(0, 3).map((show: any) => ({
          title: show.name,
          seasons: show.number_of_seasons || 1, // Assuming at least 1 season
          image: `https://image.tmdb.org/t/p/w500${show.poster_path}`,
        }));

        setSeries(seriesWithDetails);
      } catch (error) {
        console.error("Error fetching popular series:", error);
        setError("Failed to load series. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPopularSeries();
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
          Popular Series
        </h2>
        <Link
          href="/series/popular"
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
          />
        ))}
      </div>
    </div>
  );
};

export default PopularSeriesGrid;
