import Link from "next/link";
import { navigation } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="siteFooter">
      <p className="footerCopy">
        Copyright 2026 <span>&lt;dev/&gt;</span> All rights reserved
      </p>
      <div className="footerLinks">
        {navigation.slice(1).map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
