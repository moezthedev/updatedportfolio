"use client";
import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import Particle from "@/components/Particle/Particle";
import TypingEffect from "@/components/Typewriter/Typewriter";
import ProgrammerImg from "@/app/assets/programmer.png";
import Downwardbtn from "@/components/DownButton/DownButton";
import { motion } from "framer-motion";

const Header = () => {
  const headingVariants = {
    initial: { opacity: 0, x: -100, scale: 0 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: "easeIn" },
      scale: 1,
    },
    exit: { opacity: 0, x: -100 },
  };

  const pVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { delay: 2, duration: 1, ease: "easeIn" },
    },
    exit: { opacity: 0 },
  };

  return (
    <div className="bg-gradient-to-t from-tertiary via-primary to-secondary">
      <Particle />
      <Navbar />
      <div className="p-[60px] md:p-[80px] flex flex-col md:flex-row items-center">
        <div className="md:w-1/2">
          <motion.span
            className="text-white text-2xl"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={headingVariants}
          >
            Hi my name is
          </motion.span>
          <motion.h1
            initial="initial"
            animate="animate"
            variants={pVariants}
            className="p-l-16 text-[40px] sm:text-[50px] md:text-[70px] hover:text-blue-300 text-ablue font-bold"
          >
            Moez Ahsan
          </motion.h1>
          <TypingEffect pVariants={pVariants} />
          <motion.p
            initial="initial"
            animate="animate"
            variants={pVariants}
            className="text-left pt-8 text-gray-300 text-[18px] md:w-[500px] md:text-lg"
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
            className="md:ml-[50px] w-[400px] md:w-[435px] md:mt-0 bg-opacity-50 transform transition-transform duration-500 hover:rotate-6 hover:scale-105 hover:translate-z-10"
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
