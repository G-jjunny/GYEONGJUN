'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/data/portfolio';
import { useModalStore } from '@/store/modalStore';
import SectionHeading from '@/components/ui/SectionHeading';
import BrutalCard from '@/components/ui/BrutalCard';
import BrutalButton from '@/components/ui/BrutalButton';

// =============================================================
// ProjectsSection — 프로젝트 카드 그리드 + 상세 모달
// 카드 클릭 시 모달 오픈 (modalStore 기반)
// ESC키 + 외부 클릭으로 모달 닫기
// =============================================================

interface ProjectsSectionProps {
  projects: Project[];
}

// --------------- 애니메이션 Variants ---------------

const gridContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 24,
    },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    y: 40,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

// --------------- 프로젝트 카드 ---------------

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  return (
    <motion.div variants={cardVariants}>
      <BrutalCard
        hoverable
        className="flex h-full cursor-pointer flex-col gap-4"
        onClick={onOpen}
      >
        {/* 썸네일 / 플레이스홀더 */}
        <div
          className="flex h-40 items-center justify-center overflow-hidden rounded-[var(--radius)]"
          style={{
            background: project.thumbnailUrl
              ? undefined
              : 'var(--color-accent)',
            border: 'var(--border-width) solid var(--color-border)',
          }}
        >
          {project.thumbnailUrl ? (
            <img
              src={project.thumbnailUrl}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <span
              className="text-2xl font-black"
              style={{ color: 'var(--color-bg)' }}
            >
              {project.title.charAt(0)}
            </span>
          )}
        </div>

        {/* 제목 + 설명 */}
        <h3
          className="text-xl font-black"
          style={{ color: 'var(--color-text)' }}
        >
          {project.title}
        </h3>
        <p
          className="line-clamp-2 text-sm leading-relaxed"
          style={{ color: 'var(--color-muted)' }}
        >
          {project.description}
        </p>

        {/* 기술 스택 태그 */}
        <div className="mt-auto flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-bold"
              style={{
                border: 'var(--border-width) solid var(--color-accent)',
                color: 'var(--color-accent)',
                background: 'var(--color-surface)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* 링크 버튼 */}
        <div className="flex flex-wrap gap-2">
          {project.links.github && (
            <motion.a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-3 py-1 text-xs font-bold"
              style={{
                border: 'var(--border-width) solid var(--color-border)',
                color: 'var(--color-text)',
                boxShadow: 'var(--shadow-sm)',
                display: 'inline-block',
              }}
              whileHover={{ x: 2, y: 2, boxShadow: 'var(--shadow-sm)' }}
              whileTap={{ x: 4, y: 4, boxShadow: '0px 0px 0px transparent' }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              GitHub
            </motion.a>
          )}
          {project.links.demo && (
            <motion.a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-3 py-1 text-xs font-bold"
              style={{
                border: 'var(--border-width) solid var(--color-border)',
                color: 'var(--color-text)',
                boxShadow: 'var(--shadow-sm)',
                display: 'inline-block',
              }}
              whileHover={{ x: 2, y: 2, boxShadow: 'var(--shadow-sm)' }}
              whileTap={{ x: 4, y: 4, boxShadow: '0px 0px 0px transparent' }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              Demo
            </motion.a>
          )}
        </div>
      </BrutalCard>
    </motion.div>
  );
}

// --------------- 프로젝트 상세 모달 ---------------

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  // ESC키로 모달 닫기
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    // 모달 열릴 때 body 스크롤 방지
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* 오버레이 배경 — 클릭 시 닫기 */}
      <motion.div
        className="absolute inset-0"
        style={{ background: 'rgba(0, 0, 0, 0.8)' }}
        onClick={onClose}
      />

      {/* 모달 컨테이너 */}
      <motion.div
        className="relative z-10 max-h-[85vh] w-full max-w-3xl overflow-y-auto p-8"
        style={{
          background: 'var(--color-card)',
          border: 'var(--border-width) solid var(--color-border)',
          boxShadow: 'var(--shadow-lg)',
          borderRadius: 'var(--radius)',
        }}
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 cursor-pointer items-center justify-center text-xl font-black"
          style={{
            border: 'var(--border-width) solid var(--color-border)',
            color: 'var(--color-text)',
            background: 'var(--color-surface)',
          }}
          aria-label="모달 닫기"
        >
          X
        </button>

        {/* 프로젝트 제목 */}
        <h2
          className="mb-2 text-3xl font-black"
          style={{ color: 'var(--color-text)' }}
        >
          {project.title}
        </h2>

        {/* 메타 정보 */}
        <div className="mb-6 flex flex-wrap gap-4 text-sm">
          <span style={{ color: 'var(--color-accent)' }}>
            <strong>역할:</strong> {project.role}
          </span>
          <span style={{ color: 'var(--color-muted)' }}>
            <strong>기간:</strong> {project.period}
          </span>
          <span style={{ color: 'var(--color-muted)' }}>
            <strong>팀 규모:</strong> {project.teamSize}명
          </span>
        </div>

        {/* 상세 설명 */}
        <p
          className="mb-6 whitespace-pre-line text-base leading-relaxed"
          style={{ color: 'var(--color-text)' }}
        >
          {project.longDescription}
        </p>

        {/* 이미지 갤러리 */}
        {project.images.length > 0 && (
          <div className="mb-6 flex flex-col gap-3">
            {project.images.map((img, idx) => (
              <div
                key={idx}
                className="overflow-hidden"
                style={{
                  border: 'var(--border-width) solid var(--color-border)',
                  borderRadius: 'var(--radius)',
                }}
              >
                <img
                  src={img}
                  alt={`${project.title} 스크린샷 ${idx + 1}`}
                  className="w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* 주요 성과 */}
        {project.highlights.length > 0 && (
          <div className="mb-6">
            <h3
              className="mb-3 text-sm font-bold uppercase tracking-widest"
              style={{ color: 'var(--color-muted)' }}
            >
              Highlights
            </h3>
            <ul className="flex flex-col gap-2">
              {project.highlights.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm"
                  style={{ color: 'var(--color-text)' }}
                >
                  <span
                    className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0"
                    style={{ background: 'var(--color-accent)' }}
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 기술 스택 */}
        <div className="mb-6">
          <h3
            className="mb-3 text-sm font-bold uppercase tracking-widest"
            style={{ color: 'var(--color-muted)' }}
          >
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-bold"
                style={{
                  border: 'var(--border-width) solid var(--color-accent)',
                  color: 'var(--color-accent)',
                  background: 'var(--color-surface)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* 외부 링크 */}
        <div className="flex flex-wrap gap-3">
          {project.links.github && (
            <BrutalButton
              variant="secondary"
              onClick={() =>
                window.open(project.links.github, '_blank', 'noopener')
              }
            >
              GitHub
            </BrutalButton>
          )}
          {project.links.demo && (
            <BrutalButton
              variant="primary"
              onClick={() =>
                window.open(project.links.demo, '_blank', 'noopener')
              }
            >
              Live Demo
            </BrutalButton>
          )}
          {project.links.blog && (
            <BrutalButton
              variant="ghost"
              onClick={() =>
                window.open(project.links.blog, '_blank', 'noopener')
              }
            >
              Blog
            </BrutalButton>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// --------------- 메인 섹션 ---------------

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const { activeProjectId, openModal, closeModal } = useModalStore();
  const activeProject = projects.find((p) => p.id === activeProjectId) ?? null;

  return (
    <section
      id="projects"
      className="relative px-6 py-24"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading subtitle="Projects">프로젝트</SectionHeading>

        {projects.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={gridContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={() => openModal(project.id)}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="flex items-center justify-center rounded-[var(--radius)] px-6 py-16"
            style={{
              border: 'var(--border-width) dashed var(--color-border)',
              color: 'var(--color-muted)',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          >
            <p className="text-center text-sm">
              프로젝트를 준비 중입니다. data/portfolio.ts에 projects 데이터를
              추가하면 여기에 표시됩니다.
            </p>
          </motion.div>
        )}
      </div>

      {/* 모달 */}
      <AnimatePresence>
        {activeProject && (
          <ProjectModal project={activeProject} onClose={closeModal} />
        )}
      </AnimatePresence>
    </section>
  );
}
