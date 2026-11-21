"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";
import { projects, type Project } from "@/data/content";

function Card({ p, wide }: { p: Project; wide: boolean }) {
  const media = (
    <span className="card__media">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={p.image} alt={`Screenshot of ${p.title}`} loading="lazy" />
    </span>
  );
  const meta = (
    <span className="card__meta">
      <span className="card__title">{p.title}</span>
      <span className="card__kind">
        {p.kind}, {p.year}
      </span>
      <span className="card__cta">{p.url ? "Visit site" : "On-site system"}</span>
    </span>
  );

  return (
    <li className={`card ${wide ? "card--wide" : ""}`}>
      {p.url ? (
        <a className="card__link" href={p.url} target="_blank" rel="noopener noreferrer" data-cursor="view">
          {media}
          {meta}
        </a>
      ) : (
        <div className="card__link">
          {media}
          {meta}
        </div>
      )}
      <p className="card__summary">{p.summary}</p>
      <ul className="card__stack" aria-label="Built with">
        {p.stack.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      {p.badge && <p className="card__badge">{p.badge}</p>}
    </li>
  );
}

export default function Work() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".card").forEach((card) => {
          gsap.from(card.querySelector(".card__media img"), {
            scale: 1.15,
            ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
          });
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="work theme-light" id="work" ref={root}>
      <div className="section">
        <h2 className="bigtitle">Featured projects</h2>
        <ul className="cards">
          {projects.map((p, i) => (
            <Card key={p.id} p={p} wide={i % 4 === 0 || i % 4 === 3} />
          ))}
        </ul>
      </div>
    </section>
  );
}
