import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mior Ikmal — Web Developer & Big Data Student",
  description:
    "Portfolio of Mior Muhammad Ikmal: landing pages, websites, web systems, data dashboards and IoT projects. Diploma in Computer Technology (Big Data), TVETMARA Lumut.",
  openGraph: {
    title: "Mior Ikmal — Web Developer & Big Data Student",
    description:
      "Landing pages, websites, web systems, dashboards and IoT — built and shipped.",
    images: ["/work/nexguard.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
