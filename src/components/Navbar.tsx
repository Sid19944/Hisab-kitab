"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { usePathname } from "next/navigation";

function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession();
  const user: User = session?.user as User;
  const pathname = usePathname();

  return (
    <div className="sticky top-0 bg-[rgb(44,24,16)] text-[rgb(226,163,138)]">
      {/* desktop view */}
      <nav className="border p-2 justify-around items-center shadow-md hidden md:flex">
        <h1 className="text-2xl font-bold tracking-[2px] text-[rgb(239,204,115)]">
          Hisab Kitab
        </h1>
        <div className="flex gap-5 text-xl">
          <Link
            className=" px-3 py-1 rounded-lg hover:bg-[rgb(135,78,56)]"
            href="/"
          >
            Home
          </Link>
          <Link
            className=" px-3 py-1 rounded-lg hover:bg-[rgb(135,78,56)]"
            href="/about"
          >
            About
          </Link>
          <Link
            className=" px-3 py-1 rounded-lg hover:bg-[rgb(135,78,56)]"
            href="/features"
          >
            Features
          </Link>
          <Link
            className=" px-3 py-1 rounded-lg hover:bg-[rgb(135,78,56)]"
            href="/contact"
          >
            Contact
          </Link>
        </div>
        {pathname === "/" && (
          <Link href="/sign-up">
            <Button className="text-xl p-5 cursor-pointer bg-[rgb(212,160,23)] text-[rgb(86,63,7)]">
              Sign Up
            </Button>
          </Link>
        )}
      </nav>

      {/* mobile view */}
      <nav className="flex justify-around py-2 items-center md:hidden ">
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
              className={`absolute top-12 flex gap-2 flex-col w-full bg-[rgb(44,24,16)] rounded-b-lg`}
            >
              <Link
                className="border-b border-[rgb(135,78,56)] px-3 py-1 hover:bg-[rgb(135,78,56)] rounded-lg shadow-md"
                href="/"
              >
                Home
              </Link>
              <Link
                className="border-b border-[rgb(135,78,56)] px-3 py-1 hover:bg-[rgb(135,78,56)] rounded-lg shadow-md"
                href="/about"
              >
                About
              </Link>
              <Link
                className="border-b border-[rgb(135,78,56)] px-3 py-1 hover:bg-[rgb(135,78,56)] rounded-lg shadow-md"
                href="/features"
              >
                Features
              </Link>
              <Link
                className="border-b border-[rgb(135,78,56)] px-3 py-1 hover:bg-[rgb(135,78,56)] rounded-lg shadow-md"
                href="/contact"
              >
                Contact
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}

export default Navbar;
