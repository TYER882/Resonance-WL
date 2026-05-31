"use client";

export function REPowerExplainer() {
  // TODO: If RE becomes a deployed asset later, integrate ERC20, soulbound, or non-transferable balance reads here.
  return (
    <div className="glass-panel rounded-[2rem] p-6">
      <p className="font-display text-xs font-bold uppercase tracking-[0.28em] text-[var(--accent)]">RE Native Power</p>
      <h2 className="mt-3 text-3xl font-black uppercase text-[var(--text)]">RE is native resonance power.</h2>
      <p className="mt-4 leading-7 text-[var(--muted)]">
        RE is the native power layer of Resonance Genesis. Staked Chladni Nodes accumulate RE through deterministic cymatics-inspired mining logic based on frequency, mode complexity, node density, and rarity.
      </p>
      <div className="mt-5 rounded-2xl border border-[var(--panel-border)] bg-[var(--bg)]/60 p-4 font-mono text-sm text-[var(--accent)]">
        RE = Hashrate x Active Time / Energy Scale
      </div>
      <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
        RE is a utility power balance for ecosystem mechanics. It is not APY, yield, or a guaranteed financial return.
      </p>
    </div>
  );
}
