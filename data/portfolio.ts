// =============================================================
// Portfolio Data — 빈 스키마
// 실제 데이터는 이 파일에 직접 입력합니다.
// 모든 컴포넌트는 이 파일에서만 데이터를 import합니다.
// =============================================================

// --------------- 타입 정의 ---------------

export interface PersonalInfo {
  name: string;
  nameEn: string;
  title: string;
  subtitle: string;
  bio: string;
  avatarUrl: string;
  resumeUrl: string;
}

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "devops" | "tool" | "etc";
  /** 숙련도 (1~5) */
  level?: number;
  iconUrl?: string;
}

export interface TechStack {
  frontend: string[];
  backend?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  thumbnailUrl: string;
  images: string[];
  techStack: TechStack;
  role: string;
  period: string;
  teamSize: number;
  links: {
    github?: string;
    demo?: string;
    blog?: string;
  };
  highlights: string[];
}

export interface Education {
  institution: string;
  degree: string;
  minor?: string;
  field: string;
  period: string;
  description?: string;
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface ContactInfo {
  email: string;
  github: string;
  linkedin?: string;
  blog?: string;
  phone?: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  skills: Skill[];
  projects: Project[];
  education: Education[];
  experience: Experience[];
  contact: ContactInfo;
}

// --------------- 데이터 (직접 입력) ---------------

export const portfolioData: PortfolioData = {
  personal: {
    name: "정경준",
    nameEn: "Jeong Gyeong-jun",
    title: "Frontend Developer",
    subtitle:
      "기술의 가치를 공유하고, AI로 효율을 더하는 프론트엔드 개발자 정경준입니다.",
    bio: "저는 6개월간 넥스트러너스에서 프론트엔드 코스 조교로 활동하며, React와 Next.js의 핵심 개념을 문서화하고 15여 명의 수강생과 기술적 접점을 만들어왔습니다. 코드 리뷰와 과제 해설을 통해 '동료가 이해하기 쉬운 코드'와 '유지보수가 용이한 구조'에 대해 깊게 고민했으며, 이는 기술적 소통을 통해 팀 전체의 성장을 이끄는 밑거름이 되었습니다.최근에는 AI 도구(Claude code)를 적극 활용하여 개발 생산성을 극대화하는 데 집중하고 있습니다. 반복적인 UI 컴포넌트 구조 설계나 단위 테스트 코드 작성에 AI를 전략적으로 도입하여, 로직의 안정성을 확보하고 비즈니스 로직 설계에 더 많은 시간을 투자하는 효율적인 워크플로우를 지향합니다.",
    avatarUrl: "/images/avatar.jpg",
    resumeUrl:
      "https://www.rallit.com/resumes/1524361@rudwns9551/%EC%A0%95%EA%B2%BD%EC%A4%80?theme=MINT_SORBET",
  },

  skills: [
    // frontend skills
    {
      name: "React",
      category: "frontend",
      level: 5,
    },
    {
      name: "Next.JS",
      category: "frontend",
      level: 5,
    },
    {
      name: "TypeScript",
      category: "frontend",
      level: 5,
    },
    {
      name: "TanStack Query",
      category: "frontend",
      level: 5,
    },
    {
      name: "Zustand",
      category: "frontend",
      level: 5,
    },
    {
      name: "Redux",
      category: "frontend",
      level: 5,
    },
    {
      name: "Tailwind CSS",
      category: "frontend",
      level: 5,
    },

    // backend skills
    {
      name: "Node.js",
      category: "backend",
      level: 5,
    },
    {
      name: "Express",
      category: "backend",
      level: 5,
    },
    {
      name: "PostgreSQL",
      category: "backend",
      level: 5,
    },

    // devops skills
    {
      name: "Docker",
      category: "devops",
      level: 4,
    },
    {
      name: "Git",
      category: "devops",
      level: 4,
    },
    {
      name: "Vercel",
      category: "devops",
      level: 4,
    },
    {
      name: "Netlify",
      category: "devops",
      level: 4,
    },
    {
      name: "Render",
      category: "devops",
      level: 4,
    },

    // tools
    {
      name: "Claude code",
      category: "tool",
      level: 5,
    },
    {
      name: "Figma",
      category: "tool",
      level: 5,
    },
    {
      name: "Postman",
      category: "tool",
      level: 5,
    },
  ],

  projects: [
    // 프로젝트 1 메가박스
    {
      id: "project-1",
      title: "MEGABOX 안산 직원관리 시스템",
      description:
        "MEGABOX 안산지점 직원의 스케줄 관리, 급여 계산, 실시간 출퇴근 추적, 커뮤니티 기능을 하나의 플랫폼에서 제공하는 풀스택 웹 서비스입니다.",
      longDescription:
        "MEGABOX 안산지점 직원의 스케줄 관리, 급여 계산, 실시간 출퇴근 추적, 커뮤니티 기능을 하나의 플랫폼에서 제공하는 풀스택 웹 서비스입니다.",
      thumbnailUrl: "/images/projects/thumbnail/megaboxThumbnail.png",
      images: [
        "/images/projects/projectImages/megabox/login.png",
        "/images/projects/projectImages/megabox/admin-dashboard.png",
      ],
      techStack: {
        frontend: [
          "React",
          "TypeScript",
          "Vite",
          "Tailwind CSS",
          "Zustand",
          "TanStack Query",
        ],
        backend: ["Python", "FastAPI", "MYSQL", "Redis", "Docker"],
      },
      role: "프론트엔드 개발 총괄, 프로젝트 디자인",
      period: "2025.11 - 2026.03",
      teamSize: 5,
      links: {
        github: "https://github.com/hanyul0417/megabox",
      },
      highlights: [
        "직원 스케줄 관리 기능 구현",
        "권한 기반 접근 제어 시스템 설계 및 구현",
        "실시간 출퇴근 기록 시스템 구축",
        "커뮤니티 게시판 및 공지사항 기능 개발",
      ],
    },

    // 프로젝트 2 삼성서울병원 DLTBBtrial
    {
      id: "project-2",
      title: "DLTBBtrial",
      description:
        "삼성 서울 병원 및 해외 다기관 대상 연구에 사용될 환자의 선행항암치료 (Neoadjuvant treatment) 여부에 따른 환자군 그룹 배정 및 데이터 등록, 수집 플랫폼으로 개발한 풀스택 프로젝트입니다.",
      longDescription:
        "삼성 서울 병원 및 해외 다기관 대상 연구에 사용될 환자의 선행항암치료 (Neoadjuvant treatment) 여부에 따른 환자군 그룹 배정 및 데이터 등록, 수집 플랫폼으로 개발한 풀스택 프로젝트입니다.",
      thumbnailUrl: "/images/projects/thumbnail/DLTBBtrialThumbnail.png",
      images: [
        "/images/projects/projectImages/dltbb/DLTBBtrial-login.png",
        "/images/projects/projectImages/dltbb/DLTBBtrial-data.png",
        "/images/projects/projectImages/dltbb/DLTBBtrial-form.png",
      ],
      techStack: {
        frontend: [
          "React",
          "TypeScript",
          "Vite",
          "Tailwind CSS",
          "Zustand",
          "TanStack Query",
        ],
        backend: ["Node.js", "Express", "Prisma", "PostgreSQL", "Docker"],
      },
      role: "풀스택 개발",
      period: "2025.04 - 2025.05",
      teamSize: 1,
      links: {
        github: "https://github.com/G-jjunny/Questionnaire",
      },
      highlights: [],
    },
    // 프로젝트 3 우드원 WoodOne
    {
      id: "project-3",
      title: "우드원",
      description:
        "우드원은 원목마루 전문 기업으로, 고객사 요청에 따라 브랜드 이미지를 반영한 맞춤형 기업 홈페이지를 개발한 개인 프로젝트입니다.",
      longDescription:
        "우드원은 원목마루 전문 기업으로, 고객사 요청에 따라 브랜드 이미지를 반영한 맞춤형 기업 홈페이지를 개발한 개인 프로젝트입니다.",
      thumbnailUrl: "/images/projects/thumbnail/WOODONE.png",
      images: [
        "/images/projects/projectImages/woodone/WOODONE.png",
        "/images/projects/projectImages/woodone/WOODONE-collection.png",
      ],
      techStack: {
        frontend: ["React", "JavaScript", "Styled-Components"],
      },
      role: "프론트엔드 개발",
      period: "2024.06 - 2024.09",
      teamSize: 1,
      links: {
        github: "https://github.com/G-jjunny/WoodOne_Project",
      },
      highlights: [],
    },
  ],

  education: [
    {
      institution: "엘리스",
      degree: "프론트엔드&백엔드 웹 개발자 SW엔지니어 트랙",
      field: "수료",
      period: "2024.04 - 2024.08",
    },
    {
      institution: "세명대학교",
      degree: "컴퓨터학부",
      minor: "빅데이터의료융합학",
      field: "컴퓨터시스템학 & 소프트웨어학",
      period: "2017.03 - 2023.02",
    },
  ],

  experience: [
    {
      company: "넥스트러너스",
      position: "프론트엔드 코스 조교",
      period: "2025.08 - 2026.02",
      description:
        "넥스트러너스 프론트엔드 코스에서 React와 Next.js의 핵심 개념을 문서화하고, 15여 명의 수강생과 기술적 접점을 만들어왔습니다. 코드 리뷰와 과제 해설을 통해 '동료가 이해하기 쉬운 코드'와 '유지보수가 용이한 구조'에 대해 깊게 고민했으며, 이는 기술적 소통을 통해 팀 전체의 성장을 이끄는 밑거름이 되었습니다.",
      achievements: [
        "React와 Next.js의 핵심 개념을 체계적으로 문서화하여 수강생들의 학습 효율성 향상에 기여",
        "코드 리뷰와 과제 해설을 통해 수강생들의 코드 품질 향상과 기술적 성장 지원",
        "수강생들과의 적극적인 소통으로 학습 동기 부여 및 커뮤니티 활성화에 기여",
      ],
    },
  ],

  contact: {
    email: "rudwns9551@naver.com",
    github: "https://github.com/G-jjunny",
    phone: "010-3185-9026",
  },
};
