"use client";

import { useEffect, useRef } from "react";
import { gsap, getLenis, INTRO_DONE, prefersReducedMotion } from "@/lib/motion";

const LINES = [
  "booting vision runtime",
  "loading weights  mior-ikmal-v2026",
  "calibrating camera",
  "scanning for visitors",
];

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const pct = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const finish = () => {
      document.documentElement.classList.add("is-ready");
      getLenis()?.start();
      // dispatch outside this component's gsap.context so listeners resolve
      // their selectors against the whole document, not the preloader
      setTimeout(() => window.dispatchEvent(new Event(INTRO_DONE)), 0);
    };

    if (prefersReducedMotion()) {
      root.current?.remove();
      finish();
      return;
    }

    window.scrollTo(0, 0);
    const counter = { v: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.to(counter, {
        v: 100,
        duration: 1.9,
        ease: "power2.inOut",
        onUpdate: () => {
          if (pct.current) pct.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
        },
      })
        .to(".boot__fill", { scaleX: 1, duration: 1.9, ease: "power2.inOut" }, 0)
        .from(".boot__line", { autoAlpha: 0, x: -12, duration: 0.3, stagger: 0.42 }, 0.05)
        .to(".boot__ok", { autoAlpha: 1, duration: 0.1, stagger: 0.42 }, 0.4)
        .to(".boot__panel", { scaleY: 0.004, duration: 0.35, ease: "power4.in" }, "+=0.15")
        .to(".boot__panel", { scaleX: 0, duration: 0.25, ease: "power4.in" })
        .to(root.current, { autoAlpha: 0, duration: 0.35, onStart: finish })
        .set(root.current, { display: "none" });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="boot" ref={root} aria-hidden="true">
      <div className="boot__panel">
        <div className="boot__head">
          <span>MYO / vision</span>
          <span>
            <span ref={pct}>000</span>%
          </span>
        </div>
        <ul className="boot__log">
          {LINES.map((l) => (
            <li className="boot__line" key={l}>
              <span>&gt; {l}</span>
              <span className="boot__ok">ok</span>
            </li>
          ))}
        </ul>
        <div className="boot__bar">
          <div className="boot__fill" />
        </div>
      </div>
    </div>
  );
}
