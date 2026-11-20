"use client";

import { useEffect, useRef } from "react";
import { gsap, scrollToTarget } from "@/lib/motion";
import { profile } from "@/data/content";
import Magnetic from "./Magnetic";
import { useLocalTime } from "./Nav";

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const time = useLocalTime();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact__line", {
        yPercent: 110,
        stagger: 0.08,
        duration: 1.3,
        ease: "expo.out",
        scrollTrigger: { trigger: ".contact__title", start: "top 85%" },
      });
      gsap.from(".contact__btn", {
        scale: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: { trigger: ".contact__actions", start: "top 90%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="contact" id="contact" ref={root}>
      <div className="section__head section__inner">
        <span className="mono label">( 06 )</span>
        <span className="mono label">Contact</span>
      </div>

      <h2 className="contact__title">
        <span className="mask"><span className="contact__line">Got an idea?</span></span>
        <span className="mask"><span className="contact__line">Let&apos;s <em>build</em> it.</span></span>
      </h2>

      <div className="contact__actions">
        <Magnetic strength={0.45}>
          <a className="contact__btn" href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" data-cursor="hide">
            <span>LinkedIn ↗</span>
          </a>
        </Magnetic>
        <Magnetic strength={0.45}>
          <a className="contact__btn contact__btn--ghost" href={profile.socials.github} target="_blank" rel="noopener noreferrer" data-cursor="hide">
            <span>GitHub ↗</span>
          </a>
        </Magnetic>
      </div>

      <footer className="footer section__inner">
        <span className="mono label">© 2026 {profile.fullName}</span>
        <span className="mono label">Local time — MYT {time}</span>
        <span className="mono label">Built with Next.js · GSAP · Lenis</span>
        <a
          href="#top"
          className="mono label footer__top"
          data-cursor="link"
          onClick={(e) => {
            e.preventDefault();
            scrollToTarget(0);
          }}
        >
          Back to top ↑
        </a>
      </footer>
    </section>
  );
}
