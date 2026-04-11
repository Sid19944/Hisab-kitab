"use client";

import { easeInOut, motion } from "framer-motion";

function Offer() {
  return (
    <div id="features" className="bg-[#f5edd6] p-10 py-18 flex flex-col gap-4">
      <h1 className="text-green-700 tracking-[1px] font-semibold font-mono">
        WHAT WE OFFER
      </h1>
      <h1 className="text-4xl font-bold tracking-tight">
        Everything a team leader needs
      </h1>
      <p className="text-[#cdaa1d]">
        From adding workers to calculating final salary — HisabKitab
        <br /> handles it all with zero confusion.
      </p>

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 mt-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="card p-8 bg-[#fffdf5] rounded-lg border-[rgba(233,188,12,0.5)] hover:border-[#e9bc0c] border flex flex-col gap-4"
        >
          <span className="border p-2 rounded-lg bg-[#d6d0b8] w-fit">👷</span>
          <h1 className="text-2xl font-semibold">Worker Management</h1>
          <p className="text-[#cdaa1d]">
            Add and manage workers with their details, daily wage, and assigned
            land. Keep everything organized in one place.
          </p>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="card p-8 bg-[#fffdf5] rounded-lg border-[rgba(233,188,12,0.5)] hover:border-[#e9bc0c] border flex flex-col gap-4"
        >
          <span className="border p-2 rounded-lg bg-[#d6d0b8] w-fit">🔒</span>
          <h1 className="text-2xl font-semibold">Daily Attendance</h1>
          <p className="text-[#cdaa1d]">
            Mark full day, half day, or absent with a single tap. Attendance
            auto-syncs with salary calculation.
          </p>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="card p-8 bg-[#fffdf5] rounded-lg border-[rgba(233,188,12,0.5)] hover:border-[#e9bc0c] border flex flex-col gap-4"
        >
          <span className="border p-2 rounded-lg bg-[#d6d0b8] w-fit">🌾</span>
          <h1 className="text-2xl font-semibold">Land Details</h1>
          <p className="text-[#cdaa1d]">
            Track land area, owner details, work budget, and current status.
            Know where your money is going.
          </p>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="card p-8 bg-[#fffdf5] rounded-lg border-[rgba(233,188,12,0.5)] hover:border-[#e9bc0c] border flex flex-col gap-4"
        >
          <span className="border p-2 rounded-lg bg-[#d6d0b8] w-fit">💰</span>
          <h1 className="text-2xl font-semibold">Instant Salary</h1>
          <p className="text-[#cdaa1d]">
            Salary is auto-calculated from attendance. Full day, half day,
            deductions — all handled automatically.
          </p>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="card p-8 bg-[#fffdf5] rounded-lg border-[rgba(233,188,12,0.5)] hover:border-[#e9bc0c] border flex flex-col gap-4"
        >
          <span className="border p-2 rounded-lg bg-[#d6d0b8] w-fit">📊</span>
          <h1 className="text-2xl font-semibold">Reports & Summary</h1>
          <p className="text-[#cdaa1d]">
            Monthly summaries, payment status, and deduction history — all at a
            glance.
          </p>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="card p-8 bg-[#fffdf5] rounded-lg border-[rgba(233,188,12,0.5)] hover:border-[#e9bc0c] border flex flex-col gap-4"
        >
          <span className="border p-2 rounded-lg bg-[#d6d0b8] w-fit">🔒</span>
          <h1 className="text-2xl font-semibold">Secure & Private</h1>
          <p className="text-[#cdaa1d]">
            Each team leader only sees their own workers and data. No
            cross-contamination between teams.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

//  📊💰🌾✅

export default Offer;
