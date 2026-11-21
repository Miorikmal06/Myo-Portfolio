"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, scrollToTarget } from "@/lib/motion";
import { profile } from "@/data/content";

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".bigname__inner", {
          yPercent: 70,
          ease: "none",
          scrollTrigger: { trigger: ".bigname", start: "top bottom", end: "bottom bottom", scrub: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section className="contact" id="contact" ref={root}>
      <div className="contact__cta section">
        <p className="contact__kicker">Have an idea?</p>
        <h2 className="contact__title">
          Let&apos;s <em>turn</em> it into
          <br />
          something <em>real.</em>
        </h2>
        <div className="contact__actions">
          <a className="btn btn--solid" href={`mailto:${profile.email}?subject=${encodeURIComponent("Project enquiry")}`}>
            Start a project
          </a>
          <button type="button" className="btn btn--ghost" onClick={copy}>
            {copied ? "Copied" : profile.email}
          </button>
          <span className="sr-only" aria-live="polite">{copied ? "Email address copied" : ""}</span>
        </div>
      </div>

      <footer className="footer">
        <div className="footer__row">
          <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={profile.socials.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <span>© 2026 {profile.fullName}</span>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollToTarget(0);
            }}
          >
            Back to top
          </a>
        </div>
        <div className="bigname" aria-hidden="true">
          <span className="bigname__inner">
            {profile.firstName} {profile.lastName}
          </span>
        </div>
      </footer>
    </section>
  );
}
