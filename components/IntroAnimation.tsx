"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useIntroStore } from "@/store/introStore";

// =============================================================
// IntroAnimation — 퍼센트 카운터 + 진행 바 + 타이핑 효과 인트로 오버레이
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
  name: string; // 좌측 상단 로고 텍스트로 사용
  title: string; // 현재 사용 안함, 시그니처 유지
}

type Phase = "init" | "playing" | "done";

const SHOW_DURATION = 2300;
const EXIT_DURATION = 650;
const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;

// 타이핑 시퀀스 정의
const TYPING_SEQUENCE: { text: string; startAt: number }[] = [
  { text: "LOADING...", startAt: 0 },
  { text: "ALMOST THERE...", startAt: 800 },
  { text: "WELCOME", startAt: 1700 },
];
const TYPING_CHAR_INTERVAL = 60; // ms per character

export default function IntroAnimation({
  name,
  title: _title,
}: IntroAnimationProps) {
  const [phase, setPhase] = useState<Phase>("init");
  const [count, setCount] = useState(0);
  const [typedText, setTypedText] = useState("");
  const markComplete = useIntroStore((s) => s.markComplete);

  // 타이핑 시퀀스 cleanup용 timeout ref 목록
  const typingTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // 타이핑 시퀀스 시작 함수
  // 각 시퀀스는 절대 startAt ms 기준으로 독립 스케줄링
  const startTypingSequence = () => {
    setTypedText("");
    typingTimeoutsRef.current = [];

    TYPING_SEQUENCE.forEach((seq) => {
      // seq.startAt ms 후에 해당 텍스트 타이핑 시작
      const seqTimer = setTimeout(() => {
        let charIdx = 0;
        setTypedText(""); // 새 시퀀스 시작 시 초기화

        const typeNextChar = () => {
          setTypedText(seq.text.slice(0, charIdx));
          charIdx++;
          if (charIdx <= seq.text.length) {
            const charTimer = setTimeout(typeNextChar, TYPING_CHAR_INTERVAL);
            typingTimeoutsRef.current.push(charTimer);
          }
        };
        typeNextChar();
      }, seq.startAt);

      typingTimeoutsRef.current.push(seqTimer);
    });
  };

  useEffect(() => {
    // 세션 이미 방문한 경우 즉시 제거 (애니메이션 없음)
    if (sessionStorage.getItem("intro-shown")) {
      setPhase("done");
      return;
    }

    // 첫 방문: 애니메이션 시작
    setPhase("playing");
    document.body.style.overflow = "hidden";

    // ── 퍼센트 카운터 (requestAnimationFrame 기반 easeIn 커브) ──
    const counterDuration = SHOW_DURATION * 0.85;
    let startTime: number | null = null;
    let rafId = 0;

    const animateCounter = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const t = Math.min(elapsed / counterDuration, 1);
      // quadratic easeIn: 초반 느리게, 후반 빠르게
      const progress = t * t;
      setCount(Math.floor(progress * 100));

      if (t < 1) {
        rafId = requestAnimationFrame(animateCounter);
      } else {
        setCount(100);
      }
    };
    rafId = requestAnimationFrame(animateCounter);

    // ── 타이핑 시퀀스 시작 ──
    startTypingSequence();

    // ── 종료 타이머 ──
    const hideTimer = setTimeout(() => {
      markComplete();
      setPhase("done");
      sessionStorage.setItem("intro-shown", "1");
    }, SHOW_DURATION);

    const unlockTimer = setTimeout(() => {
      document.body.style.overflow = "";
    }, SHOW_DURATION + EXIT_DURATION);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(hideTimer);
      clearTimeout(unlockTimer);
      typingTimeoutsRef.current.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, [markComplete]);

  // ── init: useEffect 전 SSR/hydration 구간 ──
  // 단순 blocking div로 Hero 섹션을 즉시 가림
  if (phase === "init") {
    return <div className="fixed inset-0 z-[200] bg-(--color-bg)" />;
  }

  return (
    <AnimatePresence>
      {phase === "playing" && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-(--color-bg)"
          exit={{
            y: "-100%",
            transition: { duration: EXIT_DURATION / 1000, ease: CURTAIN_EASE },
          }}
        >
          {/* ── 좌측 상단 로고 텍스트 ── */}
          <motion.span
            className="absolute top-8 left-8 font-mono text-(--color-muted)"
            style={{ fontSize: "0.75rem" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 24,
              delay: 0.1,
            }}
          >
            {name}
          </motion.span>

          {/* ── 중앙 콘텐츠 스택 ── */}
          <div className="flex flex-col items-center">
            {/* 1. 퍼센트 카운터 */}
            <motion.div
              className="font-black text-(--color-accent) leading-none tabular-nums"
              style={{ fontSize: "clamp(4rem, 12vw, 10rem)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20,
              }}
            >
              {count}%
            </motion.div>

            {/* 2. 진행 바 */}
            <motion.div
              className="mt-6 relative overflow-hidden border-2 border-(--color-border)"
              style={{
                width: "clamp(280px, 50vw, 480px)",
                height: "5px",
                boxShadow: "3px 3px 0 var(--color-border)",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 24,
                delay: 0.15,
              }}
            >
              {/* fill bar — overflow-hidden으로 border 안에 클리핑 */}
              <div
                className="absolute inset-0 bg-(--color-accent)"
                style={{ width: `${count}%`, transition: "width 50ms linear" }}
              />
            </motion.div>

            {/* 3. 타이핑 효과 텍스트 */}
            <motion.div
              className="mt-5 font-mono text-base text-(--color-muted) flex items-center min-h-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 24,
                delay: 0.2,
              }}
            >
              <span>{typedText}</span>
              {/* 깜빡이는 커서 */}
              <span
                className="ml-px text-(--color-accent) animate-blink"
                aria-hidden="true"
              >
                |
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
