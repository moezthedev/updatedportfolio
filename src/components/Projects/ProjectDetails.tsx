import P1 from "@/app/assets/p1.jpg";
import P2 from "@/app/assets/p2.jpg";
import P3 from "@/app/assets/p3.jpg";
import P4 from "@/app/assets/p4.jpg";
import P6 from "@/app/assets/p6.jpg";
import P7 from "@/app/assets/p7.jpg";
import P8 from "@/app/assets/p8.jpg";
import P9 from "@/app/assets/p9.jpg";
import Plant from "@/app/assets/plant.jpg";
import Mask from "@/app/assets/mask.png";
import Heart from "@/app/assets/heart.jpg";
import Diabetes from "@/app/assets/diabetes.jpg";
import Movies from "@/app/assets/movies.jpg";
import Spam from "@/app/assets/email.png";
import Customer from "@/app/assets/customer.png";
import MNIST from "@/app/assets/mnist.png";
import { StaticImageData } from "next/image";

interface Project {
  title: string;
  imageUrl: StaticImageData;
  technologies: string[];
  description: string;
  githubLink?: string;
  colabLink?: string;
  liveDemoLink?: string;
  category: any;
}

const projects: Project[] = [
  {
    title: "Summerize",
    imageUrl: P1,
    technologies: ["React", "Custom CSS", "Rapid Api"],
    description:
      "An AI-powered web application that generates concise and coherent summaries of text content. Users input a URL, and Summerize produces a summary of the content.",
    githubLink: "https://github.com/moezthedev",
    liveDemoLink: "https://summerise.netlify.app/",
    category: "Full Stack",
  },
  {
    title: "Car Revolution",
    imageUrl: P2,
    technologies: ["HTML", "CSS", "Javascript"],
    description:
      "A web application that showcases a collection of cars with detailed specifications and images. Features a responsive slider displaying cars from different manufacturers.",
    githubLink: "https://github.com/moezthedev/carRevolution",
    liveDemoLink: "https://carrevolution.netlify.app",
    category: "Full Stack",
  },
  {
    title: "Slide Sync",
    imageUrl: P3,
    technologies: ["React", "Custom CSS", "Formik", "Nodejs", "MongoDB"],
    description:
      "An AI-powered web application that creates visually appealing presentation slides from user content. Users can select themes, edit content, and download presentations in PPT format.",
    githubLink: "https://github.com/moezthedev/PresentationsML",
    liveDemoLink: "https://slidesync.netlify.app",
    category: "Full Stack",
  },
  {
    title: "Creative Landing Web Page",
    imageUrl: P4,
    technologies: ["HTML", "CSS", "JS"],
    description:
      "A creative landing page web application designed to craft stunning first impressions. Provides intuitive tools for designing captivating, custom landing pages.",
    githubLink: "https://github.com/moezthedev/chromacraft",
    liveDemoLink: "https://chromacraft.netlify.app/",
    category: "Full Stack",
  },
  {
    title: "Tesla",
    imageUrl: P6,
    technologies: ["React", "JS", "CSS"],
    description:
      "A Tesla clone web application replicating the electric car manufacturer's website. Features a sleek, intuitive interface showcasing Tesla's vehicle lineup and product information.",
    githubLink: "https://github.com/moezthedev/Tesla",
    liveDemoLink: "https://tesladrive.netlify.app/",
    category: "Full Stack",
  },
  {
    title: "Soft Ai",
    imageUrl: P7,
    technologies: ["React", "CSS", "MUI"],
    description:
      "An all-in-one AI web application for text analysis and completion. Includes features for spam detection, sentiment analysis, headline generation, and sentence completion.",
    githubLink: "https://github.com/moezthedev/SoftAi",
    liveDemoLink: "https://softml.netlify.app",
    category: "Full Stack",
  },
  {
    title: "Consulting Edge",
    imageUrl: P8,
    technologies: ["HTML", "CSS", "JS"],
    description:
      "A dynamic landing page for a consulting web application, showcasing consulting expertise, services, and client success stories with an engaging interface.",
    githubLink: "https://github.com/moezthedev/consultingedge",
    liveDemoLink: "https://consultingedge.netlify.app",
    category: "Full Stack",
  },
  {
    title: "Bitnine",
    imageUrl: P9,
    technologies: ["React", "JS", "CSS"],
    description:
      "A web application developed in React for Bitnine Global, tailored to their coding test requirements.",
    githubLink: "https://github.com/moezthedev/bitnineglobal",
    liveDemoLink: "https://bitnine-beryl.vercel.app/",
    category: "Full Stack",
  },
  {
    title: "Plant Disease Detection",
    imageUrl: Plant,
    technologies: ["Numpy", "Tensorflow", "CNN"],
    description:
      "A machine learning model for detecting and diagnosing plant diseases from images using Convolutional Neural Networks (CNN).",
    colabLink:
      "https://colab.research.google.com/drive/1uvdXsr6HclH5P9vDBjC19I15muyVnuXT",
    category: "ML",
  },
  {
    title: "Face Mask Detection",
    imageUrl: Mask,
    technologies: ["Numpy", "Tensorflow", "CNN"],
    description:
      "A machine learning model for detecting whether individuals are wearing face masks correctly in images using Convolutional Neural Networks (CNN).",
    colabLink:
      "https://colab.research.google.com/drive/13F9Ae2ycYjWxsDu5jRB5cfFVFrnEWu_U",
    category: "ML",
  },
  {
    title: "MNIST Digit Recognition Using Neural Networks",
    imageUrl: MNIST,
    technologies: ["Numpy", "Tensorflow", "CNN"],
    description:
      "A machine learning model for recognizing handwritten digits from 0 to 9 using Convolutional Neural Networks (CNN).",
    colabLink:
      "https://colab.research.google.com/drive/1KipfLf5h3my7-Az3W-W_nhDs3vTDcCuG",
    category: "ML",
  },
  {
    title: "Movies Recommendation System",
    imageUrl: Movies,
    technologies: ["Numpy", "Cosine Similarity"],
    description:
      "A recommendation system that leverages user preferences and machine learning algorithms to suggest personalized movie recommendations based on user behavior.",
    colabLink:
      "https://colab.research.google.com/drive/1e6dtCxEUnxV7ddOfnpKYCRFBeFgd6chr",
    category: "ML",
  },
  {
    title: "Spam Mail Detection",
    imageUrl: Spam,
    technologies: ["Numpy", "Pandas", "Logistic Regression"],
    description:
      "A machine learning model for identifying and filtering spam emails. Utilizes pattern analysis and characteristics to distinguish between legitimate and unwanted messages.",
    colabLink:
      "https://colab.research.google.com/drive/1LYFic45u_V3VV0kn13rBxxgSy2egJb8z",
    category: "ML",
  },
  {
    title: "Customer Segmentation Using K-Means",
    imageUrl: Customer,
    technologies: ["Numpy", "Pandas", "K-Means Clustering"],
    description:
      "A machine learning model that clusters customers into distinct groups based on similar behaviors and characteristics using K-Means Clustering.",
    colabLink:
      "https://colab.research.google.com/drive/1F8tf8J8v1n3lzLmkU_lR4Ls4op5U2v7H",
    category: "ML",
  },
  {
    title: "Heart Disease Prediction",
    imageUrl: Heart,
    technologies: ["Numpy", "Pandas", "Logistic Regression"],
    description:
      "A machine learning model for predicting the likelihood of heart disease based on patient medical data using Logistic Regression.",
    colabLink:
      "https://colab.research.google.com/drive/1y0DtFBpkD8e_6FBOIXnSaZvYSk43TizZ",
    category: "ML",
  },
  {
    title: "Diabetes Prediction",
    imageUrl: Diabetes,
    technologies: ["Numpy", "Pandas", "Support Vector Machine"],
    description:
      "A machine learning model for assessing the risk of diabetes in individuals based on health data using Support Vector Machine (SVM).",
    colabLink:
      "https://colab.research.google.com/drive/1ccInc9o39yetik48x0fCdn9QLeZmBhQ_?usp=sharing",
    category: "ML",
  },
];

export { projects };
