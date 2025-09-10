"use client";

import React, { memo, useState, useRef, useEffect } from "react";
import Image from "next/image";

interface Skill {
  name: string;
  url: string;
  level: number;
}

interface SkillCardProps {
  skill: Skill;
  index: number;
  categoryIndex: number;
}

// Enhanced skill card with proficiency indicator
const SkillCard = memo<SkillCardProps>(({ skill, index, categoryIndex }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative bg-white/10 backdrop-blur-lg p-5 rounded-2xl shadow-xl hover:shadow-2xl border border-white/30 hover:border-white/50 transition-all duration-500 ease-out hover:bg-white/20 transform hover:-translate-y-2 ${
        isInView ? "animate-slide-up opacity-100" : "opacity-0 translate-y-8"
      }`}
      style={{
        animationDelay: `${categoryIndex * 200 + index * 100}ms`,
        animationFillMode: "forwards",
      }}
    >
      {/* Animated glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl scale-110" />

      {/* Proficiency ring */}
      <div className="absolute -top-2 -right-2 w-8 h-8">
        <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
          <circle
            cx="16"
            cy="16"
            r="12"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2"
          />
          <circle
            cx="16"
            cy="16"
            r="12"
            fill="none"
            stroke="url(#proficiency-gradient)"
            strokeWidth="2"
            strokeDasharray={`${2 * Math.PI * 12}`}
            strokeDashoffset={`${
              2 * Math.PI * 12 * (1 - (isInView ? skill.level : 0) / 100)
            }`}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              transitionDelay: `${categoryIndex * 200 + index * 100 + 300}ms`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-white/80">{skill.level}</span>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
        {/* Image container with enhanced loading */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          {!isLoaded && (
            <div className="w-16 h-16 bg-gradient-to-br from-white/20 to-white/10 animate-pulse rounded-xl" />
          )}

          {!imageError ? (
            <Image
              src={skill.url}
              alt={`${skill.name} logo`}
              title={skill.name}
              width={64}
              height={64}
              className={`w-16 h-16 object-contain group-hover:scale-125 group-hover:rotate-3 transition-all duration-500 ease-out ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setIsLoaded(true)}
              onError={() => {
                setImageError(true);
                setIsLoaded(true);
              }}
              priority={index < 4}
            />
          ) : (
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
              {skill.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Skill name with enhanced typography */}
        <span className="text-white text-sm font-semibold text-center leading-tight group-hover:text-blue-200 transition-colors duration-300">
          {skill.name}
        </span>

        {/* Proficiency bar */}
        <div className="w-full bg-white/20 rounded-full h-1 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-1000 ease-out"
            style={{
              width: isInView ? `${skill.level}%` : "0%",
              transitionDelay: `${categoryIndex * 200 + index * 100 + 500}ms`,
            }}
          />
        </div>
      </div>

      {/* Enhanced ripple effect */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl scale-0 group-active:scale-100 transition-transform duration-300 ease-out" />
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
    </div>
  );
});

SkillCard.displayName = "SkillCard";

export default SkillCard;
