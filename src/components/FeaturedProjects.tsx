import { ArrowUpRight } from 'lucide-react';
import { featuredProjects } from '../data/portfolio';

export function FeaturedProjects() {
  return (
    <section className="section-block border-t border-white/8 bg-ink" id="featured">
      <div className="section-shell">
        <h2 className="section-heading">Featured Projects</h2>

        <div className="grid items-stretch gap-4 lg:grid-cols-12">
          {featuredProjects.map((project) => {
            const Icon = project.icon;
            return (
              <article
                className={[
                  'group surface-card relative overflow-hidden p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20',
                  project.spotlight
                    ? 'min-h-[500px] bg-panel shadow-glow lg:col-span-7 lg:row-span-2'
                    : 'min-h-[242px] lg:col-span-5',
                ].join(' ')}
                key={project.id}
              >
                <div className="flex h-full flex-col">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <h3
                      className={
                        project.spotlight
                          ? 'text-4xl font-semibold leading-tight text-white'
                          : 'text-2xl font-semibold leading-tight text-white'
                      }
                    >
                      {project.title}
                    </h3>
                    <span className="icon-box text-mint">
                      <Icon size={21} />
                    </span>
                  </div>

                  <div className="relative min-h-0 flex-1 overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025)),radial-gradient(circle_at_68%_30%,rgba(102,227,255,0.18),transparent_34%),radial-gradient(circle_at_26%_72%,rgba(157,255,203,0.12),transparent_30%)]">
                    {project.image ? (
                      <img
                        alt={`${project.title} 대표 화면`}
                        className="absolute inset-0 h-full w-full object-cover object-top"
                        src={project.image}
                      />
                    ) : (
                      <>
                        <div className="absolute inset-6 rounded-lg border border-dashed border-white/14" />
                        <div className="absolute inset-0 grid place-items-center text-sm font-medium text-zinc-500">
                          {project.spotlight ? 'Large Image Placeholder' : 'Image Placeholder'}
                        </div>
                      </>
                    )}
                    <div className="absolute inset-0 flex translate-y-4 flex-col justify-end bg-black/72 p-6 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      <p className="text-sm font-semibold text-mint">{project.category}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.stack.map((item) => (
                          <span className="chip border-white/14 bg-white/8 text-white" key={item}>
                            {item}
                          </span>
                        ))}
                      </div>
                      <a
                        className="focus-ring mt-6 inline-flex w-fit items-center gap-2 rounded-lg border border-white/18 px-3 py-2 text-sm font-semibold text-white transition hover:border-mint/50 hover:text-mint"
                        href={`#project-${project.id}`}
                      >
                        <span>View Project</span>
                        <ArrowUpRight size={15} />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
