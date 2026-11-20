"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";
import { journey, awards, certifications } from "@/data/content";
import Scramble from "./Scramble";

export default function Journey() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: pin the section and scroll the timeline sideways.
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

        gsap.to(".journey__progress", {
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

        gsap.utils.toArray<HTMLElement>(".milestone").forEach((card) => {
          // Cards already on screen reveal as the section arrives;
          // the rest reveal as they slide in from the right.
          const onScreen = card.offsetLeft < window.innerWidth * 0.85;
          gsap.from(card, {
            y: 80,
            autoAlpha: 0,
            ease: "expo.out",
            duration: 1.1,
            delay: onScreen ? card.offsetLeft / 3000 : 0,
            scrollTrigger: onScreen
              ? { trigger: ".journey__track", start: "top 85%" }
              : { trigger: card, containerAnimation: tween, start: "left 90%" },
          });
        });
      });

      // Mobile: plain vertical list, each card rises in.
      mm.add("(max-width: 899px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".milestone").forEach((card) => {
          gsap.from(card, {
            y: 50,
            autoAlpha: 0,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          });
        });
      });

      gsap.from(".award", {
        y: 30,
        autoAlpha: 0,
        stagger: 0.07,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: ".recognition", start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="journey" id="journey" ref={root}>
      <div className="journey__pin">
        <div className="journey__head section__inner">
          <div className="section__head">
            <span className="mono label">( 05 )</span>
            <Scramble className="mono label" text="Journey" onView />
          </div>
          <h2 className="section__title">
            Resume, <em>but moving</em>
          </h2>
        </div>

        <div className="journey__track" ref={track}>
          {journey.map((m, i) => (
            <article className={`milestone ${m.medal ? `milestone--${m.medal}` : ""}`} key={i}>
              <span className="milestone__in milestone__year">{m.year}</span>
              <span className="milestone__in milestone__dot" aria-hidden="true" />
              <h3 className="milestone__in milestone__title">{m.title}</h3>
              <p className="milestone__in milestone__place mono">{m.place}</p>
              <p className="milestone__in milestone__detail">{m.detail}</p>
            </article>
          ))}
          <article className="milestone milestone--next">
            <span className="milestone__in milestone__year">2027 →</span>
            <span className="milestone__in milestone__dot" aria-hidden="true" />
            <h3 className="milestone__in milestone__title">Graduating. Next chapter: your project?</h3>
          </article>
        </div>

        <div className="journey__rail" aria-hidden="true">
          <div className="journey__progress" />
        </div>
      </div>

      <div className="recognition section__inner">
        <div className="recognition__col">
          <h3 className="mono label">Medals &amp; awards</h3>
          <ul>
            {awards.map((a, i) => (
              <li className="award" key={i}>
                <span className={`medal medal--${a.medal}`} aria-label={`${a.medal} medal`} />
                <span className="award__event">{a.event}</span>
                <span className="award__project mono">{a.project}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="recognition__col">
          <h3 className="mono label">Certifications</h3>
          <ul>
            {certifications.map((c) => (
              <li className="award" key={c}>
                <span className="medal medal--cert" aria-hidden="true" />
                <span className="award__event">{c.split(" — ")[0]}</span>
                <span className="award__project mono">{c.split(" — ")[1]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
