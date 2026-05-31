"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatedNumber } from "@/components/AnimatedNumber";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  secs: number;
};

function getTimeLeft(target: number): TimeLeft {
  const remaining = Math.max(0, target - Date.now());
  const seconds = Math.floor(remaining / 1000);

  return {
    days: Math.floor(seconds / 86_400),
    hours: Math.floor((seconds % 86_400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    secs: seconds % 60,
  };
}

export function CinematicCountdown({ targetDate }: { targetDate: string }) {
  const target = useMemo(() => new Date(targetDate).getTime(), [targetDate]);

  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    secs: 0,
  });

  useEffect(() => {
    setMounted(true);

    const update = () => {
      setTimeLeft(getTimeLeft(target));
    };

    update();

    const interval = window.setInterval(update, 1000);

    return () => window.clearInterval(interval);
  }, [target]);

  if (!mounted) {
    return (
      <div className="glass-panel scanlines relative overflow-hidden rounded-[2rem] p-5 md:p-6">
        <div className="absolute inset-0 opacity-30 sand-field" />

        <p className="relative font-display text-xs font-bold uppercase tracking-[0.28em] text-[var(--accent)]">
          Chladni Node Activation Window
        </p>

        <div className="relative mt-5 grid grid-cols-4 gap-3">
          <Digit label="Days" value={0} />
          <Digit label="Hours" value={0} />
          <Digit label="Minutes" value={0} />
          <Digit label="Seconds" value={0} />
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel scanlines relative overflow-hidden rounded-[2rem] p-5 md:p-6">
      <div className="absolute inset-0 opacity-30 sand-field" />

      <p className="relative font-display text-xs font-bold uppercase tracking-[0.28em] text-[var(--accent)]">
        Chladni Node Activation Window
      </p>

      <div className="relative mt-5 grid grid-cols-4 gap-3">
        <Digit label="Days" value={timeLeft.days} />
        <Digit label="Hours" value={timeLeft.hours} />
        <Digit label="Minutes" value={timeLeft.minutes} />
        <Digit label="Seconds" value={timeLeft.secs} />
      </div>
    </div>
  );
}

function Digit({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-[var(--panel-border)] bg-[var(--bg)]/70 p-3 text-center shadow-[0_0_18px_var(--glow)]">
      <p className="font-mono text-3xl font-black text-[var(--text)] md:text-4xl">
        <AnimatedNumber value={value} />
      </p>

      <p className="mt-2 text-[0.62rem] uppercase tracking-[0.18em] text-[var(--muted)]">
        {label}
      </p>
    </div>
  );
}