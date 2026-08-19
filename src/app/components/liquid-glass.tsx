"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { getDisplacementFilter } from "../lib/nikdelvin-liquid-glass";

type LiquidGlassProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  depth?: number;
  strength?: number;
  chromaticAberration?: number;
};

export default function LiquidGlass({
  children,
  className = "",
  depth = 8,
  strength = 40,
  chromaticAberration = 1,
  ...props
}: LiquidGlassProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const filterLayer = filterRef.current;

    if (!root || !filterLayer) return;

    const redraw = () => {
      const rect = root.getBoundingClientRect();
      const width = Math.round(rect.width);
      const height = Math.round(rect.height);

      if (!width || !height) return;

      const radius = Number.parseFloat(getComputedStyle(root).borderRadius) || 0;
      const displacementFilter = getDisplacementFilter({
        width,
        height,
        radius,
        depth,
        strength,
        chromaticAberration,
      });
      const filterValue = `url("${displacementFilter}") brightness(1) saturate(1)`;

      filterLayer.style.width = `${width}px`;
      filterLayer.style.height = `${height}px`;

      if (CSS.supports("backdrop-filter", 'url("#test")')) {
        filterLayer.style.backdropFilter = filterValue;
      } else {
        filterLayer.style.webkitBackdropFilter = "brightness(1) saturate(1)";
      }
    };

    redraw();
    const resizeObserver = new ResizeObserver(redraw);
    resizeObserver.observe(root);

    return () => resizeObserver.disconnect();
  }, [chromaticAberration, depth, strength]);

  return (
    <div ref={rootRef} className={`liquid-glass ${className}`} {...props}>
      <span className="liquid-glass__overlay" aria-hidden="true" />
      <span
        ref={filterRef}
        className="liquid-glass__filter"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
