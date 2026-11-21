import { capabilities } from "@/data/content";

export default function Services() {
  return (
    <section className="services theme-light theme-light--alt" id="services">
      <div className="section services__grid">
        <h2 className="services__label">(What I build)</h2>
        <ul className="svc">
          {capabilities.map((c) => (
            <li className="svc__row" key={c.title}>
              <h3 className="svc__title">{c.title}</h3>
              <p className="svc__body">{c.body}</p>
              <p className="svc__tools">{c.tools.join(", ")}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
