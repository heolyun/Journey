import { CheckCircle2 } from 'lucide-react';
import { roadmapItems } from '../data/portfolio';

export function FutureRoadmap() {
  return (
    <section className="section-block bg-[#0b0c0a]">
      <div className="section-shell">
        <h2 className="section-heading">Future Roadmap</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {roadmapItems.map((item) => (
            <article
              className="surface-card min-h-[152px] bg-panel p-5"
              key={item}
            >
              <CheckCircle2 className="text-mint" size={22} />
              <p className="mt-5 leading-7 text-zinc-300">{item}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
