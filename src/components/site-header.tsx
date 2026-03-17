"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/lib/site-content";

type SiteHeaderProps = {
  navigation: NavItem[];
};

export function SiteHeader({ navigation }: SiteHeaderProps) {
  const pathname = usePathname();

  return (
    <nav className="siteNav">
      <Link href="/" className="navLogo">
        &lt;<span>dev</span>/&gt;
      </Link>
      <ul className="navLinks">
        {navigation.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={pathname === item.href ? "activeNavLink" : undefined}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/contact" className="navCta">
        Hire Me
      </Link>
    </nav>
  );
}
