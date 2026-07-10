import { ArrowRight } from 'lucide-react';
import { allProjects, featuredProjects } from '../data/portfolio';

export function AllProjects() {
  return (
    <section className="section-block bg-[#0b0c0a]" id="projects">
      <div className="section-shell">
        <h2 className="section-heading">All Projects</h2>

        <div className="grid gap-3 md:grid-cols-3">
          {allProjects.map((project, index) => {
            const featured = featuredProjects.find((item) => item.title === project);
            return (
              <article
                className="surface-card min-h-[132px] p-5"
                id={featured ? `project-${featured.id}` : undefined}
                key={project}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-zinc-500">{String(index + 1).padStart(2, '0')}</p>
                    <h3 className="mt-3 text-xl font-semibold text-white">{project}</h3>
                  </div>
                  <ArrowRight className="mt-1 text-zinc-600" size={18} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
