"use client";

import { motion } from "framer-motion";
import type { Skill } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SkillMarquee from "@/components/ui/SkillMarquee";
import { springBase } from "@/lib/motion";

// =============================================================
// AboutSection — 자기소개 + 기술 스택 Marquee
// =============================================================

interface AboutSectionProps {
  bio: string;
  skills: Skill[];
}

export default function AboutSection({ bio, skills }: AboutSectionProps) {
  const displayBio = bio || "자기소개를 입력하세요.";

  const skillTags = skills.map((s) => ({
    name: s.name,
    highlighted: s.level >= 4,
  }));

  const mid = Math.ceil(skillTags.length / 2);
  const row1 = skillTags.slice(0, mid);
  const row2 = skillTags.slice(mid);

  return (
    <SectionWrapper id="about">
      <SectionHeading subtitle="About Me">소개</SectionHeading>

      {/* Bio 텍스트 */}
      <motion.div
        className="mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { ...springBase, delay: 0.2 } },
        }}
      >
        <p
          className="whitespace-pre-line text-lg leading-relaxed sm:text-xl"
          style={{ color: "var(--color-text)" }}
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
            className="mb-2 text-sm font-bold uppercase tracking-widest"
            style={{ color: "var(--color-muted)" }}
          >
            Tech Stack
          </h3>
          <SkillMarquee skills={row1} duration={35} />
          {row2.length > 0 && <SkillMarquee skills={row2} duration={30} reverse />}
        </motion.div>
      )}

      {skillTags.length === 0 && (
        <motion.div
          className="flex items-center justify-center rounded-[var(--radius)] px-6 py-12"
          style={{
            border: "var(--border-width) dashed var(--color-border)",
            color: "var(--color-muted)",
          }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springBase}
        >
          <p className="text-center text-sm">
            data/portfolio.ts에 skills 데이터를 추가하면 여기에 표시됩니다.
          </p>
        </motion.div>
      )}
    </SectionWrapper>
  );
}
