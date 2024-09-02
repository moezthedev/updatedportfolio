"use client";
import React, { useState, useEffect } from "react";
import { Link as ScrollLink, Element } from "react-scroll";
import logoMain from "@/app/assets/logomain.png";
import { motion } from "framer-motion";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [click, setclick] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClick = () => {
    setclick(!click);
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const imgVariants = {
    initial: { opacity: 0, x: -100, scale: 0 },
    animate: {
      opacity: 1,
      x: 0,
      rotate: click ? 360 : 0,
      scale: 1,
      transition: { delay: 0.2, duration: 1, ease: "easeOut" },
    },
    exit: { opacity: 0, x: -100, scale: 1 },
  };

  return (
    <>
      <nav
        className={`sticky top-0 ${
          isScrolled ? "bg-primary" : "bg-gray-1100/200"
        } border-white-600 shadow-lg text-white p-8 flex justify-between lg:justify-around lg:items-center z-50 transition-colors duration-300 ease-in-out`}
      >
        <motion.h1
          initial="initial"
          animate="animate"
          onClick={handleClick}
          variants={imgVariants}
          className="cursor-pointer text-10xl font-bold "
        >
          <Image
            className={`transition-transform duration-300 ease-in-out ${
              isScrolled ? "w-[100px]" : "w-[70px]"
            }`}
            src={logoMain}
            alt="logo"
          />
        </motion.h1>
        <div className="lg:hidden sm:flex justify-between">
          <button
            onClick={toggleMenu}
            className={`text-3xl text-white focus:outline-none transition-transform transform ${
              isMenuOpen ? "rotate-0" : "rotate-180"
            }`}
          >
            <div>{isMenuOpen ? "✖" : "☰"}</div>
          </button>
        </div>
        <ul
          className={`lg:flex lg:space-x-8 font-bold text-lg ${
            isMenuOpen ? "hidden" : "hidden"
          } mt-4 lg:mt-0`}
        >
          <li>
            <a href="" className="hover:text-gray-400">
              Home
            </a>
          </li>
          <li>
            <ScrollLink
              to="skills"
              smooth={true}
              offset={-100}
              className="cursor-pointer hover:text-gray-400"
            >
              Skills
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="project"
              smooth={true}
              offset={-100}
              className="hover:text-gray-400 cursor-pointer"
            >
              Projects
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="services"
              smooth={true}
              offset={-100}
              className="hover:text-gray-400 cursor-pointer"
            >
              Services
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="contact"
              smooth={true}
              offset={-100}
              className="hover:text-gray-400 cursor-pointer"
            >
              Contact
            </ScrollLink>
          </li>
        </ul>
      </nav>
      {isMenuOpen && (
        <div className="backdrop-blur-md z-50 absolute w-[100vw] bg-gray-900/50 transition-transform transform transition-duration-300 ease-in-out">
          <ul className="">
            <li className="border-b-2 border-gray-700/70 p-6 text-xl font-semibold text-white hover:text-gray-400">
              <a href="#">Home</a>
            </li>
            <li className="border-b-2 border-gray-700/70 p-6 text-xl font-semibold text-white hover:text-gray-400">
              <ScrollLink
                onClick={toggleMenu}
                to="skills"
                smooth={true}
                offset={-100}
              >
                Skills
              </ScrollLink>
            </li>
            <li className="border-b-2 border-gray-700/70 p-6 text-xl font-semibold text-white hover:text-gray-400">
              <ScrollLink
                onClick={toggleMenu}
                to="project"
                smooth={true}
                offset={-100}
              >
                Projects
              </ScrollLink>
            </li>
            <li className="border-b-2 border-gray-700/70 p-6 text-xl font-semibold text-white hover:text-gray-400">
              <ScrollLink
                onClick={toggleMenu}
                to="services"
                smooth={true}
                offset={-100}
              >
                Services
              </ScrollLink>
            </li>
            <li className="border-b-2 border-gray-700/70 p-6 text-xl font-semibold text-white hover:text-gray-400">
              <ScrollLink
                onClick={toggleMenu}
                to="contact"
                smooth={true}
                offset={-100}
              >
                Get in Touch
              </ScrollLink>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
