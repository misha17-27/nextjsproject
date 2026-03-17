import type { Metadata } from "next";
import { Space_Mono, Syne } from "next/font/google";
import { SiteEffects } from "@/components/site-effects";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Portfolio | Web Developer",
  description:
    "A modern portfolio website built with Next.js for web development, landing pages, server setup, and design services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${spaceMono.variable}`}>
        <SiteEffects />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
