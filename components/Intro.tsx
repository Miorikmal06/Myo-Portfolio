"use client";

import { useEffect, useRef } from "react";
import { gsap, scrollToTarget } from "@/lib/motion";
import { profile, facts, projects, experience } from "@/data/content";

// the moving strip shows real work: project screens and teaching photos
const STRIP = [
  ...projects.map((p) => ({ src: p.image, alt: p.title })),
  ...experience.flatMap((x) => x.photos.map((ph) => ({ src: ph.src, alt: x.org }))),
];

export default function Intro() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".intro__word",
          { opacity: 0.18 },
          {
            opacity: 1,
            stagger: 0.05,
            ease: "none",
            scrollTrigger: { trigger: ".intro__text", start: "top 80%", end: "bottom 55%", scrub: true },
          }
        );
        gsap.to(".intro__plus", {
          rotation: 180,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });
        const strip = gsap.to(".strip__track", { xPercent: -50, duration: 40, ease: "none", repeat: -1 });
        gsap.timeline({
          scrollTrigger: {
            trigger: ".strip",
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => strip.timeScale(1 + Math.abs(self.getVelocity()) / 500),
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="intro" id="about" ref={root}>
      <div className="intro__grid section">
        <h2 className="intro__label">(Introduction)</h2>
        <div className="intro__body">
          <p className="intro__text">
            {profile.intro.split(" ").map((w, i) => (
              <span className="intro__word" key={i}>
                {w}{" "}
              </span>
            ))}
          </p>
          <p className="intro__more">{profile.about}</p>
          <div className="intro__actions">
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
        <span className="plus intro__plus" aria-hidden="true" />
        <dl className="facts">
          {facts.map((f) => (
            <div className="fact" key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="strip" aria-label="Snapshots of my work">
        <div className="strip__track">
          {[0, 1].map((g) =>
            STRIP.map((s, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`${g}-${i}`}
                src={s.src}
                alt={g === 0 ? s.alt : ""}
                aria-hidden={g === 1}
                className="strip__img"
                loading="lazy"
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
