// =============================================================
// TechStackTags — 기술 스택 태그 표시 공통 컴포넌트
// ProjectCard (compact 모드) 및 ProjectModal에서 공통 사용
// =============================================================

import type { TechStack } from '@/data/portfolio';

interface TechStackTagsProps {
  techStack: TechStack;
  /** compact: 카드용 작은 레이블, false: 모달용 */
  compact?: boolean;
}

export default function TechStackTags({
  techStack,
  compact = false,
}: TechStackTagsProps) {
  const labelClass = compact
    ? 'mb-1 text-[10px] font-bold uppercase tracking-widest'
    : 'mb-2 text-xs font-bold uppercase tracking-widest';
  const tagClass = compact ? 'px-2 py-0.5 text-xs font-bold' : 'px-3 py-1 text-xs font-bold';
  const hasFrontend = techStack.frontend.length > 0;
  const hasBackend = techStack.backend.length > 0;

  return (
    <div className="flex flex-col gap-3">
      {hasFrontend && (
        <div>
          <p className={labelClass} style={{ color: 'var(--color-muted)' }}>
            Frontend
          </p>
          <div className="flex flex-wrap gap-1.5">
            {techStack.frontend.map((tech) => (
              <span
                key={tech}
                className={tagClass}
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
      )}
      {hasBackend && (
        <div>
          <p className={labelClass} style={{ color: 'var(--color-muted)' }}>
            Backend
          </p>
          <div className="flex flex-wrap gap-1.5">
            {techStack.backend.map((tech) => (
              <span
                key={tech}
                className={tagClass}
                style={{
                  border: 'var(--border-width) solid var(--color-border)',
                  color: 'var(--color-text)',
                  background: 'var(--color-surface)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
