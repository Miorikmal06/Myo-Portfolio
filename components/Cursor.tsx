"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";

/**
 * Minimal cursor: a small dot that follows the pointer and opens into a thin
 * ring over anything clickable. Only on devices with a fine pointer; touch
 * devices keep their native behaviour.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = dot.current!;
    document.documentElement.classList.add("has-cursor");

    const x = gsap.quickTo(el, "x", { duration: 0.18, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.18, ease: "power3" });
    let shown = false;
    let state = "";

    const move = (e: PointerEvent) => {
      if (!shown) {
        gsap.set(el, { x: e.clientX, y: e.clientY });
        gsap.to(el, { autoAlpha: 1, duration: 0.2 });
        shown = true;
      }
      x(e.clientX);
      y(e.clientY);
      const t = e.target as HTMLElement;
      const next = t.closest("[data-cursor='face']")
        ? "face"
        : t.closest("a, button, select, input, textarea, label")
          ? "link"
          : "";
      if (next !== state) {
        state = next;
        el.dataset.state = next;
      }
    };
    const leave = () => gsap.to(el, { autoAlpha: 0, duration: 0.2 });
    const enter = () => shown && gsap.to(el, { autoAlpha: 1, duration: 0.2 });
    const down = () => el.classList.add("is-down");
    const up = () => el.classList.remove("is-down");

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    document.documentElement.addEventListener("pointerenter", enter);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.removeEventListener("pointerenter", enter);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return <div className="cursor" ref={dot} aria-hidden="true" />;
}
