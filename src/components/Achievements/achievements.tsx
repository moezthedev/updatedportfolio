"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ach1 from "@/app/assets/ach1.jpeg";
import ach2 from "@/app/assets/ach2.jpeg";

interface Achievement {
  id: number;
  src: string;
  alt: string;
  description: string;
  initial: { x: number; y: number; rotate: number };
  color: string;
}

const achievements: Achievement[] = [
  {
    id: 1,
    src: ach1.src,
    alt: "Achievement 1",
    description:
      "Our FYP project NeuroFusion won first place at Comppec'25 in Software Applications category",
    initial: { x: -50, y: 30, rotate: -8 },
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: 2,
    src: ach2.src,
    alt: "Achievement 2",
    description:
      "NeuroFusion received merit award for securing 2nd place in whole batch",
    initial: { x: 50, y: -30, rotate: 8 },
    color: "from-purple-500 to-pink-600",
  },
];

const AchievementCollage = () => {
  const [selected, setSelected] = useState<Achievement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Close modal when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setSelected(null);
      }
    };

    if (selected) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [selected]);

  return (
    <section className="relative py-16 px-4 md:px-8 bg-gradient-to-t from-tertiary via-primary to-secondary overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-purple-500 blur-3xl animate-pulse-slow animation-delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-32 h-32 rounded-full bg-indigo-500 blur-3xl animate-pulse-slow animation-delay-1500"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-white">Achievements</span>
        </motion.h2>

        <div className="relative min-h-[500px] md:h-[600px] flex items-center justify-center">
          {/* Central Medal Element */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-yellow-400/30"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute inset-4 rounded-full border-4 border-yellow-400/50"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
              <motion.div
                className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <span className="text-2xl md:text-4xl font-bold text-gray-900">
                  #1
                </span>
              </motion.div>
            </div>
          </div>

          {/* Achievement Cards */}
          {achievements.map((ach) => (
            <motion.div
              key={ach.id}
              className="absolute w-[280px] h-[380px] rounded-3xl shadow-2xl overflow-hidden cursor-pointer z-10 hover:z-50 group"
              initial={{
                x: ach.initial.x,
                y: ach.initial.y,
                rotate: ach.initial.rotate,
                opacity: 0,
              }}
              animate={{
                x: ach.initial.x,
                y: ach.initial.y,
                rotate: ach.initial.rotate,
                opacity: 1,
              }}
              whileHover={{
                scale: 1.05,
                rotate: 0,
                boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.25)",
              }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 12,
                delay: ach.id * 0.3,
              }}
              onClick={() => setSelected(ach)}
            >
              <div className="relative w-full h-full">
                <Image
                  src={ach.src}
                  alt={ach.alt}
                  fill
                  sizes="(max-width: 768px) 280px, 380px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={ach.id === 1}
                />

                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${ach.color} opacity-0 group-hover:opacity-80 transition-opacity duration-300`}
                />

                <div className="absolute bottom-0 left-0 w-full p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black/70 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-white font-medium text-center text-sm md:text-base">
                      {ach.description}
                    </p>
                    <button className="mt-3 mx-auto px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white text-sm rounded-full border border-white/20 hover:bg-white/20 transition block">
                      View Details
                    </button>
                  </div>
                </div>

                {/* Ribbon Corner */}
                <div className="absolute -top-2 -right-2 w-24 h-24 overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-8 bg-gradient-to-r from-yellow-400 to-amber-500 transform rotate-45 translate-y-2 translate-x-7 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-gray-900 uppercase">
                      Award
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              ref={modalRef}
              className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] border border-gray-700"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">
                  Achievement Details
                </h3>
                <button
                  className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition"
                  onClick={() => setSelected(null)}
                  aria-label="Close modal"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="overflow-auto max-h-[calc(90vh-60px)]">
                <div className="relative w-full h-80">
                  <Image
                    src={selected.src}
                    alt={selected.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-contain"
                    priority
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center mr-3">
                      <svg
                        className="w-6 h-6 text-gray-900"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h4 className="text-2xl font-bold text-white">
                      {selected.alt}
                    </h4>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {selected.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <div className="text-sm text-gray-400">Event</div>
                      <div className="font-medium text-white">Comppec 25</div>
                    </div>
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <div className="text-sm text-gray-400">Category</div>
                      <div className="font-medium text-white">
                        Software Applications (AI/ML)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AchievementCollage;
