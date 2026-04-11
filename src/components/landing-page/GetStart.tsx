"use client";

import { Button } from "../ui/button";

function GetStart() {
  return (
    <div className="bg-[#f5edd6] p-10 py-18 flex flex-col gap-4 text-center justify-center items-center">
      <h1 className="text-3xl sm:text-5xl font-bold text-[#2C1810]">Start managing smarter today</h1>
      <p className="text-[#9e7f20]">No paperwork. No confusion. Just clear records.</p>
      <Button className="bg-[rgb(143,103,1)] w-fit px-20 py-5 text-2xl cursor-pointer">Let's Start</Button>
    </div>
  );
}

export default GetStart;
