import SeriesHero from "@/components/sections/Series/Hero";
import CurrentlyOnAirGrid from "@/components/sections/Series/OnAir";
import AiringTodayGrid from "@/components/sections/Series/Today";

import TopRatedSeriesGrid from "@/components/sections/Series/TopRated";
import React from "react";

export default function Series() {
  return (
    <div>
      <SeriesHero />
      <AiringTodayGrid />
      <CurrentlyOnAirGrid />
      <TopRatedSeriesGrid />
    </div>
  );
}
