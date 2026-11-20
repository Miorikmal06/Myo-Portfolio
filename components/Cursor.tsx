"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";

/**
 * Custom cursor: an orange dot wrapped by a slowly spinning "MYO" ring.
 * Hover states (set with data-cursor on any element):
 *   data-cursor="view"  → ring grows into an orange disc that reads VIEW ↗
 *   data-cursor="link"  → ring tightens around the dot
 *   data-cursor="hide"  → cursor fades (e.g. over the magnetic buttons)
 */
export default function Cursor() {
  const wrap = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches || !wrap.current || !dot.current) return;

    document.documentElement.classList.add("has-cursor");
    const el = wrap.current;
    const d = dot.current;

    const xRing = gsap.quickTo(el, "x", { duration: 0.55, ease: "power3" });
    const yRing = gsap.quickTo(el, "y", { duration: 0.55, ease: "power3" });
    const xDot = gsap.quickTo(d, "x", { duration: 0.12, ease: "power3" });
    const yDot = gsap.quickTo(d, "y", { duration: 0.12, ease: "power3" });

    let shown = false;
    const move = (e: PointerEvent) => {
      if (!shown) {
        gsap.set([el, d], { x: e.clientX, y: e.clientY });
        gsap.to([el, d], { autoAlpha: 1, duration: 0.3 });
        shown = true;
      }
      xRing(e.clientX);
      yRing(e.clientY);
      xDot(e.clientX);
      yDot(e.clientY);
    };

    let state = "";
    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      const next = t?.dataset.cursor ?? "";
      if (next === state) return;
      state = next;
      el.dataset.state = next;
      d.dataset.state = next;
      if (label.current) label.current.textContent = t?.dataset.cursorLabel ?? "View ↗";
    };

    const leave = () => gsap.to([el, d], { autoAlpha: 0, duration: 0.2 });
    const enter = () => shown && gsap.to([el, d], { autoAlpha: 1, duration: 0.2 });
    const down = () => gsap.to(el, { scale: 0.85, duration: 0.15 });
    const up = () => gsap.to(el, { scale: 1, duration: 0.3, ease: "back.out(3)" });

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    document.documentElement.addEventListener("pointerenter", enter);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);

    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.removeEventListener("pointerenter", enter);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={wrap} aria-hidden="true">
        <div className="cursor__inner">
          <svg className="cursor__ring" viewBox="0 0 100 100">
            <defs>
              <path id="cursor-circle" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
            </defs>
            <text>
              <textPath href="#cursor-circle" startOffset="0" textLength="226">
                MYO • MYO • MYO • MYO •
              </textPath>
            </text>
          </svg>
          <span className="cursor__label" ref={label}>View ↗</span>
        </div>
      </div>
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
    </>
  );
}
