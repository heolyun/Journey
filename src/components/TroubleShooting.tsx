import { AlertTriangle } from 'lucide-react';
import { troubleshootingNotes } from '../data/portfolio';

export function TroubleShooting() {
  return (
    <section className="section-block bg-ink">
      <div className="section-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <h2 className="section-heading mb-0">Trouble Shooting</h2>
        <div className="grid gap-3">
          {troubleshootingNotes.map((note) => (
            <article
              className="surface-card flex min-h-[88px] gap-4 p-5"
              key={note}
            >
              <AlertTriangle className="mt-1 shrink-0 text-amber" size={20} />
              <p className="leading-7 text-zinc-300">{note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
