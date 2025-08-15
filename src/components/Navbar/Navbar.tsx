"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link as ScrollLink } from "react-scroll";
import logoMain from "@/app/assets/logomain.png";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Navigation items configuration
const NAV_ITEMS = [
  { id: "home", label: "Home", href: "#" },
  { id: "skills", label: "Skills", to: "skills" },
  { id: "project", label: "Projects", to: "project" },
  { id: "roadmap", label: "Roadmap", to: "roadmap" },
  { id: "contact", label: "Contact", to: "contact" },
] as const;

// Animation variants
const logoVariants = {
  initial: { opacity: 0, x: -50, scale: 0.8 },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  hover: {
    rotate: 360,
    transition: { duration: 0.8, ease: "easeInOut" },
  },
};

const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const menuItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.3,
      ease: "easeOut",
    },
  }),
};

// Optimized navigation item component
const NavItem = React.memo<{
  item: (typeof NAV_ITEMS)[number];
  onClick?: () => void;
  className?: string;
}>(({ item, onClick, className = "" }) => {
  if (item.id === "home") {
    return (
      <li className={className}>
        <a
          href={item.href}
          className="hover:text-gray-400 transition-colors duration-200 focus:outline-none focus:text-gray-300 z-100"
          onClick={onClick}
        >
          {item.label}
        </a>
      </li>
    );
  }

  return (
    <li className={className}>
      <ScrollLink
        to={item.to!}
        smooth={true}
        offset={-100}
        duration={500}
        className="cursor-pointer hover:text-gray-400 transition-colors duration-200 focus:outline-none focus:text-gray-300"
        onClick={onClick}
        activeClass="text-blue-400"
        spy={true}
      >
        {item.label}
      </ScrollLink>
    </li>
  );
});

NavItem.displayName = "NavItem";

// Hamburger menu component
const HamburgerIcon = React.memo<{
  isOpen: boolean;
  onClick: () => void;
}>(({ isOpen, onClick }) => (
  <button
    onClick={onClick}
    className="lg:hidden text-white focus:outline-none focus:ring-2 focus:ring-blue-400 rounded p-1 transition-all duration-200"
    aria-label={isOpen ? "Close menu" : "Open menu"}
    aria-expanded={isOpen}
  >
    <div className="w-6 h-6 relative">
      <motion.span
        className="absolute block w-full h-0.5 bg-white transform transition-all duration-300"
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 8 : 0,
        }}
        style={{ top: "6px" }}
      />
      <motion.span
        className="absolute block w-full h-0.5 bg-white transform transition-all duration-300"
        animate={{
          opacity: isOpen ? 0 : 1,
        }}
        style={{ top: "12px" }}
      />
      <motion.span
        className="absolute block w-full h-0.5 bg-white transform transition-all duration-300"
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -8 : 0,
        }}
        style={{ top: "18px" }}
      />
    </div>
  </button>
));

HamburgerIcon.displayName = "HamburgerIcon";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Optimized scroll handler with dynamic visibility
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;

    // Keep the scrolled style change if you want
    setIsScrolled(scrollY > 50);

    // Always visible
    setIsVisible(true);

    setLastScrollY(scrollY);
  }, []);

  // Throttled scroll handler to improve performance
  const throttledScrollHandler = useMemo(() => {
    let ticking = false;
    return () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    window.addEventListener("scroll", throttledScrollHandler, {
      passive: true,
    });
    return () => {
      window.removeEventListener("scroll", throttledScrollHandler);
    };
  }, [throttledScrollHandler]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (isMenuOpen) {
      const handleClickOutside = () => setIsMenuOpen(false);
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsMenuOpen(false);
      };

      document.addEventListener("click", handleClickOutside);
      document.addEventListener("keydown", handleEscape);

      return () => {
        document.removeEventListener("click", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isMenuOpen]);

  const toggleMenu = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Memoize navbar classes with dynamic visibility
  const navbarClasses = useMemo(
    () =>
      `fixed top-0 left-0 right-0 ${
        isScrolled
          ? "bg-primary/95 shadow-2xl backdrop-blur-lg"
          : "bg-gray-1100/80 shadow-lg backdrop-blur-sm"
      } border-white-600 text-white p-4 lg:p-6 flex justify-between lg:justify-around items-center z-50 transition-all duration-500 ease-in-out transform ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-90"
      }`,
    [isScrolled, isVisible]
  );

  const logoClasses = useMemo(
    () =>
      `transition-all duration-300 ease-in-out ${
        isScrolled ? "w-[80px] h-[80px]" : "w-[60px] h-[60px]"
      }`,
    [isScrolled]
  );

  return (
    <>
      <nav className={navbarClasses}>
        {/* Logo */}
        <motion.div
          variants={logoVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="cursor-pointer"
        >
          <Image
            className={logoClasses}
            src={logoMain}
            alt="Logo"
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Km5Oj9v8ApqDn3P8AfVBjNvFfhKhWOk5XgPIKJBTyb1BT0stX5Dn/AP/Z"
            width={isScrolled ? 80 : 60}
            height={isScrolled ? 80 : 60}
          />
        </motion.div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex space-x-8 font-bold text-lg">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.id} item={item} />
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <HamburgerIcon isOpen={isMenuOpen} onClick={toggleMenu} />
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="lg:hidden fixed inset-0 top-[88px] bg-gray-900/95 backdrop-blur-md z-40"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                >
                  <NavItem
                    item={item}
                    onClick={closeMenu}
                    className="border-b border-gray-700/70 p-6 text-xl font-semibold text-white hover:text-gray-400 hover:bg-gray-800/50 transition-all duration-200"
                  />
                </motion.div>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 bg-black/20 z-30"
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
