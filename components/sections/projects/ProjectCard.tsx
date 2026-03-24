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
        <div
          className="relative flex h-40 items-center justify-center overflow-hidden rounded-(--radius)"
          style={{
            background: project.thumbnailUrl
              ? undefined
              : "var(--color-accent)",
            border: "var(--border-width) solid var(--color-border)",
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
              className="text-2xl font-black"
              style={{ color: "var(--color-bg)" }}
            >
              {project.title.charAt(0)}
            </span>
          )}
        </div>

        {/* 제목 + 설명 */}
        <h3
          className="text-xl font-black"
          style={{ color: "var(--color-text)" }}
        >
          {project.title}
        </h3>
        <p
          className="line-clamp-2 text-sm leading-relaxed"
          style={{ color: "var(--color-muted)" }}
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
              className="px-3 py-1 text-xs font-bold"
              style={{
                border: "var(--border-width) solid var(--color-border)",
                color: "var(--color-text)",
                boxShadow: "var(--shadow-sm)",
                display: "inline-block",
              }}
              whileHover={{ x: 2, y: 2, boxShadow: "var(--shadow-sm)" }}
              whileTap={{ x: 4, y: 4, boxShadow: "0px 0px 0px transparent" }}
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
              className="px-3 py-1 text-xs font-bold"
              style={{
                border: "var(--border-width) solid var(--color-border)",
                color: "var(--color-text)",
                boxShadow: "var(--shadow-sm)",
                display: "inline-block",
              }}
              whileHover={{ x: 2, y: 2, boxShadow: "var(--shadow-sm)" }}
              whileTap={{ x: 4, y: 4, boxShadow: "0px 0px 0px transparent" }}
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
