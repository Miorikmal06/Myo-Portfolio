"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";
import { profile, stats } from "@/data/content";
import Scramble from "./Scramble";

export default function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".about__word",
          { opacity: 0.12 },
          {
            opacity: 1,
            stagger: 0.05,
            ease: "none",
            scrollTrigger: { trigger: ".about__statement", start: "top 80%", end: "bottom 45%", scrub: true },
          }
        );

        gsap.from(".about__photo img", {
          scale: 1.25,
          ease: "none",
          scrollTrigger: { trigger: ".about__photo", start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(".stat__value").forEach((el) => {
        const target = Number(el.dataset.value);
        const decimals = Number(el.dataset.decimals);
        const o = { v: 0 };
        gsap.to(o, {
          v: target,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = o.v.toFixed(decimals);
          },
        });
      });

      gsap.from(".stat", {
        y: 40,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".about__stats", start: "top 85%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const [lead, ...rest] = profile.about;

  return (
    <section className="about section" id="about" ref={root}>
      <div className="section__head">
        <span className="mono label">( 02 )</span>
        <Scramble className="mono label" text="About me" onView />
      </div>

      <p className="about__statement">
        {profile.intro.split(" ").map((w, i) => (
          <span className="about__word" key={i}>
            {w}{" "}
          </span>
        ))}
      </p>

      <div className="about__grid">
        <figure className="about__photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/me.png" alt="" loading="lazy" />
          <figcaption className="mono label">{profile.fullName}</figcaption>
        </figure>
        <div className="about__copy">
          <p className="about__lead">{lead}</p>
          {rest.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      <ul className="about__stats">
        {stats.map((s) => (
          <li className="stat" key={s.label}>
            <span className="stat__value" data-value={s.value} data-decimals={s.decimals}>
              {s.value.toFixed(s.decimals)}
            </span>
            <span className="mono label">{s.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
