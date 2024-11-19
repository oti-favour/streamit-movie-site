import GenreSeriesSection from "@/components/sections/Series/GenreSeries";
import SeriesHero from "@/components/sections/Series/Hero";

import AiringTodayGrid from "@/components/sections/Series/Today";

import TopRatedSeriesGrid from "@/components/sections/Series/TopRated";
import React from "react";

export default function Series() {
  return (
    <div>
      <SeriesHero />
      <AiringTodayGrid />
      <TopRatedSeriesGrid />
      <GenreSeriesSection />
    </div>
  );
}
