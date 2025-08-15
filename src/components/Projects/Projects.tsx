"use client";
import React, { useState, useMemo, lazy, Suspense, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Element } from "react-scroll";
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
  Skeleton,
} from "@mui/material";
import { projects } from "./ProjectDetails"; // Import your project data

// Lazy load components
const Particle = lazy(() => import("@/components/Particle/Particle"));

// Project card skeleton
const ProjectSkeleton = () => (
  <Card className="h-full bg-white rounded-lg shadow-lg">
    <Skeleton variant="rectangular" height={200} animation="wave" />
    <CardContent>
      <Skeleton variant="text" width="80%" height={32} animation="wave" />
      <Box display="flex" flexWrap="wrap" gap={1} my={2}>
        {[...Array(4)].map((_, i) => (
          <Skeleton
            key={i}
            variant="circular"
            width={70}
            height={28}
            animation="wave"
          />
        ))}
      </Box>
      <Skeleton variant="text" height={24} animation="wave" />
      <Skeleton variant="text" height={24} width="85%" animation="wave" />
    </CardContent>
    <CardActions>
      <Skeleton
        variant="rectangular"
        width={100}
        height={36}
        animation="wave"
      />
    </CardActions>
  </Card>
);

// Project card component - REMOVED React.memo TO FIX CATEGORY SWITCHING
const ProjectCard = ({ project, idx }: { project: any; idx: number }) => (
  <motion.div
    className="h-full"
    initial={{ opacity: 0, y: 20 }}
    whileHover={{ scale: 1.03 }}
    whileInView={{
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: idx * 0.1 },
    }}
    viewport={{ once: true, margin: "-50px" }}
    key={`${project.title}-${idx}`} // Added unique key here
  >
    <Card className="h-full flex flex-col bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
      <CardActionArea className="flex-grow">
        <CardMedia
          component="img"
          image={project.imageUrl?.src || "/placeholder.png"}
          alt={project.title}
          className="object-contain"
          sx={{
            height: 200,
            backgroundColor: "#f5f5f5",
          }}
        />
        <CardContent>
          <MuiTypography
            variant="h5"
            gutterBottom
            className="text-blue-500 font-semibold line-clamp-2"
            sx={{ minHeight: "64px" }}
          >
            {project.title}
          </MuiTypography>

          <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
            {project.technologies
              .slice(0, 4)
              .map((tech: string, tIdx: number) => (
                <Chip
                  key={tIdx}
                  label={tech}
                  size="small"
                  className="bg-gray-200 text-gray-700"
                />
              ))}
            {project.technologies.length > 4 && (
              <Chip
                label={`+${project.technologies.length - 4}`}
                size="small"
                className="bg-gray-200 text-gray-500"
              />
            )}
          </Box>

          <MuiTypography
            variant="body2"
            color="text.secondary"
            className="text-gray-600 line-clamp-3"
            sx={{ minHeight: "60px" }}
          >
            {project.description}
          </MuiTypography>
        </CardContent>
      </CardActionArea>

      <CardActions className="p-4 pt-0">
        {project.category !== "ML" && project.githubLink && (
          <MuiButton
            size="small"
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
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
            className="text-blue-600 hover:text-blue-800"
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
            className="bg-blue-500 text-white hover:bg-blue-600"
            variant="contained"
          >
            Live Demo
          </MuiButton>
        )}
      </CardActions>
    </Card>
  </motion.div>
);

// Filter button component
const FilterButton = React.memo(
  ({
    category,
    selected,
    onClick,
    count,
  }: {
    category: "ML" | "Full Stack";
    selected: boolean;
    onClick: () => void;
    count: number;
  }) => (
    <button
      className={`px-4 py-2 mx-2 rounded-lg font-medium transition-all duration-200 ${
        selected
          ? "bg-blue-500 text-white shadow-md scale-105"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
      onClick={onClick}
      aria-label={`Show ${category} projects`}
    >
      {category} <span className="font-bold">({count})</span>
    </button>
  )
);
FilterButton.displayName = "FilterButton";

const ShowcaseProjects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<"ML" | "Full Stack">(
    "ML"
  );
  const [isLoading, setIsLoading] = useState(false);

  // Memoized project data
  const { filteredProjects, categoryCounts } = useMemo(() => {
    const filtered = projects.filter(
      (project) => project.category === selectedCategory
    );

    const counts = {
      ML: projects.filter((p) => p.category === "ML").length,
      "Full Stack": projects.filter((p) => p.category === "Full Stack").length,
    };

    return { filteredProjects: filtered, categoryCounts: counts };
  }, [selectedCategory]);

  // Smoother category transitions
  const handleCategoryChange = useCallback((category: "ML" | "Full Stack") => {
    setIsLoading(true);
    setSelectedCategory(category);
    // Faster timeout for better UX
    setTimeout(() => setIsLoading(false), 200);
  }, []);

  return (
    <>
      <Element name="project" id="project" />

      {/* Particle background */}
      <Suspense fallback={<div className="h-24 bg-primary" />}>
        <Particle />
      </Suspense>

      {/* Header section */}
      <header className="bg-primary">
        <h1 className="text-white font-bold pb-4 pt-8 text-4xl md:text-5xl text-center">
          Projects
        </h1>

        <div className="flex justify-center pb-6">
          <FilterButton
            category="ML"
            selected={selectedCategory === "ML"}
            onClick={() => handleCategoryChange("ML")}
            count={categoryCounts.ML}
          />
          <FilterButton
            category="Full Stack"
            selected={selectedCategory === "Full Stack"}
            onClick={() => handleCategoryChange("Full Stack")}
            count={categoryCounts["Full Stack"]}
          />
        </div>
      </header>

      {/* Project grid - FIXED CATEGORY SWITCHING */}
      <div className="bg-gradient-to-t from-tertiary via-secondary to-primary min-h-screen">
        <div className="container mx-auto px-4 py-8 md:px-8 md:py-12">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[...Array(6)].map((_, idx) => (
                <ProjectSkeleton key={idx} />
              ))}
            </div>
          ) : (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              key={selectedCategory} // Key forces re-render when category changes
            >
              {filteredProjects.map((project, idx) => (
                <ProjectCard
                  key={`${project.title}-${idx}`}
                  project={project}
                  idx={idx}
                />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-white text-xl mb-2 font-medium">
                No projects found in {selectedCategory} category
              </p>
              <p className="text-gray-300">
                Try selecting a different category above
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black py-6">
        <p className="text-white text-center">
          View latest ML work{" "}
          <a
            className="text-blue-500 hover:text-blue-300 underline hover:no-underline transition-colors"
            href="https://drive.google.com/drive/folders/1mHck6iYmK467WHiDhVrYUrUECEyWdp4C?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
        </p>
      </footer>

      {/* Inline styles for line clamping */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default ShowcaseProjects;
