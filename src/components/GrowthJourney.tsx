import { useMemo, useState } from 'react';
import { journeySteps } from '../data/portfolio';

export function GrowthJourney() {
  const [activeId, setActiveId] = useState('burinake');
  const active = useMemo(
    () => journeySteps.find((step) => step.id === activeId) ?? journeySteps[0],
    [activeId],
  );
  const ActiveIcon = active.icon;

  return (
    <section className="section-block bg-ink" id="journey">
      <div className="section-shell">
        <h2 className="section-heading">Growth Journey</h2>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="overflow-x-auto pb-2 lg:overflow-visible">
            <div className="grid min-w-[720px] grid-cols-9 gap-2 lg:min-w-0">
              {journeySteps.map((step) => {
                const Icon = step.icon;
                const isActive = step.id === active.id;
                return (
                  <button
                    aria-pressed={isActive}
                    className={[
                      'focus-ring relative flex min-h-28 flex-col justify-between rounded-lg border p-3 text-left transition',
                      isActive
                        ? 'border-mint bg-mint/12 text-white'
                        : 'border-white/10 bg-white/[0.035] text-zinc-400 hover:border-cyan/50 hover:text-white',
                    ].join(' ')}
                    key={step.id}
                    onClick={() => setActiveId(step.id)}
                    type="button"
                  >
                    <Icon size={18} />
                    <span className="text-xs font-semibold leading-5">{step.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <article className="surface-card bg-panel p-6">
            <div className="mb-8 flex items-center justify-between gap-4">
              <span className="icon-box h-12 w-12 text-mint">
                <ActiveIcon size={24} />
              </span>
              <span className="chip text-cyan">
                {active.phase}
              </span>
            </div>
            <h3 className="text-3xl font-semibold text-white">{active.name}</h3>
            <dl className="mt-8 grid gap-5">
              <div>
                <dt className="text-sm font-semibold text-zinc-500">Focus</dt>
                <dd className="mt-2 text-white">{active.focus}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-zinc-500">Stack</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {active.stack.map((item) => (
                    <span className="chip bg-black/20 text-sm" key={item}>
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-zinc-500">Lesson</dt>
                <dd className="mt-2 leading-7 text-zinc-200">{active.lesson}</dd>
              </div>
            </dl>
          </article>
        </div>
      </div>
    </section>
  );
}
