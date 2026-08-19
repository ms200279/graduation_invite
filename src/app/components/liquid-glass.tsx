"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useRef } from "react";
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
  depth = 8,
  strength = 40,
  chromaticAberration = 1,
  filterBuffer = 0,
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
