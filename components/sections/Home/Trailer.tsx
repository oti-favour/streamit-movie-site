/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Button from "@/components/common/Button";
import TrailerButton from "@/components/common/TrailerButton";
import { useState, useEffect } from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";

interface Movie {
  id: number | undefined;
  movieId: number;
  title: string;
  rating: number;
  duration: string;
  description: string;
  starring: string;
  genre: string;
  tags: string[];
  backgroundImage: string;
  trailerUrl: string;
}

const Trailer = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  useEffect(() => {
    const fetchTopRatedMovie = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
        );
        const data = await response.json();

        const topMovie = data.results[0];

        const detailsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${topMovie.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
        );
        const detailsData = await detailsResponse.json();

        const runtime = detailsData.runtime
          ? `${Math.floor(detailsData.runtime / 60)} hr : ${
              detailsData.runtime % 60
            } mins`
          : "N/A";

        setMovie({
          title: detailsData.title,
          rating: detailsData.vote_average,
          duration: runtime,
          description: detailsData.overview,
          starring:
            detailsData.cast?.map((actor: any) => actor.name).join(", ") ||
            "Unknown",
          genre:
            detailsData.genres?.map((genre: any) => genre.name).join(", ") ||
            "Unknown",
          tags: detailsData.keywords?.map((tag: any) => tag.name) || [],
          backgroundImage: `https://image.tmdb.org/t/p/original${detailsData.backdrop_path}`,
          trailerUrl: `https://www.youtube.com/watch?v=${detailsData.trailer?.id}`,
          movieId: detailsData.id,
          id: detailsData.id,
        });
      } catch (err) {
        console.error("Error fetching the top-rated movie:", err);
        setError("Failed to load trailer. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedMovie();
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
    <section className="relative w-full ">
      {movie && (
        <div className="relative min-h-[500px] lg:min-h-[600px] xl:min-h-[700px] h-[75vh] ">
          <div
            className="absolute inset-0 bg-cover bg-center "
            style={{
              backgroundImage: `url(${movie.backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>

          <div className="absolute inset-0  h-full bg-black bg-opacity-50"></div>

          <div className="relative z-10 flex items-center justify-between h-full px-6 md:px-12 lg:px-24 py-10 lg:py-20">
            <div className="w-full lg:w-1/2 text-white">
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold mb-4">
                {movie.title}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center text-red-500">
                  {getStars(movie.rating)}
                </div>
                <span className="text-lg">{movie.rating} (IMDb)</span>
                <span className="text-lg">{movie.duration}</span>
              </div>
              <p className="hidden lg:block mb-4 leading-loose text-sm lg:text-base">
                {truncateText(movie.description, 300)}
              </p>
              <p className="block lg:hidden mb-2 text-sm">
                {truncateText(movie.description, 200)}
              </p>
              <p className="mb-2">
                <strong className="text-red-500">Starring:</strong>{" "}
                {movie.starring}
              </p>
              <p className="mb-2">
                <strong className="text-red-500">Genre:</strong> {movie.genre}
              </p>
              <div className="flex flex-wrap space-x-2 mb-6">
                <strong className="text-red-500">Tags:</strong>
                {movie.tags.map((tag, i) => (
                  <span key={i} className="py-1 text-white text-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <Button
                movieId={movie.id}
                padding="px-4 py-2"
                fontWeight="font-normal"
                fontSize="text-lg"
                width=""
              />
            </div>
            <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
              <TrailerButton movieId={movie.id} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Trailer;
