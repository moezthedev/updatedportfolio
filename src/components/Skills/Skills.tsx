import React from "react";
import Image from "next/image";
import { machine } from "os";
const Skills = () => {
  const techLogos: { [key: string]: string } = {
    react:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    flask:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
    mongodb:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    postgresql:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    css: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    tailwind:
      "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/tailwindcss.svg",
    bootstrap:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    redux:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
    pandas:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
    matplotlib:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg",
    nextjs:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    javascript:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    python:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    numpy:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
    prisma:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
    tensorflow:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    keras:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg",
    pytorch:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  };

  return (
    <div className="p-8 bg-gradient-to-r from-primary to-secondary">
      <h1 className="text-white font-bold pb-8 pt-4 text-5xl pl-2 text-center">
        Skills
      </h1>
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {Object.keys(techLogos).map((tech) => (
          <div
            key={tech}
            className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-4 rounded-lg shadow-md flex flex-col justify-center items-center"
          >
            <Image
              src={techLogos[tech]}
              alt={`${tech} logo`}
              title={tech}
              width={64}
              height={64}
              className="w-16 h-16 hover:scale-110 transition-transform duration-300"
            />
            <span className="text-white text-sm mt-2 block sm:hidden">
              {tech}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
