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
