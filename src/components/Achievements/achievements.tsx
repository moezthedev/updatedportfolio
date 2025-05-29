"use client";

// components/AchievementCollage.tsx
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ach1 from "@/app/assets/ach1.jpeg";
import ach2 from "@/app/assets/ach2.jpeg";

interface Achievement {
  src: string;
  alt: string;
  description: string;
  initial: { x: number; y: number; rotate: number };
}

const achievements: Achievement[] = [
  {
    src: ach1.src,
    alt: "Achievement 1",
    description:
      "Our fyp project NeuroFusion won first place at Comppec'25 in Sofware Applications category.",
    initial: { x: -40, y: 20, rotate: -6 },
  },
  {
    src: ach2.src,
    alt: "Achievement 2",
    description:
      "NeuroFusion received merit award for securing 2nd place in whole batch.",
    initial: { x: 40, y: -20, rotate: 6 },
  },
];

const modalBg = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
const modalContent = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
};

const AchievementCollage = () => {
  const [selected, setSelected] = useState<Achievement | null>(null);

  return (
    <section className="relative py-20 px-8 bg-gradient-to-br  from-tertiary via-secondary to-primary overflow-hidden p-4">
      <h4 className="relative z-20 text-5xl md:text-6xl font-bold text-center text-white mb-16 animate-fadeIn">
        Achievements
      </h4>

      <div className="relative w-full h-[500px] max-w-4xl mx-auto">
        {achievements.map((ach, idx) => (
          <motion.div
            key={idx}
            className="absolute top-1/2 left-1/2 w-[280px] h-[400px] rounded-3xl shadow-2xl overflow-hidden bg-white border-4 border-white cursor-pointer z-10 hover:z-50"
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
            whileHover={{ scale: 1.05, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 12,
              delay: idx * 0.3,
            }}
            style={{ translateX: "-50%", translateY: "-50%" }}
            onClick={() => setSelected(ach)}
          >
            <div className="relative w-full h-full">
              <Image
                src={ach.src}
                alt={ach.alt}
                fill
                style={{ objectFit: "cover" }}
                className="hover:brightness-110 transition"
              />
              <motion.div
                className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-white font-semibold text-center">
                  {ach.description}
                </p>
              </motion.div>
            </div>
          </motion.div>
        ))}

        {/* Decorative Bubbles */}
        <div className="absolute -left-16 -top-16 w-32 h-32 bg-pink-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute -right-20 bottom-0 w-40 h-40 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
            variants={modalBg}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-lg w-full"
              variants={modalContent}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-96">
                <Image
                  src={selected.src}
                  alt={selected.alt}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="p-6">
                <p className="text-gray-800 text-lg text-center">
                  {selected.description}
                </p>
                <button
                  className="mt-4 block mx-auto px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
                  onClick={() => setSelected(null)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AchievementCollage;
