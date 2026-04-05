"use client";
import React, { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Element } from "react-scroll";
import { projects } from "./ProjectDetails"; // Import your project details

// Helper function to extract YouTube video ID
const getYoutubeVideoId = (url: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : "";
};

// Project card skeleton
const ProjectSkeleton = () => (
  <div className="h-full relative">
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl animate-pulse"></div>
    <div className="relative h-full p-6 flex flex-col">
      <div className="w-full h-48 bg-gray-700 rounded-xl mb-4 animate-pulse"></div>
      <div className="h-6 bg-gray-700 rounded mb-3 animate-pulse"></div>
      <div className="flex gap-2 mb-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-6 w-16 bg-gray-700 rounded-full animate-pulse"
          ></div>
        ))}
      </div>
      <div className="flex-1 space-y-2 mb-6">
        <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded animate-pulse w-1/2"></div>
      </div>
      <div className="h-10 bg-gray-700 rounded-lg animate-pulse"></div>
    </div>
  </div>
);

// Project card component
const ProjectCard = ({
  project,
  idx,
  onWatchDemo,
}: {
  project: any;
  idx: number;
  onWatchDemo: (url: string) => void;
}) => (
  <motion.div
    className="h-full"
    initial={{ opacity: 0, y: 15 }}
    whileHover={{ scale: 1.02, y: -3 }}
    whileInView={{
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: idx * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }}
    viewport={{ once: true, margin: "-30px", amount: 0.2 }}
    style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
    key={`${project.title}-${idx}`}
  >
    <div className="h-full relative group">
      {/* Glassmorphism card background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl"></div>

      {/* Content */}
      <div className="relative h-full p-6 flex flex-col">
        {/* Image */}
        <div className="relative mb-4 overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
          {project.imageUrl ? (
            <Image
              src={project.imageUrl.src}
              alt={project.title}
              width={400}
              height={192}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-48 flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-purple-500/10">
              <div className="text-center">
                <div className="text-4xl mb-2">🤖</div>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500/50 scrollbar-track-transparent pr-2">
          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 min-h-[3.5rem]">
            {project.title}
          </h3>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies
              .slice(0, 4)
              .map((tech: string, tIdx: number) => (
                <span
                  key={tIdx}
                  className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 text-sm rounded-full border border-blue-400/30 backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            {project.technologies.length > 4 && (
              <span className="px-3 py-1 bg-gradient-to-r from-gray-500/20 to-gray-600/20 text-gray-300 text-sm rounded-full border border-gray-400/30 backdrop-blur-sm">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed mb-6">
            {project.description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-auto">
          {project.category !== "ML" &&
            project.category !== "GenAI and AI Agent Apps" &&
            project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-600 text-white text-center rounded-lg hover:from-gray-600 hover:to-gray-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                GitHub
              </a>
            )}
          {project.category === "ML" && project.colabLink && (
            <a
              href={project.colabLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View Demo
            </a>
          )}
          {project.category === "Full Stack" && project.liveDemoLink && (
            <a
              href={project.liveDemoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Live Demo
            </a>
          )}
          {project.category === "GenAI and AI Agent Apps" &&
            project.youtubeLink && (
              <button
                onClick={() => onWatchDemo(project.youtubeLink!)}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-center rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                title="Watch demo video"
              >
                Watch Demo
              </button>
            )}
          {project.category === "GenAI and AI Agent Apps" &&
            project.liveDemoLink &&
            !project.youtubeLink && (
              <button
                className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-center rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg cursor-not-allowed opacity-75"
                disabled
                title="Coming soon after thorough testing"
              >
                Coming Soon
              </button>
            )}
        </div>
      </div>
    </div>
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
    category: "AI & ML" | "Full Stack" | "GenAI and AI Agent Apps";
    selected: boolean;
    onClick: () => void;
    count: number;
  }) => (
    <button
      className={`relative px-6 py-3 mx-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
        selected
          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-2xl shadow-blue-500/25"
          : "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 hover:shadow-lg"
      }`}
      onClick={onClick}
      aria-label={`Show ${category} projects`}
    >
      <span className="relative z-10">{category}</span>
      <span
        className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
          selected ? "bg-white/20" : "bg-blue-500/20 text-blue-300"
        }`}
      >
        ({count})
      </span>
      {selected && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl blur opacity-50"></div>
      )}
    </button>
  ),
);
FilterButton.displayName = "FilterButton";

const ShowcaseProjects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    "AI & ML" | "Full Stack" | "GenAI and AI Agent Apps"
  >("AI & ML");
  const [isLoading, setIsLoading] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [youtubeVideo, setYoutubeVideo] = useState<string | null>(null);

  // Memoized project data
  const { filteredProjects, categoryCounts } = useMemo(() => {
    const categoryMap = {
      "AI & ML": "ML",
      "Full Stack": "Full Stack",
      "GenAI and AI Agent Apps": "GenAI and AI Agent Apps",
    };

    const dataCategory =
      categoryMap[selectedCategory as keyof typeof categoryMap] ||
      selectedCategory;
    const filtered = projects.filter(
      (project) => project.category === dataCategory,
    );

    const counts = {
      "AI & ML": projects.filter((p) => p.category === "ML").length,
      "Full Stack": projects.filter((p) => p.category === "Full Stack").length,
      "GenAI and AI Agent Apps": projects.filter(
        (p) => p.category === "GenAI and AI Agent Apps",
      ).length,
    };

    return { filteredProjects: filtered, categoryCounts: counts };
  }, [selectedCategory]);

  // Smoother category transitions
  const handleCategoryChange = useCallback(
    (category: "AI & ML" | "Full Stack" | "GenAI and AI Agent Apps") => {
      setIsLoading(true);
      setSelectedCategory(category);
      setVisibleProjects(6); // Reset visible projects when category changes
      // Faster timeout for better UX
      setTimeout(() => setIsLoading(false), 200);
    },
    [],
  );

  const handleLoadMore = () => {
    setVisibleProjects((prev) => prev + 6);
  };
  const handleWatchDemo = (youtubeUrl: string) => {
    setYoutubeVideo(youtubeUrl);
  };

  const closeYoutubePlayer = () => {
    setYoutubeVideo(null);
  };
  const displayedProjects = filteredProjects.slice(0, visibleProjects);
  const hasMoreProjects = visibleProjects < filteredProjects.length;

  return (
    <>
      <Element name="project" id="project" />

      {/* Header section */}
      <header className="bg-primary">
        <h1 className="text-white font-bold pb-4 pt-8 text-4xl md:text-5xl text-center">
          AI Engineering Projects
        </h1>

        <div className="flex flex-wrap justify-center pb-6 gap-2">
          <FilterButton
            category="AI & ML"
            selected={selectedCategory === "AI & ML"}
            onClick={() => handleCategoryChange("AI & ML")}
            count={categoryCounts["AI & ML"]}
          />
          <FilterButton
            category="Full Stack"
            selected={selectedCategory === "Full Stack"}
            onClick={() => handleCategoryChange("Full Stack")}
            count={categoryCounts["Full Stack"]}
          />
          <FilterButton
            category="GenAI and AI Agent Apps"
            selected={selectedCategory === "GenAI and AI Agent Apps"}
            onClick={() => handleCategoryChange("GenAI and AI Agent Apps")}
            count={categoryCounts["GenAI and AI Agent Apps"]}
          />
        </div>
      </header>

      {/* Project grid/gallery */}
      <div className="bg-gradient-to-t from-tertiary via-secondary to-primary min-h-screen">
        <div className="container mx-auto px-4 py-8 md:px-8 md:py-12">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:flex lg:gap-6 lg:overflow-x-auto lg:pb-4 lg:snap-x lg:snap-mandatory">
              {[...Array(6)].map((_, idx) => (
                <div key={idx} className="lg:flex-shrink-0 lg:w-80">
                  <ProjectSkeleton />
                </div>
              ))}
            </div>
          ) : (
            <div
              className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:flex lg:gap-6 lg:overflow-x-auto lg:pb-4 lg:snap-x lg:snap-mandatory scrollbar-thin scrollbar-thumb-blue-500/80 scrollbar-track-transparent scrollbar-thumb-rounded-full hover:scrollbar-thumb-blue-400/90 scrollbar-w-2"
              key={selectedCategory}
            >
              {displayedProjects.map((project, idx) => (
                <div
                  key={`${project.title}-${idx}`}
                  className="lg:flex-shrink-0 lg:w-80"
                >
                  <ProjectCard
                    project={project}
                    idx={idx}
                    onWatchDemo={handleWatchDemo}
                  />
                </div>
              ))}
              {/* Load More Button - Inside Gallery */}
              {!isLoading && hasMoreProjects && (
                <div className="hidden lg:flex lg:flex-shrink-0 lg:items-center lg:justify-center lg:w-80 lg:px-4">
                  <button
                    onClick={handleLoadMore}
                    className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    title="Load more projects"
                  >
                    <span className="text-sm">Load More</span>
                    <svg
                      className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Load More Button - Mobile/Tablet */}
          {!isLoading && hasMoreProjects && (
            <div className="flex justify-center mt-8 lg:hidden">
              <button
                onClick={handleLoadMore}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Load More Projects
              </button>
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

      {/* YouTube Video Modal */}
      {youtubeVideo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl">
            {/* Close Button */}
            <button
              onClick={closeYoutubePlayer}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-300"
            >
              <svg
                className="w-6 h-6"
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

            {/* Video Player */}
            <div className="relative pt-[56.25%]">
              <iframe
                src={`https://www.youtube.com/embed/${getYoutubeVideoId(youtubeVideo)}?autoplay=1&rel=0`}
                className="absolute inset-0 w-full h-full rounded-2xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube Video Player"
              />
            </div>
          </div>
        </div>
      )}

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
