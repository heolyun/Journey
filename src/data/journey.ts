import {
  Boxes,
  BrainCircuit,
  Cloud,
  Code2,
  Rocket,
  ShieldCheck,
  Sprout,
  Stethoscope,
  type LucideIcon,
} from 'lucide-react';

export type JourneyStatus = 'Completed' | 'In Progress' | 'Planned';

export type TroubleShootingItem = {
  problem: string;
  cause: string;
  solution: string;
  lesson: string;
};

export type JourneyItem = {
  id: string;
  name: string;
  repositoryName?: string;
  phase: string;
  period: string;
  summary: string;
  growthLabel: string;
  projectType: '팀 프로젝트' | '개인 프로젝트';
  status: JourneyStatus;
  role: string;
  technologies: string[];
  work: string[];
  limitation?: string;
  problemSolving?: string[];
  learned: string;
  nextJourney: {
    title: string;
    description: string;
  };
  troubleshooting?: TroubleShootingItem[];
  image?: string;
  videoUrl?: string;
  liveUrl?: string;
  icon: LucideIcon;
};

export type JourneyGroup = {
  phase: string;
  items: JourneyItem[];
};

export const journeyGroups: JourneyGroup[] = [
  {
    phase: 'Web Development',
    items: [
      {
        id: 'doctorlink',
        image: '/images/projects/doctorlink.png',
        videoUrl: 'https://www.youtube.com/embed/8UYZvMfpsVE',
        name: 'DoctorLink',
        phase: 'Web Development',
        period: '2025.12.10 → 2025.12.24',
        summary: '화면과 API 연결을 익힌 첫 서비스 구현',
        growthLabel: 'Web Development',
        projectType: '팀 프로젝트',
        status: 'Completed',
        role: '프론트엔드 및 서비스 기능 구현',
        technologies: ['React', 'Spring', 'Oracle'],
        work: [
          '회원가입, 로그인, 로그인 상태 유지 기능 구현',
          '건강 문진, 대시보드, 캘린더, 커뮤니티 화면 연결',
        ],
        limitation:
          '화면 구현을 넘어 인증과 서버 로직이 사용자 경험에 어떤 영향을 주는지 더 깊게 이해할 필요를 느꼈습니다.',
        problemSolving: [
          '사용자 상태가 여러 화면에서 유지되도록 API 응답과 프론트 상태 흐름을 함께 점검했습니다.',
        ],
        learned:
          '사용자 화면과 백엔드 API가 연결되는 흐름, 상태 관리가 사용자 경험에 주는 영향을 배웠습니다.',
        nextJourney: {
          title: '#Trip',
          description:
            '프론트엔드뿐 아니라 인증과 서버 로직을 더 깊게 이해할 필요를 느꼈습니다.',
        },
        icon: Stethoscope,
      },
      {
        id: 'trip',
        image: '/images/projects/trip.png',
        videoUrl: 'https://www.youtube.com/embed/xIeQLS1MjWY',
        name: '#Trip',
        repositoryName: 'hifive',
        phase: 'Web Development',
        period: '2026.02.09 → 2026.03.03',
        summary: '인증과 보안 흐름을 서버 관점에서 구현',
        growthLabel: 'React Experience',
        projectType: '팀 프로젝트',
        status: 'Completed',
        role: '인증 기능 및 백엔드 구현',
        technologies: ['Spring Security', 'OAuth2', 'SMTP', 'Oracle'],
        work: [
          '로그인, 로그아웃, 회원가입 기능 구현',
          '아이디/비밀번호 찾기와 OAuth2 로그인 흐름 구현',
        ],
        limitation:
          '인증 기능을 구현하며 보안 흐름이 단일 화면이 아니라 서버 정책과 데이터 흐름의 문제라는 점을 느꼈습니다.',
        problemSolving: [
          '메일 인증, OAuth2 로그인, 계정 조회 흐름을 한 서비스 안에서 연결했습니다.',
        ],
        learned:
          '인증과 인가는 화면 기능이 아니라 서버와 보안 흐름의 문제라는 관점을 얻었습니다.',
        nextJourney: {
          title: 'OneulFarm',
          description:
            '외부 API와 여러 서비스 기능을 하나의 프로젝트로 통합하는 경험이 필요했습니다.',
        },
        icon: Code2,
      },
      {
        id: 'oneulfarm',
        image: '/images/projects/oneulfarm.png',
        videoUrl: 'https://www.youtube.com/embed/7_OIEbt_0JY',
        name: '오늘Farm',
        phase: 'Web Development',
        period: '2026.03.09 → 2026.04.03',
        summary: '외부 API와 여러 기능을 하나의 서비스로 통합',
        growthLabel: 'Team Leader',
        projectType: '팀 프로젝트',
        status: 'Completed',
        role: '팀장 및 기능 개발',
        technologies: ['Spring', 'React', 'Oracle', '공공 API', '결제', 'AI API'],
        work: [
          '농산물 도매가 API, 가격 분석, 상품과 장바구니 기능 구현',
          '관리자 페이지, AI 식단 챗봇, 팀 일정 및 역할 조율',
        ],
        limitation:
          '기능이 많아질수록 서비스 전체 흐름과 팀 일정, 역할 관리가 구현만큼 중요하다는 점을 느꼈습니다.',
        problemSolving: [
          '공공 API, 결제, AI API를 하나의 서비스 흐름 안에 묶고 팀 진행 상황을 조율했습니다.',
        ],
        learned:
          '여러 기능을 하나의 서비스로 통합하는 경험과 팀 리딩, 일정 관리의 중요성을 배웠습니다.',
        nextJourney: {
          title: 'First Deployment',
          description:
            '완성된 서비스를 로컬이 아닌 외부 환경에 직접 배포해보고 싶었습니다.',
        },
        icon: Sprout,
      },
    ],
  },
  {
    phase: 'First Deployment',
    items: [
      {
        id: 'teamrullet',
        image: '/images/projects/teamrullet.png',
        liveUrl: 'https://teamrullet.netlify.app/',
        name: '팀 밸런스 뽑기',
        phase: 'First Deployment',
        period: '2026.04.14 · One Day Project',
        summary: '개인 프로젝트를 처음 외부에 배포',
        growthLabel: 'First Deployment',
        projectType: '개인 프로젝트',
        status: 'Completed',
        role: '기획, 구현, 배포',
        technologies: ['Frontend', 'GitHub', 'Netlify'],
        work: [
          '기획부터 구현, 배포까지 개인 수행',
          'GitHub와 Netlify를 연동해 외부 공개',
        ],
        limitation:
          '정적 프론트엔드를 배포하는 경험은 얻었지만, 서버와 데이터베이스 운영까지 다루지는 못했습니다.',
        problemSolving: [
          'GitHub 저장소와 Netlify 배포 흐름을 연결해 개인 프로젝트를 외부에서 접근 가능하게 만들었습니다.',
        ],
        learned: '서비스를 외부에 공개하는 첫 배포 경험을 얻었습니다.',
        nextJourney: {
          title: 'CHAMBTI',
          description:
            '단순 배포를 한 번 더 경험하며 개인 프로젝트의 완성도를 높이고 싶었습니다.',
        },
        icon: Rocket,
      },
      {
        id: 'chambti',
        image: '/images/projects/chambti.png',
        liveUrl: 'https://chambti.netlify.app/quiz',
        name: 'CHAMBTI',
        phase: 'First Deployment',
        period: '2026.04.15 · One Day Project',
        summary: 'Netlify 배포 흐름을 반복하며 완성도 개선',
        growthLabel: 'Netlify',
        projectType: '개인 프로젝트',
        status: 'Completed',
        role: '기획, 개발, 배포',
        technologies: ['Frontend', 'GitHub', 'Netlify'],
        work: ['게임 캐릭터 추천 서비스 기획, 개발, 배포'],
        limitation:
          'Netlify는 정적 프론트엔드 배포에는 편리했지만 백엔드와 데이터베이스 운영 경험으로 이어지지 않았습니다.',
        problemSolving: [
          '개인 프로젝트의 기획, 구현, 배포 범위를 직접 관리하며 완성까지 이어갔습니다.',
        ],
        learned: '개인 프로젝트의 전체 생명주기를 경험했습니다.',
        nextJourney: {
          title: 'AI Service Experience',
          description: 'AI와 클라우드가 포함된 팀 프로젝트를 경험하게 되었습니다.',
        },
        icon: BrainCircuit,
      },
    ],
  },
  {
    phase: 'AI Service Experience',
    items: [
      {
        id: 'csas',
        image: '/images/projects/csas.png',
        name: 'CSAS',
        phase: 'AI Service Experience',
        period: '2026.05 → 2026.06',
        summary: 'AI 분석 결과를 웹 서비스 화면에 연결',
        growthLabel: 'AI Service',
        projectType: '팀 프로젝트',
        status: 'Completed',
        role: '프론트엔드',
        technologies: ['React', 'AI API', 'AWS 환경'],
        work: [
          'AI 분석 결과를 웹 화면에 연결',
          'AWS 기반 서비스 구조를 팀 프로젝트에서 경험',
        ],
        limitation:
          '웹, AI 모델, 클라우드 인프라가 함께 움직이는 구조를 보며 인프라를 직접 구축하고 운영해보고 싶어졌습니다.',
        problemSolving: [
          'AI 분석 결과가 사용자 화면에 자연스럽게 표시되도록 API 응답과 UI 상태를 연결했습니다.',
        ],
        learned:
          '웹, AI 모델, 클라우드 인프라가 함께 연결되는 서비스 구조를 배웠습니다.',
        nextJourney: {
          title: 'Cloud Infrastructure',
          description:
            '인프라를 다른 팀원에게 의존하지 않고 직접 구축하고 운영해보고 싶었습니다.',
        },
        icon: BrainCircuit,
      },
    ],
  },
  {
    phase: 'Cloud Infrastructure',
    items: [
      {
        id: 'burinake',
        image: '/images/projects/burinake.png',
        liveUrl: 'https://burinake-demo.vercel.app',
        name: 'Burinake',
        phase: 'Cloud Infrastructure',
        period: '2026.06 → 2026.07.13',
        summary: 'Azure 기반 컨테이너 운영과 AI 인프라 구축',
        growthLabel: 'Cloud Infrastructure',
        projectType: '팀 프로젝트',
        status: 'Completed',
        role: 'Cloud Infrastructure, DevOps, AI Infrastructure',
        technologies: [
          'Azure VM',
          'AKS',
          'Docker',
          'Docker Compose',
          'GitHub Actions',
          'Azure Container Registry',
          'Azure Blob Storage',
          'Azure OpenAI',
          'PostgreSQL',
          'YOLO',
          'VLM',
        ],
        work: [
          'Azure VM 구성, SSH Key 인증, NSG 설정',
          '멀티 컨테이너 운영, CI/CD, ACR 이미지 배포',
          'Blob Storage 연동, Azure OpenAI 배포, AKS 배포',
        ],
        limitation:
          '정적 배포와 팀 프로젝트에서 경험한 클라우드 구조를 넘어, 빌드와 실행 환경을 직접 분리하고 운영해야 했습니다.',
        problemSolving: [
          'AI 이미지 빌드, 모델 파일 저장, 브라우저 API 호출 경로 문제를 운영 환경 기준으로 재설계했습니다.',
        ],
        learned:
          '빌드 환경과 실행 환경 분리, 애플리케이션과 파일 저장소 분리, 컨테이너 네트워크와 오케스트레이션을 배웠습니다.',
        nextJourney: {
          title: 'Container Orchestration',
          description:
            '관리형 AKS 경험을 넘어 직접 온프레미스 Kubernetes 환경을 구성하고 싶었습니다.',
        },
        troubleshooting: [
          {
            problem: 'VM에서 AI 이미지를 직접 빌드하며 디스크 부족 발생',
            cause:
              'YOLO와 AI 의존성이 포함된 이미지가 커졌고, VM의 빌드 공간이 실행 환경과 섞였습니다.',
            solution:
              'GitHub Actions에서 이미지를 빌드하고 ACR에 push한 뒤 VM 또는 클러스터는 이미지를 pull하도록 분리했습니다.',
            lesson: '빌드 환경과 실행 환경은 분리해야 운영 환경이 안정적입니다.',
          },
          {
            problem: 'YOLO 모델을 이미지에 포함하면서 컨테이너 이미지가 비대해짐',
            cause:
              '모델 파일이 애플리케이션 이미지 안에 포함되어 배포 단위가 커졌습니다.',
            solution:
              'Blob Storage에 모델을 저장하고 initContainer에서 필요한 시점에 다운로드하도록 변경했습니다.',
            lesson: '애플리케이션과 대용량 파일 저장소는 분리하는 편이 배포와 운영에 유리합니다.',
          },
          {
            problem: '외부 브라우저가 localhost API를 호출',
            cause:
              '로컬 개발 기준 API 주소가 실제 서비스 주소와 Kubernetes 서비스 구조에 맞지 않았습니다.',
            solution:
              '실제 서비스 주소와 Kubernetes 내부 서비스 구조에 맞게 API 호출 경로를 수정했습니다.',
            lesson: '컨테이너 네트워크는 로컬 개발 환경과 다른 기준으로 설계해야 합니다.',
          },
        ],
        icon: ShieldCheck,
      },
    ],
  },
  {
    phase: 'Container Orchestration',
    items: [
      {
        id: 'antiadhd',
        name: 'AntiADHD',
        phase: 'Container Orchestration',
        period: '2026.07 → Present',
        summary: '온프레미스 Kubernetes 운영 자동화 학습',
        growthLabel: 'Container Orchestration',
        projectType: '개인 프로젝트',
        status: 'In Progress',
        role: '온프레미스 Kubernetes 운영 자동화 학습',
        technologies: [
          'Kubernetes 또는 k3s',
          'Ingress',
          'ConfigMap',
          'Secret',
          'Helm',
          'Monitoring',
        ],
        work: [
          '온프레미스 Linux 환경에서 Kubernetes 운영 구조 학습',
          'Ingress, ConfigMap, Secret, Helm, Monitoring 구성 실험',
        ],
        limitation:
          '관리형 Kubernetes에서 제공하던 편의 기능을 직접 구성하며 클러스터 운영의 기본기를 확인하고 있습니다.',
        problemSolving: [
          '완료된 프로젝트가 아니므로 진행 중인 실험과 운영 자동화 학습 중심으로 정리하고 있습니다.',
        ],
        learned:
          '추상화된 클라우드 서비스 아래의 Linux, 네트워크, 배포 단위를 직접 이해하는 중입니다.',
        nextJourney: {
          title: 'Multi Cloud',
          description:
            'Azure에 한정되지 않고 AWS에서도 인프라를 직접 설계하고 싶습니다.',
        },
        icon: Boxes,
      },
    ],
  },
  {
    phase: 'Multi Cloud',
    items: [
      {
        id: 'aws-project',
        name: 'AWS Infrastructure Project',
        phase: 'Multi Cloud',
        period: 'Coming Soon',
        summary: 'Azure 경험을 AWS 인프라 설계로 확장 예정',
        growthLabel: 'Multi Cloud',
        projectType: '개인 프로젝트',
        status: 'Planned',
        role: 'AWS 기반 인프라 설계 예정',
        technologies: [
          'EC2',
          'VPC',
          'IAM',
          'ALB',
          'RDS',
          'S3',
          'ECR',
          'ECS 또는 EKS',
          'CloudWatch',
        ],
        work: ['Azure에서 경험한 구조를 AWS 서비스로 다시 설계할 예정'],
        limitation:
          '아직 완료된 프로젝트가 아니므로 설계 목표와 예정 기술 중심으로 정리합니다.',
        problemSolving: [
          '완료된 문제 해결 사례가 아니라, AWS 서비스 조합으로 동일한 운영 구조를 재설계하는 것이 목표입니다.',
        ],
        learned:
          '클라우드별 서비스 차이를 비교하며 더 넓은 인프라 설계 관점을 만들 예정입니다.',
        nextJourney: {
          title: 'Next',
          description:
            'Azure, Kubernetes, AWS 경험을 비교하며 서비스 운영 설계 역량을 확장합니다.',
        },
        icon: Cloud,
      },
    ],
  },
];

export const journeyItems = journeyGroups.flatMap((group) => group.items);

export type RoadmapItem = {
  label: string;
  title: string;
  description: string;
};

export const futureRoadmap: RoadmapItem[] = [
  {
    label: 'Current',
    title: 'Operating Containerized Services',
    description:
      '컨테이너화된 서비스를 직접 실행하고 운영 흐름을 다듬는 단계입니다.',
  },
  {
    label: 'Next',
    title: 'Building Production-grade AWS Infrastructure',
    description:
      'VPC, ALB, RDS, ECR, ECS/EKS, CloudWatch를 조합해 운영 가능한 AWS 구조를 설계합니다.',
  },
  {
    label: 'Future',
    title: 'Infrastructure as Code',
    description:
      '반복 가능한 인프라 구성을 코드로 관리하며 환경 재현성을 높입니다.',
  },
  {
    label: 'Future',
    title: 'Observability',
    description:
      '로그, 메트릭, 알림을 통해 장애를 더 빠르게 발견하고 설명할 수 있는 구조를 만듭니다.',
  },
  {
    label: 'Future',
    title: 'Platform Engineering',
    description:
      '개발자가 안정적으로 배포하고 운영할 수 있는 내부 플랫폼 관점으로 확장합니다.',
  },
  {
    label: 'Future',
    title: 'Reliable Cloud Systems',
    description:
      '확장성과 복구 가능성을 고려한 신뢰도 높은 클라우드 시스템을 목표로 합니다.',
  },
];
