"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { springPress, springFast } from "@/lib/motion";

// =============================================================
// Lightbox — 풀스크린 이미지 뷰어 (네오 브루탈리즘)
// ProjectModal 위에 렌더링되며, 캐러셀 내비게이션을 제공한다.
// =============================================================

interface LightboxProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export default function Lightbox({
  images,
  initialIndex,
  onClose,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          goToPrev();
          break;
        case "ArrowRight":
          goToNext();
          break;
      }
    },
    [onClose, goToPrev, goToNext],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[60] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* 배경 오버레이 */}
        <div
          className="absolute inset-0 cursor-pointer bg-black/90"
          onClick={onClose}
        />

        {/* 닫기 버튼 */}
        <motion.button
          className="absolute right-4 top-4 z-10 flex h-12 w-12 cursor-pointer items-center justify-center text-xl font-black border-(length:--border-width) border-solid border-(--color-border) bg-(--color-surface) text-(--color-text) shadow-(--shadow-md)"
          whileHover={{
            x: 2,
            y: 2,
            transition: springPress,
          }}
          whileTap={{
            x: 4,
            y: 4,
            transition: springPress,
          }}
          onClick={onClose}
          aria-label="라이트박스 닫기"
        >
          X
        </motion.button>

        {/* 중앙 이미지 */}
        <div className="relative z-10 flex max-h-[80vh] w-full max-w-4xl items-center justify-center px-16">
          <motion.div
            key={currentIndex}
            className="relative w-full overflow-hidden border-(length:--border-width) border-solid border-(--color-border) aspect-video"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1, transition: springFast }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Image
              src={images[currentIndex]}
              alt={`이미지 ${currentIndex + 1} / ${images.length}`}
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-contain bg-(--color-bg)"
              priority
            />
          </motion.div>
        </div>

        {/* 좌측 화살표 */}
        {images.length > 1 && (
          <motion.button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 cursor-pointer items-center justify-center text-2xl font-black border-(length:--border-width) border-solid border-(--color-border) bg-(--color-surface) text-(--color-text) shadow-(--shadow-md)"
            whileHover={{
              x: 2,
              y: 2,
              transition: springPress,
            }}
            whileTap={{
              x: 4,
              y: 4,
              transition: springPress,
            }}
            onClick={goToPrev}
            aria-label="이전 이미지"
          >
            &lt;
          </motion.button>
        )}

        {/* 우측 화살표 */}
        {images.length > 1 && (
          <motion.button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 cursor-pointer items-center justify-center text-2xl font-black border-(length:--border-width) border-solid border-(--color-border) bg-(--color-surface) text-(--color-text) shadow-(--shadow-md)"
            whileHover={{
              x: 2,
              y: 2,
              transition: springPress,
            }}
            whileTap={{
              x: 4,
              y: 4,
              transition: springPress,
            }}
            onClick={goToNext}
            aria-label="다음 이미지"
          >
            &gt;
          </motion.button>
        )}

        {/* 카운터 */}
        {images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 px-4 py-2 font-mono font-black border-(length:--border-width) border-solid border-(--color-border) bg-(--color-surface) text-(--color-text) shadow-(--shadow-sm)">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
