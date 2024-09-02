"use client";
import React from "react";
import { motion } from "framer-motion";
import DoDAO from "@/app/assets/dodao.png";
import Amal from "@/app/assets/amal.png";
import Comppec from "@/app/assets/comppec_resized.jpg";
import Risetech from "@/app/assets/risetech.png";
import Interns from "@/app/assets/interns.png";
import Synapsify from "@/app/assets/synapsify.jpg";
import Image from "next/image";
const Roadmap = () => {
  const milestones = [
    {
      title: "DoDAO",
      description: "Associate Full Stack Software Engineer ",
      date: "Sep 2024 - Present",
      image: DoDAO, // Add image path
    },
    {
      title: "DoDAO",
      description: "FullStack Software Engineer Intern",
      date: "June 2024 - Aug 2024",
      image: DoDAO, // Add image path
    },
    {
      title: "Synapsify",
      description: "SQA Intern",
      date: "June 2024 - Aug 2024 ",
      image: Synapsify,
    },
    {
      title: "Amal Academy",
      description: "Personal and Professional Development Fellow",
      date: "Apr 2024 - Jun 2024",
      image: Amal, // Add image path
    },
    {
      title: "Comppec",
      description: "Director Web & IT Wing",
      date: "Mar 2024 - May 2024",
      image: Comppec, // Add image path
    },
    {
      title: "RiseTech",
      description: "Web Application Developer",
      date: "Jul 2023 - Aug 2023",
      image: Risetech,
    },
    {
      title: "Interns Pakistan",
      description: "Frontend Developer",
      date: "Nov 2022 - Dec 2022 ",
      image: Interns,
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.042, transition: { duration: 0.3 } },
  };

  const dotVariants = {
    pulse: {
      scale: [1, 1.2, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 1,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  return (
    <div className="p-8 bg-primary text-white">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Experience Roadmap
      </h2>
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-agreen"></div>
        {milestones.map((milestone, index) => (
          <motion.div
            key={index}
            className={`mb-8 flex flex-col md:flex-row ${
              index % 2 === 0
                ? "md:flex-row-reverse lg:mr-8"
                : "md:flex-row lg:ml-8"
            } items-center`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
            variants={cardVariants}
          >
            <div className="w-full flex justify-center relative md:w-1/2 md:order-2">
              <motion.div
                className={`hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 md:top-1/2 md:-translate-y-1/2 w-8 h-8 bg-agreen rounded-full border-4 border-background ${
                  index % 2 === 0 ? "md:left-auto md:right-0" : "md:left-0"
                }`}
                variants={dotVariants}
                animate="pulse"
              ></motion.div>
            </div>
            <div className="w-full md:w-1/2 p-4">
              <motion.div
                className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg border border-white border-opacity-20"
                variants={cardVariants}
              >
                <div className="flex items-center mb-4">
                  <Image
                    src={milestone.image}
                    alt={milestone.title}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-sm mb-2">{milestone.description}</p>
                    <span className="text-xs text-gray-400">
                      {milestone.date}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
