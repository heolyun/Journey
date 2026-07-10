import { ExternalLink } from 'lucide-react';
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
                  'group surface-card relative overflow-hidden p-6 transition duration-300 hover:-translate-y-1 hover:border-mint/40',
                  project.spotlight
                    ? 'min-h-[360px] bg-panel shadow-glow lg:col-span-7 lg:row-span-2 lg:min-h-[424px]'
                    : 'min-h-[204px] lg:col-span-5',
                ].join(' ')}
                key={project.id}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_18%,rgba(157,255,203,0.14),transparent_32%),radial-gradient(circle_at_16%_88%,rgba(102,227,255,0.12),transparent_30%)] opacity-80" />
                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <div className="mb-7 flex items-center justify-between gap-4">
                      <span className="icon-box text-mint">
                        <Icon size={22} />
                      </span>
                      <span className="chip">
                        {project.status}
                      </span>
                    </div>
                    <h3
                      className={
                        project.spotlight
                          ? 'text-4xl font-semibold leading-tight text-white'
                          : 'text-2xl font-semibold leading-tight text-white'
                      }
                    >
                      {project.title}
                    </h3>
                  </div>

                  <div className="mt-10 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span className="chip bg-black/20" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="absolute inset-0 flex translate-y-4 flex-col justify-end bg-black/86 p-6 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <p className="text-sm font-semibold text-mint">My Role</p>
                  <p className="mt-3 text-xl font-semibold leading-8 text-white">
                    {project.role}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-zinc-300">{project.story}</p>
                  <a
                    className="focus-ring mt-6 inline-flex w-fit items-center gap-2 rounded-lg border border-white/14 px-3 py-2 text-sm font-semibold text-white transition hover:border-mint/40 hover:text-mint"
                    href={`#project-${project.id}`}
                  >
                    <span>Detail</span>
                    <ExternalLink size={15} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
