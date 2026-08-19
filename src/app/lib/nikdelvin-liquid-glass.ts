/*
 * Adapted from https://github.com/nikdelvin/liquid-glass
 * MIT License — Copyright (c) 2025 Nikita Stadnik
 */

type DisplacementOptions = {
  height: number;
  width: number;
  radius: number;
  depth: number;
  strength?: number;
  chromaticAberration?: number;
};

const getDisplacementMap = ({
  height,
  width,
  radius,
  depth,
}: Omit<DisplacementOptions, "chromaticAberration" | "strength">) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`<svg height="${height}" width="${width}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <style>.mix { mix-blend-mode: screen; }</style>
    <defs>
      <linearGradient id="Y" x1="0" x2="0" y1="0%" y2="100%">
        <stop offset="0%" stop-color="#00FF00" />
        <stop offset="50%" stop-color="#008000" />
        <stop offset="100%" stop-color="#000000" />
      </linearGradient>
      <linearGradient id="X" x1="0%" x2="100%" y1="0" y2="0">
        <stop offset="0%" stop-color="#FF0000" />
        <stop offset="50%" stop-color="#800000" />
        <stop offset="100%" stop-color="#000000" />
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="#808080" />
    <g filter="blur(2px)">
      <rect width="${width}" height="${height}" fill="#000080" />
      <rect width="${width}" height="${height}" fill="url(#Y)" class="mix" />
      <rect width="${width}" height="${height}" fill="url(#X)" class="mix" />
      <rect x="${depth}" y="${depth}" width="${width - 2 * depth}" height="${height - 2 * depth}" fill="#808080" rx="${radius}" ry="${radius}" filter="blur(${depth}px)" />
    </g>
  </svg>`);

export const getDisplacementFilter = ({
  height,
  width,
  radius,
  depth,
  strength = 100,
  chromaticAberration = 0,
}: DisplacementOptions) => {
  const padding = Math.ceil(
    strength / 2 + chromaticAberration * 2 + depth * 2,
  );

  return (
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`<svg height="${height}" width="${width}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="displace" x="-${padding}" y="-${padding}" width="${width + padding * 2}" height="${height + padding * 2}" filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feImage width="${width}" height="${height}" href="${getDisplacementMap({ height, width, radius, depth })}" result="displacementMap" />
        <feDisplacementMap in="SourceGraphic" in2="displacementMap" scale="${strength + chromaticAberration * 2}" xChannelSelector="R" yChannelSelector="G" />
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="displacedR" />
        <feDisplacementMap in="SourceGraphic" in2="displacementMap" scale="${strength + chromaticAberration}" xChannelSelector="R" yChannelSelector="G" />
        <feColorMatrix type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="displacedG" />
        <feDisplacementMap in="SourceGraphic" in2="displacementMap" scale="${strength}" xChannelSelector="R" yChannelSelector="G" />
        <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="displacedB" />
        <feBlend in="displacedR" in2="displacedG" mode="screen" />
        <feBlend in2="displacedB" mode="screen" />
      </filter>
    </defs>
  </svg>`) +
    "#displace"
  );
};
