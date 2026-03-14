"use client";
import React, { useState, useCallback, memo, useRef, useEffect } from "react";
import {
  EnvelopeIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

const ContactForm: React.FC = memo(() => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>("idle");
  const [isInView, setIsInView] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for animations
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

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Clear error when user starts typing
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({
          ...prev,
          [name]: undefined,
        }));
      }
    },
    [errors]
  );

  const handleReset = useCallback(() => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setErrors({});
    setSubmissionStatus("idle");
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      setSubmissionStatus("submitting");

      try {
        // Simulate API call - replace with your actual submission logic
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Create mailto link as fallback
        const mailtoLink = `mailto:moizahsan5@gmail.com?subject=${encodeURIComponent(
          formData.subject
        )}&body=${encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        )}`;

        window.location.href = mailtoLink;

        setSubmissionStatus("success");

        // Reset form after successful submission
        setTimeout(() => {
          handleReset();
          setSubmissionStatus("idle");
        }, 3000);
      } catch (error) {
        console.error("Form submission error:", error);
        setSubmissionStatus("error");
        setTimeout(() => setSubmissionStatus("idle"), 5000);
      }
    },
    [formData, validateForm, handleReset]
  );

  const inputClasses =
    "w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/15";
  const errorInputClasses = "border-red-400 focus:ring-red-400";

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-gradient-to-br from-tertiary via-secondary to-primary overflow-hidden"
      id="contact"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div
          className={`w-full max-w-2xl ${
            isInView ? "animate-slide-up" : "opacity-0"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-white/70 text-lg sm:text-xl max-w-lg mx-auto">
              Have a project in mind? Lets discuss how we can work together to
              bring your ideas to life.
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-10">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="flex items-center text-white font-semibold text-sm"
                  >
                    <UserIcon className="w-4 h-4 mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`${inputClasses} ${
                      errors.name ? errorInputClasses : ""
                    }`}
                    required
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm flex items-center">
                      <XCircleIcon className="w-4 h-4 mr-1" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="flex items-center text-white font-semibold text-sm"
                  >
                    <EnvelopeIcon className="w-4 h-4 mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className={`${inputClasses} ${
                      errors.email ? errorInputClasses : ""
                    }`}
                    required
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm flex items-center">
                      <XCircleIcon className="w-4 h-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="flex items-center text-white font-semibold text-sm"
                >
                  <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2" />
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className={`${inputClasses} ${
                    errors.subject ? errorInputClasses : ""
                  }`}
                  required
                />
                {errors.subject && (
                  <p className="text-red-400 text-sm flex items-center">
                    <XCircleIcon className="w-4 h-4 mr-1" />
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="flex items-center text-white font-semibold text-sm"
                >
                  <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2" />
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, ideas, or just say hello!"
                  rows={5}
                  className={`${inputClasses} resize-none ${
                    errors.message ? errorInputClasses : ""
                  }`}
                  required
                />
                {errors.message && (
                  <p className="text-red-400 text-sm flex items-center">
                    <XCircleIcon className="w-4 h-4 mr-1" />
                    {errors.message}
                  </p>
                )}
                <p className="text-white/50 text-xs">
                  {formData.message.length}/500 characters
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="submit"
                  disabled={submissionStatus === "submitting"}
                  className="flex-1 group relative bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                >
                  {submissionStatus === "submitting" ? (
                    <>
                      <ArrowPathIcon className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : submissionStatus === "success" ? (
                    <>
                      <CheckCircleIcon className="w-5 h-5 mr-2" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <PaperAirplaneIcon className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                      Send Message
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  disabled={submissionStatus === "submitting"}
                  className="sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-xl border border-white/30 hover:border-white/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reset
                </button>
              </div>

              {/* Status Messages */}
              {submissionStatus === "success" && (
                <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-4 flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-400 mr-3" />
                  <p className="text-green-200">
                    Thank you for your message! I will get back to you soon.
                  </p>
                </div>
              )}

              {submissionStatus === "error" && (
                <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-4 flex items-center">
                  <XCircleIcon className="w-5 h-5 text-red-400 mr-3" />
                  <p className="text-red-200">
                    Oops! Something went wrong. Please try again or email me
                    directly.
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="mt-12 text-center">
            <p className="text-white/60 mb-4">Or reach out directly:</p>
            <a
              href="mailto:moizahsan5@gmail.com"
              className="inline-flex items-center text-blue-300 hover:text-blue-200 font-semibold transition-colors duration-300"
            >
              <EnvelopeIcon className="w-5 h-5 mr-2" />
              moizahsan5@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </section>
  );
});

ContactForm.displayName = "ContactForm";

export default ContactForm;
