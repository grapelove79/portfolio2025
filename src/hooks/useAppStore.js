// zustand 라이브러리에서 create 함수를 가져옵니다.
// zustand는 전역 상태 관리를 위한 간단하고 가벼운 라이브러리입니다.
import { create } from 'zustand';

// Zustand의 create 함수를 이용해 커스텀 훅 `useAppStore`를 생성합니다.
// 이 훅은 전역에서 공통으로 사용할 수 있는 상태들을 포함합니다.
const useAppStore = create((set) => ({
  
  // isHeaderHidden: 헤더가 숨겨져 있는지 여부를 나타내는 상태 (true/false)
  isHeaderHidden: false,

  // setHeaderHidden: isHeaderHidden 상태를 업데이트하는 함수
  // 예: setHeaderHidden(true) → 헤더 숨김 처리
  setHeaderHidden: (value) => set({ isHeaderHidden: value }),

  // isScrollDisabled: 스크롤이 비활성화되어야 하는지 여부
  // 예: 모달이 열렸을 때 스크롤 비활성화 등에 사용 가능
  isScrollDisabled: false,

  // setScrollDisabled: isScrollDisabled 상태를 업데이트하는 함수
  // 예: setScrollDisabled(true) → 스크롤 차단
  setScrollDisabled: (value) => set({ isScrollDisabled: value }),
}));

// 커스텀 훅을 기본 내보내기(default export)하여
// 다른 컴포넌트에서 `import useAppStore from '...'`로 사용 가능
export default useAppStore;
