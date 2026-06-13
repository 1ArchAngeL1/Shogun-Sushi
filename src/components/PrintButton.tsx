"use client";

export function PrintButton({ label = "PRINT" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="bg-shogun-orange text-shogun-black font-display tracking-[0.2em] px-4 py-1.5 hover:bg-shogun-cream transition"
    >
      {label}
    </button>
  );
}
