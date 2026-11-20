"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, scrollToTarget } from "@/lib/motion";
import { profile } from "@/data/content";
import Magnetic from "./Magnetic";
import Scramble from "./Scramble";
import { useLocalTime } from "./Nav";

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const time = useLocalTime();
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [need, setNeed] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact__mail", {
        clipPath: "inset(0 100% 0 0)",
        duration: 1.3,
        ease: "expo.inOut",
        scrollTrigger: { trigger: ".contact__mail", start: "top 85%" },
      });
      gsap.from(".contact__panel > *", {
        y: 30,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: ".contact__panel", start: "top 85%" },
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

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msg.trim()) {
      setError("Write a line about your project so I know what you need.");
      return;
    }
    const subject = `${need || "Project enquiry"}${name ? ` from ${name}` : ""}`;
    const body = `${msg}\n\n${name ? `From: ${name}` : ""}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="contact" id="contact" ref={root}>
      <div className="contact__top">
        <h2 className="section__title">Have a project in mind?</h2>
        <p className="contact__sub">Tell me what you need. I usually reply within a day.</p>
      </div>

      <div className="contact__mailrow">
        <a className="contact__mail" href={`mailto:${profile.email}`} data-scramble-trigger data-lock-label="email">
          <Scramble text={profile.email} />
        </a>
        <button type="button" className="btn btn--ghost contact__copy" onClick={copy} data-lock-label="copy">
          {copied ? "Copied" : "Copy email"}
        </button>
        <span className="sr-only" aria-live="polite">{copied ? "Email address copied" : ""}</span>
      </div>

      <div className="contact__grid">
        <form className="contact__panel form" onSubmit={send} noValidate>
          <div className="field-row">
            <label htmlFor="c-name">Your name</label>
            <input id="c-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          </div>
          <div className="field-row">
            <label htmlFor="c-need">What do you need?</label>
            <select id="c-need" value={need} onChange={(e) => setNeed(e.target.value)}>
              <option value="">Choose one</option>
              <option>Landing page</option>
              <option>Website</option>
              <option>Web system</option>
              <option>Data dashboard</option>
              <option>IoT or computer vision</option>
              <option>Internship or job</option>
            </select>
          </div>
          <div className="field-row">
            <label htmlFor="c-msg">About your project</label>
            <textarea
              id="c-msg"
              rows={4}
              value={msg}
              onChange={(e) => {
                setMsg(e.target.value);
                if (error) setError("");
              }}
              onBlur={() => !msg.trim() && name && setError("Write a line about your project so I know what you need.")}
              aria-invalid={!!error}
              aria-describedby={error ? "c-err" : "c-help"}
            />
            {error ? (
              <p className="field-row__error" id="c-err">{error}</p>
            ) : (
              <p className="field-row__help" id="c-help">Opens your email app with the message ready to send.</p>
            )}
          </div>
          <button type="submit" className="btn btn--solid" data-lock-label="send">
            Write the email
          </button>
        </form>

        <div className="contact__panel contact__links">
          <p className="contact__links-title">Find me elsewhere</p>
          <Magnetic strength={0.25}>
            <a className="social" href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" data-lock-label="linkedin">
              <span className="social__name">LinkedIn</span>
              <span className="social__hint">Resume, education and certifications</span>
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a className="social" href={profile.socials.github} target="_blank" rel="noopener noreferrer" data-lock-label="github">
              <span className="social__name">GitHub</span>
              <span className="social__hint">Code for every project here</span>
            </a>
          </Magnetic>
          <p className="contact__where">
            <span className="pulse" aria-hidden="true" /> {profile.location}, it is {time} here.
          </p>
        </div>
      </div>

      <footer className="footer">
        <span>© 2026 {profile.fullName}</span>
        <span>Built with Next.js, Three.js and GSAP</span>
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollToTarget(0);
          }}
          data-lock-label="top"
        >
          Back to top
        </a>
      </footer>
    </section>
  );
}
