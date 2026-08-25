/**
 * Deterministic starfield for the space backdrop.
 *
 * Generated on the server from a fixed seed rather than in the browser, so the
 * sky renders with the first paint, costs no JavaScript, and looks identical on
 * every request (no re-shuffle between page loads).
 */

export interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

/** mulberry32 — small, fast, and stable across Node versions. */
function seededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface OrbitBody {
  /** Diameter in px. */
  size: number;
  color: string;
  glow: number;
  /** Where the body sits on the ring, in degrees. */
  deg: number;
  /** transform-origin Y so the body pivots around the ring's centre. */
  originY: number;
  offset: number;
}

export interface Orbit {
  size: number;
  duration: number;
  reverse: boolean;
  bodies: OrbitBody[];
  /**
   * The page-spanning outer rings are thousands of pixels across. Animating a
   * layer that size costs far more than the motion is worth, so they hold
   * still and only the inner rings turn.
   */
  still?: boolean;
}

/** Brand-coloured bodies: logo blue, logo green, and the mark's chartreuse. */
function orbit(
  size: number,
  duration: number,
  reverse: boolean,
  bodies: Array<{ r: number; color: string; glow: number; deg: number }>,
  still = false,
): Orbit {
  return {
    size,
    duration,
    reverse,
    still,
    bodies: bodies.map((body) => ({
      size: body.r * 2,
      color: body.color,
      glow: body.glow,
      deg: body.deg,
      originY: size / 2 + body.r,
      offset: -body.r,
    })),
  };
}

/**
 * A single solar system for the whole page.
 *
 * Everything orbits one sun, which sits above the technology grid. The inner
 * rings turn around it; the outer ones are wide enough to arc up past the
 * process panel, the portfolio book and into the hero, which is what makes the
 * page read as one system rather than two clusters. Bodies on those far rings
 * sit near 0° (the top of the ring) so they land in the upper page instead of
 * below the fold.
 */
export const solarSystem: Orbit[] = [
  // Inner rings — these rotate.
  orbit(340, 48, false, [{ r: 7, color: '#E5484D', glow: 16, deg: 96 }]),
  orbit(620, 74, true, [{ r: 11, color: '#66D110', glow: 22, deg: 152 }]),
  orbit(980, 105, false, [
    { r: 9, color: '#F5A524', glow: 20, deg: 218 },
    { r: 5, color: '#7DBBE4', glow: 12, deg: 20 },
  ]),
  orbit(1500, 165, true, [{ r: 13, color: '#66D110', glow: 26, deg: 285 }]),
  orbit(2300, 240, false, [
    { r: 6, color: '#D3D506', glow: 16, deg: 340 },
    { r: 9, color: '#2A90E8', glow: 20, deg: 130 },
  ]),

  // Outer rings — page-spanning, so they hold still.
  orbit(3400, 0, false, [{ r: 7, color: '#7DBBE4', glow: 18, deg: 22 }], true),
  orbit(4600, 0, false, [{ r: 9, color: '#66D110', glow: 22, deg: 348 }], true),
  orbit(5900, 0, false, [{ r: 6, color: '#D3D506', glow: 16, deg: 12 }], true),
];

export function generateStars(count = 140, seed = 20260811): Star[] {
  const random = seededRandom(seed);
  return Array.from({ length: count }, () => ({
    x: Number((random() * 100).toFixed(3)),
    y: Number((random() * 100).toFixed(3)),
    size: Number((random() * 2.2 + 0.6).toFixed(2)),
    opacity: Number((random() * 0.55 + 0.25).toFixed(2)),
    duration: Number((random() * 4 + 2.5).toFixed(2)),
    delay: Number((random() * 6).toFixed(2)),
  }));
}
