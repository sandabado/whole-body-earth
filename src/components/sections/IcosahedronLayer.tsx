"use client";

import dynamic from "next/dynamic";

const IcosahedronBackground = dynamic(
  () => import("@/components/sections/IcosahedronBackground"),
  { ssr: false },
);

export function IcosahedronLayer({ opacity = 0.55 }: { opacity?: number }) {
  return <IcosahedronBackground opacity={opacity} />;
}
