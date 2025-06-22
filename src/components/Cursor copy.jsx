import React, { useEffect, useCallback, useRef, useState } from "react";

let x = 0;
let y = 0;
let targetX = 0;
let targetY = 0;
const speed = 0.1;

const Cursor = () => {
  const cursorRef = useRef(null);
  const requestRef = useRef(0);
  const [hoverType, setHoverType] = useState("default"); // 'default', 'scale', 'invert'
  const [isMobile, setIsMobile] = useState(false);

    // 뷰포트 크기에 따라 모바일 여부 체크
    const checkMobile = useCallback(() => {
      setIsMobile(window.innerWidth < 768);
    }, []);
  
    useEffect(() => {
      checkMobile(); // 첫 렌더링 시 체크
      window.addEventListener("resize", checkMobile); // 리사이즈 시 체크
  
      return () => {
        window.removeEventListener("resize", checkMobile);
      };
    }, [checkMobile]);

  // 마우스가 움직일 때 좌표 저장
  const handleMouseMove = (e) => {
    x = e.pageX;
    y = e.pageY;
  };

  // 커서를 부드럽게 따라오게 하는 애니메이션 loop
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

  // 링크나 버튼 위에 있을 때 hover 상태 변경
  // closest 로 상위 요소까지 체크해서 더 정확하게 감지 가능
  const handleMouseOver = (e) => {
    const closestLinkOrBtn = e.target.closest("a, button");
  
    if (closestLinkOrBtn) {
      setHoverType("scale");
    } else if (e.target.closest("h1, h2, h3, p, span, div, em, img")) {
      setHoverType("invert");
    }
  };

  // 마우스가 요소를 벗어났을 때 실행
  const handleMouseLeave = () => {
    setHoverType("default");
  };

  useEffect(() => {
    if (isMobile) return;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseleave", handleMouseLeave);
    requestRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(requestRef.current);
    };
  }, [loop, isMobile]);

  // 모바일이면 커서 아예 렌더하지 않음
  if (isMobile) return null;

  return (
    // 커서 전체 wrapper - 화면에서 마우스를 따라다닐 div
    <div
      // className="cursor"
      className={`cursor ${hoverType}`}
      ref={cursorRef}
      style={{
        position: "absolute",
        top: "0px",
        left: "0px",
        width: "40px",
        height: "40px",
        pointerEvents: "none", // 실제 클릭 막지 않도록 설정
        zIndex: 20001,
        transform: "translate(-50%, -50%)",
        transition: "transform 0.2s ease",
        mixBlendMode: "difference",
        willChange: "transform",
      }}
    >
      {/* 실제 커서로 사용할 SVG */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        // style={{
        //   transform: hoverType === "scale" ? "scale(2)" : "scale(1)",
        //   transition: "transform 0.2s ease",
        // }}
      >
        <circle
          cx="50"
          cy="50"
          r="40" // 반지름 40px 
          fill={hoverType !== "default" ? "#ea3a4b" : "#ffffff"}
          opacity="0.5"
        />
      </svg>
    </div>
  );
};

export default Cursor;