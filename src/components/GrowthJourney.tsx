import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, ChevronDown, Play } from 'lucide-react';
import { journeyGroups, journeyItems, type JourneyItem } from '../data/journey';

const statusStyles = {
  Completed: 'border-mint/40 bg-mint/10 text-mint',
  'In Progress': 'border-amber/40 bg-amber/10 text-amber',
  Planned: 'border-cyan/40 bg-cyan/10 text-cyan',
};

function getItemFromHash() {
  const id = window.location.hash.replace('#project-', '');
  return journeyItems.some((item) => item.id === id) ? id : null;
}

function StoryBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h4 className="text-sm font-semibold text-zinc-500">{title}</h4>
      <div className="mt-3 leading-7 text-zinc-200">{children}</div>
    </section>
  );
}

function ProjectMedia({ item }: { item: JourneyItem }) {
  const Icon = item.icon;

  if (item.videoUrl) {
    return (
      <div className="overflow-hidden rounded-lg border border-white/10 bg-black">
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="aspect-video w-full"
          src={item.videoUrl}
          title={`${item.name} 시연 영상`}
        />
        <div className="flex items-center gap-2 border-t border-white/10 px-4 py-3 text-sm text-zinc-400">
          <Play size={15} />
          <span>프로젝트 시연 영상</span>
        </div>
      </div>
    );
  }

  if (item.image) {
    return (
      <img
        alt={`${item.name} 대표 화면`}
        className="aspect-video w-full rounded-lg border border-white/10 bg-black object-cover object-top"
        src={item.image}
      />
    );
  }

  return (
    <div className="relative min-h-[220px] overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025)),radial-gradient(circle_at_72%_28%,rgba(102,227,255,0.14),transparent_34%),radial-gradient(circle_at_24%_78%,rgba(157,255,203,0.1),transparent_30%)]">
      <div className="absolute inset-6 rounded-lg border border-dashed border-white/14" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <span className="icon-box mx-auto h-12 w-12 text-mint">
            <Icon size={23} />
          </span>
          <p className="mt-4 text-sm font-medium text-zinc-500">Image Placeholder</p>
        </div>
      </div>
    </div>
  );
}

export function GrowthJourney() {
  const [activeId, setActiveId] = useState(() => getItemFromHash() ?? 'burinake');
  const [showAllProblems, setShowAllProblems] = useState(false);
  const active = useMemo(
    () => journeyItems.find((item) => item.id === activeId) ?? journeyItems[0],
    [activeId],
  );
  const problems = active.troubleshooting ?? [];
  const visibleProblems = showAllProblems ? problems : problems.slice(0, 2);

  useEffect(() => {
    const syncFromHash = () => {
      const nextId = getItemFromHash();
      if (nextId) {
        setActiveId(nextId);
        setShowAllProblems(false);
      }
    };

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const selectItem = (id: string) => {
    setActiveId(id);
    setShowAllProblems(false);
    window.history.replaceState(null, '', `#project-${id}`);
  };

  return (
    <section className="section-block bg-ink" id="journey">
      <div className="section-shell">
        <h2 className="section-heading">Growth Journey</h2>

        <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="surface-card h-fit bg-white/[0.025] p-5">
            <div className="space-y-7">
              {journeyGroups.map((group) => (
                <div className="relative" key={group.phase}>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                    {group.phase}
                  </h3>
                  <div className="relative space-y-2 pl-5">
                    <div className="absolute bottom-3 left-[7px] top-3 w-px bg-white/12" />
                    {group.items.map((item, itemIndex) => {
                      const isActive = item.id === active.id;
                      return (
                        <div key={item.id}>
                          <button
                            aria-current={isActive ? 'step' : undefined}
                            className={[
                              'focus-ring group relative flex w-full items-start justify-between gap-3 rounded-lg border px-3 py-3 text-left transition',
                              isActive
                                ? 'border-mint/50 bg-mint/10 text-white'
                                : 'border-transparent bg-transparent text-zinc-400 hover:border-white/10 hover:bg-white/[0.035] hover:text-white',
                            ].join(' ')}
                            id={`project-${item.id}`}
                            onClick={() => selectItem(item.id)}
                            type="button"
                          >
                            <span
                              className={[
                                'absolute -left-[20px] top-5 h-3 w-3 rounded-full border bg-ink',
                                isActive
                                  ? 'border-mint shadow-[0_0_0_4px_rgba(157,255,203,0.12)]'
                                  : 'border-white/22',
                              ].join(' ')}
                            />
                            <span className="min-w-0">
                              <span className="block text-sm font-semibold">{item.name}</span>
                              <span className="mt-1 block text-xs leading-5 text-zinc-500">
                                {item.period}
                              </span>
                              <span className="mt-2 block text-xs leading-5 text-zinc-400">
                                {item.summary}
                              </span>
                              <span className="mt-2 inline-flex text-[11px] font-semibold uppercase tracking-[0.12em] text-mint/80">
                                ↓ {item.growthLabel}
                              </span>
                            </span>
                            <span
                              className={[
                                'mt-1 h-2.5 w-2.5 shrink-0 rounded-full',
                                item.status === 'Completed'
                                  ? 'bg-mint'
                                  : item.status === 'In Progress'
                                    ? 'bg-amber'
                                    : 'bg-cyan',
                              ].join(' ')}
                              title={item.status}
                            />
                          </button>
                          {itemIndex < group.items.length - 1 ? (
                            <div className="ml-3 flex items-center gap-2 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-600">
                              <span className="h-px w-5 bg-white/10" />
                              <span>{item.growthLabel}</span>
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <article className="surface-card bg-panel p-5 md:p-7">
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
              <div>
                <div className="mb-5 flex flex-wrap items-center gap-2">
                  <span className="chip text-cyan">{active.phase}</span>
                  <span className={`chip ${statusStyles[active.status]}`}>
                    {active.status}
                  </span>
                  <span className="chip">{active.projectType}</span>
                </div>
                <h3 className="text-4xl font-semibold leading-tight text-white">
                  {active.name}
                </h3>
                <p className="mt-3 text-sm font-medium text-zinc-500">
                  {active.period}
                  {active.repositoryName ? ` · Repository: ${active.repositoryName}` : ''}
                </p>
                <dl className="mt-6 grid gap-5">
                  <div>
                    <dt className="text-sm font-semibold text-zinc-500">담당 역할</dt>
                    <dd className="mt-2 text-lg font-medium leading-7 text-white">
                      {active.role}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-zinc-500">대표 기술</dt>
                    <dd className="mt-3 flex flex-wrap gap-2">
                      {active.technologies.map((tech) => (
                        <span className="chip bg-black/20" key={tech}>
                          {tech}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>

              <div>
                <ProjectMedia item={active} />
                {active.liveUrl ? (
                  <a
                    className="focus-ring mt-3 inline-flex items-center gap-2 rounded-lg border border-mint/30 bg-mint/10 px-4 py-2.5 text-sm font-semibold text-mint transition hover:border-mint/60 hover:bg-mint/15"
                    href={active.liveUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span>배포 사이트 방문</span>
                    <ArrowUpRight size={15} />
                  </a>
                ) : null}
                <div className="mt-3 flex flex-wrap gap-2">
                  {active.repositoryUrl ? (
                    <a className="focus-ring inline-flex items-center gap-2 rounded-lg border border-white/14 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.04]" href={active.repositoryUrl} rel="noreferrer" target="_blank">
                      <span>GitHub</span><ArrowUpRight size={15} />
                    </a>
                  ) : null}
                  {active.architectureUrl ? (
                    <a className="focus-ring inline-flex items-center gap-2 rounded-lg border border-cyan/30 bg-cyan/10 px-4 py-2.5 text-sm font-semibold text-cyan transition hover:border-cyan/60" href={active.architectureUrl} rel="noreferrer" target="_blank">
                      <span>Architecture</span><ArrowUpRight size={15} />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>

            {active.screenshots?.length ? (
              <section className="mt-8 border-t border-white/10 pt-8">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-mint">Product Screens</p>
                    <h4 className="mt-2 text-xl font-semibold text-white">실제 Android 앱 화면</h4>
                  </div>
                  <p className="text-sm text-zinc-500">Galaxy 기기에서 직접 실행·검증</p>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
                  {active.screenshots.map((screenshot) => (
                    <a className="group/screen overflow-hidden rounded-lg border border-white/10 bg-black transition hover:-translate-y-1 hover:border-mint/35" href={screenshot.src} key={screenshot.src} target="_blank">
                      <img alt={screenshot.alt} className="aspect-[9/16] h-full w-full object-cover object-top transition duration-300 group-hover/screen:scale-[1.02]" loading="lazy" src={screenshot.src} />
                    </a>
                  ))}
                </div>
              </section>
            ) : null}

            <div className="mt-8 border-t border-white/10 pt-8">
              <h4 className="text-xl font-semibold text-white">Journey Story</h4>
              <div className="mt-6 grid gap-7">
                <StoryBlock title="1. 이 단계에서 한 일">
                  <ul className="grid gap-2">
                    {active.work.map((item) => (
                      <li className="flex gap-3" key={item}>
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </StoryBlock>

                {active.limitation ? (
                  <StoryBlock title="2. 이전 단계에서 느낀 한계">
                    <p>{active.limitation}</p>
                  </StoryBlock>
                ) : null}

                {active.problemSolving?.length ? (
                  <StoryBlock title="3. 문제와 해결">
                    <ul className="grid gap-2">
                      {active.problemSolving.map((item) => (
                        <li className="flex gap-3" key={item}>
                          <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </StoryBlock>
                ) : null}

                <StoryBlock title="4. 배운 점">
                  <p>{active.learned}</p>
                </StoryBlock>
              </div>
            </div>

            {problems.length ? (
              <div className="mt-8 border-t border-white/10 pt-8">
                <h4 className="text-xl font-semibold text-white">Trouble Shooting</h4>
                <div className="mt-5 grid gap-3">
                  {visibleProblems.map((item) => (
                    <article className="surface-card bg-white/[0.025] p-5" key={item.problem}>
                      <dl className="grid gap-4 md:grid-cols-2">
                        <div>
                          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-amber">
                            Problem
                          </dt>
                          <dd className="mt-2 leading-7 text-zinc-200">{item.problem}</dd>
                        </div>
                        <div>
                          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
                            Cause
                          </dt>
                          <dd className="mt-2 leading-7 text-zinc-300">{item.cause}</dd>
                        </div>
                        <div>
                          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan">
                            Solution
                          </dt>
                          <dd className="mt-2 leading-7 text-zinc-200">{item.solution}</dd>
                        </div>
                        <div>
                          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-mint">
                            Lesson
                          </dt>
                          <dd className="mt-2 leading-7 text-zinc-300">{item.lesson}</dd>
                        </div>
                      </dl>
                    </article>
                  ))}
                </div>
                {problems.length > 2 ? (
                  <button
                    className="focus-ring mt-4 inline-flex items-center gap-2 rounded-lg border border-white/14 px-3 py-2 text-sm font-semibold text-white transition hover:border-white/28 hover:bg-white/[0.04]"
                    onClick={() => setShowAllProblems((value) => !value)}
                    type="button"
                  >
                    <span>{showAllProblems ? '접기' : '더 보기'}</span>
                    <ChevronDown
                      className={showAllProblems ? 'rotate-180' : ''}
                      size={16}
                    />
                  </button>
                ) : null}
              </div>
            ) : null}

            <section className="mt-8 rounded-lg border border-mint/20 bg-mint/10 p-5">
              <p className="text-sm font-semibold text-mint">5. Next Journey</p>
              <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center">
                <p className="text-xl font-semibold text-white">
                  Next Journey → {active.nextJourney.title}
                </p>
                <ArrowRight className="hidden text-mint md:block" size={18} />
              </div>
              <p className="mt-3 leading-7 text-zinc-200">
                {active.nextJourney.description}
              </p>
            </section>
          </article>
        </div>
      </div>
    </section>
  );
}
