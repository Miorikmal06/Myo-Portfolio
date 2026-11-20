"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";
import { projects, type Project } from "@/data/content";
import Scramble from "./Scramble";

function Placeholder({ p }: { p: Project }) {
  return (
    <div className="work__placeholder" aria-hidden="true">
      <span className="mono">{p.kind}</span>
      <strong>{p.title}</strong>
      <span className="mono">{p.stack.join(" · ")}</span>
    </div>
  );
}

export default function Work() {
  const root = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".work__row", {
        yPercent: 60,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".work__list", start: "top 80%" },
      });

      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const box = preview.current;
      if (!fine || !box) return;

      const xTo = gsap.quickTo(box, "x", { duration: 0.7, ease: "power3" });
      const yTo = gsap.quickTo(box, "y", { duration: 0.7, ease: "power3" });
      const rTo = gsap.quickTo(box, "rotation", { duration: 0.9, ease: "power3" });
      let lastX = 0;

      const list = root.current!.querySelector<HTMLElement>(".work__list")!;
      const slides = box.querySelectorAll<HTMLElement>(".work__slide");

      const move = (e: PointerEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
        rTo(gsap.utils.clamp(-8, 8, (e.clientX - lastX) * 0.6));
        lastX = e.clientX;
      };
      const show = (i: number) => {
        slides.forEach((s, j) =>
          gsap.to(s, { yPercent: j === i ? 0 : j < i ? -100 : 100, duration: 0.6, ease: "expo.out" })
        );
        gsap.to(box, { scale: 1, autoAlpha: 1, duration: 0.5, ease: "expo.out" });
      };
      const hide = () => gsap.to(box, { scale: 0.6, autoAlpha: 0, duration: 0.4, ease: "expo.out" });

      const rows = list.querySelectorAll<HTMLElement>(".work__row");
      const handlers: Array<() => void> = [];
      rows.forEach((row, i) => {
        const h = () => show(i);
        row.addEventListener("pointerenter", h);
        handlers.push(() => row.removeEventListener("pointerenter", h));
      });
      gsap.set(box, { xPercent: -50, yPercent: -50, scale: 0.6, autoAlpha: 0 });
      list.addEventListener("pointermove", move);
      list.addEventListener("pointerleave", hide);
      return () => {
        handlers.forEach((off) => off());
        list.removeEventListener("pointermove", move);
        list.removeEventListener("pointerleave", hide);
      };
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="work section" id="work" ref={root}>
      <div className="section__head">
        <span className="mono label">( 03 )</span>
        <Scramble className="mono label" text="Selected work" onView />
      </div>
      <h2 className="section__title">
        Things I&apos;ve <em>built</em> &amp; shipped
      </h2>

      <ol className="work__list">
        {projects.map((p, i) => {
          const inner = (
            <>
              <span className="work__index mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="work__title">{p.title}</span>
              <span className="work__summary">{p.summary}</span>
              <span className="work__kind mono">{p.kind}</span>
              <span className="work__year mono">{p.year}</span>
              <span className="work__arrow" aria-hidden="true">{p.url ? "↗" : "•"}</span>
              <span className="work__mobile-media" aria-hidden="true">
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image} alt="" loading="lazy" />
                ) : (
                  <Placeholder p={p} />
                )}
              </span>
              <span className="work__tags">
                {p.stack.map((s) => (
                  <span className="tag mono" key={s}>{s}</span>
                ))}
                {p.note && <span className="tag tag--accent mono">{p.note}</span>}
              </span>
            </>
          );
          return (
            <li key={p.id}>
              {p.url ? (
                <a
                  className="work__row"
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="view"
                  data-cursor-label="Visit ↗"
                >
                  {inner}
                </a>
              ) : (
                <div className="work__row" data-cursor="view" data-cursor-label={p.note ? "Case" : "Private"}>
                  {inner}
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <div className="work__preview" ref={preview} aria-hidden="true">
        {projects.map((p, i) => (
          <div className="work__slide" key={p.id} style={{ transform: `translateY(${i === 0 ? 0 : 100}%)` }}>
            {p.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.image} alt="" />
            ) : (
              <Placeholder p={p} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
