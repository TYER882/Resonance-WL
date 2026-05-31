"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-(--panel-border) px-4 py-10 sm:px-6 lg:px-8">
  <div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm text-(--muted) md:flex-row md:items-center md:justify-between">
    <div>
      <p className="font-display text-sm font-black uppercase tracking-[0.24em] text-(--text)">
        Resonance Genesis
      </p>

      <p className="mt-2">
        Contract:...pending
      </p>

      <p className="mt-2 max-w-xl">
        RE is native resonance power for utility mechanics.
      </p>
    </div>

    <div className="flex flex-wrap gap-5">
      <Link href="/waitlist" className="hover:text-(--accent)">
        Waitlist
      </Link>

      <Link href="/docs" className="hover:text-(--accent)">
        Docs
      </Link>

      <Link href="/stake" className="hover:text-(--accent)">
        Stake
      </Link>
    </div>

    <div className="flex flex-wrap gap-5">
      <Link href="https://x.com/Resogen_Chladni" className="hover:text-(--accent)">
        <span>X</span>
      </Link>

    </div>
  </div>
</footer>
  );
}
