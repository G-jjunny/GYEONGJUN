"use client";

import { motion } from "framer-motion";
import type { ContactInfo, PersonalInfo } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionWrapper from "@/components/ui/SectionWrapper";
import EmptyPlaceholder from "@/components/ui/EmptyPlaceholder";
import ContactCard, { type ContactItem } from "@/components/sections/contact/ContactCard";
import { EmailIcon, GithubIcon, LinkedinIcon, BlogIcon, PhoneIcon } from "@/components/icons";
import {
  fadeUpVariant,
  staggerContainerVariant,
  springBase,
} from "@/lib/motion";

// =============================================================
// ContactSection — Contact + Outro 섹션
// =============================================================

interface ContactSectionProps {
  contact: ContactInfo;
  personal: Pick<PersonalInfo, "name" | "nameEn">;
}

function buildContactItems(contact: ContactInfo): ContactItem[] {
  const items: ContactItem[] = [];

  if (contact.email) {
    items.push({
      key: "email",
      icon: <EmailIcon />,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
    });
  }
  if (contact.github) {
    items.push({
      key: "github",
      icon: <GithubIcon />,
      label: "GitHub",
      value: contact.github,
      href: contact.github.startsWith("http")
        ? contact.github
        : `https://github.com/${contact.github}`,
    });
  }
  if (contact.linkedin) {
    items.push({
      key: "linkedin",
      icon: <LinkedinIcon />,
      label: "LinkedIn",
      value: contact.linkedin,
      href: contact.linkedin.startsWith("http")
        ? contact.linkedin
        : `https://linkedin.com/in/${contact.linkedin}`,
    });
  }
  if (contact.blog) {
    items.push({
      key: "blog",
      icon: <BlogIcon />,
      label: "Blog",
      value: contact.blog,
      href: contact.blog.startsWith("http")
        ? contact.blog
        : `https://${contact.blog}`,
    });
  }
  if (contact.phone) {
    items.push({
      key: "phone",
      icon: <PhoneIcon />,
      label: "Phone",
      value: contact.phone,
    });
  }

  return items;
}

export default function ContactSection({
  contact,
  personal,
}: ContactSectionProps) {
  const items = buildContactItems(contact);
  const displayName = personal.name || personal.nameEn || "이름";

  return (
    <SectionWrapper id="contact">
      <SectionHeading subtitle="Get in Touch">연락하기</SectionHeading>

      {items.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {items.map((item) => (
            <motion.div key={item.key} variants={fadeUpVariant}>
              <ContactCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <EmptyPlaceholder text="data/portfolio.ts에 contact 데이터를 추가하면 여기에 표시됩니다." />
      )}

      {/* Outro */}
      <motion.div
        className="mt-20 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ ...springBase, delay: 0.3 }}
      >
        <p
          className="text-lg font-medium"
          style={{ color: "var(--color-muted)" }}
        >
          감사합니다
        </p>
        <h3
          className="mt-3 text-3xl font-black md:text-4xl"
          style={{ color: "var(--color-text)" }}
        >
          {displayName}
          <span style={{ color: "var(--color-accent)" }}>과 함께 만들어요</span>
        </h3>
        <div
          className="mx-auto mt-6 h-1 w-20"
          style={{ background: "var(--color-accent)" }}
          aria-hidden="true"
        />
      </motion.div>
    </SectionWrapper>
  );
}
