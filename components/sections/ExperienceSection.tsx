"use client";

import { motion } from "framer-motion";
import type { Education, Experience } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionWrapper from "@/components/ui/SectionWrapper";
import BrutalCard from "@/components/ui/BrutalCard";
import EmptyPlaceholder from "@/components/ui/EmptyPlaceholder";
import { fadeUpVariant, staggerContainerVariant } from "@/lib/motion";

// =============================================================
// ExperienceSection — Education & Experience 섹션
// =============================================================

interface ExperienceSectionProps {
  education: Education[];
  experience: Experience[];
}

export default function ExperienceSection({
  education,
  experience,
}: ExperienceSectionProps) {
  return (
    <SectionWrapper id="experience">
      <SectionHeading subtitle="Education & Experience">
        경력 & 학력
      </SectionHeading>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* ---- Education 열 ---- */}
        <div>
          <h3
            className="mb-6 text-sm font-bold uppercase tracking-widest"
            style={{ color: "var(--color-muted)" }}
          >
            Education
          </h3>

          {education.length > 0 ? (
            <motion.div
              className="flex flex-col gap-4"
              variants={staggerContainerVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {education.map((edu, idx) => (
                <motion.div key={idx} variants={fadeUpVariant}>
                  <BrutalCard>
                    <p
                      className="mb-1 text-xs font-bold uppercase tracking-wider"
                      style={{ color: "var(--color-accent)" }}
                    >
                      {edu.period}
                    </p>
                    <h4
                      className="text-lg font-black"
                      style={{ color: "var(--color-text)" }}
                    >
                      {edu.institution}
                    </h4>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--color-text)" }}
                    >
                      {edu.degree} · {edu.field}
                    </p>
                    {edu.description && (
                      <p
                        className="mt-2 text-sm leading-relaxed"
                        style={{ color: "var(--color-muted)" }}
                      >
                        {edu.description}
                      </p>
                    )}
                  </BrutalCard>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <EmptyPlaceholder
              text="data/portfolio.ts에 education 데이터를 추가하면 여기에 표시됩니다."
              animated={false}
            />
          )}
        </div>

        {/* ---- Experience 열 ---- */}
        <div>
          <h3
            className="mb-6 text-sm font-bold uppercase tracking-widest"
            style={{ color: "var(--color-muted)" }}
          >
            Experience
          </h3>

          {experience.length > 0 ? (
            <motion.div
              className="flex flex-col gap-4"
              variants={staggerContainerVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {experience.map((exp, idx) => (
                <motion.div key={idx} variants={fadeUpVariant}>
                  <BrutalCard accent>
                    <p
                      className="mb-1 text-xs font-bold uppercase tracking-wider"
                      style={{ color: "var(--color-accent)" }}
                    >
                      {exp.period}
                    </p>
                    <h4
                      className="text-lg font-black"
                      style={{ color: "var(--color-text)" }}
                    >
                      {exp.company}
                    </h4>
                    <p
                      className="mb-3 text-sm font-semibold"
                      style={{ color: "var(--color-text)" }}
                    >
                      {exp.position}
                    </p>
                    <p
                      className="mb-3 text-sm leading-relaxed"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {exp.description}
                    </p>

                    {exp.achievements.length > 0 && (
                      <ul className="flex flex-col gap-1">
                        {exp.achievements.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm"
                            style={{ color: "var(--color-text)" }}
                          >
                            <span
                              className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0"
                              style={{ background: "var(--color-accent)" }}
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
            <EmptyPlaceholder
              text="data/portfolio.ts에 experience 데이터를 추가하면 여기에 표시됩니다."
              animated={false}
            />
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
