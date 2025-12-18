"use client";

import { useRef } from "react";
import html2canvas from "html2canvas";

type Props = {
  children: React.ReactNode;
};

export default function GlassBreak({ children }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  const breakGlass = async () => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();

    const canvas = await html2canvas(element, {
      backgroundColor: null,
      foreignObjectRendering: false,

      onclone: (doc) => {
        /** 🔥 CRITICAL FIX */
        /** Remove ALL stylesheets (Tailwind / shadcn uses lab()) */
        doc.querySelectorAll("style, link[rel='stylesheet']").forEach((el) => {
          el.remove();
        });

        /** Clone target */
        const clone = doc.body.querySelector(
          `[data-glass-break]`
        ) as HTMLElement | null;

        if (!clone) return;

        /** Force safe RGB styles */
        const style = window.getComputedStyle(element);

        clone.style.backgroundColor =
          style.backgroundColor.startsWith("rgb")
            ? style.backgroundColor
            : "rgb(30,30,30)";

        clone.style.color =
          style.color.startsWith("rgb") ? style.color : "rgb(255,255,255)";

        clone.style.borderRadius = style.borderRadius;
        clone.style.padding = style.padding;
        clone.style.boxShadow = "none";
        clone.style.filter = "none";
        clone.style.backdropFilter = "none";
      },
    });

    element.style.visibility = "hidden";

    const breakCanvas = document.createElement("canvas");
    breakCanvas.width = rect.width;
    breakCanvas.height = rect.height;
    breakCanvas.style.position = "fixed";
    breakCanvas.style.left = `${rect.left}px`;
    breakCanvas.style.top = `${rect.top}px`;
    breakCanvas.style.pointerEvents = "none";
    document.body.appendChild(breakCanvas);

    const ctx = breakCanvas.getContext("2d")!;
    const shards: any[] = [];
    const size = 2;

    for (let x = 0; x < rect.width; x += size) {
      for (let y = 0; y < rect.height; y += size) {
        shards.push({
          x,
          y,
          w: size,
          h: size,
          vx: (Math.random() - 0.5) * 14,
          vy: Math.random() * -12,
          r: Math.random() * 2,
          o: 1,
        });
      }
    }

    const gravity = 0.7;

    const animate = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);

      shards.forEach((s) => {
        s.vy += gravity;
        s.x += s.vx;
        s.y += s.vy;
        s.o -= 0.025;

        ctx.save();
        ctx.globalAlpha = s.o;
        ctx.translate(s.x + s.w / 2, s.y + s.h / 2);
        ctx.rotate(s.r);
        ctx.drawImage(
          canvas,
          s.x,
          s.y,
          s.w,
          s.h,
          -s.w / 2,
          -s.h / 2,
          s.w,
          s.h
        );
        ctx.restore();
      });

      if (shards.some((s) => s.o > 0)) {
        requestAnimationFrame(animate);
      } else {
        breakCanvas.remove();
      }
    };

    animate();
  };

  return (
    <div
      ref={ref}
      data-glass-break
      onClick={breakGlass}
      className="rounded-xl bg-background text-foreground p-4 cursor-pointer"
    >
      {children}
    </div>
  );
}
