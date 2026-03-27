"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/data/portfolio";
import BrutalCard from "@/components/ui/BrutalCard";
import TechStackTags from "@/components/ui/TechStackTags";
import { fadeUpVariant, springPress } from "@/lib/motion";

// =============================================================
// ProjectCard — 프로젝트 카드 컴포넌트
// ProjectsSection 그리드에서 사용
// =============================================================

interface ProjectCardProps {
  project: Project;
  onOpen: () => void;
}

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <motion.div variants={fadeUpVariant}>
      <BrutalCard
        hoverable
        className="flex h-full cursor-pointer flex-col gap-4"
        onClick={onOpen}
      >
        {/* 썸네일 / 플레이스홀더 */}
        {/* 썸네일 없을 때만 accent 배경 적용 — 조건부이므로 인라인 유지 */}
        <div
          className="relative flex h-40 items-center justify-center overflow-hidden rounded-(--radius) border-(length:--border-width) border-solid border-(--color-border)"
          style={{
            background: project.thumbnailUrl ? undefined : "var(--color-accent)",
          }}
        >
          {project.thumbnailUrl ? (
            <Image
              src={project.thumbnailUrl}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          ) : (
            <span
              className="text-2xl font-black text-(--color-bg)"
            >
              {project.title.charAt(0)}
            </span>
          )}
        </div>

        {/* 제목 + 설명 */}
        <h3
          className="text-xl font-black text-(--color-text)"
        >
          {project.title}
        </h3>
        <p
          className="line-clamp-2 text-sm leading-relaxed text-(--color-muted)"
        >
          {project.description}
        </p>

        {/* 기술 스택 태그 */}
        <div className="mt-auto">
          <TechStackTags techStack={project.techStack} compact />
        </div>

        {/* 링크 버튼 */}
        <div className="flex flex-wrap gap-2">
          {project.links.github && (
            <motion.a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-block px-3 py-1 text-xs font-bold border-(length:--border-width) border-solid border-(--color-border) text-(--color-text) shadow-(--shadow-sm)"
              whileHover={{ x: 2, y: 2 }}
              whileTap={{ x: 4, y: 4 }}
              transition={springPress}
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
              className="inline-block px-3 py-1 text-xs font-bold border-(length:--border-width) border-solid border-(--color-border) text-(--color-text) shadow-(--shadow-sm)"
              whileHover={{ x: 2, y: 2 }}
              whileTap={{ x: 4, y: 4 }}
              transition={springPress}
            >
              Demo
            </motion.a>
          )}
        </div>
      </BrutalCard>
    </motion.div>
  );
}
