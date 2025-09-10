import React, { memo } from "react";
import dynamic from "next/dynamic";
import { SKILLS_DATA } from "./skillsData";

// Dynamically import client components
const CategorySection = dynamic(() => import("./CategorySection"), {
  ssr: false,
  loading: () => <div className="text-white text-center py-8">Loading skills...</div>,
});

const Skills = memo(() => {
  return (
    <section
      className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary via-primary to-secondary overflow-hidden"
      id="skills"
      aria-labelledby="skills-heading"
    >
      {/* Optimized background decoration for mobile */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-blue-400/5 rounded-full blur-2xl sm:blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-56 h-56 sm:w-80 sm:h-80 bg-purple-400/5 rounded-full blur-2xl sm:blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-pink-400/3 rounded-full blur-xl sm:blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Optimized grid pattern - disabled on mobile for performance */}
      <div className="absolute inset-0 opacity-5 hidden sm:block">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
            animation: "grid-move 30s linear infinite", // Slower animation
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Optimized Header */}
        <header className="text-center mb-12 sm:mb-16">
          <h1
            id="skills-heading"
            className="text-white font-black text-3xl sm:text-4xl lg:text-5xl xl:text-7xl mb-4 sm:mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight"
          >
            Skills & Expertise
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed px-2">
            A comprehensive toolkit of modern technologies and frameworks that
            power my development journey in AI/ML and Software Engineering.
          </p>

          {/* Stats */}
          <div className="flex justify-center items-center space-x-6 sm:space-x-8 mt-6 sm:mt-8">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {SKILLS_DATA.reduce((acc, cat) => acc + cat.skills.length, 0)}+
              </div>
              <div className="text-white/60 text-xs sm:text-sm">Technologies</div>
            </div>
            <div className="w-px h-10 sm:h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {SKILLS_DATA.length}
              </div>
              <div className="text-white/60 text-xs sm:text-sm">Categories</div>
            </div>
          </div>
        </header>

        {/* Categories */}
        <div className="space-y-12 sm:space-y-16">
          {SKILLS_DATA.map((category, categoryIndex) => (
            <CategorySection
              key={category.category}
              category={category}
              categoryIndex={categoryIndex}
            />
          ))}
        </div>
      </div>

      {/* SVG Gradients */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <linearGradient
            id="proficiency-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="50%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#F472B6" />
          </linearGradient>
        </defs>
      </svg>
    </section>
  );
});

Skills.displayName = "Skills";

export default Skills;
