"use client";

import React, { memo, useState, useRef, useEffect } from "react";
import SkillCard from "./SkillCard";

interface Skill {
  name: string;
  url: string;
  level: number;
}

interface Category {
  category: string;
  icon: string;
  skills: Skill[];
}

interface CategorySectionProps {
  category: Category;
  categoryIndex: number;
}

// Category section component
const CategorySection = memo<CategorySectionProps>(
  ({ category, categoryIndex }) => {
    const [isInView, setIsInView] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // Reduced delay for mobile performance
            setTimeout(() => setIsInView(true), categoryIndex * 100);
          }
        },
        {
          threshold: 0.1,
          rootMargin: "50px", // Start animation earlier
        }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => observer.disconnect();
    }, [categoryIndex]);

    return (
      <div
        ref={sectionRef}
        className={`space-y-6 ${
          isInView ? "animate-fade-in-mobile" : "opacity-0"
        }`}
        style={{
          animationDelay: `${categoryIndex * 100}ms`,
          animationFillMode: "forwards",
          willChange: isInView ? "opacity, transform" : "auto",
          transform: "translateZ(0)", // Force hardware acceleration
        }}
      >
        {/* Category Header */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-3 px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="text-xl">{category.icon}</span>
            <h2 className="text-white font-bold text-lg">
              {category.category}
            </h2>
          </div>
        </div>

        {/* Skills Grid - optimized for mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {category.skills.map((skill, index) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={index}
              categoryIndex={categoryIndex}
            />
          ))}
        </div>
      </div>
    );
  }
);

CategorySection.displayName = "CategorySection";

export default CategorySection;
