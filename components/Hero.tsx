"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";
import { profile, portrait } from "@/data/content";
import FacePlay from "./FacePlay";

const NAME = `${profile.firstName} ${profile.lastName}`;

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // the giant name runs sideways forever; scrolling pushes it faster
        const loop = gsap.to(".nameband__track", { xPercent: -50, duration: 26, ease: "none", repeat: -1 });

        // a white block slides over the letters like a text selection (difference blend inverts them)
        gsap
          .timeline({ repeat: -1, repeatDelay: 0.6, defaults: { ease: "power3.inOut" } })
          .fromTo(".nameband__hl", { left: "24%", width: "0.62em" }, { width: "1.3em", duration: 0.9 })
          .to(".nameband__hl", { left: "52%", width: "0.62em", duration: 1.3 }, "+=0.5")
          .to(".nameband__hl", { width: "1.9em", duration: 0.9 }, "+=0.4")
          .to(".nameband__hl", { left: "24%", width: "0.62em", duration: 1.4 }, "+=0.5");

        gsap.to(".hero__plus", { rotation: 360, duration: 14, ease: "none", repeat: -1 });

        const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.1 });
        tl.from(".portrait__img", { filter: "brightness(0)", duration: 2.2, ease: "power2.out" }, 0)
          .from(".portrait", { scale: 1.06, duration: 2.4 }, 0)
          .from(".nameband", { yPercent: 60, autoAlpha: 0, duration: 1.4 }, 0.3)
          .from([".hero__role", ".hero__plus"], { autoAlpha: 0, y: 16, duration: 1, stagger: 0.1 }, 0.8);

        gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) => loop.timeScale(1 + Math.abs(self.getVelocity()) / 600),
          },
        })
          .to(".hero__visual", { yPercent: 10 }, 0)
          .to(".nameband", { yPercent: -40 }, 0);
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="top" ref={root}>
      <h1 className="sr-only">
        {NAME}, {profile.role}
      </h1>

      <span className="plus hero__plus" aria-hidden="true" />
      <p className="hero__role">
        Web developer &amp;
        <br />
        big data student
      </p>

      <div className="hero__visual">
        <FacePlay
          src={portrait.src}
          width={portrait.width}
          height={portrait.height}
          alt={`Portrait of ${profile.fullName}, seated, in a dark suit`}
        />
      </div>

      <div className="nameband" aria-hidden="true">
        <div className="nameband__track">
          {[0, 1].map((g) => (
            <span className="nameband__group" key={g}>
              <span>{NAME}</span>
              <span className="nameband__dash">–</span>
              <span>{NAME}</span>
              <span className="nameband__dash">–</span>
            </span>
          ))}
        </div>
        <span className="nameband__hl" />
      </div>
    </section>
  );
}
