"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import { springFast } from "@/lib/motion";

// =============================================================
// BrutalCard — 네오 브루탈리즘 카드 래퍼 컴포넌트
// accent: true이면 accent 색상 테두리 & 그림자
// hoverable: true이면 Lift Effect 호버 애니메이션 활성화
// =============================================================

interface BrutalCardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  accent?: boolean;
  hoverable?: boolean;
  children: React.ReactNode;
}

const BrutalCard = forwardRef<HTMLDivElement, BrutalCardProps>(
  (
    { accent = false, hoverable = false, className = "", children, ...props },
    ref,
  ) => {
    return (
      <motion.div
        ref={ref}
        className={[
          "p-6",
          "rounded-(--radius)",
          "bg-surface",
          "border-(length:--border-width) border-solid",
          accent
            ? "border-accent shadow-(--shadow-md)"
            : "border-(--color-border) shadow-(--shadow-md)",
          className,
        ].join(" ")}
        whileHover={
          hoverable
            ? {
                x: -3,
                y: -3,
                boxShadow: "var(--shadow-lg)",
                transition: springFast,
              }
            : undefined
        }
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);

BrutalCard.displayName = "BrutalCard";

export default BrutalCard;
