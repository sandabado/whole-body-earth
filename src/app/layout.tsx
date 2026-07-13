import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Whole Body Studios — Infrastructure, Not a Label.",
  description:
    "Production, distribution, and sync licensing for artists who retain everything. We earn on services rendered — never on ownership. The artist eats first. Always.",
  keywords: [
    "music studio",
    "artist partnership",
    "sync licensing",
    "distribution",
    "Feed First",
  ],
  openGraph: {
    title: "Whole Body Studios",
    description: "Infrastructure, Not a Label. Artist-owned. Zero extraction.",
    url: "https://wholebody.studios",
    siteName: "Whole Body Studios",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
