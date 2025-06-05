import React, { useEffect, useCallback, useRef, useState } from "react";

// 마우스 좌표 저장용 전역 변수
let x = 0;
let y = 0;
let targetX = 0;
let targetY = 0;
const speed = 0.05; // 커서가 따라오는 속도

const Cursor = () => {
  const cursorRef = useRef(null); // 커서 DOM 접근
  const requestRef = useRef(0);   // requestAnimationFrame 추적
  const [hover, setHover] = useState(false); // hover 상태 저장
  const prevHoverElement = useRef(null);     // 이전 hover 대상 저장

  // 마우스가 움직일 때 좌표 저장
  const handleMouseMove = (e) => {
    x = e.pageX;
    y = e.pageY;
  };

  // 커서를 부드럽게 따라오게 하는 애니메이션 루프
  const loop = useCallback(() => {
    // 현재 좌표(targetX/Y)가 실제 마우스(x/y)를 따라감
    targetX += (x - targetX) * speed;
    targetY += (y - targetY) * speed;

    // 커서 위치 업데이트
    if (cursorRef.current) {
      cursorRef.current.style.top = `${targetY}px`;
      cursorRef.current.style.left = `${targetX}px`;
    }

    requestRef.current = requestAnimationFrame(loop); // 다음 프레임 예약
  }, []);

  // 마우스가 링크나 버튼 위에 올라갔을 때 실행
  const handleMouseOver = (e) => {
    const tag = e.target.tagName.toLowerCase();
    if (tag === "a" || tag === "button") {
      setHover(true); // 커서 색 변경을 위한 상태 업데이트
      e.target.classList.add("hover-purple"); // 텍스트 색상 보라색 클래스 추가
      prevHoverElement.current = e.target; // 현재 요소 저장
    }
  };

  // 마우스가 요소를 벗어났을 때 실행
  const handleMouseOut = (e) => {
    setHover(false); // 커서 색 원래대로 복귀
    // 이전 요소에서 클래스 제거
    if (prevHoverElement.current) {
      prevHoverElement.current.classList.remove("hover-purple");
      prevHoverElement.current = null;
    }
  };

  // 마운트 시 이벤트 등록 / 언마운트 시 제거
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    requestRef.current = requestAnimationFrame(loop); // 커서 움직임 시작

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(requestRef.current); // 커서 움직임 중단
    };
  }, [loop]);

  return (
    // 커서 wrapper - 화면에서 마우스를 따라다닐 div
    <div
      className="cursor"
      ref={cursorRef}
      style={{
        position: "absolute",
        top: "0px",
        left: "0px",
        width: "40px",
        height: "40px",
        pointerEvents: "none", // 실제 클릭 막지 않도록 설정
        zIndex: 20001,
        mixBlendMode: "difference", 
        transform: "translate(-50%, -50%)", // 커서를 정중앙 기준으로 이동
      }}
    >
      {/* 실제 커서로 보일 SVG */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: hover ? "scale(2)" : "scale(1)", // hover 시 확대
          transition: "transform 0.2s ease",
        }}
      >
        {/* SVG 원형 커서 - 색상은 hover 상태에 따라 변경 */}
        <circle
          cx="50"
          cy="50"
          r="40" // 반지름 40px 
          fill={hover ? "#ea3a4b" : "#000000"} // hover 시 색상 전환
          opacity="0.3"
        />
      </svg>
    </div>
  );
};

export default Cursor;
