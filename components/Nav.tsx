"use client";

import { scrollToTarget } from "@/lib/motion";

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToTarget(href);
  };

  return (
    <header className="nav">
      <a href="#top" className="nav__logo" onClick={(e) => go(e, "#top")} aria-label="MYO, back to top">
        MYO
      </a>
      <nav className="nav__links" aria-label="Sections">
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)}>
            {l.label}
          </a>
        ))}
      </nav>
      <p className="nav__status">
        <span className="dot" aria-hidden="true" /> Available for work
      </p>
    </header>
  );
}
