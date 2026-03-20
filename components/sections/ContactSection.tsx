'use client';

import { motion } from 'framer-motion';
import type { ContactInfo, PersonalInfo } from '@/data/portfolio';
import SectionHeading from '@/components/ui/SectionHeading';
import BrutalCard from '@/components/ui/BrutalCard';

// =============================================================
// ContactSection — Contact + Outro 섹션
// 연락처 카드 그리드 + 하단 Outro 문구
// whileInView Pop-up 패턴, Physical Press 링크 카드
// =============================================================

interface ContactSectionProps {
  contact: ContactInfo;
  personal: Pick<PersonalInfo, 'name' | 'nameEn'>;
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
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

// --------------- 인라인 SVG 아이콘 ---------------

function EmailIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 4L12 13L2 4" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function BlogIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

// --------------- 연락처 항목 타입 ---------------

interface ContactItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

/** 연락처 데이터에서 표시할 항목 목록 생성 */
function buildContactItems(contact: ContactInfo): ContactItem[] {
  const items: ContactItem[] = [];

  if (contact.email) {
    items.push({
      key: 'email',
      icon: <EmailIcon />,
      label: 'Email',
      value: contact.email,
      href: `mailto:${contact.email}`,
    });
  }

  if (contact.github) {
    items.push({
      key: 'github',
      icon: <GithubIcon />,
      label: 'GitHub',
      value: contact.github,
      href: contact.github.startsWith('http')
        ? contact.github
        : `https://github.com/${contact.github}`,
    });
  }

  if (contact.linkedin) {
    items.push({
      key: 'linkedin',
      icon: <LinkedinIcon />,
      label: 'LinkedIn',
      value: contact.linkedin,
      href: contact.linkedin.startsWith('http')
        ? contact.linkedin
        : `https://linkedin.com/in/${contact.linkedin}`,
    });
  }

  if (contact.blog) {
    items.push({
      key: 'blog',
      icon: <BlogIcon />,
      label: 'Blog',
      value: contact.blog,
      href: contact.blog.startsWith('http')
        ? contact.blog
        : `https://${contact.blog}`,
    });
  }

  if (contact.phone) {
    items.push({
      key: 'phone',
      icon: <PhoneIcon />,
      label: 'Phone',
      value: contact.phone,
      // phone은 링크 없음 (표시만)
    });
  }

  return items;
}

/** Physical Press 스프링 전환 설정 */
const pressSpring = {
  type: 'spring' as const,
  stiffness: 600,
  damping: 35,
};

export default function ContactSection({
  contact,
  personal,
}: ContactSectionProps) {
  const items = buildContactItems(contact);
  const hasAnyData = items.length > 0;

  const displayName = personal.name || personal.nameEn || '이름';

  return (
    <section
      id="contact"
      className="relative px-6 py-24"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="mx-auto max-w-4xl">
        <SectionHeading subtitle="Get in Touch">연락하기</SectionHeading>

        {/* ---- 연락처 카드 그리드 ---- */}
        {hasAnyData ? (
          <motion.div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {items.map((item) => (
              <motion.div key={item.key} variants={cardVariants}>
                {item.href ? (
                  // 링크 가능한 항목: motion.a + Physical Press 패턴
                  <motion.a
                    href={item.href}
                    target={item.key === 'email' ? undefined : '_blank'}
                    rel={item.key === 'email' ? undefined : 'noopener noreferrer'}
                    className="block no-underline"
                    whileHover={{
                      x: -2,
                      y: -2,
                      transition: pressSpring,
                    }}
                    whileTap={{
                      x: 2,
                      y: 2,
                      transition: pressSpring,
                    }}
                  >
                    <BrutalCard hoverable className="cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius)]"
                          style={{
                            background: 'var(--color-card)',
                            color: 'var(--color-accent)',
                            border: 'var(--border-width) solid var(--color-accent)',
                          }}
                        >
                          {item.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p
                            className="text-xs font-bold uppercase tracking-wider"
                            style={{ color: 'var(--color-muted)' }}
                          >
                            {item.label}
                          </p>
                          <p
                            className="truncate text-sm font-semibold"
                            style={{ color: 'var(--color-text)' }}
                          >
                            {item.value}
                          </p>
                        </div>
                      </div>
                    </BrutalCard>
                  </motion.a>
                ) : (
                  // 링크 불가 항목 (phone 등): div로 렌더
                  <BrutalCard>
                    <div className="flex items-center gap-4">
                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius)]"
                        style={{
                          background: 'var(--color-card)',
                          color: 'var(--color-accent)',
                          border: 'var(--border-width) solid var(--color-accent)',
                        }}
                      >
                        {item.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p
                          className="text-xs font-bold uppercase tracking-wider"
                          style={{ color: 'var(--color-muted)' }}
                        >
                          {item.label}
                        </p>
                        <p
                          className="text-sm font-semibold"
                          style={{ color: 'var(--color-text)' }}
                        >
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </BrutalCard>
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // 빈 데이터 플레이스홀더
          <motion.div
            className="flex items-center justify-center rounded-[var(--radius)] px-6 py-12"
            style={{
              border: 'var(--border-width) dashed var(--color-border)',
              color: 'var(--color-muted)',
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          >
            <p className="text-center text-sm">
              data/portfolio.ts에 contact 데이터를 추가하면 여기에 표시됩니다.
            </p>
          </motion.div>
        )}

        {/* ---- Outro 섹션 ---- */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ type: 'spring', stiffness: 300, damping: 24, delay: 0.3 }}
        >
          <p
            className="text-lg font-medium"
            style={{ color: 'var(--color-muted)' }}
          >
            감사합니다
          </p>
          <h3
            className="mt-3 text-3xl font-black md:text-4xl"
            style={{ color: 'var(--color-text)' }}
          >
            {displayName}
            <span style={{ color: 'var(--color-accent)' }}>과 함께 만들어요</span>
          </h3>
          <div
            className="mx-auto mt-6 h-[4px] w-20"
            style={{ background: 'var(--color-accent)' }}
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </section>
  );
}
