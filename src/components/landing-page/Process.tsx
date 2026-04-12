"use client";

import { easeInOut, motion } from "framer-motion";

import { useState } from "react";

function Process() {
  return (
    <div id="howItWork" className={`bg-[rgb(86,46,30)] p-10 py-18 flex flex-col gap-4`}>
      <h1 className="text-[#f6b718] tracking-[1px] font-semibold font-mono">
        SIMPLE PROCESS
      </h1>
      <h1 className="text-4xl font-bold tracking-tight text-[#c3b48e]">
        Up and running in minutes
      </h1>

      <div className="rounded-lg grid lg:grid-cols-4 sm:grid-cols-2 gap-6 mt-10">
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3, ease: easeInOut }}
          className="border flex justify-center items-center bg-[#F5EDD6] rounded-lg py-5"
        >
          <div className="flex flex-col items-center">
            <div className="text-4xl border w-15 h-15 flex justify-center items-center rounded-full bg-[#2C1810] text-[#F5EDD6]">
              1
            </div>
            <div className="flex flex-col justify-center items-center text-center p-1">
              <h1 className="text-2xl font-semibold">Create Account</h1>
              <span className="">
                Sign up as a team leader and verify your email
              </span>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3, ease: easeInOut }}
          className="border flex justify-center items-center bg-[#F5EDD6] rounded-lg py-5"
        >
          <div className="flex flex-col items-center">
            <div className="text-4xl border w-15 h-15 flex justify-center items-center rounded-full bg-[#2C1810] text-[#F5EDD6]">
              2
            </div>
            <div className="flex flex-col justify-center items-center text-center p-1">
              <h1 className="text-2xl font-semibold">Add Workers</h1>
              <span className="">
                Add your workers with daily wage and details
              </span>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3, ease: easeInOut }}
          className="border flex justify-center items-center bg-[#F5EDD6] rounded-lg py-5"
        >
          <div className="flex flex-col items-center">
            <div className="text-4xl border w-15 h-15 flex justify-center items-center rounded-full bg-[#2C1810] text-[#F5EDD6]">
              3
            </div>
            <div className="flex flex-col justify-center items-center text-center p-1">
              <h1 className="text-2xl font-semibold">Mark Attendance</h1>
              <span className="">
                Mark daily attendance — full, half, or absent
              </span>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3, ease: easeInOut }}
          className="border flex justify-center items-center bg-[#F5EDD6] rounded-lg py-5"
        >
          <div className="flex flex-col items-center">
            <div className="text-4xl border w-15 h-15 flex justify-center items-center rounded-full bg-[#2C1810] text-[#F5EDD6]">
              4
            </div>
            <div className="flex flex-col justify-center items-center text-center p-1">
              <h1 className="text-2xl font-semibold">Get Salary</h1>
              <span className="">
                Salary is auto-calculated. Pay with one click
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Process;
