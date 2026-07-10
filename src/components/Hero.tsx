import { ArrowDown, FileText, Github, Mail } from 'lucide-react';
import { heroProfile } from '../data/portfolio';
import { ProfilePlaceholder } from './ProfilePlaceholder';

const actionIcons = {
  GitHub: Github,
  Resume: FileText,
  Email: Mail,
};

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden pt-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_12%,rgba(255,255,255,0.07),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.035),transparent_38%)]" />
      <div className="section-shell py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <ProfilePlaceholder />
          <h1 className="mt-8 text-5xl font-semibold leading-none text-white md:text-7xl">
            {heroProfile.name}
          </h1>
          <p className="mt-5 text-xl font-medium text-zinc-200 md:text-2xl">
            {heroProfile.role}
          </p>
          <p className="mx-auto mt-6 max-w-xl text-2xl font-semibold leading-tight text-white md:text-4xl">
            {heroProfile.intro.map((line) => (
              <span className="block" key={line}>
                {line}
              </span>
            ))}
          </p>
          <p className="mt-6 text-sm font-medium text-zinc-400 md:text-base">
            {heroProfile.stack}
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            {heroProfile.actions.map((action) => {
              const Icon = actionIcons[action.label as keyof typeof actionIcons];
              return (
                <a
                  className="focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/[0.025] px-5 text-sm font-semibold text-white transition hover:border-white/28 hover:bg-white/[0.06]"
                  href={action.href}
                  key={action.label}
                >
                  <Icon size={17} />
                  <span>{action.label}</span>
                </a>
              );
            })}
          </div>
        </div>

        <a
          className="focus-ring mx-auto mt-16 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition hover:text-white"
          href="#featured"
        >
          <ArrowDown size={16} />
          <span>Scroll to Explore Journey</span>
        </a>
      </div>
    </section>
  );
}
