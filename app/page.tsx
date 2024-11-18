import HeroSection from "@/components/sections/Home/Hero";
import LatestGrid from "@/components/sections/Home/Latest";
import RecommendedGrid from "@/components/sections/Home/Recommended";
import Trailer from "@/components/sections/Home/Trailer";
import UpcomingGrid from "@/components/sections/Home/Upcoming";
import React from "react";

export default function Home() {
  return (
    <div className="">
      {" "}
      <HeroSection />
      <UpcomingGrid />
      <LatestGrid />
      <Trailer />
      <RecommendedGrid />
    </div>
  );
}
