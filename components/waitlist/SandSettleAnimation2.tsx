"use client";

import { useEffect, useRef } from "react";

type SandSettleAnimationProps = {
  particleCount?: number;
  intensity?: "low" | "medium" | "high";
  mode?: "ring" | "wave" | "node";
};

type Particle = {
  x: number;
  y: number;
  depth: number;
  radius: number;
  speed: number;
  phase: number;
};

export function SandSettleAnimation2({
  particleCount = 1500,
  intensity = "medium",
  mode = "ring",
}: SandSettleAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const surface = canvas;
    const context = ctx;

    let animationFrame = 0;

    const particles: Particle[] = Array.from(
      { length: Math.min(3000, particleCount) },
      (_, i) => ({
        x: Math.random(),
        y: Math.random(),
        phase: i * 0.17,
        depth: Math.random(),
        radius: 0.5 + Math.random() * 3.5,
        speed:
          0.001 +
          Math.random() *
            (intensity === "high"
              ? 0.004
              : intensity === "medium"
              ? 0.0025
              : 0.0015),
      })
    );

    const resize = () => {
      const rect = surface.getBoundingClientRect();

      surface.width = Math.floor(
        rect.width * window.devicePixelRatio
      );

      surface.height = Math.floor(
        rect.height * window.devicePixelRatio
      );
    };

    function targetY(x: number, phase: number) {
      if (mode === "ring") {
        return (
          0.5 +
          Math.sin(x * Math.PI * 6 + phase) *
            0.12
        );
      }

      if (mode === "wave") {
        return (
          0.5 +
          Math.sin(x * Math.PI * 8 + phase) *
            0.15
        );
      }

      return (
        0.5 +
        Math.sin(x * 18 + phase) *
          Math.cos(x * 11) *
          0.18
      );
    }

    function draw(time: number) {
      const styles = getComputedStyle(
        document.documentElement
      );

      const sand =
        styles.getPropertyValue("--sand").trim() ||
        "#e7d7a0";

      const accent =
        styles.getPropertyValue("--accent").trim() ||
        "#d6b45c";

      const glow =
        styles.getPropertyValue("--accent-2").trim() ||
        accent;

      const width = surface.width;
      const height = surface.height;

      // fade trail
      context.fillStyle = "rgba(0,0,0,0.035)";
      context.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;

      // resonance core
      const pulse =
        21 +
        Math.sin(time * 0.0015) * 3;

      const gradient =
        context.createRadialGradient(
          cx,
          cy,
          0,
          cx,
          cy,
          pulse * 4
        );

      gradient.addColorStop(0, accent);
      gradient.addColorStop(0.25, `${accent}55`);
      gradient.addColorStop(1, "transparent");

      context.fillStyle = gradient;
      context.beginPath();
      context.arc(
        cx,
        cy,
        pulse * 4,
        0,
        Math.PI * 2
      );
      context.fill();

      for (const particle of particles) {
        const target = targetY(
          particle.x,
          particle.phase +
            time * 0.00025
        );

        particle.y +=
          (target - particle.y) *
          particle.speed *
          25;

        const dx = particle.x - 0.5;
        const dy = particle.y - 0.5;

        const angle = Math.atan2(dy, dx);

        // vortex motion
        particle.x +=
          Math.cos(angle + Math.PI / 2) *
          0.00045 *
          particle.depth;

        particle.y +=
          Math.sin(angle + Math.PI / 2) *
          0.00045 *
          particle.depth;

        // drift
        particle.x +=
          Math.sin(
            time * 0.0005 +
              particle.phase
          ) *
          0.0006;

        if (particle.x > 1) particle.x = 0;
        if (particle.x < 0) particle.x = 1;

        if (particle.y > 1) particle.y = 0;
        if (particle.y < 0) particle.y = 1;

        const x = particle.x * width;
        const y = particle.y * height;

        const radius =
          particle.radius *
          (0.35 + particle.depth);

        context.globalAlpha =
          0.4 + particle.depth * 0.8;

        context.shadowBlur =
          radius * 10 * particle.depth;

        context.shadowColor =
          Math.sin(
            particle.phase +
              time * 0.001
          ) > 0
            ? accent
            : glow;

        context.fillStyle =
          Math.sin(
            particle.phase +
              time * 0.0012
          ) > 0.7
            ? accent
            : sand;

        context.beginPath();
        context.arc(
          x,
          y,
          radius,
          0,
          Math.PI * 2
        );
        context.fill();
      }

      context.globalAlpha = 1;
      context.shadowBlur = 0;

      // resonance rings
      context.strokeStyle = accent;
      context.lineWidth = 2;
      context.globalAlpha = 0.18;

      for (let i = 0; i < 4; i++) {
        const radius =
          pulse +
          i * 40 +
          ((time * 0.03) % 40);

        context.beginPath();
        context.arc(
          cx,
          cy,
          radius,
          0,
          Math.PI * 2
        );
        context.stroke();
      }

      context.globalAlpha = 1;

      animationFrame =
        requestAnimationFrame(draw);
    }

    resize();

    context.fillStyle = "#000";
    context.fillRect(
      0,
      0,
      surface.width,
      surface.height
    );

    animationFrame =
      requestAnimationFrame(draw);

    window.addEventListener(
      "resize",
      resize
    );

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "resize",
        resize
      );
    };
  }, [particleCount, intensity, mode]);

  return (
    <canvas
      ref={canvasRef}
      className="h-full min-h-[500px] w-full rounded-[2rem] bg-black"
      aria-label="Resonance Sand Field"
    />
  );
}