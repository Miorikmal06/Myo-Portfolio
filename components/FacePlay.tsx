"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/motion";
import { face } from "@/data/content";
import { ACCESSORIES } from "./accessories";

const HELMET = 0; // index of the racing helmet in ACCESSORIES

/**
 * Portrait with a playful layer. Hovering the head puts the racing helmet on;
 * clicking (or tapping again on a phone) swaps in a random other accessory.
 */
export default function FacePlay({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  const [current, setCurrent] = useState<number | null>(null);
  const [finePointer, setFinePointer] = useState(false);
  const item = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFinePointer(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const show = useCallback((n: number) => {
    if (item.current) gsap.killTweensOf(item.current); // cancel a pending hide
    setCurrent(n);
  }, []);

  const randomOther = useCallback(
    (from: number | null) => {
      let n = Math.floor(Math.random() * ACCESSORIES.length);
      if (n === from) n = (n + 1) % ACCESSORIES.length;
      show(n);
    },
    [show]
  );

  // pop-in each time the accessory changes
  useEffect(() => {
    if (current === null || !item.current) return;
    const a = ACCESSORIES[current];
    // offsets go through GSAP (xPercent/yPercent) so they share the transform it animates
    const place = { xPercent: a.dx, yPercent: a.dy };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(item.current, { ...place, autoAlpha: 1, scale: 1, rotation: a.tilt });
      return;
    }
    const helmet = current === HELMET;
    gsap.fromTo(
      item.current,
      { ...place, autoAlpha: 0, scale: helmet ? 1.15 : 0.6, rotation: a.tilt - (helmet ? 0 : 18), y: helmet ? -40 : -14 },
      { ...place, autoAlpha: 1, scale: 1, rotation: a.tilt, y: 0, duration: helmet ? 0.55 : 0.6, ease: helmet ? "power4.out" : "back.out(2.2)" }
    );
  }, [current]);

  const hide = () => {
    if (!item.current) return;
    gsap.to(item.current, {
      autoAlpha: 0,
      y: -30,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => setCurrent(null),
    });
  };

  const a = current === null ? null : ACCESSORIES[current];
  const p = a ? face[a.anchor] : null;

  return (
    <figure className="portrait" style={{ aspectRatio: `${width} / ${height}` }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="portrait__img" src={src} alt={alt} width={width} height={height} fetchPriority="high" />

      {a && p && (
        <div
          className="acc"
          ref={item}
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${face.width * a.scale}%`, visibility: "hidden" }}
          aria-hidden="true"
        >
          <svg viewBox={a.viewBox} className="acc__svg">
            {a.art}
          </svg>
        </div>
      )}

      <button
        type="button"
        className="portrait__hot"
        style={{
          left: `${face.hot.left}%`,
          top: `${face.hot.top}%`,
          width: `${face.hot.width}%`,
          height: `${face.hot.height}%`,
        }}
        data-cursor="face"
        aria-label="Put on the racing helmet, press again for another accessory"
        onPointerEnter={(e) => e.pointerType === "mouse" && show(HELMET)}
        onPointerLeave={(e) => e.pointerType === "mouse" && hide()}
        onClick={() => (current === null ? show(HELMET) : randomOther(current))}
      />

      <figcaption className="portrait__hint" aria-live="polite">
        {a ? (
          <>
            <strong>{a.name}</strong>
            {finePointer ? ", click for another" : ", tap for another"}
          </>
        ) : finePointer ? (
          "Hover to suit up"
        ) : (
          "Tap to suit up"
        )}
      </figcaption>
    </figure>
  );
}
