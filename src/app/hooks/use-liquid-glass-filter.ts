"use client";

import { useEffect, type RefObject } from "react";
import { getDisplacementFilter } from "../lib/nikdelvin-liquid-glass";

type LiquidGlassFilterOptions = {
  rootRef: RefObject<HTMLDivElement | null>;
  filterRef: RefObject<HTMLSpanElement | null>;
  depth: number;
  strength: number;
  chromaticAberration: number;
  filterBuffer: number;
};

const FALLBACK_FILTER = "blur(3px) saturate(1.04)";
let svgBackdropFilterSupported: boolean | undefined;

function supportsSvgBackdropFilter() {
  if (svgBackdropFilterSupported !== undefined) {
    return svgBackdropFilterSupported;
  }

  const svgFilter = 'url("#liquid-glass-support-test")';

  svgBackdropFilterSupported =
    CSS.supports("backdrop-filter", svgFilter) ||
    CSS.supports("-webkit-backdrop-filter", svgFilter);

  return svgBackdropFilterSupported;
}

export function useLiquidGlassFilter({
  rootRef,
  filterRef,
  depth,
  strength,
  chromaticAberration,
  filterBuffer,
}: LiquidGlassFilterOptions) {
  useEffect(() => {
    const root = rootRef.current;
    const filterLayer = filterRef.current;

    if (!root || !filterLayer) return;

    filterLayer.style.inset = `${-filterBuffer}px`;

    const drawFilter = () => {
      const width = root.offsetWidth + filterBuffer * 2;
      const height = root.offsetHeight + filterBuffer * 2;

      if (!width || !height) return;

      const computedRadius = Number.parseFloat(
        getComputedStyle(root).borderRadius,
      );
      const radius = Math.min(
        Number.isNaN(computedRadius) ? 0 : computedRadius,
        width / 2,
        height / 2,
      );

      if (!supportsSvgBackdropFilter()) {
        root.dataset.filterMode = "mobile-fallback";
        filterLayer.style.backdropFilter = FALLBACK_FILTER;
        filterLayer.style.setProperty(
          "-webkit-backdrop-filter",
          FALLBACK_FILTER,
        );
        return;
      }

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

      root.dataset.filterMode = "svg";
      filterLayer.style.backdropFilter = filterValue;
      filterLayer.style.setProperty("-webkit-backdrop-filter", filterValue);
    };

    let animationFrame: number | null = null;

    const scheduleDraw = () => {
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);

      animationFrame = requestAnimationFrame(() => {
        animationFrame = null;
        drawFilter();
      });
    };

    const drawAfterTransition = (event: TransitionEvent) => {
      if (event.target === root) scheduleDraw();
    };

    scheduleDraw();

    const resizeObserver = new ResizeObserver(scheduleDraw);
    resizeObserver.observe(root);
    root.addEventListener("transitionend", drawAfterTransition);

    return () => {
      resizeObserver.disconnect();
      root.removeEventListener("transitionend", drawAfterTransition);

      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
    };
  }, [
    chromaticAberration,
    depth,
    filterBuffer,
    filterRef,
    rootRef,
    strength,
  ]);
}
