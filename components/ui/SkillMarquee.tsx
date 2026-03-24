'use client';

// =============================================================
// SkillMarquee — 기술 스택 태그 무한 스크롤 컴포넌트
// CSS @keyframes 기반 좌→우 무한 스크롤 (globals.css에 정의)
// 각 태그: 네오 브루탈리즘 스타일 (2px border, accent 옵션)
// =============================================================

interface SkillTag {
  name: string;
  /** true이면 accent 배경으로 강조 */
  highlighted?: boolean;
}

interface SkillMarqueeProps {
  skills: SkillTag[];
  /** 스크롤 속도 (초 단위, 기본 30) */
  duration?: number;
  /** 역방향 스크롤 */
  reverse?: boolean;
  className?: string;
}

function TagItem({ name, highlighted = false }: SkillTag) {
  return (
    <span
      className={[
        'inline-flex items-center shrink-0',
        'px-4 py-2 mx-2 font-bold text-sm',
        'rounded-(--radius)',
        'border-(length:--border-width) border-solid',
        highlighted
          ? 'border-accent bg-accent text-(--color-bg)'
          : 'border-(--color-border) bg-(--color-surface) text-(--color-text)',
      ].join(' ')}
    >
      {name}
    </span>
  );
}

export default function SkillMarquee({
  skills,
  duration = 30,
  reverse = false,
  className = '',
}: SkillMarqueeProps) {
  // 스킬을 2번 반복하여 끊김 없는 무한 스크롤 연출
  const duplicated = [...skills, ...skills];

  return (
    <div
      className={`overflow-hidden whitespace-nowrap ${className}`}
      aria-label="기술 스택 목록"
    >
      <div
        className={reverse ? 'animate-marquee-reverse' : 'animate-marquee'}
        style={{ animationDuration: `${duration}s`, display: 'inline-flex' }}
      >
        {duplicated.map((skill, i) => (
          <TagItem
            key={`${skill.name}-${i}`}
            name={skill.name}
            highlighted={skill.highlighted}
          />
        ))}
      </div>
    </div>
  );
}
