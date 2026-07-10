import { ArrowDown } from 'lucide-react';
import { futureRoadmap } from '../data/journey';

export function FutureRoadmap() {
  return (
    <section className="section-block bg-[#0b0c0a]" id="roadmap">
      <div className="section-shell">
        <h2 className="section-heading">Future Roadmap</h2>
        <div className="surface-card bg-panel p-5 md:p-7">
          <div className="grid gap-3">
            {futureRoadmap.map((item, index) => (
              <div key={item.title}>
                <article className="grid gap-4 rounded-lg border border-white/10 bg-white/[0.025] p-5 md:grid-cols-[120px_minmax(0,1fr)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-mint">
                    {item.label}
                  </p>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 leading-7 text-zinc-300">{item.description}</p>
                  </div>
                </article>
                {index < futureRoadmap.length - 1 ? (
                  <div className="flex h-8 items-center justify-center text-zinc-600">
                    <ArrowDown size={16} />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
