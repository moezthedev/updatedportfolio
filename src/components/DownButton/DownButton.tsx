"use client";
import React, { useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const DownwardButton: React.FC = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [shouldHide, setShouldHide] = useState<boolean>(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShouldHide(true);
      } else {
        setShouldHide(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      onClick={handleClick}
      className={`downward-button-container text-center ease-in-out cursor-pointer animate-bounce ${
        isClicked ? "rotate-180" : ""
      } ${shouldHide ? "hidden" : ""}`}
    >
      <ChevronDownIcon
        className={`h-6 w-6 text-blue-300 transform transition-transform ${
          isClicked ? "-rotate-90" : "rotate-0"
        }`}
      />
    </div>
  );
};

export default DownwardButton;
