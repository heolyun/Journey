import { Layers, Server, Workflow } from 'lucide-react';

const values = [
  {
    title: 'Service Flow',
    body: '화면, API, 데이터베이스, AI 호출, 스토리지가 한 번의 사용자 행동 안에서 어떻게 이어지는지 봅니다.',
    icon: Workflow,
  },
  {
    title: 'Operation Mindset',
    body: '배포 이후의 환경 변수, 로그, 네트워크, 모니터링까지 개발 책임의 일부로 다룹니다.',
    icon: Server,
  },
  {
    title: 'Layered Growth',
    body: 'React에서 시작해 Docker, Azure, Kubernetes, AWS로 계층을 넓혀가고 있습니다.',
    icon: Layers,
  },
];

export function AboutMe() {
  return (
    <section className="section-block bg-[#0b0c0a]" id="about">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <h2 className="section-heading mb-0">About Me</h2>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <article
                className="surface-card min-h-[156px] p-5"
                key={value.title}
              >
                <div className="flex gap-4">
                  <span className="icon-box text-amber">
                    <Icon size={20} />
                  </span>
                  <div>
                    <h3 className="font-semibold text-white">{value.title}</h3>
                    <p className="mt-2 leading-7 text-zinc-300">{value.body}</p>
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
