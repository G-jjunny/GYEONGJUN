'use client';

import { useIntroStore } from '@/store/introStore';
import IntroAnimation from './IntroAnimation';

// =============================================================
// IntroController — replayCount 변화 시 IntroAnimation 재마운트
// key={replayCount} 로 React가 컴포넌트를 완전히 새로 생성
// =============================================================

interface IntroControllerProps {
  name: string;
  title: string;
}

export default function IntroController({ name, title }: IntroControllerProps) {
  const replayCount = useIntroStore((s) => s.replayCount);

  return <IntroAnimation key={replayCount} name={name} title={title} />;
}
