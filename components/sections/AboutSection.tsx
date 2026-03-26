"use client";

import { motion } from "framer-motion";
import type { Skill } from "@/data/portfolio";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionWrapper from "@/components/ui/SectionWrapper";
import EmptyPlaceholder from "@/components/ui/EmptyPlaceholder";
import {
  springBase,
  springFast,
  fadeUpVariant,
  staggerContainerVariant,
} from "@/lib/motion";

// =============================================================
// AboutSection — 자기소개 + 기술 스택 카테고리 그리드
// =============================================================

interface AboutSectionProps {
  bio: string;
  skills: Skill[];
  avatarUrl?: string;
  name?: string;
  title?: string;
}

// 카테고리 레이블 및 스타일 매핑
const CATEGORY_CONFIG: Record<
  Skill["category"],
  { label: string; variant: "accent" | "border" | "muted" }
> = {
  frontend: { label: "Frontend", variant: "accent" },
  backend: { label: "Backend", variant: "border" },
  devops: { label: "DevOps", variant: "muted" },
  tool: { label: "Tools", variant: "muted" },
  etc: { label: "Etc", variant: "muted" },
};

// 카테고리 우선 순서
const CATEGORY_ORDER: Skill["category"][] = [
  "frontend",
  "backend",
  "devops",
  "tool",
  "etc",
];

export default function AboutSection({
  bio,
  skills,
  avatarUrl,
  name,
  title,
}: AboutSectionProps) {
  const displayBio = bio || "자기소개를 입력하세요.";
  const initial = name ? name.charAt(0) : "?";

  // 카테고리별 그룹핑
  const grouped = CATEGORY_ORDER.reduce<
    Partial<Record<Skill["category"], Skill[]>>
  >((acc, cat) => {
    const items = skills.filter((s) => s.category === cat);
    if (items.length > 0) acc[cat] = items;
    return acc;
  }, {});

  const hasSkills = skills.length > 0;

  return (
    <SectionWrapper id="about">
      <SectionHeading subtitle="About Me">소개</SectionHeading>

      {/* ─── Avatar + Bio ──────────────────────────────────────── */}
      <motion.div
        className="mb-10 flex flex-col items-start gap-8 sm:flex-row sm:items-stretch"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { ...springBase, delay: 0.2 },
          },
        }}
      >
        {/* 프로필 이미지 — clamp() 동적 반응형 값은 인라인 유지 */}
        <div
          className="relative shrink-0 overflow-hidden border-(length:--border-width) border-solid border-accent shadow-lg"
          style={{
            width: "clamp(120px, 18vw, 200px)",
            height: "clamp(120px, 18vw, 200px)",
          }}
        >
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={name ?? "프로필 이미지"}
              fill
              className="object-cover"
              sizes="200px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-5xl font-black bg-(--color-surface) text-(--color-accent)">
              {initial}
            </div>
          )}
        </div>

        {/* Bio 카드 */}
        <div className="relative flex-1 border-2 border-solid border-border bg-card p-6 shadow-md sm:p-8">
          {/* 큰따옴표 데코 */}
          <span
            className="pointer-events-none absolute select-none font-black leading-none text-accent"
            style={{
              top: "0.1em",
              right: "0.3em",
              fontSize: "clamp(4rem, 8vw, 6rem)",
              opacity: 0.12,
            }}
            aria-hidden="true"
          >
            &quot;
          </span>

          {/* 이름 / 직함 라벨 */}
          {(name || title) && (
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {name && (
                <span className="border-2 border-solid border-accent bg-surface px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-widest text-accent">
                  {name}
                </span>
              )}
              {title && (
                <span className="border-2 border-solid border-border bg-surface px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                  {title}
                </span>
              )}
            </div>
          )}

          {/* Bio 본문 */}
          <p className="relative whitespace-pre-line font-mono text-base leading-relaxed text-foreground sm:text-sm">
            {displayBio}
          </p>

          {/* 하단 구분선 데코 */}
          <div className="mt-6 flex items-center gap-3">
            <div className="h-0.5 w-8 bg-accent" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              Frontend Developer
            </span>
          </div>
        </div>
      </motion.div>

      {/* ─── Tech Stack 카테고리 그리드 ────────────────────────── */}
      {hasSkills ? (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainerVariant}
        >
          {/* 섹션 헤더 */}
          <motion.h3
            variants={fadeUpVariant}
            className="mb-8 font-bold uppercase tracking-widest text-muted text-sm"
          >
            Tech Stack
          </motion.h3>

          {/* 카테고리 그룹 목록 */}
          <div className="flex flex-col gap-8">
            {CATEGORY_ORDER.map((cat) => {
              const items = grouped[cat];
              if (!items) return null;
              const config = CATEGORY_CONFIG[cat];

              return (
                <motion.div key={cat} variants={fadeUpVariant}>
                  {/* 카테고리 레이블 */}
                  <div className="mb-3 flex items-center gap-3">
                    <span
                      className="border-2 border-solid px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-widest"
                      style={
                        config.variant === "accent"
                          ? {
                              borderColor: "var(--color-accent)",
                              color: "var(--color-accent)",
                              background: "var(--color-surface)",
                              boxShadow: "2px 2px 0 var(--color-accent)",
                            }
                          : config.variant === "border"
                            ? {
                                borderColor: "var(--color-border)",
                                color: "var(--color-text)",
                                background: "var(--color-surface)",
                                boxShadow: "2px 2px 0 var(--color-border)",
                              }
                            : {
                                borderColor: "var(--color-muted)",
                                color: "var(--color-muted)",
                                background: "var(--color-surface)",
                              }
                      }
                    >
                      {config.label}
                    </span>
                    {/* 구분선 */}
                    <div
                      className="h-px flex-1"
                      style={{
                        background:
                          config.variant === "accent"
                            ? "var(--color-accent)"
                            : config.variant === "border"
                              ? "var(--color-border)"
                              : "var(--color-muted)",
                        opacity: config.variant === "muted" ? 0.3 : 0.4,
                      }}
                    />
                  </div>

                  {/* 태그 목록 */}
                  <motion.ul
                    className="flex flex-wrap gap-2"
                    variants={staggerContainerVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                  >
                    {items.map((skill) => (
                      <SkillTag
                        key={skill.name}
                        skill={skill}
                        variant={config.variant}
                      />
                    ))}
                  </motion.ul>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ) : (
        <EmptyPlaceholder text="data/portfolio.ts에 skills 데이터를 추가하면 여기에 표시됩니다." />
      )}
    </SectionWrapper>
  );
}

// =============================================================
// SkillTag — 개별 기술 태그 (Physical Press 인터랙션)
// =============================================================

interface SkillTagProps {
  skill: Skill;
  variant: "accent" | "border" | "muted";
}

function SkillTag({ skill, variant }: SkillTagProps) {
  const baseStyle: React.CSSProperties =
    variant === "accent"
      ? {
          borderColor: "var(--color-accent)",
          color: "var(--color-accent)",
          background: "var(--color-card)",
          boxShadow: "3px 3px 0 var(--color-accent)",
        }
      : variant === "border"
        ? {
            borderColor: "var(--color-border)",
            color: "var(--color-text)",
            background: "var(--color-card)",
            boxShadow: "3px 3px 0 var(--color-border)",
          }
        : {
            borderColor: "var(--color-muted)",
            color: "var(--color-muted)",
            background: "var(--color-card)",
            boxShadow: "2px 2px 0 var(--color-muted)",
          };

  return (
    <motion.li
      variants={fadeUpVariant}
      whileHover={{
        x: -2,
        y: -2,
        boxShadow:
          variant === "accent"
            ? "5px 5px 0 var(--color-accent)"
            : variant === "border"
              ? "5px 5px 0 var(--color-border)"
              : "4px 4px 0 var(--color-muted)",
      }}
      whileTap={{
        x: 1,
        y: 1,
        boxShadow: "0px 0px 0px transparent",
      }}
      transition={{ ...springFast }}
      className="list-none border-2 border-solid px-3 py-1.5 font-mono text-sm font-bold uppercase tracking-wide cursor-default"
      style={baseStyle}
    >
      {skill.name}
    </motion.li>
  );
}
