'use client';

import { motion } from 'framer-motion';
import type { Education, Experience } from '@/data/portfolio';
import SectionHeading from '@/components/ui/SectionHeading';
import BrutalCard from '@/components/ui/BrutalCard';

// =============================================================
// ExperienceSection — Education & Experience 섹션
// 좌측 Education, 우측 Experience (2열, 모바일 1열)
// whileInView Pop-up 패턴 적용
// =============================================================

interface ExperienceSectionProps {
  education: Education[];
  experience: Experience[];
}

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

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

/** 빈 데이터 플레이스홀더 */
function EmptyPlaceholder({ text }: { text: string }) {
  return (
    <div
      className="flex items-center justify-center rounded-[var(--radius)] px-6 py-12"
      style={{
        border: 'var(--border-width) dashed var(--color-border)',
        color: 'var(--color-muted)',
      }}
    >
      <p className="text-center text-sm">{text}</p>
    </div>
  );
}

export default function ExperienceSection({
  education,
  experience,
}: ExperienceSectionProps) {
  return (
    <section
      id="experience"
      className="relative px-6 py-24"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading subtitle="Education & Experience">
          경력 & 학력
        </SectionHeading>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* ---- Education 열 ---- */}
          <div>
            <h3
              className="mb-6 text-sm font-bold uppercase tracking-widest"
              style={{ color: 'var(--color-muted)' }}
            >
              Education
            </h3>

            {education.length > 0 ? (
              <motion.div
                className="flex flex-col gap-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
              >
                {education.map((edu, idx) => (
                  <motion.div key={idx} variants={cardVariants}>
                    <BrutalCard>
                      <p
                        className="mb-1 text-xs font-bold uppercase tracking-wider"
                        style={{ color: 'var(--color-accent)' }}
                      >
                        {edu.period}
                      </p>
                      <h4
                        className="text-lg font-black"
                        style={{ color: 'var(--color-text)' }}
                      >
                        {edu.institution}
                      </h4>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: 'var(--color-text)' }}
                      >
                        {edu.degree} · {edu.field}
                      </p>
                      {edu.description && (
                        <p
                          className="mt-2 text-sm leading-relaxed"
                          style={{ color: 'var(--color-muted)' }}
                        >
                          {edu.description}
                        </p>
                      )}
                    </BrutalCard>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <EmptyPlaceholder text="data/portfolio.ts에 education 데이터를 추가하면 여기에 표시됩니다." />
            )}
          </div>

          {/* ---- Experience 열 ---- */}
          <div>
            <h3
              className="mb-6 text-sm font-bold uppercase tracking-widest"
              style={{ color: 'var(--color-muted)' }}
            >
              Experience
            </h3>

            {experience.length > 0 ? (
              <motion.div
                className="flex flex-col gap-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
              >
                {experience.map((exp, idx) => (
                  <motion.div key={idx} variants={cardVariants}>
                    <BrutalCard accent>
                      <p
                        className="mb-1 text-xs font-bold uppercase tracking-wider"
                        style={{ color: 'var(--color-accent)' }}
                      >
                        {exp.period}
                      </p>
                      <h4
                        className="text-lg font-black"
                        style={{ color: 'var(--color-text)' }}
                      >
                        {exp.company}
                      </h4>
                      <p
                        className="mb-3 text-sm font-semibold"
                        style={{ color: 'var(--color-text)' }}
                      >
                        {exp.position}
                      </p>
                      <p
                        className="mb-3 text-sm leading-relaxed"
                        style={{ color: 'var(--color-muted)' }}
                      >
                        {exp.description}
                      </p>

                      {/* 성과 리스트 */}
                      {exp.achievements.length > 0 && (
                        <ul className="flex flex-col gap-1">
                          {exp.achievements.map((item, i) => (
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
                      )}
                    </BrutalCard>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <EmptyPlaceholder text="data/portfolio.ts에 experience 데이터를 추가하면 여기에 표시됩니다." />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
