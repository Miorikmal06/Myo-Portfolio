"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";
import { profile, facts } from "@/data/content";

export default function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".about__word",
          { opacity: 0.18 },
          {
            opacity: 1,
            stagger: 0.05,
            ease: "none",
            scrollTrigger: { trigger: ".about__statement", start: "top 80%", end: "bottom 55%", scrub: true },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="about section" id="about" ref={root}>
      <h2 className="eyebrow">About</h2>
      <p className="about__statement">
        {profile.about.split(" ").map((w, i) => (
          <span className="about__word" key={i}>
            {w}{" "}
          </span>
        ))}
      </p>
      <dl className="facts">
        {facts.map((f) => (
          <div className="fact" key={f.label}>
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
