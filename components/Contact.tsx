"use client";

import { useState } from "react";
import { scrollToTarget } from "@/lib/motion";
import { profile } from "@/data/content";

const MSG_ERROR = "Write a line about your project so I know what you need.";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [need, setNeed] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

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
      setError(MSG_ERROR);
      return;
    }
    const subject = `${need || "Project enquiry"}${name ? ` from ${name}` : ""}`;
    const body = `${msg}${name ? `\n\nFrom: ${name}` : ""}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="contact section" id="contact">
      <h2 className="eyebrow">Contact</h2>
      <p className="section__title">Have a project in mind?</p>
      <p className="contact__sub">Tell me what you need. I usually reply within a day.</p>

      <div className="contact__mailrow">
        <a className="contact__mail" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <button type="button" className="btn btn--ghost" onClick={copy}>
          {copied ? "Copied" : "Copy email"}
        </button>
        <span className="sr-only" aria-live="polite">{copied ? "Email address copied" : ""}</span>
      </div>

      <div className="contact__grid">
        <form className="form" onSubmit={send} noValidate>
          <div className="field">
            <label htmlFor="c-name">Your name</label>
            <input id="c-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          </div>
          <div className="field">
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
          <div className="field">
            <label htmlFor="c-msg">About your project</label>
            <textarea
              id="c-msg"
              rows={4}
              value={msg}
              onChange={(e) => {
                setMsg(e.target.value);
                if (error) setError("");
              }}
              onBlur={() => name.trim() && !msg.trim() && setError(MSG_ERROR)}
              aria-invalid={!!error}
              aria-describedby={error ? "c-err" : "c-help"}
            />
            {error ? (
              <p className="field__error" id="c-err">{error}</p>
            ) : (
              <p className="field__help" id="c-help">Opens your email app with the message ready to send.</p>
            )}
          </div>
          <button type="submit" className="btn btn--solid">
            Write the email
          </button>
        </form>

        <div className="contact__links">
          <a className="social" href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer">
            <span className="social__name">LinkedIn</span>
            <span className="social__hint">Resume, education and certifications</span>
          </a>
          <a className="social" href={profile.socials.github} target="_blank" rel="noopener noreferrer">
            <span className="social__name">GitHub</span>
            <span className="social__hint">Code for the projects on this page</span>
          </a>
        </div>
      </div>

      <footer className="footer">
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
      </footer>
    </section>
  );
}
