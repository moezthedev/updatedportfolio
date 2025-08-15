"use client";
import React, { useState, useMemo, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Element } from "react-scroll";
import Image from "next/image";
import { projects } from "./ProjectDetails"; // Import projects from the original file

// Lazy load heavy components
const Particle = lazy(() => import("@/components/Particle/Particle"));

// Cool loading skeleton component
const ProjectSkeleton = () => (
  <div className="h-full animate-pulse">
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-gradient-x"></div>
      <div className="flex-grow p-4">
        <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-gradient-x rounded mb-3"></div>
        <div className="flex flex-wrap gap-1 mb-3">
          <div className="h-6 w-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-gradient-x rounded-full"></div>
          <div className="h-6 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-gradient-x rounded-full"></div>
          <div className="h-6 w-14 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-gradient-x rounded-full"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-gradient-x rounded"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-gradient-x rounded w-3/4"></div>
        </div>
      </div>
    </div>
  </div>
);

// Loading component for the entire grid
const GridLoader = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
    {Array.from({ length: 6 }).map((_, idx) => (
      <ProjectSkeleton key={idx} />
    ))}
  </div>
);

// Optimized Card component using Next.js Image
const ProjectCard = React.memo<{
  project: any;
  index: number;
}>(({ project, index }) => {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: index * 0.1, ease: "easeOut" },
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {/* Image container with Next.js Image and loading state */}
        <div className="relative h-48 bg-gray-100 overflow-hidden">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          )}
          <Image
            src={project.imageUrl?.src || "/placeholder-image.png"}
            alt={project.title || "Project image"}
            fill
            className={`object-contain transition-all duration-700 hover:scale-105 ${
              imageLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 3} // Prioritize first 3 images
          />
        </div>

        {/* Content */}
        <div className="flex-grow p-4">
          <h3 className="text-xl font-semibold text-blue-500 mb-3 line-clamp-2">
            {project.title}
          </h3>

          {/* Technology chips */}
          <div className="flex flex-wrap gap-1 mb-3">
            {project.technologies
              ?.slice(0, 4)
              .map((tech: string, tIdx: number) => (
                <span
                  key={tIdx}
                  className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full whitespace-nowrap"
                >
                  {tech}
                </span>
              ))}
            {project.technologies?.length > 4 && (
              <span className="px-2 py-1 text-xs bg-gray-200 text-gray-500 rounded-full">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>

          <p className="text-gray-600 text-sm line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Actions */}
        <div className="p-4 pt-0 flex gap-2 flex-wrap">
          {project.category !== "ML" && project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              GitHub
            </a>
          )}
          {project.category === "ML" && project.colabLink && (
            <a
              href={project.colabLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              View
            </a>
          )}
          {project.category === "Full Stack" && project.liveDemoLink && (
            <a
              href={project.liveDemoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = "ProjectCard";

// Optimized filter button component
const FilterButton = React.memo<{
  category: "ML" | "Full Stack";
  selected: boolean;
  onClick: () => void;
  count: number;
}>(({ category, selected, onClick, count }) => (
  <button
    className={`
      px-4 py-2 mx-2 rounded-lg font-medium transition-all duration-200
      ${
        selected
          ? "bg-blue-500 text-white shadow-md transform scale-105"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-sm"
      }
    `}
    onClick={onClick}
    aria-pressed={selected}
  >
    {category} ({count})
  </button>
));

FilterButton.displayName = "FilterButton";

// Main component
const ShowcaseProjects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<"ML" | "Full Stack">(
    "ML"
  );
  const [isLoading, setIsLoading] = useState(false);

  // Memoize filtered projects to avoid unnecessary re-calculations
  const { filteredProjects, categoryCounts } = useMemo(() => {
    // Ensure projects is defined and is an array
    if (!projects || !Array.isArray(projects)) {
      return {
        filteredProjects: [],
        categoryCounts: { ML: 0, "Full Stack": 0 },
      };
    }

    const filtered = projects.filter(
      (project) => project.category === selectedCategory
    );

    const counts = {
      ML: projects.filter((p) => p.category === "ML").length,
      "Full Stack": projects.filter((p) => p.category === "Full Stack").length,
    };

    return { filteredProjects: filtered, categoryCounts: counts };
  }, [selectedCategory]);

  // Animation variants for better performance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const handleCategoryChange = (category: "ML" | "Full Stack") => {
    setIsLoading(true);
    setSelectedCategory(category);

    // Simulate loading delay for smooth transition
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <>
      <Element name="project" id="project" />

      {/* Lazy load particle component with cool loader */}
      <Suspense
        fallback={
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin animate-ping"></div>
            </div>
          </div>
        }
      >
        <Particle />
      </Suspense>

      {/* Header with improved typography */}
      <header className="bg-primary">
        <h1 className="text-white font-bold pb-6 pt-8 text-4xl md:text-5xl text-center">
          Projects
        </h1>

        {/* Optimized filter bar */}
        <nav className="flex justify-center pb-6" role="tablist">
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
        </nav>
      </header>

      {/* Projects grid with improved animations */}
      <div
        className="bg-gradient-to-t from-tertiary via-secondary to-primary min-h-screen"
        id="project"
      >
        <div className="container mx-auto px-4 py-8 md:px-8 md:py-12">
          {isLoading ? (
            <GridLoader />
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              >
                {filteredProjects.map((project, idx) => (
                  <ProjectCard
                    key={`${selectedCategory}-${idx}`}
                    project={project}
                    index={idx}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Empty state */}
          {!isLoading && filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-white text-xl mb-2">
                No projects found in {selectedCategory} category
              </p>
              <p className="text-gray-300">
                Try selecting a different category above
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer with improved styling */}
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

      {/* Custom CSS for animations and line clamping */}
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
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 1.5s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default ShowcaseProjects;
