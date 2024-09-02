"use client";
import React, { useState, useEffect } from "react";
import { ArrowUpIcon } from "@heroicons/react/20/solid";

const GoToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const topThreshold = 100;
      const bottomThreshold = 100;

      if (
        scrollY < topThreshold ||
        scrollY + windowHeight + bottomThreshold >= documentHeight
      ) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="z-1000 fixed bottom-4 right-1 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300"
        >
          <ArrowUpIcon className="h-4 w-4 z-1000" />
        </button>
      )}
    </div>
  );
};

export default GoToTopButton;
