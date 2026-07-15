import type { CSSProperties } from "react";

// U+FE0E forces text presentation so browser emoji fonts cannot introduce colored glyphs.
const ZODIAC_SIGNS = ["♈︎", "♉︎", "♊︎", "♋︎", "♌︎", "♍︎", "♎︎", "♏︎", "♐︎", "♑︎", "♒︎", "♓︎"];

/** The hero's celestial dial is DOM-rendered so it appears immediately with the Earth. */
export function HeroZodiacOrbit() {
  return <div className="hero-zodiac-orbit" aria-hidden="true">
    <div className="hero-zodiac-dial">
      <div className="hero-zodiac-ring" />
      {ZODIAC_SIGNS.map((sign, index) => {
        const angle = (index / ZODIAC_SIGNS.length) * Math.PI * 2 - Math.PI / 2;
        return <span
          key={sign}
          className="hero-zodiac-sign"
          style={{ left: `${50 + Math.cos(angle) * 48}%`, top: `${50 + Math.sin(angle) * 48}%` } as CSSProperties}
        >{sign}</span>;
      })}
    </div>
  </div>;
}
