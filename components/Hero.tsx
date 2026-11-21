"use client";

import { useEffect, useRef } from "react";
import { gsap, scrollToTarget } from "@/lib/motion";
import { profile, portrait } from "@/data/content";
import FacePlay from "./FacePlay";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // the one orchestrated moment: the lights come up on the portrait
        const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.15 });
        tl.from(".portrait__img", { filter: "brightness(0)", duration: 2.2, ease: "power2.out" }, 0)
          .from(".portrait", { scale: 1.05, duration: 2.4 }, 0)
          .from(".hero__line", { yPercent: 105, duration: 1.2, stagger: 0.1 }, 0.35)
          .from(".hero__after", { autoAlpha: 0, y: 16, duration: 0.9, stagger: 0.08 }, 0.8);

        gsap.to(".hero__visual", {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero__inner">
        <div className="hero__copy">
          <h1 className="hero__name">
            <span className="hero__mask"><span className="hero__line">{profile.firstName}</span></span>
            <span className="hero__mask"><span className="hero__line">{profile.lastName}</span></span>
          </h1>
          <p className="hero__after hero__role">{profile.role}</p>
          <p className="hero__after hero__intro">{profile.intro}</p>
          <div className="hero__after hero__actions">
            <a
              href="#work"
              className="btn btn--solid"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget("#work");
              }}
            >
              See my work
            </a>
            <a href={`mailto:${profile.email}`} className="btn btn--ghost">
              Email me
            </a>
          </div>
        </div>

        <div className="hero__visual">
          <FacePlay
            src={portrait.src}
            width={portrait.width}
            height={portrait.height}
            alt={`Portrait of ${profile.fullName}, seated, in a dark suit`}
          />
        </div>
      </div>
    </section>
  );
}
