"use client";

import { useEffect, useRef } from "react";
import { gsap, INTRO_DONE, scrollToTarget } from "@/lib/motion";
import { profile } from "@/data/content";
import ParticleField from "./ParticleField";
import Magnetic from "./Magnetic";

const LOG = [
  { text: "person detected", score: "0.99" },
  { text: `face matched: ${profile.handle}`, score: "0.98" },
  { text: "skills: web, systems, data, vision", score: "" },
  { text: "status: open for freelance & internship", score: "" },
];

function type(el: HTMLElement, full: string, duration: number) {
  const o = { n: 0 };
  return gsap.to(o, {
    n: full.length,
    duration,
    ease: "none",
    onUpdate: () => {
      el.textContent = full.slice(0, Math.round(o.n));
    },
  });
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      gsap.set(".hero__char", { yPercent: 110 });
      gsap.set(".hero__photo", { autoAlpha: 0, scale: 1.04 });
      gsap.set(".scan", { autoAlpha: 0, top: "0%" });
      gsap.set(".det", { autoAlpha: 0 });
      gsap.set(".det__c", { scale: 0 });
      gsap.set(".hero__fade", { autoAlpha: 0, y: 24 });
      q<HTMLElement>(".det__label, .log__text").forEach((el) => (el.textContent = ""));

      const intro = () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.to(".hero__char", { yPercent: 0, duration: 1.1, stagger: 0.035 }, 0)
          .to(".hero__photo", { autoAlpha: 1, scale: 1, duration: 1.2 }, 0.1)
          // scanner sweeps the portrait
          .to(".scan", { autoAlpha: 1, duration: 0.15 }, 0.4)
          .to(".scan", { top: "100%", duration: 1.1, ease: "power2.inOut" }, 0.4)
          .to(".scan", { autoAlpha: 0, duration: 0.2 }, 1.45)
          // detection boxes lock on
          .to(".det--person", { autoAlpha: 1, duration: 0.01 }, 1.0)
          .to(".det--person .det__c", { scale: 1, duration: 0.5, ease: "back.out(3)" }, 1.0)
          .to(".det--face", { autoAlpha: 1, duration: 0.01 }, 1.3)
          .to(".det--face .det__c", { scale: 1, duration: 0.5, ease: "back.out(3)" }, 1.3)
          .to(".hero__fade", { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 }, 0.6);

        q<HTMLElement>(".det__label").forEach((el, i) => tl.add(type(el, el.dataset.text!, 0.5), 1.05 + i * 0.3));
        q<HTMLElement>(".log__text").forEach((el, i) => tl.add(type(el, el.dataset.text!, 0.45), 1.4 + i * 0.45));
        tl.to(".log__score", { autoAlpha: 1, stagger: 0.45, duration: 0.1 }, 1.85);
      };
      window.addEventListener(INTRO_DONE, intro, { once: true });
      if (document.documentElement.classList.contains("is-ready")) intro();

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.5 },
        })
          .to(".hero__name", { yPercent: -30, autoAlpha: 0.2 }, 0)
          .to(".hero__visual", { yPercent: 12, scale: 0.94 }, 0)
          .to(".field", { autoAlpha: 0.25 }, 0);
      });

      // the detection box drifts a touch with the pointer, like a live tracker
      const vis = root.current!.querySelector<HTMLElement>(".det--face");
      if (vis && window.matchMedia("(pointer: fine)").matches) {
        const xTo = gsap.quickTo(vis, "x", { duration: 1.2, ease: "power3" });
        const yTo = gsap.quickTo(vis, "y", { duration: 1.2, ease: "power3" });
        const m = (e: PointerEvent) => {
          xTo((e.clientX / window.innerWidth - 0.5) * 8);
          yTo((e.clientY / window.innerHeight - 0.5) * 6);
        };
        window.addEventListener("pointermove", m, { passive: true });
        return () => window.removeEventListener("pointermove", m);
      }
    }, root);
    return () => ctx.revert();
  }, []);

  const name = `${profile.firstName} ${profile.lastName}`;

  return (
    <section className="hero" id="top" ref={root}>
      <ParticleField revealEvent={INTRO_DONE} />
      <div className="hero__grid" aria-hidden="true" />

      <div className="hero__inner">
        <div className="hero__copy">
          <p className="hero__fade hero__role">{profile.role}</p>
          <h1 className="hero__name" aria-label={name}>
            {[profile.firstName, profile.lastName].map((word) => (
              <span className="hero__word" key={word} aria-hidden="true">
                {word.split("").map((ch, i) => (
                  <span className="hero__char-mask" key={i}>
                    <span className="hero__char">{ch}</span>
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <p className="hero__fade hero__intro">{profile.intro}</p>
          <div className="hero__fade hero__actions">
            <Magnetic strength={0.3}>
              <a
                href="#work"
                className="btn btn--solid"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget("#work");
                }}
                data-lock-label="projects"
              >
                See my projects
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a href={`mailto:${profile.email}`} className="btn btn--ghost">
                Email me
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="hero__photo" src="/me.png" alt={`Portrait of ${profile.fullName}`} width={410} height={915} fetchPriority="high" />
            <div className="scan" aria-hidden="true" />
            <div className="det det--person" aria-hidden="true">
              <i className="det__c det__c--tl" /><i className="det__c det__c--tr" />
              <i className="det__c det__c--bl" /><i className="det__c det__c--br" />
              <span className="det__label" data-text="person 0.99" />
            </div>
            <div className="det det--face" aria-hidden="true">
              <i className="det__c det__c--tl" /><i className="det__c det__c--tr" />
              <i className="det__c det__c--bl" /><i className="det__c det__c--br" />
              <span className="det__label" data-text={`${profile.handle} 0.98`} />
            </div>
          </div>

          <ol className="log hero__fade" aria-label="Detection log">
            {LOG.map((l) => (
              <li key={l.text}>
                <span className="log__text" data-text={l.text} aria-hidden="true" />
                {l.score && <span className="log__score">{l.score}</span>}
                <span className="sr-only">{l.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
