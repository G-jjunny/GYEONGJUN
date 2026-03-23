import { create } from 'zustand';

// =============================================================
// introStore — 인트로 애니메이션 상태 관리
//
// isComplete   : Hero 애니메이션 트리거용 (Option A 연동)
// replayCount  : 증가 시 IntroController가 IntroAnimation 재마운트
// markComplete : 인트로 커튼업 시작 시점에 호출
// replay       : sessionStorage 초기화 + replayCount 증가
// =============================================================

interface IntroStore {
  isComplete: boolean;
  replayCount: number;
  markComplete: () => void;
  replay: () => void;
}

export const useIntroStore = create<IntroStore>((set) => ({
  isComplete: false,
  replayCount: 0,
  markComplete: () => set({ isComplete: true }),
  replay: () => {
    sessionStorage.removeItem('intro-shown');
    set((s) => ({ replayCount: s.replayCount + 1, isComplete: false }));
  },
}));
