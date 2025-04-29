// components/MatrixRain/MatrixRain.tsx
"use client";
import React, { useRef, useEffect } from "react";

interface MatrixRainProps {
  rainColors?: string[];
  hiddenWords?: string[];
  speed?: number;
}

const MatrixRain: React.FC<MatrixRainProps> = ({
  rainColors = ["rgba(255,255,255,0.8)", "rgba(200,255,200,0.8)"],
  hiddenWords = [
    "DEBUG",
    "404",
    "CODE",
    "KEEP GOING",
    "BELIEVE",
    "CREATE",
    "INNOVATE",
    "PERSIST",
    "HONEST",
    "NEVER GIVEUP",
    "DREAM",
  ],
  speed = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const fontSize = 16;
    const columns = Math.floor(w / fontSize);
    const drops = Array(columns).fill(1);
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()*&^%".split(
      ""
    );

    const floatingHiddenWords: {
      text: string;
      x: number;
      y: number;
      start: number;
    }[] = [];

    const draw = () => {
      if (!ctx) return;
      const now = Date.now();

      ctx.fillStyle = "rgba(9,27,55,0.25)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${fontSize}px monospace`;

      // draw raining letters
      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillStyle = rainColors[i % rainColors.length];
        ctx.fillText(text, x, y);

        if (y > h && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += speed;
      }

      // randomly add multiple floating hidden words
      if (Math.random() < 0.6 && floatingHiddenWords.length < 2) {
        floatingHiddenWords.push({
          text: hiddenWords[Math.floor(Math.random() * hiddenWords.length)],
          x: Math.random() * w,
          y: Math.random() * h,
          start: now,
        });
      }

      // draw floating hidden words
      for (let i = floatingHiddenWords.length - 1; i >= 0; i--) {
        const word = floatingHiddenWords[i];
        if (now - word.start < 2000) {
          ctx.fillStyle = "rgba(255,0,0,1)";
          ctx.fillText(word.text, word.x, word.y);
        } else {
          floatingHiddenWords.splice(i, 1);
        }
      }
    };

    const interval = setInterval(draw, 50);
    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [rainColors, hiddenWords, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0"
      style={{ backgroundColor: "rgba(9,27,55,1)" }}
    />
  );
};

export default MatrixRain;
