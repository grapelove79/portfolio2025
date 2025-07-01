import React, { useEffect, useState } from "react";

// props로 onFinish를 받아옴 → 카운트다운이 끝났을 때 실행할 함수
const LoadingScreen = ({ onFinish }) => {
  // 3초부터 시작하는 타이머 상태
  const [count, setCount] = useState(3);
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    document.body.classList.add("stop-scroll--loading");
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {

      setFadeOut(true); // count가 0이면 페이드 아웃 시작
      const timeout = setTimeout(() => { // 트랜지션 끝난 후 로딩 종료 콜백 실행(500ms 후)
        window.scrollTo(0, 0); // loadingScreen 끝나고 강제로 scrollTop 0으로 리셋
        document.body.classList.remove("stop-scroll--loading"); //로딩용만 제거
        onFinish();  // App.js 또는 HomeView에서 상태 변경용 콜백 호출
        // 로딩 완료 콜백: 이 타이밍에 App → HomeView → IntroSection 순으로 mount

      }, 500); // fade-out 후 500ms 기다림
      return () => clearTimeout(timeout);
    }
  }, [count, onFinish]);

  return (
    <section id="loading" className={`loading ${fadeOut ? "fade-out" : ""}`}>
      <div className="loading-screen">
        <div className='img'></div>
        <p><span>{count}</span>... 로딩 중</p>
      </div>
    </section>
  );
};

export default LoadingScreen;
