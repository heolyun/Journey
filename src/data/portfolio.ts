import {
  BrainCircuit,
  CloudCog,
  Flame,
  type LucideIcon,
} from 'lucide-react';

export type FeaturedProject = {
  id: string;
  title: string;
  status: 'Completed' | 'In Progress' | 'Planned';
  spotlight?: boolean;
  category: string;
  stack: string[];
  image?: string;
  icon: LucideIcon;
};

export const heroProfile = {
  name: 'Heo Ryun',
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
      href: '/resume/heo-ryun-resume.pdf',
    },
    {
      label: '자기소개서',
      href: '/resume/heo-ryun-cover-letter.pdf',
    },
    {
      label: 'Email',
      href: 'mailto:hl620@naver.com',
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
    image: '/images/projects/burinake.png',
    icon: Flame,
  },
  {
    id: 'antiadhd',
    title: 'AntiADHD',
    status: 'In Progress',
    category: 'AI Productivity · On-premise Kubernetes',
    stack: ['React Native', 'Spring Boot', 'k3s', 'PostgreSQL', 'OpenAI'],
    image: '/images/projects/antiadhd.png',
    icon: BrainCircuit,
  },
  {
    id: 'aws-project',
    title: 'AWS Project',
    status: 'Planned',
    category: 'Cloud Architecture',
    stack: ['EC2', 'VPC', 'IAM', 'EKS', 'CloudWatch'],
    icon: CloudCog,
  },
];
