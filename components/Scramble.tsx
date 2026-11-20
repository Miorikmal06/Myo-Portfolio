"use client";

import { useCallback, useEffect, useRef } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=<>/";

/**
 * Text that "decodes" itself — the developer signature of the site.
 * Runs on hover of the closest [data-scramble-trigger] (or itself),
 * and once when `onView` is true and it enters the viewport.
 */
export default function Scramble({
  text,
  className,
  onView = false,
}: {
  text: string;
  className?: string;
  onView?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const frame = useRef<number>(0);

  const run = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    const total = text.length;
    let tick = 0;
    const step = () => {
      tick++;
      const revealed = Math.floor(tick / 1.6);
      let out = "";
      for (let i = 0; i < total; i++) {
        const c = text[i];
        if (c === " " || i < revealed) out += c;
        else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      el.textContent = out;
      if (revealed < total) frame.current = requestAnimationFrame(step);
    };
    step();
  }, [text]);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const trigger = (el.closest("[data-scramble-trigger]") as HTMLElement) ?? el;
    trigger.addEventListener("pointerenter", run);

    let io: IntersectionObserver | undefined;
    if (onView) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            run();
            io?.disconnect();
          }
        },
        { threshold: 0.6 }
      );
      io.observe(el);
    }
    return () => {
      trigger.removeEventListener("pointerenter", run);
      io?.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, [run, onView]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text}
    </span>
  );
}
