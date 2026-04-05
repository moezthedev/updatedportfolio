"use client";
import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import TypingEffect from "@/components/Typewriter/Typewriter";
import ProgrammerImg from "@/app/assets/programmer.png";
import Downwardbtn from "@/components/DownButton/DownButton";
import { motion } from "framer-motion";

const Header = () => {
  const headingVariants = {
    /* … */
  };
  const pVariants = {
    /* … */
  };

  return (
    <div className="relative overflow-hidden pt-10 bg-gradient-to-t from-tertiary via-primary to-secondary">
      {/* faint code rain */}

      {/* preserve your exact gradient */}
      <div>
        <Navbar />
      </div>
      {/* main content on top */}
      <div className="relative z-10 p-[60px] md:p-[80px] flex flex-col md:flex-row items-center">
        <div className="md:w-1/2">
          <motion.span
            className="font-mono text-green-400 text-2xl"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={headingVariants}
          >
            Hi, my name is
          </motion.span>
          <motion.h1
            initial="initial"
            animate="animate"
            variants={pVariants}
            className="mt-2 font-mono text-[40px] sm:text-[50px] md:text-[70px] text-white font-bold"
          >
            Moez Ahsan
          </motion.h1>
          <TypingEffect pVariants={pVariants} />
          <motion.p
            initial="initial"
            animate="animate"
            variants={pVariants}
            className="pt-8 text-gray-300 text-[18px] md:w-[500px] md:text-lg"
          >
            As a developer, I am your tech-savvy problem solver. I thrive on
            coding challenges and crafting digital wonders. With a passion for
            clean, efficient code, I transform ideas into functional realities.
          </motion.p>
        </div>
        <div className="md:w-1/2 flex flex-col text-left md:items-start justify-center">
          <motion.img
            initial="initial"
            animate="animate"
            variants={pVariants}
            className="md:ml-[50px] w-[400px] md:w-[435px] transform transition-transform duration-500 hover:rotate-6 hover:scale-105"
            src={ProgrammerImg.src}
            alt="Programmer"
            loading="lazy"
            style={{ perspective: "1000px" }}
          />
          <Downwardbtn />
        </div>
      </div>
    </div>
  );
};

export default Header;
