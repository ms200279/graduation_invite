"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { getDisplacementFilter } from "../lib/nikdelvin-liquid-glass";

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

  useEffect(() => {
    const root = rootRef.current;
    const filterLayer = filterRef.current;

    if (!root || !filterLayer) return;

    filterLayer.style.inset = `${-filterBuffer}px`;

    const redraw = () => {
      const width = root.offsetWidth + filterBuffer * 2;
      const height = root.offsetHeight + filterBuffer * 2;

      if (!width || !height) return;

      const computedRadius =
        Number.parseFloat(getComputedStyle(root).borderRadius) || 0;
      const radius = Math.min(computedRadius, width / 2, height / 2);
      const displacementFilter = getDisplacementFilter({
        width,
        height,
        radius,
        depth,
        boundsInset: filterBuffer,
        strength,
        chromaticAberration,
      });
      const filterValue = `url("${displacementFilter}") brightness(1) saturate(1)`;

      if (CSS.supports("backdrop-filter", 'url("#test")')) {
        filterLayer.style.backdropFilter = filterValue;
      } else {
        filterLayer.style.webkitBackdropFilter = "brightness(1) saturate(1)";
      }
    };

    let animationFrame: number | null = null;
    const scheduleRedraw = () => {
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }

      animationFrame = requestAnimationFrame(() => {
        animationFrame = null;
        redraw();
      });
    };

    const redrawAfterTransition = (event: TransitionEvent) => {
      if (event.target === root) {
        scheduleRedraw();
      }
    };

    scheduleRedraw();
    const resizeObserver = new ResizeObserver(scheduleRedraw);
    resizeObserver.observe(root);
    root.addEventListener("transitionend", redrawAfterTransition);

    return () => {
      resizeObserver.disconnect();
      root.removeEventListener("transitionend", redrawAfterTransition);

      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [chromaticAberration, depth, filterBuffer, strength]);

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
