"use client";

import { useState } from "react";
import { experience } from "@/data/content";

export default function Experience() {
  return (
    <section className="exp section" id="experience">
      <h2 className="eyebrow">Experience</h2>
      {experience.map((x) => (
        <Job key={x.org} job={x} />
      ))}
    </section>
  );
}

function Job({ job }: { job: (typeof experience)[number] }) {
  const [shown, setShown] = useState(0);
  const photos = job.photos;

  return (
    <article className={`job ${photos.length ? "" : "job--text"}`}>
      <div className="job__copy">
        <p className="job__period">{job.period}</p>
        <h3 className="job__role">{job.role}</h3>
        <p className="job__org">
          {job.org}, {job.place}
        </p>
        <p className="job__summary">{job.summary}</p>
        <ul className="job__points">
          {job.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>

      {photos.length > 0 && (
        <div className="job__gallery">
          <div className="job__main">
            {photos.map((ph, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={ph.src}
                src={ph.src}
                alt={i === shown ? ph.alt : ""}
                aria-hidden={i !== shown}
                className={i === shown ? "is-on" : ""}
                loading="lazy"
              />
            ))}
          </div>
          {photos.length > 1 && (
            <div className="job__thumbs" role="group" aria-label="Choose a photo">
              {photos.map((ph, i) => (
                <button
                  key={ph.src}
                  type="button"
                  className={`job__thumb ${i === shown ? "is-on" : ""}`}
                  aria-pressed={i === shown}
                  aria-label={`Show photo ${i + 1}: ${ph.alt}`}
                  onClick={() => setShown(i)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ph.src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
}
