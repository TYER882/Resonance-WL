"use client";

const resonanceWaves = [
  "M0 75 Q40 40 80 75 T160 75 T240 75 T320 75 T400 75 T480 75 T560 75 T640 75",

  "M0 75 Q30 55 60 75 T120 75 T180 75 T240 75 T300 75 T360 75 T420 75 T480 75 T540 75 T600 75 T640 75",

  "M0 75 Q50 20 100 75 T200 75 T300 75 T400 75 T500 75 T600 75 T640 75",
];

const ambientLines = [
  "M0 42 C72 24 112 72 184 50 S322 24 396 50 526 76 640 42",
  "M0 112 C80 92 142 132 222 108 S362 84 450 110 560 134 640 106",
];

export function ResonanceWaveChart({
  frequency,
}: {
  frequency?: number;
}) {
  const normalizedFrequency = Math.max(
    20,
    Math.min(2222, frequency || 432)
  );

  const duration = Math.max(
    0.95,
    Math.min(
      3.6,
      3.8 - (normalizedFrequency / 2222) * 2.65
    )
  );

  const label = `${Math.round(
    normalizedFrequency
  )} Hz`;

  return (
    <div className="glass-panel relative overflow-hidden rounded-[1.75rem] p-5">

      {/* GOLD AMBIENT */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,var(--glow),transparent_70%)] opacity-10" />

      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="font-display text-xs font-bold uppercase tracking-[0.26em] text-[var(--accent)]">
            Resonance Waveform
          </p>

          <p className="mt-2 text-xs text-[var(--muted)]">
            Harmonic Signal • Frequency Drift • Resonance Phase
          </p>
        </div>

        <div className="text-right">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[var(--success)] shadow-[0_0_18px_var(--success)]" />

          <p className="mt-2 font-display text-[0.62rem] font-black uppercase tracking-[0.18em] text-[var(--accent)]">
            {label}
          </p>
        </div>
      </div>

      <svg
        viewBox="0 0 640 150"
        className="h-44 w-full overflow-visible"
      >
        <defs>
          <filter id="waveGlow">
            <feGaussianBlur
              stdDeviation="4"
              result="blur"
            />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id="coreGlow">
            <stop
              offset="0%"
              stopColor="var(--sand)"
            />
            <stop
              offset="100%"
              stopColor="var(--sand)"
              stopOpacity="0"
            />
          </radialGradient>
        </defs>

        {/* GRID */}
        <g className="text-[var(--grid)]">
          {Array.from({ length: 8 }).map((_, index) => (
            <line
              key={`v-${index}`}
              x1={index * 91}
              x2={index * 91}
              y1="0"
              y2="150"
              stroke="currentColor"
              strokeWidth="1"
            />
          ))}

          {Array.from({ length: 5 }).map((_, index) => (
            <line
              key={`h-${index}`}
              x1="0"
              x2="640"
              y1={index * 37}
              y2={index * 37}
              stroke="currentColor"
              strokeWidth="1"
            />
          ))}
        </g>

        {/* RESONANCE RINGS */}
        <g opacity="0.2">
          {[0, 1, 2].map((ring) => (
            <circle
              key={ring}
              cx="320"
              cy="75"
              r={20 + ring * 18}
              fill="none"
              stroke="var(--sand)"
              strokeWidth="1"
              className="animate-[resonance-pulse_4s_linear_infinite]"
              style={{
                animationDelay: `${ring}s`,
              }}
            />
          ))}
        </g>

        {/* AMBIENT WAVES */}
        <g filter="url(#waveGlow)">
          {ambientLines.map((line, index) => (
            <path
              key={line}
              d={line}
              fill="none"
              stroke={
                index === 0
                  ? "var(--accent-2)"
                  : "var(--accent-3)"
              }
              strokeWidth="1.5"
              opacity="0.25"
              className="animate-[wave-drift_6s_ease-in-out_infinite]"
              style={{
                animationDelay: `${index * 0.8}s`,
              }}
            />
          ))}
        </g>

        {/* MAIN RESONANCE WAVES */}
        <g filter="url(#waveGlow)">
          {resonanceWaves.map((wave, index) => (
            <path
              key={index}
              d={wave}
              fill="none"
              stroke={
                index === 0
                  ? "var(--accent)"
                  : index === 1
                  ? "var(--accent-2)"
                  : "var(--sand)"
              }
              strokeWidth={2 + index}
              opacity="0.6"
              className="animate-[wave-resonance_4s_ease-in-out_infinite]"
              style={{
                animationDelay: `${index * 0.35}s`,
              }}
            />
          ))}
        </g>

        {/* PARTICLES */}
        <g>
          {Array.from({ length: 40 }).map((_, i) => (
            <circle
              key={i}
              cx={20 + ((i * 17) % 600)}
              cy={60 + ((i * 11) % 30)}
              r={1.5}
              fill="var(--sand)"
              opacity="0.75"
              className="animate-[particle-resonance_6s_ease-in-out_infinite]"
              style={{
                animationDelay: `${i * 0.12}s`,
              }}
            />
          ))}
        </g>

        {/* CORE */}
        <g>
          <circle
            cx="320"
            cy="75"
            r="18"
            fill="url(#coreGlow)"
          />

          <circle
            cx="320"
            cy="75"
            r="8"
            fill="var(--sand)"
            filter="url(#waveGlow)"
          />

          <circle
            cx="320"
            cy="75"
            r="16"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1"
            className="animate-[resonance-pulse_2s_linear_infinite]"
          />
        </g>
      </svg>

      {/* SPECTRUM */}
      <div className="mt-3 flex h-10 items-end gap-1">
        {Array.from({ length: 36 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 rounded-full bg-[var(--accent)] opacity-60 animate-[spectrum_1.4s_ease-in-out_infinite]"
            style={{
              height: `${20 + ((i * 13) % 70)}%`,
              animationDelay: `${i * 0.04}s`,
            }}
          />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-[0.68rem] uppercase tracking-[0.16em] text-[var(--muted)]">
        <span>Frequency Coupled Resonance</span>
        <span>{duration.toFixed(2)}s cycle</span>
      </div>
    </div>
  );
}