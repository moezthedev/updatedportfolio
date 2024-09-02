"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link as ScrollLink, Element } from "react-scroll";
import Particle from "@/components/Particle/Particle";
import Image from "next/image";
import { projects } from "./ProjectDetails";

const ShowcaseProjects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<"ML" | "Full Stack">(
    "ML"
  );

  const filteredProjects = projects.filter(
    (project) => project.category === selectedCategory
  );

  return (
    <>
      <Element name="project" id="project"></Element>
      <Particle />
      <h1 className="text-white font-bold pb-6 pt-2 text-5xl pl-2 text-center bg-primary">
        Projects
      </h1>
      <div className="flex justify-center pb-4 bg-primary">
        <button
          className={`px-4 py-2 mx-2 ${
            selectedCategory === "ML" ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded`}
          onClick={() => setSelectedCategory("ML")}
        >
          ML
        </button>
        <button
          className={`px-4 py-2 mx-2 ${
            selectedCategory === "Full Stack"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          } rounded`}
          onClick={() => setSelectedCategory("Full Stack")}
        >
          Full Stack
        </button>
      </div>
      <div className="grid bg-opacity-100 bg-gradient-to-t from-tertiary via-secondary to-primary grid-cols-1 md:grid-cols-2 p-4 md:p-12 lg:grid-cols-3 gap-4 md:gap-8">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.02 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 1, ease: "easeIn" },
            }}
          >
            <div className="relative w-full h-64">
              <Image
                src={project.imageUrl.src}
                alt={project.title}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <h2 className="text-2xl font-semibold text-blue-500">
                {project.title}
              </h2>
              <div className="flex flex-wrap gap-2 mb-4 mt-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-gray-700">{project.description}</p>
              <div className="mt-4">
                {project.category !== "ML" && (
                  <a
                    href={project.githubLink}
                    className="text-blue-500 hover:font-bold text-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub
                  </a>
                )}
                {project.category === "ML" && project.colabLink && (
                  <a
                    href={project.colabLink}
                    className="ml-4 text-blue-500 hover:font-bold text-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Colab
                  </a>
                )}

                {project.category === "Full Stack" && project.liveDemoLink && (
                  <a
                    href={project.liveDemoLink}
                    className="ml-4 text-blue-500 hover:font-bold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-white text-center bg-black ">
        View latest ML work{" "}
        <a
          className="text-blue-500"
          href="https://drive.google.com/drive/folders/1mHck6iYmK467WHiDhVrYUrUECEyWdp4C?usp=sharing"
          target="_blank"
        >
          here
        </a>
      </p>
    </>
  );
};

export default ShowcaseProjects;
