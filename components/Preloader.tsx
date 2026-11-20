"use client";

import { useEffect, useRef } from "react";
import { gsap, getLenis, INTRO_DONE, prefersReducedMotion } from "@/lib/motion";

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finish = () => {
      document.documentElement.classList.add("is-ready");
      getLenis()?.start();
      window.dispatchEvent(new Event(INTRO_DONE));
    };

    if (prefersReducedMotion()) {
      root.current?.remove();
      finish();
      return;
    }

    window.scrollTo(0, 0);
    const counter = { v: 0 };
    const tl = gsap.timeline();

    tl.to(counter, {
      v: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
      },
    })
      .to(bar.current, { scaleX: 1, duration: 2, ease: "power2.inOut" }, 0)
      .to(".pre__line", { yPercent: -110, duration: 0.6, ease: "power3.in", stagger: 0.05 }, "+=0.15")
      .to(root.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 1,
        ease: "expo.inOut",
        onStart: finish,
      })
      .set(root.current, { display: "none" });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="pre" ref={root} aria-hidden="true">
      <div className="pre__top">
        <span className="pre__mask"><span className="pre__line mono">Mior Ikmal — Portfolio</span></span>
        <span className="pre__mask"><span className="pre__line mono">Lumut, MY</span></span>
      </div>
      <div className="pre__bottom">
        <span className="pre__mask">
          <span className="pre__line pre__count">
            <span ref={count}>000</span>
          </span>
        </span>
        <span className="pre__mask"><span className="pre__line mono">Loading build…</span></span>
      </div>
      <div className="pre__bar" ref={bar} />
    </div>
  );
}
