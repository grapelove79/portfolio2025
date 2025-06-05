import React, { useEffect, useState } from "react";

// props로 onFinish를 받아옴 → 카운트다운이 끝났을 때 실행할 함수
const LoadingScreen = ({ onFinish }) => {
  // 3초부터 시작하는 타이머 상태
  const [count, setCount] = useState(3);

  // useEffect(() => {
  //   // 1초마다 실행되는 타이머 생성
  //   const timer = setInterval(() => {
  //     setCount((prev) => {
  //       if (prev <= 1) {
  //         // 1초가 끝나면 타이머 종료
  //         clearInterval(timer);
  //         onFinish(); // 부모 컴포넌트에게 "로딩 완료" 알림
  //         return 0; // 타이머를 0으로 설정
  //       }
  //       return prev - 1; // 1초 줄이기
  //     });
  //   }, 1000); // 1000ms = 1초

  //   // 컴포넌트가 사라질 때 타이머 정리
  //   return () => clearInterval(timer);
  // }, [onFinish]);

  
  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      onFinish(); // 카운트가 0이 되면 로딩 종료
    }
  }, [count, onFinish]);


  return (
    <div className="loading-screen">
      <p>사이트가 {count}초 후에 열립니다.</p>
    </div>
  );
};


export default LoadingScreen;
