"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";

const TARGETS = "a, button, [data-lock]";
const PAD = 8;
const IDLE = 26;

/**
 * "Lock-on" cursor. A small crosshair follows the pointer; four corner brackets
 * trail it, and when the pointer reaches a link or button they jump out and
 * frame that element like a detection box, with a label and confidence score.
 */
export default function Cursor() {
  const cross = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const coords = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const c = cross.current!;
    const b = box.current!;
    document.documentElement.classList.add("has-cursor");

    const cx = gsap.quickTo(c, "x", { duration: 0.08, ease: "power3" });
    const cy = gsap.quickTo(c, "y", { duration: 0.08, ease: "power3" });
    const bx = gsap.quickTo(b, "x", { duration: 0.35, ease: "power3" });
    const by = gsap.quickTo(b, "y", { duration: 0.35, ease: "power3" });
    const bw = gsap.quickTo(b, "width", { duration: 0.35, ease: "power3" });
    const bh = gsap.quickTo(b, "height", { duration: 0.35, ease: "power3" });

    let px = -100;
    let py = -100;
    let locked: HTMLElement | null = null;
    let shown = false;

    const place = () => {
      if (locked && document.contains(locked)) {
        const r = locked.getBoundingClientRect();
        bx(r.left - PAD);
        by(r.top - PAD);
        bw(r.width + PAD * 2);
        bh(r.height + PAD * 2);
      } else {
        bx(px - IDLE / 2);
        by(py - IDLE / 2);
        bw(IDLE);
        bh(IDLE);
      }
    };

    const setLock = (el: HTMLElement | null) => {
      if (el === locked) return;
      locked = el;
      b.classList.toggle("is-locked", !!el);
      c.classList.toggle("is-locked", !!el);
      if (el && label.current) {
        const name =
          el.dataset.lockLabel ||
          (el.tagName === "BUTTON" ? "button" : el.getAttribute("href")?.startsWith("mailto") ? "email" : "link");
        const score = (0.9 + Math.random() * 0.09).toFixed(2);
        label.current.textContent = `${name} ${score}`;
      }
    };

    const move = (e: PointerEvent) => {
      px = Math.round(e.clientX);
      py = Math.round(e.clientY);
      if (!shown) {
        gsap.set(c, { x: px, y: py });
        gsap.set(b, { x: px - IDLE / 2, y: py - IDLE / 2 });
        gsap.to([c, b], { autoAlpha: 1, duration: 0.25 });
        shown = true;
      }
      cx(px);
      cy(py);
      if (coords.current) coords.current.textContent = `${px}, ${py}`;
      const t = (e.target as HTMLElement).closest<HTMLElement>(TARGETS);
      setLock(t && t.dataset.lock !== "off" ? t : null);
      place();
    };

    const onScroll = () => place();
    const leave = () => gsap.to([c, b], { autoAlpha: 0, duration: 0.2 });
    const enter = () => shown && gsap.to([c, b], { autoAlpha: 1, duration: 0.2 });
    const down = () => b.classList.add("is-down");
    const up = () => b.classList.remove("is-down");

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    document.documentElement.addEventListener("pointerenter", enter);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);

    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.removeEventListener("pointerenter", enter);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <>
      <div className="lock" ref={box} aria-hidden="true">
        <i className="lock__c lock__c--tl" />
        <i className="lock__c lock__c--tr" />
        <i className="lock__c lock__c--bl" />
        <i className="lock__c lock__c--br" />
        <span className="lock__label" ref={label} />
      </div>
      <div className="cross" ref={cross} aria-hidden="true">
        <span className="cross__coords" ref={coords} />
      </div>
    </>
  );
}
