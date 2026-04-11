"use client";

import GetStart from "@/components/landing-page/GetStart";
import HeroSection from "@/components/landing-page/HeroSection";
import Offer from "@/components/landing-page/Offer";
import Process from "@/components/landing-page/Process";





function home() {
  return (
    <div className="flex-1">
      <HeroSection />
      <Offer/>
      <Process/>
      <GetStart/>
    </div>
  );
}

export default home;
