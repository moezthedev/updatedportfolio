"use client";
import React, { memo, useMemo, useState, useRef, useEffect } from "react";
import Image from "next/image";

// Enhanced skill data with proficiency levels and descriptions
const SKILLS_DATA = [
  {
    category: "AI & Data Science",
    icon: "🤖",
    skills: [
      {
        name: "TensorFlow",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
        level: 88,
      },
      {
        name: "PyTorch",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
        level: 85,
      },
      {
        name: "LangChain",
        url: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/langchain.svg",
        level: 88,
      },
      {
        name: "Hugging Face",
        url: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/huggingface.svg",
        level: 80,
      },
      {
        name: "OpenAI",
        url: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/openai.svg",
        level: 85,
      },
      {
        name: "Anthropic",
        url: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/anthropic.svg",
        level: 78,
      },
      {
        name: "N8n",
        url: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/n8n.svg",
        level: 80,
      },
      {
        name: "LlamaIndex",
        url: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/llamaindex.svg",
        level: 75,
      },
      {
        name: "Pinecone",
        url: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/pinecone.svg",
        level: 73,
      },
      {
        name: "Chroma",
        url: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/chroma.svg",
        level: 72,
      },
      {
        name: "Pandas",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
        level: 90,
      },
      {
        name: "NumPy",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
        level: 87,
      },
      {
        name: "Scikit-learn",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg",
        level: 83,
      },
      {
        name: "spaCy",
        url: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/spacy.svg",
        level: 82,
      },
      {
        name: "NLTK",
        url: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/nltk.svg",
        level: 78,
      },
      {
        name: "OpenCV",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
        level: 76,
      },
      {
        name: "YOLO",
        url: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/yolo.svg",
        level: 74,
      },
      {
        name: "Detectron2",
        url: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/detectron.svg",
        level: 70,
      },
      {
        name: "Pillow",
        url: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/pillow.svg",
        level: 80,
      },
      {
        name: "Beautiful Soup",
        url: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/beautifulsoup.svg",
        level: 88,
      },
      {
        name: "Scrapy",
        url: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/scrapy.svg",
        level: 75,
      },
      {
        name: "PyPDF2",
        url: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/pypdf.svg",
        level: 82,
      },
      {
        name: "Keras",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg",
        level: 82,
      },
      {
        name: "Matplotlib",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg",
        level: 80,
      },
      {
        name: "Seaborn",
        url: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/seaborn.svg",
        level: 75,
      },
      {
        name: "Plotly",
        url: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/plotly.svg",
        level: 73,
      },
      {
        name: "Jupyter",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
        level: 88,
      },
      {
        name: "Streamlit",
        url: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/streamlit.svg",
        level: 78,
      },
    ],
  },
  {
    category: "Frontend Development",
    icon: "⚛️",
    skills: [
      {
        name: "React",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        level: 95,
      },
      {
        name: "Next.js",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        level: 90,
      },
      {
        name: "JavaScript",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        level: 92,
      },
      {
        name: "TypeScript",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        level: 85,
      },
      {
        name: "CSS3",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        level: 88,
      },
      {
        name: "Tailwind CSS",
        url: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/tailwindcss.svg",
        level: 90,
      },
      {
        name: "Redux",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
        level: 80,
      },
      {
        name: "HTML5",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        level: 93,
      },
      {
        name: "Framer Motion",
        url: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/framer.svg",
        level: 72,
      },
    ],
  },
  {
    category: "Backend & Database",
    icon: "🗄️",
    skills: [
      {
        name: "Python",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        level: 93,
      },
      {
        name: "Flask",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
        level: 85,
      },
      {
        name: "FastAPI",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
        level: 82,
      },
      {
        name: "Node.js",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        level: 78,
      },
      {
        name: "MongoDB",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        level: 82,
      },
      {
        name: "PostgreSQL",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        level: 78,
      },
      {
        name: "Prisma",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
        level: 75,
      },
      {
        name: "Redis",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
        level: 70,
      },
      {
        name: "SQLite",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
        level: 80,
      },
    ],
  },
  {
    category: "DevOps & Automation",
    icon: "⚙️",
    skills: [
      {
        name: "Git",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        level: 88,
      },
      {
        name: "Docker",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        level: 82,
      },
      {
        name: "GitHub Actions",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        level: 75,
      },
      {
        name: "Vercel",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
        level: 85,
      },
      {
        name: "AWS",
        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
        level: 70,
      },
    ],
  },
];

// Enhanced skill card with proficiency indicator
const SkillCard = memo(
  ({
    skill,
    index,
    categoryIndex,
  }: {
    skill: { name: string; url: string; level: number };
    index: number;
    categoryIndex: number;
  }) => {
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
            <span className="text-xs font-bold text-white/80">
              {skill.level}
            </span>
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
      </div>
    );
  }
);

SkillCard.displayName = "SkillCard";

// Category section component
const CategorySection = memo(
  ({
    category,
    categoryIndex,
  }: {
    category: (typeof SKILLS_DATA)[0];
    categoryIndex: number;
  }) => {
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

const Skills = memo(() => {
  return (
    <section
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary via-primary to-secondary overflow-hidden"
      id="skills"
      aria-labelledby="skills-heading"
    >
      {/* Enhanced background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-400/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
            animation: "grid-move 20s linear infinite",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <header className="text-center mb-16">
          <h1
            id="skills-heading"
            className="text-white font-black text-4xl sm:text-5xl lg:text-7xl mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight"
          >
            Skills & Expertise
          </h1>
          <p className="text-white/70 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            A comprehensive toolkit of modern technologies and frameworks that
            power my development journey in AI/ML and Software Engineering.
          </p>

          {/* Stats */}
          <div className="flex justify-center items-center space-x-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {SKILLS_DATA.reduce((acc, cat) => acc + cat.skills.length, 0)}+
              </div>
              <div className="text-white/60 text-sm">Technologies</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {SKILLS_DATA.length}
              </div>
              <div className="text-white/60 text-sm">Categories</div>
            </div>
          </div>
        </header>

        {/* Categories */}
        <div className="space-y-16">
          {SKILLS_DATA.map((category, categoryIndex) => (
            <CategorySection
              key={category.category}
              category={category}
              categoryIndex={categoryIndex}
            />
          ))}
        </div>
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

      {/* Enhanced custom styles */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
});

Skills.displayName = "Skills";

export default Skills;
