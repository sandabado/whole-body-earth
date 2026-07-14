import type { Metadata } from "next";
import { Cinzel, DM_Mono, Inter } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["400", "500"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
      className={`${cinzel.variable} ${dmMono.variable} ${inter.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
