import LatestGrid from "@/components/sections/Home/Latest";
import RecommendedGrid from "@/components/sections/Home/Recommended";
import UpcomingGrid from "@/components/sections/Home/Upcoming";
import GenreMoviesSection from "@/components/sections/Movies/GenreMovies";
import React from "react";

export default function Movies() {
  return (
    <div>
      <GenreMoviesSection />
      <UpcomingGrid />
      <LatestGrid />
      <RecommendedGrid />
    </div>
  );
}
