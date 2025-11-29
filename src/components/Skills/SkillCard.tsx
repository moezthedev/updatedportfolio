"use client";

import React, { memo, useState, useRef, useEffect, useCallback } from "react";
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

  // Optimized Intersection Observer with throttling
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Throttle animation triggers to prevent overwhelming mobile devices
          timeoutId = setTimeout(() => {
            setIsInView(true);
          }, Math.min(categoryIndex * 50 + index * 30, 1000)); // Faster, capped at 1s
        }
      },
      {
        threshold: 0.05,
        rootMargin: "100px", // Start animation earlier for smoother scrolling
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [categoryIndex, index]);

  const handleImageLoad = useCallback(() => {
    requestAnimationFrame(() => setIsLoaded(true));
  }, []);

  const handleImageError = useCallback(() => {
    requestAnimationFrame(() => {
      setImageError(true);
      setIsLoaded(true);
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative bg-white/10 backdrop-blur-sm p-4 rounded-2xl shadow-lg hover:shadow-xl border border-white/30 hover:border-white/50 transition-all duration-300 ease-out hover:bg-white/15 transform hover:-translate-y-1 ${
        isInView
          ? "animate-slide-up-mobile opacity-100"
          : "opacity-0 translate-y-4"
      }`}
      style={{
        animationDelay: `${Math.min(categoryIndex * 50 + index * 30, 1000)}ms`,
        animationDuration: "0.3s",
        animationFillMode: "forwards",
        willChange: isInView ? "transform, opacity" : "auto",
        transform: "translate3d(0, 0, 0)", // Better hardware acceleration
        backfaceVisibility: "hidden",
      }}
    >
      {/* Optimized glow effect - reduced blur for mobile */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-75 transition-opacity duration-300 blur-lg scale-105" />

      {/* Proficiency ring - simplified for mobile */}
      <div className="absolute -top-2 -right-2 w-7 h-7">
        <svg className="w-7 h-7 transform -rotate-90" viewBox="0 0 32 32">
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
            className="transition-all duration-600 ease-out"
            style={{
              transitionDelay: `${Math.min(
                categoryIndex * 50 + index * 30 + 150,
                1150
              )}ms`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-white/80">{skill.level}</span>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center space-y-3">
        {/* Image container with optimized loading */}
        <div className="relative w-14 h-14 flex items-center justify-center">
          {!isLoaded && (
            <div className="w-14 h-14 bg-gradient-to-br from-white/20 to-white/10 animate-pulse rounded-xl" />
          )}

          {!imageError ? (
            <Image
              src={skill.url}
              alt={`${skill.name} logo`}
              title={skill.name}
              width={56}
              height={56}
              className={`w-14 h-14 object-contain group-hover:scale-110 group-hover:rotate-2 transition-transform duration-300 ease-out ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              priority={index < 6} // Increased priority count for better loading
              loading={index < 6 ? "eager" : "lazy"}
            />
          ) : (
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {skill.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Skill name with optimized typography */}
        <span className="text-white text-xs font-semibold text-center leading-tight group-hover:text-blue-200 transition-colors duration-200">
          {skill.name}
        </span>

        {/* Proficiency bar - simplified animation */}
        <div className="w-full bg-white/20 rounded-full h-1 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-500 ease-out"
            style={{
              width: isInView ? `${skill.level}%` : "0%",
              transitionDelay: `${Math.min(
                categoryIndex * 50 + index * 30 + 200,
                1200
              )}ms`,
            }}
          />
        </div>
      </div>

      {/* Simplified ripple effect */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-white/15 to-white/5 rounded-2xl scale-0 group-active:scale-100 transition-transform duration-200 ease-out" />
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
