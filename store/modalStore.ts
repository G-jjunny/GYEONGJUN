// =============================================================
// Modal Store — 프로젝트 상세 모달 상태 관리
// 현재 열린 프로젝트 id를 관리 (null이면 닫힘)
// =============================================================

import { create } from 'zustand';

interface ModalStore {
  /** 현재 열린 프로젝트 id (null이면 모달 닫힘) */
  activeProjectId: string | null;
  /** 모달 열기 */
  openModal: (id: string) => void;
  /** 모달 닫기 */
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>()((set) => ({
  activeProjectId: null,
  openModal: (id: string) => set({ activeProjectId: id }),
  closeModal: () => set({ activeProjectId: null }),
}));
