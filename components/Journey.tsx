"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";
import { journey, awards, certifications } from "@/data/content";

export default function Journey() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;

        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ".journey__pin",
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(".rail__fill", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".journey__pin",
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        gsap.utils.toArray<HTMLElement>(".stop").forEach((card) => {
          const onScreen = card.offsetLeft < window.innerWidth * 0.85;
          gsap.from(card, {
            y: 60,
            autoAlpha: 0,
            ease: "expo.out",
            duration: 1,
            delay: onScreen ? card.offsetLeft / 3000 : 0,
            scrollTrigger: onScreen
              ? { trigger: ".journey__track", start: "top 85%" }
              : { trigger: card, containerAnimation: tween, start: "left 90%" },
          });
        });
      });

      mm.add("(max-width: 899px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".stop").forEach((card) => {
          gsap.from(card, {
            y: 40,
            autoAlpha: 0,
            duration: 0.9,
            ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          });
        });
      });

      gsap.from(".award", {
        y: 24,
        autoAlpha: 0,
        stagger: 0.06,
        duration: 0.8,
        ease: "expo.out",
        scrollTrigger: { trigger: ".recog", start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="journey" id="journey" ref={root}>
      <div className="journey__pin">
        <div className="journey__head">
          <h2 className="bigtitle">Journey</h2>
        </div>

        <div className="journey__track" ref={track}>
          {journey.map((m, i) => (
            <article className={`stop ${m.medal ? `stop--${m.medal}` : ""}`} key={i}>
              <span className="stop__year">{m.year}</span>
              <h3 className="stop__title">{m.title}</h3>
              <p className="stop__place">{m.place}</p>
              <p className="stop__detail">{m.detail}</p>
            </article>
          ))}
          <article className="stop stop--next">
            <span className="stop__year">2027</span>
            <h3 className="stop__title">Graduating. Next up: your project.</h3>
          </article>
        </div>

        <div className="rail" aria-hidden="true">
          <div className="rail__fill" />
        </div>
      </div>

      <div className="recog">
        <div>
          <h3 className="recog__title">Medals</h3>
          <ul>
            {awards.map((a, i) => (
              <li className="award" key={i}>
                <span className={`medal medal--${a.medal}`} aria-label={`${a.medal} medal`} />
                <span className="award__event">{a.event}</span>
                <span className="award__project">{a.project}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="recog__title">Certifications</h3>
          <ul>
            {certifications.map((c) => (
              <li className="award" key={c.name}>
                <span className="medal medal--cert" aria-hidden="true" />
                <span className="award__event">{c.name}</span>
                <span className="award__project">{c.by}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
