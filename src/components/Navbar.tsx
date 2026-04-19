"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { User } from "next-auth";
import { usePathname } from "next/navigation";
import { useJob } from "@/context/JobContext";

function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession();
  const user: User = session?.user as User;
  const pathname = usePathname();

  const {selectedJob} = useJob()

  return (
    <div className="sticky top-0 bg-[rgb(44,24,16)] text-[rgb(226,163,138)] z-10">
      {/* desktop view for landing page*/}
      <nav className="border-b border-[rgb(159,65,28)] p-2 justify-around items-center shadow-md hidden md:flex">
        <h1 className="text-2xl font-bold tracking-[2px] text-[rgb(237,207,132)]">
          Hisab <span className="text-[rgb(240,175,8)]">Kitab</span>
        </h1>
        <div className="flex gap-5 text-xl">
          <Link
            className={`px-3 py-1 rounded-lg border hover:bg-[#FFFFFF] hover:text-[rgb(54,26,14)] ${pathname === "/dashboard" && "bg-[#FFFFFF] text-[rgb(54,26,14)] border-amber-500"}`}
            href={pathname === "/" ? "/" : "/dashboard"}
          >
            {pathname === "/" ? "Home" : "Overview"}
          </Link>
          <Link
            className={`px-3 py-1 rounded-lg border hover:bg-[#FFFFFF] hover:text-[rgb(54,26,14)] ${pathname === "/workers" && "bg-[#FFFFFF] text-[rgb(54,26,14)] border-amber-500"}`}
            href={pathname === "/" ? "#features" : "/workers"}
          >
            {pathname === "/" ? "Features" : "Workers"}
          </Link>
          <Link
            className={`px-3 py-1 rounded-lg border hover:bg-[#FFFFFF] hover:text-[rgb(54,26,14)] ${pathname === "/attendance" && "bg-[#FFFFFF] text-[rgb(54,26,14)] border-amber-500"}`}
            href={pathname === "/" ? "#howItWork" : "/attendance"}
          >
            {pathname === "/" ? "How it work" : "Attendance"}
          </Link>
          <Link
            className={`px-3 py-1 rounded-lg border hover:bg-[#FFFFFF] hover:text-[rgb(54,26,14)] ${pathname === "/land-detail" && "bg-[#FFFFFF] text-[rgb(54,26,14)] border-amber-500"}`}
            href={pathname === "/" ? "#footer" : "/land-detail"}
          >
            {pathname === "/" ? "Contact" : "Land"}
          </Link>
          {pathname !== "/" && (
            <Link
              className={`px-3 py-1 rounded-lg border hover:bg-[#FFFFFF] hover:text-[rgb(54,26,14)] ${pathname === "/salary" && "bg-[#FFFFFF] text-[rgb(54,26,14)] border-amber-500"}`}
              href={`/salary/${selectedJob}`}
            >
              Salary
            </Link>
          )}
        </div>
        {pathname === "/" ? (
          <Link href="/sign-up">
            <Button className="text-xl p-5 cursor-pointer bg-[rgb(212,160,23)] text-[rgb(86,63,7)]">
              {!user?.isVerified ? "Sign Up" :"Dashboard" }
            </Button>
          </Link>
        ) : (
          "Avatar"
        )}
      </nav>

      {/* mobile view for landing page*/}
      <nav className="flex justify-around py-2 items-center md:hidden">
        <h1 className="text-2xl font-bold tracking-[2px] text-[rgb(232,201,122)]">
          Hisab Kitab
        </h1>
        {showNav ? (
          <X onClick={() => setShowNav(!showNav)} className="cursor-pointer" />
        ) : (
          <Menu
            onClick={() => setShowNav(!showNav)}
            className="cursor-pointer"
          />
        )}
        <AnimatePresence>
          {showNav && (
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.6 }}
              className={`absolute top-12 flex gap-2 flex-col w-full bg-[rgb(44,24,16)] rounded-b-lg z-1`}
              onClick={()=>setShowNav(false)}
            >
              <Link
                className={`border-b border-[#FFFFFF] px-3 py-1 hover:bg-[#FFFFFF] rounded-lg shadow-md ${pathname === "/dashboard" && "bg-[#FFFFFF] text-[rgb(54,26,14)]"} `}
                href={pathname === "/" ? "/" : "/dashboard"}
              >
                {pathname === "/" ? "Home" : "Overview"}
              </Link>
              <Link
                className={`border-b border-[#FFFFFF] px-3 py-1 hover:bg-[#FFFFFF] rounded-lg shadow-md ${pathname === "/workers" && "bg-[#FFFFFF] text-[rgb(54,26,14)]"} `}
                href={pathname === "/" ? "#features" : "/workers"}
              >
                {pathname === "/" ? "Features" : "Workers"}
              </Link>
              <Link
                className={`border-b border-[#FFFFFF] px-3 py-1 hover:bg-[#FFFFFF] rounded-lg shadow-md ${pathname === "/attendance" && "bg-[#FFFFFF] text-[rgb(54,26,14)]"} `}
                href={pathname === "/" ? "#howItWork" : "/attendance"}
              >
                {pathname === "/" ? "How it work" : "Attendance"}
              </Link>
              <Link
                className={`border-b border-[#FFFFFF] px-3 py-1 hover:bg-[#FFFFFF] rounded-lg shadow-md ${pathname === "/land-detail" && "bg-[#FFFFFF] text-[rgb(54,26,14)]"} `}
                href={pathname === "/" ? "#footer" : "/land-detail"}
              >
                {pathname === "/" ? "Contact" : "Land Detail"}
              </Link>
              {pathname !== "/" && (
                <Link
                  className={`border-b border-[#FFFFFF] px-3 py-1 hover:bg-[#FFFFFF] rounded-lg shadow-md ${pathname === "/salary" && "bg-[#FFFFFF] text-[rgb(54,26,14)]"} `}
                  href={`/salary/${selectedJob}`}
                >
                  Salary
                </Link>
              )}
              {pathname === "/" ? (
                <Link
                  href="/sign-up"
                  className="flex items-center justify-center "
                >
                  <Button className="text-lg mb-3 cursor-pointer bg-[rgb(212,160,23)] text-[rgb(86,63,7)] w-[90%]">
                    {!user?.isVerified ? "Sign Up" :"Dashboard" }
                  </Button>
                </Link>
              ) : (
                <div className="flex justify-between border-b border-[#FFFFFF] mb-2 rounded-lg">
                  <Link
                    className=" px-3 py-1 hover:bg-[#FFFFFF] rounded-lg shadow-md w-full"
                    href="/user"
                  >
                    User
                  </Link>

                  <Button
                    onClick={() => signOut()}
                    className="bg-amber-500 w-30 mr-5"
                  >
                    Sign Out <LogOut />
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}

export default Navbar;
