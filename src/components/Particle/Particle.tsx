import React, { useRef, useEffect } from "react";

const Particles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    const particles = [
      { s: 9, o: 0.46, t: 0.2, x1: 55, y1: 79, x2: 80, y2: 51, depth: 0.8 },
      { s: 7, o: 0.08, t: 0.4, x1: 4, y1: 21, x2: 31, y2: 35, depth: 0.6 },
      { s: 9, o: 0.41, t: 0.6, x1: 78, y1: 63, x2: 42, y2: 66, depth: 1.0 },
      { s: 7, o: 0.33, t: 0.8, x1: 56, y1: 32, x2: 78, y2: 4, depth: 0.7 },
      { s: 9, o: 0.4, t: 1.0, x1: 79, y1: 74, x2: 2, y2: 47, depth: 0.9 },
      { s: 7, o: 0.41, t: 1.2, x1: 92, y1: 27, x2: 80, y2: 35, depth: 0.5 },
      { s: 9, o: 0.74, t: 1.4, x1: 55, y1: 60, x2: 63, y2: 15, depth: 0.85 },
      { s: 7, o: 0.09, t: 1.6, x1: 10, y1: 10, x2: 30, y2: 64, depth: 0.65 },
      { s: 9, o: 0.89, t: 1.8, x1: 3, y1: 53, x2: 60, y2: 80, depth: 0.95 },
      { s: 7, o: 0.23, t: 2.0, x1: 64, y1: 77, x2: 18, y2: 5, depth: 0.55 },
      { s: 9, o: 0.96, t: 2.2, x1: 35, y1: 6, x2: 88, y2: 14, depth: 0.75 },
      { s: 7, o: 0.52, t: 2.4, x1: 55, y1: 12, x2: 46, y2: 5, depth: 0.6 },
      { s: 9, o: 0.95, t: 2.6, x1: 90, y1: 27, x2: 51, y2: 75, depth: 0.9 },
      { s: 7, o: 0.98, t: 2.8, x1: 3, y1: 73, x2: 45, y2: 46, depth: 0.7 },
      { s: 9, o: 0.69, t: 3.0, x1: 86, y1: 82, x2: 16, y2: 31, depth: 0.8 },
    ];

    const duration = 60000;
    let startTime = performance.now();
    let scrollY = window.scrollY;

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const animate = (currentTime: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(({ s, o, t, x1, y1, x2, y2, depth }) => {
        const progress =
          ((currentTime - startTime + t * 1000) % duration) / duration;
        const x = ((x1 + (x2 - x1) * progress) * canvas.width) / 100;
        let y = ((y1 + (y2 - y1) * progress) * canvas.height) / 100;

        // Apply parallax effect based on scroll position and depth
        const parallaxOffset = scrollY * (1 - depth); // Depth < 1 makes particles move slower
        y += parallaxOffset;

        ctx.beginPath();
        ctx.arc(x, y, s / 2, 0, Math.PI * 2);
        ctx.shadowColor = "#4eddfc";
        ctx.shadowBlur = 3;
        ctx.fillStyle = `rgba(78, 221, 252, ${o})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  );
};

export default Particles;
