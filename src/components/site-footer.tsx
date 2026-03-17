import Link from "next/link";
import type { NavItem, SiteContent } from "@/lib/site-content";

type SiteFooterProps = {
  navigation: NavItem[];
  footer: SiteContent["footer"];
};

export function SiteFooter({ navigation, footer }: SiteFooterProps) {
  return (
    <footer className="siteFooter">
      <p className="footerCopy">
        {footer.copy} <span>{footer.brand}</span> {footer.suffix}
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
