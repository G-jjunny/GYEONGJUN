'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Project } from '@/data/portfolio';
import BrutalButton from '@/components/ui/BrutalButton';
import TechStackTags from '@/components/ui/TechStackTags';
import { springBase } from '@/lib/motion';

// =============================================================
// ProjectModal — 프로젝트 상세 모달
// ProjectsSection에서 AnimatePresence와 함께 사용
// =============================================================

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* 오버레이 배경 */}
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
        initial={{ opacity: 0, y: 60, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1, transition: { ...springBase, stiffness: 400, damping: 30 } }}
        exit={{ opacity: 0, y: 40, scale: 0.95, transition: { duration: 0.2 } }}
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

        <h2 className="mb-2 text-3xl font-black" style={{ color: 'var(--color-text)' }}>
          {project.title}
        </h2>

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

        <p className="mb-6 whitespace-pre-line text-base leading-relaxed" style={{ color: 'var(--color-text)' }}>
          {project.longDescription}
        </p>

        {project.images.length > 0 && (
          <div className="mb-6 flex flex-col gap-3">
            {project.images.map((img, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden"
                style={{
                  border: 'var(--border-width) solid var(--color-border)',
                  borderRadius: 'var(--radius)',
                  aspectRatio: '16 / 9',
                }}
              >
                <Image
                  src={img}
                  alt={`${project.title} 스크린샷 ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {project.highlights.length > 0 && (
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--color-muted)' }}>
              Highlights
            </h3>
            <ul className="flex flex-col gap-2">
              {project.highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text)' }}>
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

        <div className="mb-6">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--color-muted)' }}>
            Tech Stack
          </h3>
          <TechStackTags techStack={project.techStack} />
        </div>

        <div className="flex flex-wrap gap-3">
          {project.links.github && (
            <BrutalButton
              variant="secondary"
              onClick={() => window.open(project.links.github!, '_blank', 'noopener')}
            >
              GitHub
            </BrutalButton>
          )}
          {project.links.demo && (
            <BrutalButton
              variant="primary"
              onClick={() => window.open(project.links.demo!, '_blank', 'noopener')}
            >
              Live Demo
            </BrutalButton>
          )}
          {project.links.blog && (
            <BrutalButton
              variant="ghost"
              onClick={() => window.open(project.links.blog!, '_blank', 'noopener')}
            >
              Blog
            </BrutalButton>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
