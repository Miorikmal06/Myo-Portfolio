"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/motion";
import { capabilities, allTools } from "@/data/content";

type Path = { d: string; key: string };

export default function Capabilities() {
  const root = useRef<HTMLElement>(null);
  const graph = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paths, setPaths] = useState<Path[]>([]);
  const lit = capabilities[active].tools;

  const draw = useCallback(() => {
    const g = graph.current;
    if (!g) return;
    const box = g.getBoundingClientRect();
    const from = g.querySelector<HTMLElement>(`[data-cap="${active}"]`);
    if (!from) return;
    const wide = window.innerWidth >= 900;
    const f = from.getBoundingClientRect();
    const sx = wide ? f.right - box.left : f.left + f.width / 2 - box.left;
    const sy = wide ? f.top + f.height / 2 - box.top : f.bottom - box.top;
    const next: Path[] = [];
    capabilities[active].tools.forEach((t) => {
      const node = g.querySelector<HTMLElement>(`[data-tool="${t}"]`);
      if (!node) return;
      const r = node.getBoundingClientRect();
      const ex = wide ? r.left - box.left : r.left + r.width / 2 - box.left;
      const ey = wide ? r.top + r.height / 2 - box.top : r.top - box.top;
      const d = wide
        ? `M${sx},${sy} C${sx + (ex - sx) * 0.5},${sy} ${sx + (ex - sx) * 0.5},${ey} ${ex},${ey}`
        : `M${sx},${sy} C${sx},${sy + (ey - sy) * 0.5} ${ex},${sy + (ey - sy) * 0.5} ${ex},${ey}`;
      next.push({ d, key: `${active}-${t}` });
    });
    setPaths(next);
  }, [active]);

  useEffect(() => {
    draw();
    const ro = new ResizeObserver(draw);
    if (graph.current) ro.observe(graph.current);
    return () => ro.disconnect();
  }, [draw]);

  // animate freshly drawn wires
  useEffect(() => {
    const wires = root.current?.querySelectorAll<SVGPathElement>(".wire");
    wires?.forEach((w, i) => {
      const len = w.getTotalLength();
      gsap.fromTo(
        w,
        { strokeDasharray: len, strokeDashoffset: len },
        { strokeDashoffset: 0, duration: 0.7, delay: i * 0.04, ease: "power2.out" }
      );
    });
  }, [paths]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cap", {
        x: -30,
        autoAlpha: 0,
        stagger: 0.07,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: ".graph", start: "top 75%" },
      });
      gsap.from(".tool", {
        scale: 0.6,
        autoAlpha: 0,
        stagger: { each: 0.02, from: "random" },
        duration: 0.6,
        ease: "back.out(2)",
        scrollTrigger: { trigger: ".graph", start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="caps section" id="capabilities" ref={root}>
      <h2 className="eyebrow">Services</h2>
      <p className="section__title">What I can build for you</p>
      <p className="caps__hint">Pick a service to see the tools behind it.</p>

      <div className="graph" ref={graph}>
        <svg className="graph__wires" aria-hidden="true">
          {paths.map((p) => (
            <path key={p.key} className="wire" d={p.d} />
          ))}
        </svg>

        <ul className="caps__list">
          {capabilities.map((c, i) => (
            <li key={c.title}>
              <button
                type="button"
                className={`cap ${i === active ? "is-on" : ""}`}
                data-cap={i}
                aria-pressed={i === active}
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <span className="cap__title">{c.title}</span>
                <span className="cap__body">{c.body}</span>
              </button>
            </li>
          ))}
        </ul>

        <ul className="tools" aria-label={`Tools for ${capabilities[active].title}`}>
          {allTools.map((t) => (
            <li key={t} data-tool={t} className={`tool ${lit.includes(t) ? "is-lit" : ""}`}>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
