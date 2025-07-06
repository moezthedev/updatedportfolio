"use client";
import React from "react";
import { motion } from "framer-motion";

interface Mentor {
  name: string;
  role: string;
  company: string;
}

interface MentorTributeProps {
  mentors: Mentor[];
}

const MentorTributeSlider: React.FC<MentorTributeProps> = ({ mentors }) => {
  return (
    <div className=" bg-gradient-to-br from-slate-900 via-black to-gray-950 text-white py-16 px-4 flex flex-col items-center overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl font-bold mb-4 text-center leading-tight"
      >
        Tribute to incredible Mentors
      </motion.h1>

      {/* Horizontal Scroll Slider */}
      <div className="relative w-full max-w-5xl">
        <div className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-2 pb-4 scrollbar-hide">
          {mentors.map((mentor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 w-72 sm:w-80 md:w-96 snap-center bg-white/10 backdrop-blur-md border-l-4 border-cyan-500 px-6 py-5 rounded-xl text-left transition-transform duration-300"
            >
              <p className="text-xl font-semibold mb-1">{mentor.name}</p>
              <p className="text-sm text-gray-300">{mentor.role}</p>
              <p className="text-sm text-gray-400 italic">{mentor.company}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.p
        className="mt-14 text-center text-gray-400 text-sm max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: mentors.length * 0.1 + 0.3 }}
      >
        Thank you to each of my mentors for inspiring me with your time, energy,
        and wisdom. Your guidance has been invaluable in my journey.
      </motion.p>
    </div>
  );
};

export default MentorTributeSlider;
