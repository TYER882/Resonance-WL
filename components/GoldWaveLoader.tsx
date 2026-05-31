"use client";

import { motion } from "framer-motion";

export default function GoldWaveLoader() {
  return (
    <div className="relative h-screen overflow-hidden bg-black">

      {/* GOLD AMBIENT */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.12),transparent_60%)]" />

      {/* PARTICLES */}
      {Array.from({ length: 120 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-yellow-400"
          style={{
            width: Math.random() * 4 + 1,
            height: Math.random() * 4 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0, 1, 0],
            scale: [0.4, 1.4, 0.4],
          }}
          transition={{
            duration: 4 + Math.random() * 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* GOLD RESONANCE WAVES */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[0, 1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            animate={{
              scale: [0.2, 2.4],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 4,
              delay: ring * 1,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              absolute
              h-40
              w-40
              rounded-full
              border
              border-yellow-400/50
            "
          />
        ))}
      </div>

      {/* CENTER CORE */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 360],
          }}
          transition={{
            scale: {
              duration: 3,
              repeat: Infinity,
            },
            rotate: {
              duration: 18,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          className="
            relative
            h-36
            w-36
            rounded-full
            border
            border-yellow-400/40
            bg-yellow-500/10
            backdrop-blur-xl
          "
        >
          <div className="absolute inset-8 rounded-full bg-yellow-300 blur-3xl opacity-50" />
        </motion.div>

        <h1 className="mt-10 text-6xl font-black tracking-[0.4em] text-white">
          NEXMINT
        </h1>

        <p className="mt-4 text-sm tracking-[0.6em] text-yellow-300">
          GOLD WAVE RESONANCE
        </p>
      </div>

      {/* LOADING BAR */}
      <div className="absolute bottom-20 left-1/2 w-[420px] -translate-x-1/2">
        <div className="h-2 overflow-hidden rounded-full bg-white/10">

          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              h-full
              w-1/3
              rounded-full
              bg-gradient-to-r
              from-yellow-500
              via-yellow-300
              to-yellow-500
            "
          />
        </div>
      </div>
    </div>
  );
}