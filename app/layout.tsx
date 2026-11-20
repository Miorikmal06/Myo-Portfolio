import type { Metadata, Viewport } from "next";
import { Chakra_Petch, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const display = Chakra_Petch({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://myo-portfolio.vercel.app"),
  title: "Mior Ikmal | Web developer & big data student",
  description:
    "Portfolio of Mior Muhammad Ikmal: landing pages, websites, web systems, data dashboards and computer vision. Diploma in Computer Technology (Big Data), TVETMARA Lumut.",
  openGraph: {
    title: "Mior Ikmal | Web developer & big data student",
    description: "Landing pages, websites, systems and computer vision, built and shipped.",
    images: ["/work/nexguard.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#070a12",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
