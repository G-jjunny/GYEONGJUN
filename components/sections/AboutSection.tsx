"use client";

import { motion } from "framer-motion";
import type { Skill } from "@/data/portfolio";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SkillMarquee from "@/components/ui/SkillMarquee";
import EmptyPlaceholder from "@/components/ui/EmptyPlaceholder";
import { springBase } from "@/lib/motion";

// =============================================================
// AboutSection — 자기소개 + 기술 스택 Marquee
// =============================================================

interface AboutSectionProps {
  bio: string;
  skills: Skill[];
  avatarUrl?: string;
  name?: string;
}

export default function AboutSection({
  bio,
  skills,
  avatarUrl,
  name,
}: AboutSectionProps) {
  const displayBio = bio || "자기소개를 입력하세요.";
  const initial = name ? name.charAt(0) : "?";

  const skillTags = skills.map((s) => ({
    name: s.name,
    // highlighted: s.level >= 4,
  }));

  const mid = Math.ceil(skillTags.length / 2);
  const row1 = skillTags.slice(0, mid);
  const row2 = skillTags.slice(mid);

  return (
    <SectionWrapper id="about">
      <SectionHeading subtitle="About Me">소개</SectionHeading>

      {/* Avatar + Bio */}
      <motion.div
        className="mb-16 flex flex-col items-start gap-8 sm:flex-row sm:items-start"
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
        {/* 프로필 이미지 */}
        {/* width/height는 clamp() 동적 반응형 값이므로 인라인 유지 */}
        <div
          className="relative shrink-0 overflow-hidden border-(length:--border-width) border-solid border-(--color-accent) shadow-(--shadow-lg)"
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
            // 이미지 없을 때 이니셜 플레이스홀더
            <div
              className="flex h-full w-full items-center justify-center text-5xl font-black bg-(--color-surface) text-(--color-accent)"
            >
              {initial}
            </div>
          )}
        </div>

        {/* Bio 텍스트 */}
        <p
          className="whitespace-pre-line text-lg leading-relaxed sm:text-xl text-(--color-text)"
        >
          {displayBio}
        </p>
      </motion.div>

      {/* 기술 스택 Marquee */}
      {skillTags.length > 0 && (
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ ...springBase, delay: 0.3 }}
        >
          <h3
            className="mb-2 text-sm font-bold uppercase tracking-widest text-(--color-muted)"
          >
            Tech Stack
          </h3>
          <SkillMarquee skills={row1} duration={35} />
          {row2.length > 0 && (
            <SkillMarquee skills={row2} duration={30} reverse />
          )}
        </motion.div>
      )}

      {skillTags.length === 0 && (
        <EmptyPlaceholder text="data/portfolio.ts에 skills 데이터를 추가하면 여기에 표시됩니다." />
      )}
    </SectionWrapper>
  );
}
