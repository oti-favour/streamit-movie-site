/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";

// Define the Movie type for the trailer section
interface Movie {
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

        // Fetch the top-rated movies
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
        );
        const data = await response.json();

        // Get the first movie from the list (top-rated movie)
        const topMovie = data.results[0];

        // Fetch detailed information about the top movie
        const detailsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${topMovie.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
        );
        const detailsData = await detailsResponse.json();

        // Get the movie runtime in hours and minutes format
        const runtime = detailsData.runtime
          ? `${Math.floor(detailsData.runtime / 60)} hr : ${
              detailsData.runtime % 60
            } mins`
          : "N/A";

        // Set the movie state with the necessary details
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
          trailerUrl: `https://www.youtube.com/watch?v=${detailsData.trailer?.id}`, // Assuming there's a trailer
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

  // Get the stars for the movie rating
  const getStars = (rating: number) => {
    const fullStars = Math.floor(rating / 2); // Convert rating out of 10 to stars out of 5
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
    <div>
      <div className="w-full h-screen">
        {movie && (
          <div className="relative py-8 px-14">
            <div
              className="absolute inset-0 bg-cover bg-center h-screen"
              style={{
                backgroundImage: `url(${movie.backgroundImage})`,
              }}
            ></div>

            <div className="absolute inset-0 bg-black bg-opacity-50 h-screen"></div>

            <div className="relative z-10 flex h-full px-8 py-20 lg:py-0">
              <div className="w-full lg:w-1/2 text-white flex flex-col  justify-center">
                <h1 className="text-7xl font-bold mb-4">{movie.title}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center text-red-500">
                    {getStars(movie.rating)}
                  </div>
                  <span className="text-lg">{movie.rating} (IMDb)</span>
                  <span className="text-lg ">{movie.duration}</span>
                </div>
                <p className="mb-4 text-sm ">
                  {truncateText(movie.description, 300)}
                </p>
                <p className="mb-2">
                  <strong className="text-red-500">Starring:</strong>{" "}
                  {movie.starring}
                </p>
                <p className="mb-2">
                  <strong className="text-red-500">Genre:</strong> {movie.genre}
                </p>
                <div className="flex space-x-2 mb-6">
                  <strong className="text-red-500">Tags:</strong>
                  {movie.tags.map((tag, i) => (
                    <span key={i} className="py-1 text-white text-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="px-6 py-2 w-1/3 bg-red-600 text-white font-semibold hover:bg-red-700">
                  Play Now
                </button>
              </div>

              <div className="hidden lg:flex w-1/2 items-center justify-center">
                <button className="flex items-center text-gray-200 space-x-2">
                  <AiOutlinePlayCircle
                    size={90}
                    className="hover:text-red-500"
                  />
                  <span className="text-xl font-medium">Watch Trailer</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trailer;
