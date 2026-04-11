"use client";

import HeroSection from "@/components/landing-page/HeroSection";
import Offer from "@/components/landing-page/Offer";





function home() {
  return (
    <div className="flex-1">
      <HeroSection />
      <Offer/>
    </div>
  );
}

export default home;
