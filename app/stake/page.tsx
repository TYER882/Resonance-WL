import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stake Coming Soon | Resonance Genesis",
  description:
    "Stake Chladni Nodes to activate RE native resonance power. Coming soon.",
};

const progress = [
  { label: "Stake UI Design", value: 85 },
  { label: "Node Trait Multiplier", value: 65 },
  { label: "RE Power Accounting", value: 48 },
  { label: "Safety Review", value: 32 },
];

export default function StakePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="glass-panel scanlines relative overflow-hidden rounded-[2.5rem] p-8 md:p-12">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">

  {/* GOLD AMBIENT */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.12),transparent_70%)]" />

  {/* RESONANCE RINGS */}
  {[0, 1, 2].map((ring) => (
    <div
      key={ring}
      className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-400/20 animate-ping"
      style={{
        animationDuration: `${5 + ring * 2}s`,
        animationDelay: `${ring}s`,
      }}
    />
  ))}

  {/* GOLD PARTICLES */}
  {Array.from({ length: 40 }).map((_, i) => (
    <div
      key={i}
      className="absolute h-1 w-1 rounded-full bg-amber-300/70"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `floatParticle ${4 + Math.random() * 6}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 4}s`,
      }}
    />
  ))}

  {/* CHLADNI WAVE */}
  <svg
    className="absolute inset-0 h-full w-full opacity-10"
    viewBox="0 0 1200 600"
    preserveAspectRatio="none"
  >
    <path
      d="M0 300 C200 100 400 500 600 300 C800 100 1000 500 1200 300"
      fill="none"
      stroke="rgb(251 191 36)"
      strokeWidth="2"
    />
    <path
      d="M0 340 C200 140 400 540 600 340 C800 140 1000 540 1200 340"
      fill="none"
      stroke="rgb(251 191 36)"
      strokeWidth="1"
    />
  </svg>
</div>
        <div className="absolute inset-0 opacity-30 sand-field" />

        <div className="relative max-w-3xl">
          <p className="font-display text-xs font-bold uppercase tracking-[0.34em] text-(--accent)">
            Chladni Node Staking
          </p>

          <h1 className="mt-5 font-display text-5xl font-black uppercase leading-tight text-(--text) md:text-7xl">
            Stake Module Coming Soon
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-(--muted)">
            The staking chamber is being calibrated. Soon, Chladni Node holders
            will be able to activate miner mode and accumulate RE native
            resonance power inside the protocol.
          </p>
<div className="mt-10 grid max-w-2xl grid-cols-3 gap-4">
  <div className="rounded-2xl border border-(--panel-border) bg-white/5 p-4">
    <p className="text-xs uppercase tracking-[0.25em] text-(--muted)">
      Nodes
    </p>
    <p className="mt-2 text-2xl font-black text-(--text)">
      10,000
    </p>
  </div>

  <div className="rounded-2xl border border-(--panel-border) bg-white/5 p-4">
    <p className="text-xs uppercase tracking-[0.25em] text-(--muted)">
      RE Power
    </p>
    <p className="mt-2 text-2xl font-black text-(--text)">
      Dynamic
    </p>
  </div>

  <div className="rounded-2xl border border-(--panel-border) bg-white/5 p-4">
    <p className="text-xs uppercase tracking-[0.25em] text-(--muted)">
      Status
    </p>
    <p className="mt-2 text-2xl font-black text-amber-300">
      Building
    </p>
  </div>
</div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex justify-center rounded-full px-6 py-3 font-black theme-button"
            >
              Back to Home
            </Link>

            <Link
              href="/docs"
              className="inline-flex justify-center rounded-full px-6 py-3 font-black theme-button-secondary"
            >
              Read Docs
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-panel rounded-[2rem] p-6">
          <p className="font-display text-xs font-bold uppercase tracking-[0.28em] text-(--accent)">
            Status
          </p>

          <h2 className="mt-4 font-display text-3xl font-black uppercase text-(--text)">
            Build Progress
          </h2>

          <p className="mt-4 leading-7 text-(--muted)">
            This module is not live yet. RE is internal utility power, not APY,
            yield, passive income, or a guaranteed financial return.
          </p>

          <div className="mt-6 rounded-2xl border border-(--panel-border) bg-white/5 p-4">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-(--accent)">
              Current Phase
            </p>
            <p className="mt-2 text-2xl font-black text-(--text)">
              Prototype Build
            </p>
          </div>
        </div>

        <div className="glass-panel rounded-[2rem] p-6">
          <p className="font-display text-xs font-bold uppercase tracking-[0.28em] text-(--accent)">
            Development Track
          </p>

          <div className="mt-6 space-y-5">
            {progress.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <p className="text-sm font-bold text-(--text)">
                    {item.label}
                  </p>
                  <p className="font-mono text-sm text-(--muted)">
                    {item.value}%
                  </p>
                </div>

                <div className="h-3 overflow-hidden rounded-full border border-(--panel-border) bg-white/5">
                  <div
                    className="h-full rounded-full bg-(--accent) shadow-[0_0_18px_var(--glow)]"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-3">
        {[
          [
            "Stake Nodes",
            "Connect eligible Chladni Nodes and activate miner mode.",
          ],
          [
            "Generate RE Power",
            "Accumulate internal resonance power based on node traits.",
          ],
          [
            "Utility First",
            "Designed for protocol mechanics, not financial promises.",
          ],
        ].map(([title, copy]) => (
          <article key={title} className="glass-panel rounded-[1.5rem] p-6">
            <h2 className="font-display text-xl font-black uppercase text-(--text)">
              {title}
            </h2>
            <p className="mt-3 leading-7 text-(--muted)">{copy}</p>
          </article>
        ))}
      </section>
    </main>
  );
}