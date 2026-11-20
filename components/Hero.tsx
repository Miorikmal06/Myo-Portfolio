"use client";

import { useEffect, useRef } from "react";
import { gsap, INTRO_DONE } from "@/lib/motion";
import { profile } from "@/data/content";

function Letters({ word }: { word: string }) {
  return (
    <>
      {word.split("").map((c, i) => (
        <span className="hero__char-mask" key={i}>
          <span className="hero__char">{c}</span>
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hero__char", { yPercent: 115 });
      gsap.set(".hero__photo", { yPercent: 18, autoAlpha: 0 });
      gsap.set(".hero__glow", { scale: 0.4, autoAlpha: 0 });
      gsap.set(".hero__reveal", { yPercent: 110 });

      const intro = () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.to(".hero__glow", { scale: 1, autoAlpha: 1, duration: 1.6 }, 0)
          .to(".hero__row--first .hero__char", { yPercent: 0, duration: 1.3, stagger: 0.06 }, 0.05)
          .to(".hero__row--last .hero__char", { yPercent: 0, duration: 1.3, stagger: 0.06 }, 0.2)
          .to(".hero__photo", { yPercent: 0, autoAlpha: 1, duration: 1.6 }, 0.25)
          .to(".hero__reveal", { yPercent: 0, duration: 1, stagger: 0.06 }, 0.6);
      };
      window.addEventListener(INTRO_DONE, intro, { once: true });
      if (document.documentElement.classList.contains("is-ready")) intro();

      // Scroll: the name splits apart, the photo sinks back.
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.6 },
        });
        tl.to(".hero__row--first", { xPercent: -18 }, 0)
          .to(".hero__row--last", { xPercent: 14 }, 0)
          .to(".hero__photo-wrap", { yPercent: 14, scale: 0.9 }, 0)
          .to(".hero__glow", { scale: 1.6, autoAlpha: 0.3 }, 0)
          .to(".hero__meta", { autoAlpha: 0, y: -40 }, 0);
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero__glow" aria-hidden="true" />

      <h1 className="hero__name" aria-label={`${profile.firstName} ${profile.lastName}`}>
        <span className="hero__row hero__row--first" aria-hidden="true">
          <Letters word={profile.firstName.toUpperCase()} />
        </span>
        <span className="hero__row hero__row--last" aria-hidden="true">
          <Letters word={profile.lastName.toUpperCase()} />
        </span>
      </h1>

      <div className="hero__photo-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="hero__photo" src="/me.png" alt={`Portrait of ${profile.fullName}`} width={410} height={915} fetchPriority="high" />
      </div>

      <div className="hero__meta hero__meta--left">
        <span className="mask"><span className="hero__reveal mono label">( 01 ) Portfolio — 2026</span></span>
        <span className="mask"><span className="hero__reveal hero__role">{profile.role}</span></span>
      </div>

      <div className="hero__meta hero__meta--right">
        <span className="mask"><span className="hero__reveal mono label">{profile.location}</span></span>
        <span className="mask">
          <span className="hero__reveal mono label">
            <span className="dot dot--live" aria-hidden="true" /> {profile.status}
          </span>
        </span>
      </div>

      <div className="hero__meta hero__meta--bottom">
        <span className="mask"><span className="hero__reveal hero__intro">{profile.intro}</span></span>
        <span className="mask"><span className="hero__reveal mono label hero__scroll">Scroll ↓</span></span>
      </div>
    </section>
  );
}
