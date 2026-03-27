'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { springFast } from '@/lib/motion';

/**
 * CustomCursor — 네오 브루탈리즘 커스텀 커서
 *
 * - 브라우저 기본 커서를 대체하는 정사각형 커서
 * - mix-blend-mode: difference로 커서 영역 색상 자동 반전
 * - 인터랙티브 요소(a, button, [data-cursor="pointer"]) 위에서 32px로 확대
 * - 터치 기기(pointer: coarse)에서는 렌더링하지 않음
 */
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // useMotionValue로 위치 관리 (React state 사용 금지 — 매 프레임 리렌더 방지)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // useSpring으로 마우스 추적에 부드러운 지연 적용
  const springX = useSpring(mouseX, { stiffness: 400, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 28 });

  useEffect(() => {
    // 터치 기기 감지 — 커스텀 커서 비활성화
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarse) {
      setIsTouch(true);
      return;
    }

    setIsMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      const interactive = target.closest('a, button, [data-cursor="pointer"]');
      setIsHovering(!!interactive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  // 터치 기기이거나 마운트 전이면 렌더링 안 함
  if (isTouch || !isMounted) return null;

  return (
    <motion.div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform mix-blend-difference"
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      animate={{
        width: isHovering ? 32 : 16,
        height: isHovering ? 32 : 16,
      }}
      transition={springFast}
    >
      <div className="w-full h-full bg-white" />
    </motion.div>
  );
}

export default CustomCursor;
