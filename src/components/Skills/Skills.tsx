"use client";
import React from "react";
import { motion } from "framer-motion";

const Skills = () => {
  const techLogos = {
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
    context:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", // Using React logo for Context
    jwt: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jwt/jwt-plain.svg",
    formik:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/formik/formik-plain.svg",
    pytorch:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
    tensorflow:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    numpy:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
    pandas:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
    matplotlib:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg",
    nextjs:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="p-8 bg-gradient-to-r from-primary to-secondary"
    >
      <h1 className="text-white font-bold pb-8 pt-4 text-5xl pl-2 text-center">
        Skills
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          className="bg-gradient-to-r from-ablue to-ablue p-4 rounded-lg shadow-md flex flex-wrap items-center gap-4"
        >
          <span className="font-bold">• Front End:</span> React, Next
          <img
            src={techLogos.react}
            alt="React"
            className="w-8 h-8"
            title="React"
          />
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
            alt="Next.js"
            className="w-8 h-8"
            title="Next.js"
          />
        </motion.div>
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          className="bg-gradient-to-r from-ablue to-ablue p-4 rounded-lg shadow-md flex flex-wrap items-center gap-4"
        >
          <span className="font-bold">• Backend:</span> Flask
          <img
            src={techLogos.flask}
            alt="Flask"
            className="w-8 h-8"
            title="Flask"
          />
        </motion.div>
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          className="bg-gradient-to-r from-ablue to-ablue p-4 rounded-lg shadow-md flex flex-wrap items-center gap-4"
        >
          <span className="font-bold">• Database:</span> MongoDB, PostgreSQL
          <img
            src={techLogos.mongodb}
            alt="MongoDB"
            className="w-8 h-8"
            title="MongoDB"
          />
          <img
            src={techLogos.postgresql}
            alt="PostgreSQL"
            className="w-8 h-8"
            title="PostgreSQL"
          />
        </motion.div>
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          className="bg-gradient-to-r from-ablue to-ablue p-4 rounded-lg shadow-md flex flex-wrap items-center gap-4"
        >
          <span className="font-bold">• Styling:</span> Custom CSS, Tailwind
          CSS, Bootstrap
          <img src={techLogos.css} alt="CSS" className="w-8 h-8" title="CSS" />
          <img
            src={techLogos.tailwind}
            alt="Tailwind CSS"
            className="w-8 h-8"
            title="Tailwind CSS"
          />
          <img
            src={techLogos.bootstrap}
            alt="Bootstrap"
            className="w-8 h-8"
            title="Bootstrap"
          />
        </motion.div>
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          className="bg-gradient-to-r from-ablue to-ablue p-4 rounded-lg shadow-md flex flex-wrap items-center gap-4"
        >
          <span className="font-bold">• State Management:</span> Redux, React
          Context
          <img
            src={techLogos.redux}
            alt="Redux"
            className="w-8 h-8"
            title="Redux"
          />
          <img
            src={techLogos.context}
            alt="React Context"
            className="w-8 h-8"
            title="React Context"
          />
        </motion.div>
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          className="bg-gradient-to-r from-ablue to-ablue p-4 rounded-lg shadow-md flex flex-wrap items-center gap-4"
        >
          <span className="font-bold">• Authentication:</span> JWT, Formik
        </motion.div>
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          className="bg-gradient-to-r from-ablue to-ablue p-4 rounded-lg shadow-md flex flex-wrap items-center gap-4"
        >
          <span className="font-bold">• Machine Learning:</span> PyTorch,
          TensorFlow, NumPy, Pandas, Matplotlib
          <img
            src={techLogos.pytorch}
            alt="PyTorch"
            className="w-8 h-8"
            title="PyTorch"
          />
          <img
            src={techLogos.tensorflow}
            alt="TensorFlow"
            className="w-8 h-8"
            title="TensorFlow"
          />
          <img
            src={techLogos.numpy}
            alt="NumPy"
            className="w-8 h-8"
            title="NumPy"
          />
          <img
            src={techLogos.pandas}
            alt="Pandas"
            className="w-8 h-8"
            title="Pandas"
          />
          <img
            src={techLogos.matplotlib}
            alt="Matplotlib"
            className="w-8 h-8"
            title="Matplotlib"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Skills;
