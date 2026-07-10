import {
  Activity,
  Boxes,
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  type LucideIcon,
  Route,
  Server,
  ShieldCheck,
} from 'lucide-react';

export type FeaturedProject = {
  id: string;
  title: string;
  status: 'Completed' | 'In Progress' | 'Planned';
  spotlight?: boolean;
  category: string;
  stack: string[];
  icon: LucideIcon;
};

export type JourneyStep = {
  id: string;
  name: string;
  phase: string;
  summary: string;
  focus: string;
  stack: string[];
  lesson: string;
  icon: LucideIcon;
};

export const heroProfile = {
  name: 'HP DD',
  role: 'Cloud Infrastructure Engineer',
  intro: ['서비스 전체를 이해하며', '운영 환경을 설계하는 엔지니어'],
  stack: 'Frontend · Backend · Cloud · DevOps',
  actions: [
    {
      label: 'GitHub',
      href: 'https://github.com/heolyun',
    },
    {
      label: 'Resume',
      href: '#',
    },
    {
      label: 'Email',
      href: 'mailto:hello@example.com',
    },
  ],
};

export const featuredProjects: FeaturedProject[] = [
  {
    id: 'burinake',
    title: 'Burinake',
    status: 'Completed',
    spotlight: true,
    category: 'Cloud Infrastructure',
    stack: [
      'Azure VM',
      'AKS',
      'Docker',
      'CI/CD',
      'Azure OpenAI',
    ],
    icon: ShieldCheck,
  },
  {
    id: 'antiadhd',
    title: 'AntiADHD',
    status: 'In Progress',
    category: 'Kubernetes',
    stack: ['Kubernetes', 'On-premise', 'Linux', 'Helm', 'Monitoring'],
    icon: Boxes,
  },
  {
    id: 'aws-project',
    title: 'AWS Project',
    status: 'Planned',
    category: 'Cloud Architecture',
    stack: ['EC2', 'VPC', 'IAM', 'EKS', 'CloudWatch'],
    icon: Cloud,
  },
];

export const aboutCopy = [
  '안녕하세요.',
  '프로젝트를 진행하며 기능 구현에서 서비스 운영으로 관심을 확장했습니다.',
  'Frontend부터 Cloud Infrastructure까지 서비스 전체 흐름을 경험했습니다.',
];

export const journeySteps: JourneyStep[] = [
  {
    id: 'doctorlink',
    name: 'DoctorLink',
    phase: 'Frontend Start',
    summary: '사용자가 보는 화면과 흐름을 먼저 익힌 출발점',
    focus: '컴포넌트 구조와 사용자 여정',
    stack: ['React', 'API Integration'],
    lesson: '기능은 화면에서 끝나지 않고 데이터 흐름으로 이어집니다.',
    icon: Code2,
  },
  {
    id: 'trip',
    name: '#Trip',
    phase: 'Service Flow',
    summary: '검색, 추천, 저장 흐름을 서비스 단위로 연결',
    focus: '프론트엔드와 백엔드 경계',
    stack: ['Frontend', 'Backend', 'Database'],
    lesson: '사용자 기능은 결국 상태와 저장소의 설계 품질에 기대고 있습니다.',
    icon: Route,
  },
  {
    id: 'todayfarm',
    name: '오늘Farm',
    phase: 'Data Experience',
    summary: '데이터를 화면에서 의미 있게 보여주는 경험',
    focus: '데이터 모델과 UI 표현',
    stack: ['Database', 'Dashboard'],
    lesson: '좋은 화면은 좋은 데이터 구조 없이는 오래 버티기 어렵습니다.',
    icon: Database,
  },
  {
    id: 'team-balance',
    name: 'Team Balance',
    phase: 'Collaboration',
    summary: '협업 도구와 팀 단위 문제 해결에 집중',
    focus: '팀 생산성과 역할 분리',
    stack: ['React', 'Backend API'],
    lesson: '개발 속도는 코드뿐 아니라 의사결정 구조에서도 만들어집니다.',
    icon: Activity,
  },
  {
    id: 'chambti',
    name: 'CHAMBTI',
    phase: 'Product Polish',
    summary: '사용자가 오래 머무는 경험을 다듬은 프로젝트',
    focus: '인터랙션, 반응형, 완성도',
    stack: ['TypeScript', 'UX'],
    lesson: '작은 인터랙션도 제품의 신뢰도를 결정합니다.',
    icon: BrainCircuit,
  },
  {
    id: 'crack-ai',
    name: '균열분석 AI',
    phase: 'AI Pipeline',
    summary: 'AI 결과를 실제 문제 해결 흐름에 넣는 실험',
    focus: 'AI 모델 입출력과 서비스 연결',
    stack: ['AI', 'Storage', 'API'],
    lesson: 'AI는 모델보다 전후 처리와 운영 흐름이 더 큰 비중을 가집니다.',
    icon: BrainCircuit,
  },
  {
    id: 'burinake',
    name: 'Burinake',
    phase: 'Cloud Operation',
    summary: 'Azure 기반 배포와 자동화까지 확장',
    focus: '서비스 운영, 배포, 클라우드 리소스',
    stack: ['Azure', 'AKS', 'Docker', 'CI/CD'],
    lesson: '서비스는 구현된 뒤부터 진짜 엔지니어링 문제가 시작됩니다.',
    icon: Server,
  },
  {
    id: 'antiadhd',
    name: 'AntiADHD',
    phase: 'Kubernetes Deepening',
    summary: '온프레미스 Kubernetes와 모니터링을 학습',
    focus: '클러스터 구성과 관측성',
    stack: ['Kubernetes', 'Helm', 'Linux'],
    lesson: '추상화 아래의 시스템을 이해할수록 장애를 덜 두려워하게 됩니다.',
    icon: Boxes,
  },
  {
    id: 'aws',
    name: 'AWS',
    phase: 'Next Cloud',
    summary: 'AWS 운영 스택으로 경험을 넓히는 다음 단계',
    focus: 'VPC, IAM, EKS, CloudWatch',
    stack: ['AWS', 'EKS', 'CloudWatch'],
    lesson: '클라우드별 차이를 비교하며 더 넓은 운영 언어를 갖추려 합니다.',
    icon: Cloud,
  },
];

export const allProjects = [
  'DoctorLink',
  '#Trip',
  '오늘Farm',
  'Team Balance',
  'CHAMBTI',
  '균열분석 AI',
  'Burinake',
  'AntiADHD',
  'AWS Project',
];

export const troubleshootingNotes = [
  'Azure VM과 컨테이너 배포 사이에서 환경 변수, 포트, 네트워크 정책을 분리해 점검',
  'AI 호출 결과와 Blob Storage 저장 흐름을 추적 가능하게 정리',
  'Kubernetes 실습에서 Helm 릴리스, 노드 상태, 모니터링 지표를 함께 확인',
];

export const roadmapItems = [
  'Burinake 상세 페이지에 아키텍처와 장애 대응 기록 추가',
  'AntiADHD 진행 로그를 Kubernetes 운영 일지로 정리',
  'AWS 프로젝트에서 Azure와 EKS 운영 관점 비교',
];
