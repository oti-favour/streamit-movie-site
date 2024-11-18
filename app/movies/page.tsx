import LatestGrid from "@/components/sections/Home/Latest";
import RecommendedGrid from "@/components/sections/Home/Recommended";
import UpcomingGrid from "@/components/sections/Home/Upcoming";
import React from "react";

export default function Movies() {
  return (
    <div>
      <UpcomingGrid />
      <LatestGrid />
      <RecommendedGrid />
    </div>
  );
}
