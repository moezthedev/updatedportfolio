"use client";
import React, { useState, useEffect, useCallback, memo } from "react";
import { ArrowUpIcon } from "@heroicons/react/20/solid";

const GoToTopButton: React.FC = memo(() => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const handleScroll = useCallback(() => {
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const topThreshold = 300; // Increased for better UX
    const bottomThreshold = 100;

    // Calculate scroll progress for visual feedback
    const maxScroll = documentHeight - windowHeight;
    const progress = Math.min(scrollY / maxScroll, 1);
    setScrollProgress(progress);

    // Show/hide button logic
    if (
      scrollY < topThreshold ||
      scrollY + windowHeight + bottomThreshold >= documentHeight
    ) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    // Throttle scroll events for better performance
    let timeoutId: NodeJS.Timeout;
    const throttledHandleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 10);
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="group fixed bottom-6 right-6 z-[9999] flex items-center justify-center w-14 h-14 bg-gradient-to-t from-tertiary via-primary to-secondary hover:from-tertiary hover:to-secondary text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 transition-all duration-300 ease-out backdrop-blur-sm border border-blue-500/30 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
      aria-label="Scroll to top"
      title="Back to top"
    >
      {/* Progress ring */}
      <svg
        className="absolute inset-0 w-14 h-14 transform -rotate-90"
        viewBox="0 0 56 56"
      >
        <circle
          cx="28"
          cy="28"
          r="26"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-blue-300/30"
        />
        <circle
          cx="28"
          cy="28"
          r="26"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeDasharray={`${2 * Math.PI * 26}`}
          strokeDashoffset={`${2 * Math.PI * 26 * (1 - scrollProgress)}`}
          className="text-blue-200 transition-all duration-300 ease-out"
          strokeLinecap="round"
        />
      </svg>

      {/* Arrow icon with animation */}
      <ArrowUpIcon className="w-6 h-6 relative z-10 group-hover:animate-bounce" />

      {/* Pulse effect on hover */}
      <div className="absolute inset-0 rounded-full bg-blue-400/20 scale-0 group-hover:scale-150 transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100" />
    </button>
  );
});

GoToTopButton.displayName = "GoToTopButton";

export default GoToTopButton;
