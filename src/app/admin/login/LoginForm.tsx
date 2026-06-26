"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.replace("/admin");
        router.refresh();
        return;
      }
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Login failed.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-shogun-graphite border border-white/10 rounded-2xl p-6 space-y-4"
    >
      <label className="block">
        <span className="text-xs tracking-[0.2em] text-shogun-cream/60 font-display">
          USERNAME
        </span>
        <input
          type="text"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 w-full rounded-lg bg-shogun-ink border border-white/10 px-3 py-2.5 text-shogun-cream outline-none focus:border-shogun-orange"
          required
        />
      </label>

      <label className="block">
        <span className="text-xs tracking-[0.2em] text-shogun-cream/60 font-display">
          PASSWORD
        </span>
        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-lg bg-shogun-ink border border-white/10 px-3 py-2.5 text-shogun-cream outline-none focus:border-shogun-orange"
          required
        />
      </label>

      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-shogun-red hover:bg-shogun-orange transition-colors text-shogun-cream font-display tracking-[0.2em] py-2.5 disabled:opacity-60"
      >
        {loading ? "SIGNING IN…" : "SIGN IN"}
      </button>
    </form>
  );
}
