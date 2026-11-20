"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";
import { profile, modelCard } from "@/data/content";

export default function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".about__word",
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.05,
            ease: "none",
            scrollTrigger: { trigger: ".about__statement", start: "top 80%", end: "bottom 50%", scrub: true },
          }
        );
        gsap.from(".card__row", {
          clipPath: "inset(0 100% 0 0)",
          duration: 0.9,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: ".card", start: "top 78%" },
        });
        gsap.from(".gauge__fill", {
          scaleX: 0,
          duration: 1.6,
          ease: "expo.out",
          scrollTrigger: { trigger: ".gauge", start: "top 85%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="about section" id="about" ref={root}>
      <p className="about__statement">
        {profile.about.split(" ").map((w, i) => (
          <span className="about__word" key={i}>
            {w}{" "}
          </span>
        ))}
      </p>

      <div className="card" data-lock="off">
        <header className="card__head">
          <h2 className="card__title">Model card</h2>
          <code className="card__id">{profile.handle}-v2026</code>
        </header>

        <dl className="card__rows">
          {modelCard.map((r) => (
            <div className={`card__row ${r.highlight ? "card__row--hi" : ""}`} key={r.key}>
              <dt>{r.key}</dt>
              <dd>{r.value}</dd>
            </div>
          ))}
        </dl>

        <div className="gauge" role="img" aria-label="CGPA 3.84 out of 4.00">
          <div className="gauge__track">
            <div className="gauge__fill" style={{ width: `${(3.84 / 4) * 100}%` }} />
          </div>
          <div className="gauge__scale" aria-hidden="true">
            <span>0.00</span>
            <span>CGPA 3.84 / 4.00</span>
          </div>
        </div>
      </div>
    </section>
  );
}
