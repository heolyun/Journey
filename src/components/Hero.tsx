import { ArrowDown, ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[74vh] items-center overflow-hidden pt-20">
      <img
        alt=""
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        src="/images/journey-hero.png"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(6,7,6,0.95)_0%,rgba(6,7,6,0.78)_42%,rgba(6,7,6,0.28)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent" />

      <div className="section-shell py-20">
        <div className="max-w-[780px]">
          <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
            기능을 만들던 사람이 서비스를 운영하는 사람으로 성장하는 기록
          </h1>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              className="focus-ring inline-flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-ink transition hover:bg-mint"
              href="#featured"
            >
              <span>Featured Projects</span>
              <ArrowRight size={16} />
            </a>
            <a
              className="focus-ring inline-flex items-center gap-2 rounded-lg border border-white/14 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-cyan/50 hover:text-cyan"
              href="#journey"
            >
              <span>Growth Journey</span>
              <ArrowDown size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
