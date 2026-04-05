"use client";
import React, { memo, useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  HeartIcon,
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BuildingOfficeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

interface Mentor {
  name: string;
  role: string;
  company: string;
  image?: string;
  quote?: string;
  expertise?: string[];
  linkedin?: string;
}

interface MentorTributeProps {
  mentors: Mentor[];
}

// Enhanced mentor card component
const MentorCard = memo(
  ({
    mentor,
    index,
    isInView,
  }: {
    mentor: Mentor;
    index: number;
    isInView: boolean;
  }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleLinkedInClick = useCallback(() => {
      if (mentor.linkedin) {
        window.open(mentor.linkedin, "_blank", "noopener,noreferrer");
      }
    }, [mentor.linkedin]);

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          delay: index * 0.1,
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="group flex-shrink-0 w-80 sm:w-96 snap-center relative"
        style={{
          willChange: isInView ? "transform, opacity" : "auto",
          transform: "translateZ(0)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Card */}
        <div className="relative bg-gradient-to-t from-tertiary via-primary to-secondary backdrop-blur-xl border border-white/20 rounded-2xl p-8 h-full transition-all duration-500 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2">
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-3">
                {mentor.image ? (
                  <Image
                    src={mentor.image}
                    alt={mentor.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400/50"
                    unoptimized
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-white" />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                    {mentor.name}
                  </h3>
                  <div className="flex items-center space-x-1 text-gray-300 text-sm mt-1">
                    <span>{mentor.role}</span>
                  </div>
                </div>
              </div>

              {/* LinkedIn button */}
              {mentor.linkedin && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleLinkedInClick}
                  className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-300"
                  aria-label={`Connect with ${mentor.name} on LinkedIn`}
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.button>
              )}
            </div>

            <div className="flex items-center justify-center space-x-2 mb-4">
              <BuildingOfficeIcon className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300 text-sm font-medium">
                {mentor.company}
              </span>
            </div>

            {/* Quote */}
            {mentor.quote && (
              <blockquote className="flex-1 mb-6">
                <div className="text-6xl text-cyan-400/20 leading-none mb-2"></div>
                <p className="text-gray-200 italic leading-relaxed -mt-6 pl-8">
                  {mentor.quote}
                </p>
              </blockquote>
            )}

            {/* Expertise Tags */}
            {mentor.expertise && (
              <div className="mt-auto">
                <div className="flex flex-wrap gap-2">
                  {mentor.expertise.slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full border border-cyan-400/30"
                    >
                      {skill}
                    </span>
                  ))}
                  {mentor.expertise.length > 3 && (
                    <span className="px-3 py-1 bg-gray-600/30 text-gray-300 text-xs rounded-full">
                      +{mentor.expertise.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Decorative elements - simplified for mobile performance */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <HeartIcon className="w-5 h-5 text-pink-400" />
            </div>
          </div>

          {/* Border gradient animation */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 p-[1px]">
              <div className="w-full h-full rounded-2xl bg-transparent" />
            </div>
          </div>
        </div>
      </motion.div>
    );
  },
);

MentorCard.displayName = "MentorCard";

const MentorTributeSlider: React.FC<MentorTributeProps> = memo(
  ({ mentors }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, {
      once: true,
      amount: 0.15,
      margin: "0px 0px -100px 0px",
    });

    // Navigation functions
    const scrollToIndex = useCallback((index: number) => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const cardWidth = 384 + 24; // card width + gap
        container.scrollTo({
          left: index * cardWidth,
          behavior: "smooth",
        });
        setCurrentIndex(index);
      }
    }, []);

    const nextSlide = useCallback(() => {
      const newIndex = currentIndex < mentors.length - 1 ? currentIndex + 1 : 0;
      scrollToIndex(newIndex);
    }, [currentIndex, mentors.length, scrollToIndex]);

    const prevSlide = useCallback(() => {
      const newIndex = currentIndex > 0 ? currentIndex - 1 : mentors.length - 1;
      scrollToIndex(newIndex);
    }, [currentIndex, mentors.length, scrollToIndex]);

    // Auto-scroll effect
    useEffect(() => {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);

      return () => clearInterval(interval);
    }, [nextSlide]);

    return (
      <section
        ref={sectionRef}
        className="relative bg-gradient-to-t from-tertiary via-primary to-secondary text-white py-20 px-4 overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "4s" }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="inline-flex items-center space-x-3 mb-6 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20"
              style={{ willChange: isInView ? "transform, opacity" : "auto" }}
            >
              <HeartIcon className="w-6 h-6 text-pink-400 animate-pulse" />
              <span className="text-lg font-semibold">
                Gratitude & Inspiration
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent leading-tight"
              style={{ willChange: isInView ? "transform, opacity" : "auto" }}
            >
              Tribute to Incredible Mentors
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.4,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed"
              style={{ willChange: isInView ? "transform, opacity" : "auto" }}
            >
              The extraordinary individuals who shaped my journey with their
              wisdom, guidance, and unwavering support
            </motion.p>
          </div>

          {/* Slider Container */}
          <div className="relative">
            {/* Cards Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-2 pb-4 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {mentors.map((mentor, index) => (
                <MentorCard
                  key={`${mentor.name}-${index}`}
                  mentor={mentor}
                  index={index}
                  isInView={isInView}
                />
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center space-x-2 mt-8">
              {mentors.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-cyan-400 scale-125"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to mentor ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Bottom Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 0.4,
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="text-center mt-16"
            style={{ willChange: isInView ? "transform, opacity" : "auto" }}
          >
            <div className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
              <HeartIcon className="w-8 h-8 text-pink-400 mx-auto mb-4 animate-pulse" />
              <p className="text-gray-300 text-lg leading-relaxed">
                Thank you to each of my mentors for inspiring me with your time,
                energy, and wisdom. Your guidance has been invaluable in shaping
                who I am today and who I aspire to become tomorrow.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Custom Styles */}
        <style jsx>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </section>
    );
  },
);

MentorTributeSlider.displayName = "MentorTributeSlider";

export default MentorTributeSlider;
