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
  image?: string;
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
    image: '/images/projects/burinake.png',
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
