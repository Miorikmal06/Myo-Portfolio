"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "@/lib/motion";
import { projects, type Project } from "@/data/content";

const FILTERS = ["All", "IoT system", "Landing page", "Website", "Web app"] as const;
type Filter = (typeof FILTERS)[number];

const toLabel = (p: Project) => `${p.kind.toLowerCase().replace(/\s/g, "_")} ${p.confidence.toFixed(2)}`;

export default function Work() {
  const root = useRef<HTMLElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Filter>("All");
  const [activeId, setActiveId] = useState(projects[0].id);
  const depth = useRef(1);

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.kind === filter)),
    [filter]
  );
  const active = projects.find((p) => p.id === activeId)!;

  // keep the selection inside the current filter
  useEffect(() => {
    if (!visible.some((p) => p.id === activeId)) setActiveId(visible[0]?.id ?? projects[0].id);
  }, [visible, activeId]);

  // scan-in transition whenever the active project changes
  useEffect(() => {
    const el = screen.current;
    if (!el) return;
    const img = el.querySelector<HTMLElement>(`[data-shot="${activeId}"]`);
    if (!img) return;
    depth.current += 1;
    img.style.zIndex = String(depth.current);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(img, { clipPath: "inset(0% 0% 0% 0%)" });
      return;
    }
    const tl = gsap.timeline();
    tl.fromTo(img, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "power3.inOut" }, 0)
      .fromTo(".holo__scan", { top: "0%", autoAlpha: 1 }, { top: "100%", duration: 0.7, ease: "power3.inOut" }, 0)
      .to(".holo__scan", { autoAlpha: 0, duration: 0.15 })
      .fromTo(".holo__rgb", { autoAlpha: 0.9, x: () => gsap.utils.random(-14, 14) }, { autoAlpha: 0, x: 0, duration: 0.45, ease: "steps(5)" }, 0)
      .fromTo(".holo__det", { scale: 1.12, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.5, ease: "back.out(2)" }, 0.45)
      .fromTo(".holo__info > *", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "expo.out" }, 0.25);
    return () => {
      tl.kill();
    };
  }, [activeId]);

  // section entrance + 3D tilt that follows the pointer
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".holo", {
        rotateX: 22,
        y: 80,
        autoAlpha: 0,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: ".viewer", start: "top 75%" },
      });
      gsap.from(".plist__item", {
        x: -30,
        autoAlpha: 0,
        stagger: 0.07,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: ".viewer", start: "top 75%" },
      });

      const t = tiltRef.current;
      if (!t || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      const rx = gsap.quickTo(t, "rotationX", { duration: 0.8, ease: "power3" });
      const ry = gsap.quickTo(t, "rotationY", { duration: 0.8, ease: "power3" });
      const move = (e: PointerEvent) => {
        const r = t.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        ry(nx * 12);
        rx(-ny * 9);
        t.style.setProperty("--gx", `${(nx + 0.5) * 100}%`);
        t.style.setProperty("--gy", `${(ny + 0.5) * 100}%`);
      };
      const reset = () => {
        rx(0);
        ry(0);
      };
      t.addEventListener("pointermove", move);
      t.addEventListener("pointerleave", reset);
      return () => {
        t.removeEventListener("pointermove", move);
        t.removeEventListener("pointerleave", reset);
      };
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="work section" id="work" ref={root}>
      <header className="work__head">
        <h2 className="section__title">Projects</h2>
        <div className="filters" role="group" aria-label="Filter projects by type">
          {FILTERS.map((f) => {
            const n = f === "All" ? projects.length : projects.filter((p) => p.kind === f).length;
            return (
              <button
                key={f}
                type="button"
                className={`chip ${filter === f ? "is-on" : ""}`}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                data-lock-label="filter"
              >
                {f} <span className="chip__n">{n}</span>
              </button>
            );
          })}
        </div>
      </header>

      <div className="viewer">
        <ul className="plist" aria-label="Project list">
          {visible.map((p, i) => (
            <li className="plist__item" key={p.id}>
              <button
                type="button"
                className={`plist__btn ${p.id === activeId ? "is-on" : ""}`}
                aria-pressed={p.id === activeId}
                aria-controls="holo-info"
                onPointerEnter={() => setActiveId(p.id)}
                onFocus={() => setActiveId(p.id)}
                onClick={() => setActiveId(p.id)}
                data-lock-label="select"
              >
                <span className="plist__n">{String(i + 1).padStart(2, "0")}</span>
                <span className="plist__title">{p.title}</span>
                <span className="plist__meta">
                  {p.kind}, {p.year}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="holo-stage">
          <div className="holo" ref={tiltRef}>
            <div className="holo__screen" ref={screen} data-lock="off">
              {projects.map((p) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={p.id}
                  data-shot={p.id}
                  className="holo__shot"
                  src={p.image}
                  alt={p.id === activeId ? `Screenshot of ${p.title}` : ""}
                  loading="lazy"
                  style={{ clipPath: p.id === projects[0].id ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" }}
                />
              ))}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="holo__rgb holo__rgb--c" src={active.image} alt="" aria-hidden="true" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="holo__rgb holo__rgb--m" src={active.image} alt="" aria-hidden="true" />
              <div className="holo__scan" aria-hidden="true" />
              <div className="holo__lines" aria-hidden="true" />
              <div className="holo__glare" aria-hidden="true" />
              <div className="holo__det" aria-hidden="true">
                <i /><i /><i /><i />
                <span>{toLabel(active)}</span>
              </div>
            </div>
          </div>

          <div className="holo__info" id="holo-info" aria-live="polite">
            <h3 className="holo__title">{active.title}</h3>
            <p className="holo__summary">{active.summary}</p>
            <p className="holo__detail">{active.detail}</p>
            <ul className="holo__stack" aria-label="Built with">
              {active.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <div className="holo__foot">
              {active.badge && <span className="holo__badge">{active.badge}</span>}
              {active.url ? (
                <a className="btn btn--solid" href={active.url} target="_blank" rel="noopener noreferrer" data-lock-label="open site">
                  Open live site
                </a>
              ) : (
                <span className="holo__private">On-site system, demo on request</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
