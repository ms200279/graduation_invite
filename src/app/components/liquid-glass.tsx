"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useRef } from "react";
import { LIQUID_GLASS_SETTINGS } from "../config/liquid-glass";
import { useLiquidGlassFilter } from "../hooks/use-liquid-glass-filter";

type LiquidGlassProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  depth?: number;
  strength?: number;
  chromaticAberration?: number;
  filterBuffer?: number;
};

export default function LiquidGlass({
  children,
  className = "",
  depth = LIQUID_GLASS_SETTINGS.depth,
  strength = LIQUID_GLASS_SETTINGS.strength,
  chromaticAberration = LIQUID_GLASS_SETTINGS.chromaticAberration,
  filterBuffer = LIQUID_GLASS_SETTINGS.collapsedBuffer,
  ...props
}: LiquidGlassProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);

  useLiquidGlassFilter({
    rootRef,
    filterRef,
    depth,
    strength,
    chromaticAberration,
    filterBuffer,
  });

  return (
    <div ref={rootRef} className={`liquid-glass ${className}`} {...props}>
      <span className="liquid-glass__overlay" aria-hidden="true" />
      <span
        ref={filterRef}
        className="liquid-glass__filter"
        aria-hidden="true"
      />
      <span className="liquid-glass__edge" aria-hidden="true" />
      {children}
    </div>
  );
}
