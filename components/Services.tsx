"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";
import { services } from "@/data/content";
import Scramble from "./Scramble";

export default function Services() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".svc").forEach((el) => {
        gsap.from(el.querySelectorAll(".svc__reveal"), {
          yPercent: 100,
          duration: 1,
          stagger: 0.06,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
        gsap.from(el, {
          "--draw": 0,
          duration: 1.2,
          ease: "expo.inOut",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="services section" id="services" ref={root}>
      <div className="section__head">
        <span className="mono label">( 04 )</span>
        <Scramble className="mono label" text="What I build" onView />
      </div>
      <h2 className="section__title">
        From a single page to a <em>whole system</em>
      </h2>

      <ul className="svc__list">
        {services.map((s, i) => (
          <li className="svc" key={s.title} data-scramble-trigger>
            <span className="mask"><span className="svc__reveal svc__index mono">{String(i + 1).padStart(2, "0")}</span></span>
            <span className="mask svc__title-mask">
              <span className="svc__reveal svc__title">{s.title}</span>
            </span>
            <span className="mask"><span className="svc__reveal svc__body">{s.body}</span></span>
            <span className="mask">
              <span className="svc__reveal svc__proof mono">
                Proof → <Scramble text={s.proof} />
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
