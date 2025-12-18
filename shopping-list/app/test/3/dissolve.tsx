"use client";
import { useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

export default function DissolveText({ text }: { text: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [started, setStarted] = useState(false);

  const startDissolve = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 300;
    const height = 100;
    canvas.width = width;
    canvas.height = height;

    // Draw text into canvas
    ctx.clearRect(0, 0, width, height);
    ctx.font = "bold 40px sans-serif";
    ctx.fillStyle = "black";
    ctx.fillText(text, 20, 60);

    const { data } = ctx.getImageData(0, 0, width, height);

    const newParticles: Particle[] = [];
    const step = 4;

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const i = (y * width + x) * 4;
        const alpha = data[i + 3];

        if (alpha > 50) {
          newParticles.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3,
            life: Math.random() * 40 + 20,
            color: `rgba(${data[i]}, ${data[i + 1]}, ${data[i + 2]}, ${alpha / 255})`
          });
        }
      }
    }

    setParticles(newParticles);
    setStarted(true);
    animate(newParticles);
  };

  const animate = (parts: Particle[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let alive = false;

      parts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.life -= 1;

        if (p.life > 0) {
          alive = true;
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, 2, 2);
        }
      });

      if (alive) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  return (
    <div>
      <canvas ref={canvasRef} style={{ border: "1px solid #ddd" }} />

      {!started && (
        <button onClick={startDissolve} style={{ marginTop: 10 }}>
          Dissolve
        </button>
      )}
    </div>
  );
}