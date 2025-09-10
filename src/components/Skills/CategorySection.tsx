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
            setIsInView(true);
          }
        },
        { threshold: 0.1 }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => observer.disconnect();
    }, []);

    return (
      <div
        ref={sectionRef}
        className={`space-y-8 ${isInView ? "animate-fade-in" : "opacity-0"}`}
        style={{
          animationDelay: `${categoryIndex * 150}ms`,
          animationFillMode: "forwards",
        }}
      >
        {/* Category Header */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20">
            <span className="text-2xl">{category.icon}</span>
            <h2 className="text-white font-bold text-xl">
              {category.category}
            </h2>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
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
