"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";

/**
 * Dark-to-light hand-off: a light square opens from the middle of the screen
 * until it fills it, and the light sections continue underneath.
 */
export default function Grow() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".grow__box",
          { clipPath: "inset(38% 36% 38% 36%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power2.inOut",
            scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: true },
          }
        );
        gsap.fromTo(
          ".grow__word",
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: { trigger: root.current, start: "30% top", end: "70% bottom", scrub: true },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className="grow" ref={root} aria-hidden="true">
      <div className="grow__sticky">
        <div className="grow__box theme-light">
          <span className="grow__word">Selected work</span>
        </div>
      </div>
    </div>
  );
}
