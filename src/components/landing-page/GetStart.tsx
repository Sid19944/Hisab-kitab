"use client";

import Link from "next/link";
import { motion } from "framer-motion";

function GetStart() {
  return (
    <div className="bg-[#f5edd6] p-10 py-18 flex flex-col gap-4 text-center justify-center items-center">
      <h1 className="text-3xl sm:text-5xl font-bold text-[#2C1810]">
        Start managing smarter today
      </h1>
      <p className="text-[#9e7f20]">
        No paperwork. No confusion. Just clear records.
      </p>
      <Link href="/sign-up">
        <motion.div
        whileHover={{y:-5}}
        whileTap={{y:5}}
         className="bg-[rgb(143,103,1)] text-[#F5EDD6] w-fit px-20 py-2 text-3xl cursor-pointer rounded-lg">
          Let's Start
        </motion.div>
      </Link>
    </div>
  );
}

export default GetStart;
