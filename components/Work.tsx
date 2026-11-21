"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "@/lib/motion";
import { projects } from "@/data/content";

const FILTERS = ["All", "IoT system", "Landing page", "Website", "Web app"] as const;
type Filter = (typeof FILTERS)[number];

export default function Work() {
  const screen = useRef<HTMLDivElement>(null);
  const info = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Filter>("All");
  const [activeId, setActiveId] = useState(projects[0].id);
  const first = useRef(true);

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.kind === filter)),
    [filter]
  );
  const active = projects.find((p) => p.id === activeId)!;

  useEffect(() => {
    if (!visible.some((p) => p.id === activeId)) setActiveId(visible[0]?.id ?? projects[0].id);
  }, [visible, activeId]);

  // crossfade the screenshot; state-driven, so fast hovering always lands on the right project
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const shot = screen.current?.querySelector<HTMLElement>(`[data-shot="${activeId}"]`);
    if (shot) gsap.fromTo(shot, { scale: 1.03 }, { scale: 1, duration: 0.8, ease: "expo.out", overwrite: true });
    if (info.current)
      gsap.fromTo(info.current.children, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.04, ease: "power3.out", overwrite: true });
  }, [activeId]);

  return (
    <section className="work section" id="work">
      <header className="work__head">
        <div>
          <h2 className="eyebrow">Work</h2>
          <p className="section__title">Things I&apos;ve built and shipped</p>
        </div>
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
              >
                {f} <span className="chip__n">{n}</span>
              </button>
            );
          })}
        </div>
      </header>

      <div className="viewer">
        <ul className="plist" aria-label="Projects">
          {visible.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                className={`plist__btn ${p.id === activeId ? "is-on" : ""}`}
                aria-pressed={p.id === activeId}
                aria-controls="work-info"
                onPointerEnter={(e) => e.pointerType === "mouse" && setActiveId(p.id)}
                onFocus={() => setActiveId(p.id)}
                onClick={() => setActiveId(p.id)}
              >
                <span className="plist__title">{p.title}</span>
                <span className="plist__meta">
                  {p.kind}, {p.year}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="stage">
          <div className="screen" ref={screen}>
            <div className="screen__bar" aria-hidden="true">
              <i /><i /><i />
              <span>{active.url ? active.url.replace("https://", "") : "on-site system"}</span>
            </div>
            <div className="screen__view">
              {projects.map((p) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={p.id}
                  data-shot={p.id}
                  className={`screen__shot ${p.id === activeId ? "is-on" : ""}`}
                  src={p.image}
                  alt={p.id === activeId ? `Screenshot of ${p.title}` : ""}
                  aria-hidden={p.id !== activeId}
                  loading="lazy"
                />
              ))}
            </div>
          </div>

          <div className="pinfo" id="work-info" ref={info} aria-live="polite">
            <h3 className="pinfo__title">{active.title}</h3>
            <p className="pinfo__summary">{active.summary}</p>
            <p className="pinfo__detail">{active.detail}</p>
            <ul className="pinfo__stack" aria-label="Built with">
              {active.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <div className="pinfo__foot">
              {active.url ? (
                <a className="btn btn--solid" href={active.url} target="_blank" rel="noopener noreferrer">
                  Open live site
                </a>
              ) : (
                <span className="pinfo__private">On-site system, demo on request</span>
              )}
              {active.badge && <span className="pinfo__badge">{active.badge}</span>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
