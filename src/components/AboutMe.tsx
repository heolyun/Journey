import { aboutCopy } from '../data/portfolio';

export function AboutMe() {
  return (
    <section className="section-block bg-[#0b0c0a]" id="about">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <h2 className="section-heading mb-0">About Me</h2>
        <div className="max-w-2xl text-xl font-medium leading-9 text-zinc-200 md:text-2xl md:leading-10">
          {aboutCopy.map((line) => (
            <p className="mb-5 last:mb-0" key={line}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
