import type { Metadata } from "next";
import { SiteEffects } from "@/components/site-effects";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteContent } from "@/lib/site-content";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio | Web Developer",
  description:
    "A modern portfolio website built with Next.js for web development, landing pages, server setup, and design services.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getSiteContent();

  return (
    <html lang="en">
      <body>
        <SiteEffects />
        <SiteHeader navigation={content.navigation} />
        {children}
        <SiteFooter navigation={content.navigation} footer={content.footer} />
      </body>
    </html>
  );
}
