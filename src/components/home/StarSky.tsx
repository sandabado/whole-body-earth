import type { CSSProperties } from "react";

type Star = { delay: string; duration: string; opacity: number; size: number; x: number; y: number };

function seededRandom(seedValue: number) {
  let seed = seedValue;
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

const random = seededRandom(41729);
const STARS: Star[] = Array.from({ length: 240 }, () => ({
  x: random() * 100,
  y: random() * 100,
  size: 0.65 + Math.pow(random(), 4) * 2.7,
  opacity: 0.34 + random() * 0.66,
  duration: `${5 + random() * 11}s`,
  delay: `${-random() * 14}s`,
}));

/** A lightweight, visible star layer for the home portal; no WebGL required. */
export function StarSky() {
  return <div className="home-star-sky" aria-hidden="true">
    {STARS.map((star, index) => <i
      key={index}
      className="home-star"
      style={{
        left: `${star.x}%`, top: `${star.y}%`,
        "--star-size": `${star.size}px`,
        "--star-opacity": star.opacity,
        "--star-duration": star.duration,
        "--star-delay": star.delay,
      } as CSSProperties}
    />)}
  </div>;
}
