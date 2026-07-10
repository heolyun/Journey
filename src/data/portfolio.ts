import {
  Boxes,
  Cloud,
  type LucideIcon,
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

export const roadmapItems = [
  'Burinake 상세 페이지에 아키텍처와 장애 대응 기록 추가',
  'AntiADHD 진행 로그를 Kubernetes 운영 일지로 정리',
  'AWS 프로젝트에서 Azure와 EKS 운영 관점 비교',
];
