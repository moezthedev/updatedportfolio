import React from "react";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";

const glitchVariants = {
  initial: { opacity: 0, y: -10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeInOut" },
  },
  glitch: {
    x: [0, -1, 1, 0],
    textShadow: [
      "1px 1px 2px rgba(255, 255, 255, 0.8)",
      "-1px -1px 2px rgba(255, 255, 255, 0.6)",
    ],
    transition: {
      repeat: Infinity,
      repeatType: "mirror" as "mirror",
      duration: 0.08,
    },
  },
  flicker: {
    opacity: [1, 0.8, 1, 0.6, 1],
    transition: {
      repeat: Infinity,
      repeatType: "mirror" as "mirror",
      duration: 0.3,
    },
  },
};

function TypewriterComponent({ pVariants }: { pVariants: any }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="glitch"
      variants={pVariants}
      className="text-xl pt-2 font-bold text-agreen"
    >
      <motion.div
        variants={glitchVariants}
        whileHover="glitch"
        whileTap="flicker"
      >
        <Typewriter
          options={{
            strings: [
              "Full Stack Engineer",
              "AI/ML/DL Engineer",
              "SQA Engineer",
              "IOT Developer",
            ],
            autoStart: true,
            loop: true,
            delay: 50, // Randomized typing speed
            deleteSpeed: 30,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export default TypewriterComponent;
