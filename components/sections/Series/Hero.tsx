/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";

import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/core";
import "swiper/swiper-bundle.min.css";
import Button from "@/components/common/Button";
import { FaSpinner } from "react-icons/fa";
import TrailerButton from "@/components/common/TrailerButton";

interface Series {
  id: number;
  title: string;
  rating: number;
  seasons: string;
  description: string;
  genre: string;
  backgroundImage: string;
}

const SeriesHero = () => {
  const [series, setSeries] = useState<Series[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  useEffect(() => {
    const fetchTopRatedSeries = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
        );
        const data = await response.json();

        const topSeriesList = await Promise.all(
          data.results.slice(0, 3).map(async (series: any) => {
            const detailsResponse = await fetch(
              `https://api.themoviedb.org/3/tv/${series.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
            );
            const detailsData = await detailsResponse.json();

            return {
              title: detailsData.name,
              rating: detailsData.vote_average,
              seasons: `${detailsData.number_of_seasons} Seasons`,
              description: detailsData.overview,
              genre:
                detailsData.genres
                  ?.map((genre: any) => genre.name)
                  .join(", ") || "Unknown",
              backgroundImage: `https://image.tmdb.org/t/p/original${detailsData.backdrop_path}`,
            };
          })
        );

        setSeries(topSeriesList);
      } catch (err) {
        console.error("Error fetching the top-rated series:", err);
        setError("Failed to load series. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedSeries();
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
    <section className="relative w-full">
      {series && (
        <div className="relative  min-h-[500px] lg:min-h-[600px] xl:min-h-[700px] h-[75vh]">
          <div className="relative h-full w-full">
            <IoIosArrowDroprightCircle
              className="swiper-button-next hidden lg:block"
              size={500}
              color="white "
            />
            <IoIosArrowDropleftCircle
              className="hidden lg:block swiper-button-prev"
              size={100}
              color="rgba(255, 255, 255, 0.5)"
            />
            <Swiper
              modules={[Pagination, Navigation]}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              pagination={false}
              loop={true}
              className="h-full w-full "
            >
              {series.map((s, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="relative w-full h-full"
                    style={{
                      backgroundImage: `url(${s.backgroundImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    <div className="relative z-10 flex h-full px-6 py-8 lg:px-20 lg:py-20 xl:py-24">
                      <div className="w-full lg:w-1/2  text-white flex flex-col justify-center">
                        <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold mb-4">
                          {s.title}
                        </h1>
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="flex items-center text-red-500">
                            {getStars(s.rating)}
                          </div>
                          <span className="text-lg">{s.rating} (IMDb)</span>
                          <span className="text-lg">{s.seasons}</span>
                        </div>
                        <p className="hidden lg:block mb-4 leading-loose text-sm lg:text-base">
                          {truncateText(s.description, 300)}
                        </p>
                        <p className="block lg:hidden mb-2 text-sm">
                          {truncateText(s.description, 200)}
                        </p>
                        <p className="mb-2">
                          <strong className="text-red-500">Genre:</strong>{" "}
                          {s.genre}
                        </p>
                        <Button
                          seriesId={s.id}
                          padding="px-4 py-2"
                          fontWeight="font-normal"
                          fontSize="text-lg"
                          width=" w-3/5 lg:w-1/3"
                        />
                      </div>
                      <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
                        <TrailerButton seriesId={s.id} />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </section>
  );
};

export default SeriesHero;
