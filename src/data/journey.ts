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
  repositoryUrl?: string;
  architectureUrl?: string;
  screenshots?: Array<{ src: string; alt: string }>;
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
        summary: '인증 상태와 건강 기록 흐름을 연결한 첫 React 서비스',
        growthLabel: 'Web Development',
        projectType: '팀 프로젝트',
        status: 'Completed',
        role: 'React 프론트엔드 · 인증 및 건강 기록 기능',
        technologies: ['React', 'Context API', 'localStorage', 'Spring', 'Oracle'],
        work: [
          '회원가입·로그인·아이디/비밀번호 찾기 화면과 로그인 상태 유지 구현',
          '건강 문진 저장, 대시보드 모달, 캘린더 데이터 연동 구현',
          '커뮤니티 글 작성·삭제 및 관리자 답변 흐름 구현',
        ],
        limitation:
          '화면 구현을 넘어 인증과 서버 로직이 사용자 경험에 어떤 영향을 주는지 더 깊게 이해할 필요를 느꼈습니다.',
        problemSolving: [
          'AuthContext와 브라우저 저장소를 연결해 새로고침 후에도 인증 상태가 복원되도록 구성했습니다.',
          '문진·캘린더·커뮤니티처럼 서로 다른 화면의 상태와 라우팅을 하나의 사용자 흐름으로 연결했습니다.',
        ],
        learned:
          'React 컴포넌트 분리뿐 아니라 인증·입력 데이터의 생명주기를 설계해야 화면 간 경험이 일관된다는 점을 배웠습니다.',
        nextJourney: {
          title: '#Trip',
          description:
            '프론트엔드뿐 아니라 인증과 서버 로직을 더 깊게 이해할 필요를 느꼈습니다.',
        },
        troubleshooting: [
          {
            problem: '새로고침하면 로그인 상태가 풀리고 가입하지 않은 계정도 화면에서 구분하기 어려움',
            cause: '인증 상태가 개별 컴포넌트의 메모리에만 있어 페이지 재로딩 시 초기화됐습니다.',
            solution: 'AuthContext와 브라우저 저장소를 연결하고 가입 계정 검증 및 상태 복원 흐름을 정리했습니다.',
            lesson: '인증 UI는 화면 표시가 아니라 상태의 저장·복원·검증까지 하나의 흐름으로 설계해야 합니다.',
          },
        ],
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
        summary: 'Spring Security 기반 인증·계정 복구 흐름을 서버까지 구현',
        growthLabel: 'React Experience',
        projectType: '팀 프로젝트',
        status: 'Completed',
        role: '인증·인가 및 계정 복구 백엔드',
        technologies: ['Java', 'Spring MVC', 'Spring Security', 'OAuth2', 'SMTP', 'MyBatis', 'Oracle', 'JSP'],
        work: [
          '로그인·로그아웃·회원가입·로그인 유지와 DB 연동 구현',
          '아이디 찾기 및 SMTP 임시 비밀번호 발송 흐름 구현',
          'SNS 간편 로그인 UI와 OAuth2 API 연결',
        ],
        limitation:
          '인증 기능을 구현하며 보안 흐름이 단일 화면이 아니라 서버 정책과 데이터 흐름의 문제라는 점을 느꼈습니다.',
        problemSolving: [
          'MailConfig와 메일 서비스를 분리하고 계정 조회 결과를 SMTP 발송까지 연결했습니다.',
          '일반 로그인과 OAuth2 로그인이 동일한 사용자 세션 흐름으로 이어지도록 인증 경로를 정리했습니다.',
        ],
        learned:
          '인증은 화면 하나가 아니라 보안 정책, DB 조회, 외부 OAuth, 메일 발송과 세션이 연결되는 서버 흐름이라는 관점을 얻었습니다.',
        nextJourney: {
          title: 'OneulFarm',
          description:
            '외부 API와 여러 서비스 기능을 하나의 프로젝트로 통합하는 경험이 필요했습니다.',
        },
        troubleshooting: [
          {
            problem: '비밀번호 찾기 결과를 화면에 직접 노출하는 방식의 보안성과 사용자 경험 문제',
            cause: '계정 복구 기능이 조회 결과 표시 중심으로 구성돼 안전한 전달 경로가 없었습니다.',
            solution: '임시 비밀번호를 생성하고 SMTP 메일로 전달하도록 MailConfig·MailService·인증 컨트롤러를 연결했습니다.',
            lesson: '계정 복구는 개인정보 노출을 줄이고 별도 검증 채널을 사용하는 방식으로 설계해야 합니다.',
          },
        ],
        icon: Code2,
      },
      {
        id: 'oneulfarm',
        image: '/images/projects/oneulfarm.png',
        videoUrl: 'https://www.youtube.com/embed/7_OIEbt_0JY',
        name: '오늘Farm',
        phase: 'Web Development',
        period: '2026.03.09 → 2026.04.03',
        summary: '시세·상품·AI 식단 데이터를 커머스 흐름으로 통합',
        growthLabel: 'Team Leader',
        projectType: '팀 프로젝트',
        status: 'Completed',
        role: '팀장 · 상품/관리자 · 시세 분석 · AI 식단 기능',
        technologies: ['React', 'Spring', 'MyBatis', 'Oracle', 'KAMIS API', 'OpenAI API', 'PortOne'],
        work: [
          'KAMIS 시세 데이터 저장·계산 로직과 상품 가격 연동 구현',
          '상품·장바구니·리뷰·주문 API 및 관리자 상품/회원 관리 구현',
          'OpenAI 기반 식단 챗봇과 식단 저장 흐름 구현, 팀 일정·역할 조율',
        ],
        limitation:
          '기능이 많아질수록 서비스 전체 흐름과 팀 일정, 역할 관리가 구현만큼 중요하다는 점을 느꼈습니다.',
        problemSolving: [
          '시세 스냅샷과 상품 계산 기준을 서비스·DAO·MyBatis 계층으로 분리해 가격 계산 오류를 바로잡았습니다.',
          '한 끼만 요청하는 경우에도 AI 응답을 안정적으로 파싱·저장하도록 식단 생성 흐름과 API 예외 처리를 보완했습니다.',
        ],
        learned:
          '외부 데이터는 호출 자체보다 내부 도메인 기준으로 변환·저장하는 과정이 중요하며, 팀장은 기능 의존성과 통합 일정을 함께 관리해야 한다는 점을 배웠습니다.',
        nextJourney: {
          title: 'First Deployment',
          description:
            '완성된 서비스를 로컬이 아닌 외부 환경에 직접 배포해보고 싶었습니다.',
        },
        troubleshooting: [
          {
            problem: '공공 시세 데이터와 상품 데이터의 계산 기준이 달라 관리자 화면의 가격이 일관되지 않음',
            cause: '시세 스냅샷 조회와 상품 가격 계산 책임이 여러 화면과 서비스에 흩어져 있었습니다.',
            solution: '시세 DAO·서비스·매퍼의 조회 기준을 정리하고 상품 서비스에서 계산 로직을 일관되게 적용했습니다.',
            lesson: '외부 API 데이터는 서비스 내부의 기준 모델로 정규화한 뒤 사용해야 계산 결과를 신뢰할 수 있습니다.',
          },
        ],
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
        summary: '조건과 실력 차이를 반영하는 팀 밸런싱 알고리즘을 첫 배포',
        growthLabel: 'First Deployment',
        projectType: '개인 프로젝트',
        status: 'Completed',
        role: '기획, 구현, 배포',
        technologies: ['React', 'TypeScript', 'Vite', 'Constraint Validation', 'GitHub', 'Netlify'],
        work: [
          '참가자 티어를 점수로 정규화하고 팀별 총점·인원 편차를 함께 계산',
          '같은 팀·다른 팀 조건을 검증하고 여러 배정 후보 중 비용이 가장 낮은 결과 선택',
          '기획부터 반응형 UI, SEO, GitHub·Netlify 배포까지 개인 수행',
        ],
        limitation:
          '정적 프론트엔드를 배포하는 경험은 얻었지만, 서버와 데이터베이스 운영까지 다루지는 못했습니다.',
        problemSolving: [
          '무작위 배정만으로 생기는 실력 편차를 줄이기 위해 팀 점수·인원 차이에 가중치를 둔 비용 함수를 적용했습니다.',
          '같은 팀/분리 조건의 충돌과 존재하지 않는 참가자를 배정 전에 검증해 실패 원인을 사용자에게 안내했습니다.',
        ],
        learned: '짧은 개인 프로젝트에서도 입력 검증, 알고리즘 기준, 결과 설명과 배포까지 완결된 사용자 경험이 필요하다는 점을 배웠습니다.',
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
        summary: '응답 가중치로 게임 캐릭터를 추천하고 결과를 공유하는 서비스',
        growthLabel: 'Netlify',
        projectType: '개인 프로젝트',
        status: 'Completed',
        role: '기획, 개발, 배포',
        technologies: ['React', 'TypeScript', 'Vite', 'React Router', 'localStorage', 'GitHub', 'Netlify'],
        work: [
          '퀴즈 응답을 성향 점수로 변환하고 캐릭터별 적합도를 계산해 상위 3개 추천',
          '추천 이유·유사 캐릭터·상세 결과 화면과 공유 가능한 결과 URL 구현',
          '최근 결과를 localStorage에 저장하고 Netlify SPA 라우팅 및 SEO 구성',
        ],
        limitation:
          'Netlify는 정적 프론트엔드 배포에는 편리했지만 백엔드와 데이터베이스 운영 경험으로 이어지지 않았습니다.',
        problemSolving: [
          '단순 결과 하나를 보여주는 대신 응답별 성향 가중치와 캐릭터 프로필의 차이를 점수화해 추천 근거를 함께 제공했습니다.',
          '저장된 결과가 없는 공유 URL에서도 slug를 기준으로 일반화된 결과를 복원해 빈 화면을 방지했습니다.',
        ],
        learned: '추천 결과의 설득력은 점수 계산뿐 아니라 이유 설명, 재방문 상태 복원과 공유 경로까지 포함해 설계해야 높아진다는 점을 배웠습니다.',
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
        liveUrl: 'https://csas-demo.vercel.app',
        name: 'CSAS',
        phase: 'AI Service Experience',
        period: '2026.05 → 2026.06',
        summary: '모바일 이미지 업로드부터 균열 분석 앨범까지 연결한 AI 프론트엔드',
        growthLabel: 'AI Service',
        projectType: '팀 프로젝트',
        status: 'Completed',
        role: 'React 프론트엔드 · 촬영/업로드 · 분석 결과 앨범',
        technologies: ['React', 'Vite', 'Axios', 'Canvas Image Compression', 'AI API', 'AWS 서비스 구조'],
        work: [
          '모바일 카메라 촬영·파일 업로드와 이미지 압축 처리 구현',
          '균열 좌표 시각화, 원본/분석 이미지 비교 및 균열 종류 필터 구현',
          '앨범 상세 모달·삭제·조회 UX를 개선하고 AI 분석 API 응답 연결',
        ],
        limitation:
          '웹, AI 모델, 클라우드 인프라가 함께 움직이는 구조를 보며 인프라를 직접 구축하고 운영해보고 싶어졌습니다.',
        problemSolving: [
          '고해상도 모바일 사진에서 발생하던 413 오류를 줄이기 위해 업로드 전 이미지 크기와 품질을 압축했습니다.',
          '분석 좌표와 균열 유형을 색상·필터·비교 슬라이드로 시각화해 원본 이미지와 결과를 함께 검증할 수 있게 했습니다.',
        ],
        learned:
          'AI 서비스의 프론트엔드는 요청 버튼을 만드는 데서 끝나지 않고 입력 데이터 전처리, 긴 처리 상태, 오류 안내와 결과 해석 UX까지 책임져야 한다는 점을 배웠습니다.',
        nextJourney: {
          title: 'Cloud Infrastructure',
          description:
            '인프라를 다른 팀원에게 의존하지 않고 직접 구축하고 운영해보고 싶었습니다.',
        },
        troubleshooting: [
          {
            problem: '모바일에서 촬영한 고해상도 이미지 업로드가 413 오류로 자주 실패',
            cause: '카메라 원본을 그대로 전송해 요청 크기가 서버 제한을 초과했습니다.',
            solution: '브라우저에서 이미지 크기와 품질을 압축한 뒤 업로드하고, 용량 제한 오류를 구분해 안내하도록 개선했습니다.',
            lesson: '파일 업로드는 서버 제한만 늘리기보다 클라이언트 전처리와 명확한 오류 처리를 함께 설계해야 합니다.',
          },
        ],
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
        image: '/images/projects/antiadhd.png',
        name: 'AntiADHD',
        phase: 'Container Orchestration',
        period: '2026.07 → Present',
        summary: 'AI 생산성 앱을 온프레미스 k3s에서 직접 배포·관측·복구',
        growthLabel: 'Container Orchestration',
        projectType: '개인 프로젝트',
        status: 'In Progress',
        role: '백엔드·모바일 구현 및 온프레미스 Kubernetes 운영 설계',
        technologies: [
          'React Native · Expo',
          'Spring Boot · Security',
          'PostgreSQL · Flyway',
          'Docker · k3s · Kustomize',
          'GitHub Actions · GHCR',
          'Prometheus · Grafana',
          'OpenAI API',
          'AsyncStorage · NetInfo',
        ],
        work: [
          'AI 작업 분해, 음성 일정 입력, 타임 블록, 포커스 세션을 하나의 실행 흐름으로 구현',
          'Spring Boot API와 AI Worker를 분리하고 PostgreSQL 스키마를 Flyway로 버전 관리',
          'Ubuntu 홈 서버에 단일 노드 k3s를 구성하고 Ingress, Secret, PVC, 관측 계층을 운영',
          'Backend 테스트, Android E2E, 보안 검사, GHCR 이미지 배포를 GitHub Actions로 자동화',
          '홈 서버가 꺼져도 일정을 사용할 수 있도록 오프라인 저장소와 재연결 mutation queue를 구현',
        ],
        limitation:
          '관리형 클라우드가 대신하던 네트워크, 영속 볼륨, Secret, 관측과 복구를 직접 책임해야 했습니다.',
        problemSolving: [
          '운영 DB의 레거시 외래 키 이름 차이로 Flyway 마이그레이션이 실패하자 직전 이미지로 롤백해 서비스를 먼저 복구했습니다.',
          '운영 스키마 복제본에서 트랜잭션 dry-run을 수행하고 제약 조건 이름 대신 관계를 기준으로 탐색하도록 수정했습니다.',
          'AI 요청을 별도 Worker Deployment로 분리해 일반 CRUD 응답 경로의 지연과 장애 영향을 줄였습니다.',
          '서버 연결 실패 후 circuit breaker로 반복 타임아웃을 막고, 재연결 시 큐를 순차 재생하도록 설계했습니다.',
        ],
        learned:
          'Kubernetes 리소스를 만드는 것뿐 아니라 오프라인 지속성, 충돌 처리, 관측 가능성, 데이터 백업과 롤백 가능성이 실제 서비스 운영의 핵심이라는 점을 배웠습니다.',
        nextJourney: {
          title: 'Multi Cloud',
          description:
            'Azure에 한정되지 않고 AWS에서도 인프라를 직접 설계하고 싶습니다.',
        },
        liveUrl: 'https://journey-eta-two.vercel.app/#project-antiadhd',
        repositoryUrl: 'https://github.com/heolyun/AntiADHD',
        architectureUrl: 'https://github.com/heolyun/AntiADHD/blob/main/docs/architecture.md',
        screenshots: [
          { src: '/images/projects/antiadhd-report.png', alt: 'AntiADHD 실행 리포트 화면' },
          { src: '/images/projects/antiadhd-ai-plan.png', alt: 'AntiADHD AI 시작 계획 입력 화면' },
          { src: '/images/projects/antiadhd-schedule-detail.png', alt: 'AntiADHD 일정 상세 화면' },
        ],
        troubleshooting: [
          {
            problem: '새 Backend Pod가 Flyway 단계에서 CrashLoop에 진입',
            cause: '개발 DB와 운영 레거시 DB의 외래 키 제약 조건 이름이 달랐습니다.',
            solution: '직전 SHA 이미지로 롤백한 뒤 운영 스키마 기반 dry-run을 수행하고 관계 기반 제약 조건 탐색으로 수정했습니다.',
            lesson: 'DB 마이그레이션은 신규 스키마뿐 아니라 실제 운영 이력을 가진 스키마에서 검증해야 합니다.',
          },
          {
            problem: 'AI 요청 중 일반 API까지 지연될 가능성',
            cause: 'LLM 응답 시간과 실패율은 일반 CRUD 요청보다 변동 폭이 큽니다.',
            solution: 'AI 처리를 별도 Worker Deployment로 분리하고 독립적으로 상태를 관측하도록 구성했습니다.',
            lesson: '외부 AI 의존성은 핵심 요청 경로와 장애 영역을 분리해야 합니다.',
          },
        ],
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
