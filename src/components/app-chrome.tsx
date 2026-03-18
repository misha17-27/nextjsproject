"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import type { NavItem, SiteContent } from "@/lib/site-content";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type AppChromeProps = {
  children: ReactNode;
  navigation: NavItem[];
  footer: SiteContent["footer"];
};

export function AppChrome({ children, navigation, footer }: AppChromeProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute ? <SiteHeader navigation={navigation} /> : null}
      {children}
      {!isAdminRoute ? <SiteFooter navigation={navigation} footer={footer} /> : null}
    </>
  );
}
