"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";

/** Pulls its child toward the pointer while hovered, then springs back. */
export default function Magnetic({
  children,
  strength = 0.4,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const inner = el.firstElementChild as HTMLElement | null;

    const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.35)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.35)" });
    const xIn = inner ? gsap.quickTo(inner, "x", { duration: 0.8, ease: "elastic.out(1, 0.35)" }) : null;
    const yIn = inner ? gsap.quickTo(inner, "y", { duration: 0.8, ease: "elastic.out(1, 0.35)" }) : null;

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      xTo(dx * strength);
      yTo(dy * strength);
      xIn?.(dx * strength * 0.35);
      yIn?.(dy * strength * 0.35);
    };
    const reset = () => {
      xTo(0);
      yTo(0);
      xIn?.(0);
      yIn?.(0);
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", reset);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`magnetic ${className ?? ""}`}>
      {children}
    </div>
  );
}
