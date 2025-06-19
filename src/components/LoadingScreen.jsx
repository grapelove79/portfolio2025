import React, { useEffect, useState } from "react";

// props로 onFinish를 받아옴 → 카운트다운이 끝났을 때 실행할 함수
const LoadingScreen = ({ onFinish }) => {
  // 3초부터 시작하는 타이머 상태
  const [count, setCount] = useState(3);
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {

      setFadeOut(true); // count가 0이면 페이드 아웃 시작
      const timeout = setTimeout(() => {    // 트랜지션 끝난 후 로딩 종료 콜백 실행 (500ms 후)
        onFinish();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [count, onFinish]);

  return (
    <div className={`loading-screen ${fadeOut ? "fade-out" : ""}`}>
      <p><span>{count}</span>... 로딩 중</p>
    </div>
  );
};

export default LoadingScreen;