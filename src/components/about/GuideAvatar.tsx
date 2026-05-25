"use client";
import * as React from "react";

type Props = {
  name: string;
  size?: number; // pixel size, defaults to 160
  className?: string;
};

// Brand palette options for gradient stops
const PALETTE = [
  { from: "#1E3C1E", to: "#B88A0B" }, // primary green → accent-deep
  { from: "#0E2810", to: "#F0B40F" }, // primary-700 → accent
  { from: "#4A6B4A", to: "#1E3C1E" }, // primary-300 → primary
  { from: "#B88A0B", to: "#1E3C1E" }, // accent-deep → primary
  { from: "#1E3C1E", to: "#4A6B4A" }, // primary → primary-300
  { from: "#9A4A1F", to: "#1E3C1E" }, // rust → primary
];

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function GuideAvatar({ name, size = 160, className = "" }: Props) {
  const hash = hashString(name);
  const colors = PALETTE[hash % PALETTE.length];
  const angle = hash % 360;
  const initials = getInitials(name);
  const fontSize = Math.round(size * 0.4);

  return (
    <div
      role="img"
      aria-label={`${name} — portrait placeholder`}
      className={`relative isolate inline-flex items-center justify-center rounded-full overflow-hidden select-none ${className}`}
      style={{
        width: size,
        height: size,
        backgroundImage: `linear-gradient(${angle}deg, ${colors.from}, ${colors.to})`,
        transition: "transform 240ms ease, filter 240ms ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        el.style.transform = "scale(1.02)";
        el.style.filter = "saturate(1.15)";
        el.style.backgroundImage = `linear-gradient(${angle + 30}deg, ${colors.from}, ${colors.to})`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = "scale(1)";
        el.style.filter = "saturate(1)";
        el.style.backgroundImage = `linear-gradient(${angle}deg, ${colors.from}, ${colors.to})`;
      }}
    >
      {/* Subtle inner ring for premium feel */}
      <span
        aria-hidden
        className="absolute inset-1 rounded-full"
        style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.12)" }}
      />
      <span
        className="relative font-display font-semibold text-white"
        style={{
          fontSize,
          letterSpacing: "-0.02em",
          textShadow: "0 1px 2px rgba(0,0,0,0.15)",
        }}
      >
        {initials}
      </span>
    </div>
  );
}
