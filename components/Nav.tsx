"use client";

import { useEffect, useState } from "react";
import Scramble from "./Scramble";
import { scrollToTarget } from "@/lib/motion";

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Projects" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
];

export function useLocalTime() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kuala_Lumpur",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Nav() {
  const time = useLocalTime();

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToTarget(href);
  };

  return (
    <header className="nav">
      <a href="#top" className="nav__logo" onClick={(e) => go(e, "#top")} aria-label="MYO, back to top" data-lock-label="home">
        <span className="nav__logo-mark" aria-hidden="true" />
        MYO
      </a>
      <nav className="nav__links" aria-label="Sections">
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)} data-scramble-trigger data-lock-label={l.label.toLowerCase()}>
            <Scramble text={l.label} />
          </a>
        ))}
      </nav>
      <div className="nav__meta">
        <span className="pulse" aria-hidden="true" />
        <span>Lumut {time}</span>
      </div>
    </header>
  );
}
