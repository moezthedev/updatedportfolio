"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Element } from "react-scroll";
import Particle from "@/components/Particle/Particle";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button as MuiButton,
  Typography as MuiTypography,
  Chip,
  Box,
} from "@mui/material";
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
      <Element name="project" id="project" />
      <Particle />

      {/* ← keep your original header */}
      <h1 className="text-white font-bold pb-6 pt-2 text-5xl pl-2 text-center bg-primary">
        Projects
      </h1>

      {/* ← keep your original filter-bar */}
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

      {/* ← restored your Tailwind gradient background */}
      <div className="grid bg-opacity-100 bg-gradient-to-t from-tertiary via-secondary to-primary grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-8 md:p-12 gap-4 md:gap-8">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={idx}
            className="h-full"
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.02 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 1, ease: "easeIn" },
            }}
          >
            <Card className="flex flex-col h-full shadow-lg">
              <CardActionArea className="flex-grow">
                <CardMedia
                  component="img"
                  image={project.imageUrl.src}
                  alt={project.title}
                  sx={{
                    objectFit: "contain",
                    height: 200,
                    backgroundColor: "#f5f5f5",
                  }}
                />
                <CardContent>
                  <MuiTypography
                    variant="h5"
                    gutterBottom
                    className="text-blue-500"
                  >
                    {project.title}
                  </MuiTypography>
                  <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                    {project.technologies.map((tech, tIdx) => (
                      <Chip key={tIdx} label={tech} size="small" />
                    ))}
                  </Box>
                  <MuiTypography variant="body2" color="text.secondary">
                    {project.description}
                  </MuiTypography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                {project.category !== "ML" && project.githubLink && (
                  <MuiButton
                    size="small"
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </MuiButton>
                )}
                {project.category === "ML" && project.colabLink && (
                  <MuiButton
                    size="small"
                    href={project.colabLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </MuiButton>
                )}
                {project.category === "Full Stack" && project.liveDemoLink && (
                  <MuiButton
                    size="small"
                    href={project.liveDemoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo
                  </MuiButton>
                )}
              </CardActions>
            </Card>
          </motion.div>
        ))}
      </div>

      <p className="text-white text-center bg-black">
        View latest ML work{" "}
        <a
          className="text-blue-500"
          href="https://drive.google.com/drive/folders/1mHck6iYmK467WHiDhVrYUrUECEyWdp4C?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
      </p>
    </>
  );
};

export default ShowcaseProjects;
