"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// =============================================================
// IntroAnimation — Plan A: 독자적 랜딩 인트로 오버레이
//
// 상태 흐름:
//   'init'    → SSR + useEffect 실행 전. 단순 blocking div로 Hero 가림
//   'playing' → 애니메이션 재생 (useEffect에서 sessionStorage 미설정 확인 후)
//   'done'    → 오버레이 완전 제거 (AnimatePresence exit 완료 후)
//
// sessionStorage 'intro-shown' = 세션당 1회만 재생
// 이미 설정된 경우: init → done (blocking div만 순간 렌더 후 즉시 제거)
// =============================================================

interface IntroAnimationProps {
  name: string;
  title: string;
}

type Phase = "init" | "playing" | "done";

const SHOW_DURATION = 2300;
const EXIT_DURATION = 650;
const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;

export default function IntroAnimation({ name, title }: IntroAnimationProps) {
  const [phase, setPhase] = useState<Phase>("init");

  useEffect(() => {
    // 세션 이미 방문한 경우 즉시 제거 (애니메이션 없음)
    if (sessionStorage.getItem("intro-shown")) {
      setPhase("done");
      return;
    }

    // 첫 방문: 애니메이션 시작
    setPhase("playing");
    document.body.style.overflow = "hidden";

    const hideTimer = setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem("intro-shown", "1");
    }, SHOW_DURATION);

    const unlockTimer = setTimeout(() => {
      document.body.style.overflow = "";
    }, SHOW_DURATION + EXIT_DURATION);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(unlockTimer);
      document.body.style.overflow = "";
    };
  }, []);

  // ── init: useEffect 전 SSR/hydration 구간 ──
  // 단순 blocking div로 Hero 섹션을 즉시 가림 (JS 로드 전 공백 방지)
  if (phase === "init") {
    return (
      <div
        className="fixed inset-0 z-200 bg-(--color-bg)"
      />
    );
  }

  // ── playing / done: AnimatePresence가 exit 애니메이션 담당 ──
  return (
    <AnimatePresence>
      {phase === "playing" && (
        <motion.div
          className="fixed inset-0 z-200 flex flex-col items-center justify-center overflow-hidden bg-(--color-bg)"
          exit={{
            y: "-100%",
            transition: { duration: EXIT_DURATION / 1000, ease: CURTAIN_EASE },
          }}
        >
          {/* 장식 기하 요소 */}
          <DecoBlocks />

          {/* 메인 콘텐츠 */}
          <div className="relative z-10 px-6 text-center">
            {/* 이름 — offset shadow + stamp 효과 */}
            <div className="relative inline-block">
              {/* offset shadow 레이어 */}
              {/* fontSize clamp() 동적 반응형 값이므로 인라인 유지, 나머지는 className으로 */}
              <motion.span
                aria-hidden="true"
                className="absolute select-none font-black leading-none tracking-tighter top-2 left-2 opacity-30 whitespace-nowrap pointer-events-none text-(--color-border)"
                style={{
                  fontSize: "clamp(3.5rem, 13vw, 10rem)",
                }}
                initial={{ y: -80, opacity: 0, scale: 1.25 }}
                animate={{ y: 8, opacity: 0.3, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 450,
                  damping: 16,
                  delay: 0.1,
                }}
              >
                {name}
              </motion.span>

              {/* 실제 이름 텍스트 */}
              {/* fontSize clamp() 동적 반응형 값이므로 인라인 유지 */}
              <motion.h1
                className="relative select-none font-black leading-none tracking-tighter text-(--color-accent) whitespace-nowrap"
                style={{
                  fontSize: "clamp(3.5rem, 13vw, 10rem)",
                }}
                initial={{ y: -80, opacity: 0, scale: 1.25 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 450,
                  damping: 16,
                  delay: 0.1,
                }}
              >
                {name}
              </motion.h1>
            </div>

            {/* accent 라인 */}
            <motion.div
              className="mx-auto mt-3 h-1.25 w-full bg-(--color-accent) origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.45, delay: 0.55, ease: "easeOut" }}
            />

            {/* 직함 */}
            {/* fontSize clamp() 동적 반응형 값이므로 인라인 유지 */}
            <motion.p
              className="mt-5 font-bold uppercase tracking-[0.4em] text-(--color-muted)"
              style={{
                fontSize: "clamp(0.7rem, 1.4vw, 0.9rem)",
              }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.75 }}
            >
              {title}
            </motion.p>
          </div>

          {/* 하단 진행 바 */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.75 w-full bg-(--color-accent) origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: SHOW_DURATION / 1000, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// --------------- 장식 기하 요소 ---------------

function DecoBlocks() {
  return (
    <>
      {/* 우상단 — accent 블록 */}
      {/* width/height는 clamp() 동적 반응형 값이므로 인라인 유지 */}
      <motion.div
        className="absolute right-[8%] top-[12%] bg-(--color-accent) border-(length:--border-width) border-solid border-(--color-border)"
        style={{
          width: "clamp(56px, 7vw, 110px)",
          height: "clamp(56px, 7vw, 110px)",
        }}
        initial={{ scale: 0, rotate: 14 }}
        animate={{ scale: 1, rotate: 14 }}
        transition={{
          type: "spring",
          stiffness: 320,
          damping: 14,
          delay: 0.25,
        }}
      />

      {/* 좌하단 — outline 블록 */}
      {/* width/height는 clamp() 동적 반응형 값이므로 인라인 유지 */}
      <motion.div
        className="absolute bottom-[18%] left-[7%] bg-transparent border-(length:--border-width) border-solid border-(--color-accent)"
        style={{
          width: "clamp(36px, 4.5vw, 72px)",
          height: "clamp(36px, 4.5vw, 72px)",
        }}
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: -10 }}
        transition={{
          type: "spring",
          stiffness: 320,
          damping: 14,
          delay: 0.35,
        }}
      />

      {/* 좌상단 — ㄱ자 브라켓 */}
      {/* width는 clamp() 동적 반응형 값이므로 인라인 유지, height는 CSS 변수 토큰 */}
      <motion.div
        className="absolute left-[7%] top-[18%] bg-(--color-muted) origin-left"
        style={{
          width: "clamp(40px, 5vw, 72px)",
          height: "var(--border-width)",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.35, delay: 0.5, ease: "easeOut" }}
      />
      {/* height는 clamp() 동적 반응형 값이므로 인라인 유지, width는 CSS 변수 토큰 */}
      <motion.div
        className="absolute left-[7%] top-[18%] bg-(--color-muted) origin-top"
        style={{
          width: "var(--border-width)",
          height: "clamp(40px, 5vw, 72px)",
        }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.35, delay: 0.5, ease: "easeOut" }}
      />

      {/* 우하단 — accent 점 */}
      {/* width/height는 clamp() 동적 반응형 값이므로 인라인 유지 */}
      <motion.div
        className="absolute bottom-[22%] right-[9%] bg-(--color-accent)"
        style={{
          width: "clamp(10px, 1.4vw, 16px)",
          height: "clamp(10px, 1.4vw, 16px)",
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.6 }}
      />
    </>
  );
}
