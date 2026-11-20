"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";
import { stack } from "@/data/content";

/** Two rows of tech that drift in opposite directions and speed up with scroll velocity. */
export default function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tracks = gsap.utils.toArray<HTMLElement>(".marquee__track");
      const tweens = tracks.map((t, i) =>
        gsap.fromTo(
          t,
          { xPercent: i % 2 ? -50 : 0 },
          { xPercent: i % 2 ? 0 : -50, duration: 38, ease: "none", repeat: -1 }
        )
      );
      let boost = { v: 1 };
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = gsap.utils.clamp(1, 6, 1 + Math.abs(self.getVelocity()) / 400);
          boost = { v };
          tweens.forEach((tw) => tw.timeScale(v * (self.direction === 1 ? 1 : -1)));
          gsap.to(boost, {
            v: 1,
            duration: 0.8,
            overwrite: true,
            onUpdate: () => tweens.forEach((tw) => tw.timeScale(boost.v * (self.direction === 1 ? 1 : -1))),
          });
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const half = Math.ceil(stack.length / 2);
  const rows = [stack.slice(0, half), stack.slice(half)];

  return (
    <div className="marquee" ref={root} aria-label="Tech stack">
      <span className="sr-only">{stack.join(", ")}</span>
      {rows.map((row, r) => (
        <div className={`marquee__row ${r ? "marquee__row--alt" : ""}`} key={r} aria-hidden="true">
          <div className="marquee__track">
            {[0, 1].map((dup) => (
              <div className="marquee__group" key={dup}>
                {row.map((s) => (
                  <span className="marquee__item" key={s}>
                    {s}
                    <span className="marquee__star">✳</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
