"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/motion";
import { face } from "@/data/content";
import { ACCESSORIES } from "./accessories";

/**
 * Portrait with a playful layer: moving the pointer onto the face (or tapping it
 * on a phone) puts a random line-art accessory on. Never the same one twice in a row.
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
  const last = useRef<number>(-1);
  const item = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFinePointer(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const pick = useCallback(() => {
    if (item.current) gsap.killTweensOf(item.current); // cancel a pending hide
    let n = Math.floor(Math.random() * ACCESSORIES.length);
    if (n === last.current) n = (n + 1 + Math.floor(Math.random() * (ACCESSORIES.length - 1))) % ACCESSORIES.length;
    last.current = n;
    setCurrent(n);
  }, []);

  // pop-in each time the accessory changes
  useEffect(() => {
    if (current === null || !item.current) return;
    const a = ACCESSORIES[current];
    // offsets go through GSAP (xPercent/yPercent) so they live in the same transform it animates
    const place = { xPercent: a.dx, yPercent: a.dy };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(item.current, { ...place, autoAlpha: 1, scale: 1, rotation: a.tilt });
      return;
    }
    gsap.fromTo(
      item.current,
      { ...place, autoAlpha: 0, scale: 0.6, rotation: a.tilt - 18, y: -14 },
      { ...place, autoAlpha: 1, scale: 1, rotation: a.tilt, y: 0, duration: 0.6, ease: "back.out(2.2)" }
    );
  }, [current]);

  const hide = () => {
    if (!item.current) return;
    gsap.to(item.current, {
      autoAlpha: 0,
      scale: 0.8,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => setCurrent(null),
    });
  };

  const a = current === null ? null : ACCESSORIES[current];
  const p = a ? face[a.anchor] : null;

  // the hotspot covers the head, from hair to chin
  const hot = {
    left: `${face.hot.left}%`,
    top: `${face.hot.top}%`,
    width: `${face.hot.width}%`,
    height: `${face.hot.height}%`,
  };

  return (
    <figure className="portrait" style={{ aspectRatio: `${width} / ${height}` }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="portrait__img" src={src} alt={alt} width={width} height={height} fetchPriority="high" />

      {a && p && (
        <div
          className="acc"
          ref={item}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${face.width * a.scale}%`,
            visibility: "hidden",
          }}
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
        style={hot}
        data-cursor="face"
        aria-label="Try on a random accessory"
        onPointerEnter={(e) => e.pointerType === "mouse" && pick()}
        onPointerLeave={(e) => e.pointerType === "mouse" && hide()}
        onClick={pick}
      />

      <figcaption className="portrait__hint" aria-live="polite">
        {a ? (
          <>
            Wearing: <strong>{a.name}</strong>
          </>
        ) : finePointer ? (
          "Hover over my face"
        ) : (
          "Tap my face"
        )}
      </figcaption>
    </figure>
  );
}
