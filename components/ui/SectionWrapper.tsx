// =============================================================
// SectionWrapper — 섹션 공통 레이아웃 래퍼
//
// 모든 섹션에서 반복되는 패턴을 통합:
//   <section relative px-6 py-24 bg-color-bg>
//     <div mx-auto max-w-5xl>
//
// 사용법:
//   <SectionWrapper id="about">...</SectionWrapper>
// =============================================================

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export default function SectionWrapper({
  id,
  children,
  className = '',
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`relative px-6 py-24 bg-(--color-bg) ${className}`}
    >
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  );
}
