// =============================================================
// Theme Type Definitions
// 모든 컴포넌트와 스토어는 이 파일의 타입을 import하여 사용합니다.
// =============================================================

/** 사용 가능한 테마 ID */
export type Theme = 'mint' | 'amber' | 'blue';

/** 테마 목록 */
export const THEMES: Theme[] = ['mint', 'amber', 'blue'];

/** 테마 표시 레이블 */
export const THEME_LABELS: Record<Theme, string> = {
  mint: 'Mint',
  amber: 'Amber',
  blue: 'Blue',
};

/** 테마 대표 색상 (프리뷰용) */
export const THEME_COLORS: Record<Theme, string> = {
  mint: '#00FF9C',
  amber: '#F5A623',
  blue: '#7EB8F7',
};
