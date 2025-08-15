"use client";
import React, { memo, useCallback } from "react";
import Image from "next/image";
import {
  HeartIcon,
  CodeBracketIcon,
  EnvelopeIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/solid";
import LogoImg from "@/app/assets/logomain.png";
import Github from "@/app/assets/github.svg";
import Linkedin from "@/app/assets/linkedin.svg";

const Footer: React.FC = memo(() => {
  const currentYear = new Date().getFullYear();

  // Social media links data
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/moezthedev/",
      icon: Github,
      hoverColor: "hover:bg-gray-700",
      ariaLabel: "Visit my GitHub profile",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/moezdev/",
      icon: Linkedin,
      hoverColor: "hover:bg-blue-600",
      ariaLabel: "Connect with me on LinkedIn",
    },
  ];

  // Navigation links
  const quickLinks = [
    { name: "Home", href: "#" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const handleSocialClick = useCallback((url: string): void => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  const handleScrollToTop = useCallback((): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleEmailClick = useCallback((): void => {
    window.location.href = "mailto:moizahsan5@gmail.com";
  }, []);

  return (
    <footer className="relative bg-gradient-to-t from-tertiary via-primary to-secondary text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-400 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-40 h-40 bg-purple-400 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="group cursor-pointer" onClick={handleScrollToTop}>
              <Image
                src={LogoImg}
                alt="Moez Ahsan Logo"
                className="w-16 h-16 md:w-20 md:h-20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                priority
              />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Moez Ahsan
              </h3>
              <p className="text-white/70 text-sm mt-1">AI/ML Engineer</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center space-y-4">
            <h4 className="text-lg font-semibold text-white/90">Quick Links</h4>
            <nav className="flex flex-wrap justify-center gap-4">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white/70 hover:text-blue-300 text-sm font-medium transition-colors duration-300 hover:underline underline-offset-4"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="flex flex-col items-center md:items-end space-y-4">
            <h4 className="text-lg font-semibold text-white/90">
              Lets Connect
            </h4>

            {/* Email */}
            <button
              onClick={handleEmailClick}
              className="group flex items-center space-x-2 text-white/70 hover:text-blue-300 transition-colors duration-300"
              aria-label="Send me an email"
            >
              <EnvelopeIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm">moizahsan5@gmail.com</span>
            </button>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <button
                  key={social.name}
                  onClick={() => handleSocialClick(social.url)}
                  className={`group p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 ${social.hoverColor} transition-all duration-300 hover:scale-110 hover:shadow-lg hover:border-white/40`}
                  aria-label={social.ariaLabel}
                  title={social.name}
                >
                  <Image
                    src={social.icon}
                    alt={`${social.name} icon`}
                    className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-300"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20">
          {/* Bottom Section */}
          <div className="py-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-sm text-white/60">
              <span>&copy; {currentYear}</span>
              <span className="font-semibold text-white/80">Moez Ahsan.</span>
              <span className="hidden sm:inline">All Rights Reserved.</span>
            </div>

            {/* Made with love */}
            <div className="flex items-center space-x-2 text-sm text-white/60">
              <span>Made with</span>
              <HeartIcon className="w-4 h-4 text-red-400 animate-pulse" />
              <span>and</span>
              <CodeBracketIcon className="w-4 h-4 text-blue-400" />
              <span className="hidden sm:inline">in Pakistan</span>
            </div>

            {/* Scroll to top button */}
            <button
              onClick={handleScrollToTop}
              className="group flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105"
              aria-label="Scroll to top"
              title="Back to top"
            >
              <ArrowUpIcon className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
              <span className="text-xs font-medium hidden sm:inline">Top</span>
            </button>
          </div>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        .animate-twinkle {
          animation: twinkle ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
