"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/data/site";

export function SiteHeader() {
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
