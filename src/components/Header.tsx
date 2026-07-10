import { Github, Mail } from 'lucide-react';

const navItems = [
  { label: 'Featured', href: '#featured' },
  { label: 'About', href: '#about' },
  { label: 'Journey', href: '#journey' },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/78 backdrop-blur-xl">
      <nav className="section-shell flex h-16 items-center justify-between">
        <a className="focus-ring rounded-lg text-sm font-semibold text-white" href="#">
          Journey
        </a>
        <div className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
          {navItems.map((item) => (
            <a
              className="focus-ring rounded-lg transition hover:text-white"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a
            aria-label="GitHub"
            className="focus-ring grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-zinc-200 transition hover:border-mint/40 hover:text-mint"
            href="https://github.com"
            rel="noreferrer"
            target="_blank"
            title="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            aria-label="Email"
            className="focus-ring grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-zinc-200 transition hover:border-cyan/40 hover:text-cyan"
            href="mailto:hello@example.com"
            title="Email"
          >
            <Mail size={18} />
          </a>
        </div>
      </nav>
    </header>
  );
}
