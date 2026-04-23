"use client";
import { motion } from "framer-motion";
import Link from "next/link";

function HeroSection() {
  return (
    <section
      className="bg-[rgb(68,35,22)] p-5 md:p-10 flex flex-col gap-10 "
      style={{
        backgroundImage: `
      linear-gradient(rgba(70, 73, 81, 0.5) 1px, transparent 1px),
      linear-gradient(90deg, rgba(70, 73, 81, 0.5) 1px, transparent 1px)
      `,
        backgroundSize: "50px 50px",
      }}
    >
      <div className="flex justify-center lg:justify-between py-10 flex-col lg:flex-row gap-5">
        <div className="flex gap-6 flex-col max-w-150 lg:max-w-100">
          <div className="border text-sm text-amber-400 border-amber-500 w-fit px-4 rounded-lg py-1 bg-[#5b3a1a]">
            🌾 Built for ground-level operations
          </div>
          <div className="flex flex-col">
            <div className="justify-center md:items-start items-center flex flex-col font-semibold">
              <h1 className="text-6xl text-amber-100">
                Manage your land,
                <br />
                <em className="text-amber-300">workers & earnings</em>
                <br />— all in one place.
              </h1>
              <p className="text-center sm:text-start text-[#c7b07a] tracking-tight text-md md:text-lg font-normal mt-6">
                Add and manage workers with their details, daily wage, and
                assigned land. Keep everything organized in one place.
              </p>
            </div>

            <div className="flex mt-6 flex-wrap gap-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileTap={{ y: 5 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3, ease: "easeIn" }}
                className="text-2xl px-1 cursor-pointer bg-[#f1b62b] w-48 text-center rounded-lg"
              >
                <Link href="/sign-up">Let's Start</Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileTap={{ y: 5 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3, ease: "easeIn" }}
                className="text-2xl px-1 cursor-pointer hover:border-amber-400 text-gray-200 border w-48 text-center rounded-lg"
              >
                <Link href="#howItWork">See how it works</Link>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap lg:justify-end lg:flex-col">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="border bg-[rgba(245,245,244,0.1)]  border-[#7b5c12] hover:border-[#f1b62b] h-fit p-2 w-40 rounded-lg "
          >
            <span className="text-3xl font-bolder text-[#f1b62b]">∞</span>
            <h1 className="text-[#b5a785]">Workers managed</h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="border bg-[rgba(245,245,244,0.1)]  border-[#7b5c12] hover:border-[#f1b62b] h-fit p-2 w-40 rounded-lg "
          >
            <span className="text-3xl font-semibold text-[#f1b62b]">0</span>
            <h1 className="text-[#b5a785]">Paperwork needed</h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="border bg-[rgba(245,245,244,0.1)]  border-[#7b5c12] hover:border-[#f1b62b] h-fit p-2 w-40 rounded-lg "
          >
            <h1 className="text-3xl font-semibold text-[#f1b62b]">
              <span className="text-lg">1</span>-click
            </h1>
            <h1 className="text-[#b5a785]">Salary calculation</h1>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
