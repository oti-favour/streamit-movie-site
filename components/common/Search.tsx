"use client";

import { useState, useRef, useEffect } from "react";
import { FaSearch, FaSpinner } from "react-icons/fa";
import { useRouter } from "next/navigation"; // Use App Router navigation

interface SearchResult {
  id: number;
  title?: string;
  name?: string;
  media_type: "movie" | "tv" | "person";
  poster_path?: string;
  overview?: string;
}

interface TMDBResponse {
  results: SearchResult[];
}

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${
          process.env.NEXT_PUBLIC_TMDB_API_KEY
        }&query=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch results: ${response.statusText}`);
      }

      const data: TMDBResponse = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
        setQuery("");
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goToDetails = (id: number, mediaType: string) => {
    router.push(`/${mediaType}/${id}`); // App Router dynamic segment navigation
  };

  return (
    <div ref={searchRef} className="relative flex items-center">
      <button
        onClick={() => setIsActive(!isActive)}
        className="text-white pb-1 text-xl focus:outline-none"
      >
        <FaSearch />
      </button>

      {isActive && (
        <input
          type="text"
          placeholder="Search for movies or series..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className={`ml-2 px-3 py-1 bg-black text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300 ${
            isActive ? "w-64" : "w-0"
          }`}
        />
      )}

      {isLoading && <FaSpinner className="text-white ml-2 pb-5 animate-spin" />}

      {results.length > 0 && (
        <div className="absolute top-12 left-0 bg-black shadow-md w-full rounded-lg z-50 max-h-60 overflow-y-auto">
          {results.map((item) => (
            <div
              key={item.id}
              onClick={() => goToDetails(item.id, item.media_type)}
              className="p-2 text-white hover:bg-gray-800 cursor-pointer"
            >
              {item.title || item.name} ({item.media_type})
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
