import React, { useEffect, useRef, useState } from "react";
import { portText } from "../constants";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Port = () => {
  // ScrollTrigger 플러그인 등록
  gsap.registerPlugin(ScrollTrigger);

  // ref: 전체 섹션(ScrollTrigger pin 대상)
  const horizontalRef = useRef(null);
  // ref: 가로로 움직일 wrap 전체 요소
  const sectionRef = useRef(null);
  // ref: 제목 영역 (너비 계산 기준)
  const titleRef = useRef(null);

  // 작업물 리스트 전체 너비와 타이틀 기준 너비 저장
  const [dimensions, setDimensions] = useState({ workW: 0, innerW: 0 });

  // 창 크기 변경 시마다 너비 재측정
  useEffect(() => {
    const updateSizes = () => {
      if (!sectionRef.current || !titleRef.current) return;

      const workW = sectionRef.current.offsetWidth;   // 작업물 전체 너비
      const innerW = titleRef.current.offsetWidth;    // 타이틀 기준 너비

      setDimensions({ workW, innerW });

      // ScrollTrigger 레이아웃 재계산
      ScrollTrigger.refresh();
    };

    updateSizes(); // 초기 실행
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  // ScrollTrigger 생성 및 수평 이동 처리
  useEffect(() => {
    if (!horizontalRef.current || !sectionRef.current) return;

    const { workW, innerW } = dimensions;

    // ScrollTrigger 생성
    const trigger = ScrollTrigger.create({
      trigger: horizontalRef.current,     // 고정 기준 요소
      start: "top top",                   // 시작 위치
      end: "bottom+=150% bottom",         // 추가 스크롤 여유
      pin: true,                          // 해당 섹션 고정
      scrub: 1,                           // 부드러운 연동
      invalidateOnRefresh: true,         // 리사이즈 시 재계산
      onUpdate: (self) => {
        const windowW = window.innerWidth;

        // 전체 이동 거리 계산
        const totalMove = -(windowW - innerW + (workW - windowW));

        // 이동 거리 적용
        gsap.to(sectionRef.current, {
          x: self.progress.toFixed(3) * totalMove,  // 스크롤 비율에 따른 이동
          duration: 0.2,
          overwrite: true,
        });
      },
    });

    return () => trigger.kill(); // 언마운트 시 제거
  }, [dimensions]);

  return (
    <section id="port" ref={horizontalRef}>
      <div className="port__inner">
        <h2 className="port__title" ref={titleRef}>
          portfolio <em>포폴 작업물</em>
        </h2>
        {/* 가로로 이동할 전체 영역에 ref 설정 */}
        <div className="slide-con">
          <div className="port__wrap" ref={sectionRef}>
            {portText.map((port, key) => (
              <article className={`port__item p${key + 1}`} key={key}>
                <a
                  href={port.code}
                  target="_blank"
                  className="img"
                  rel="noreferrer noopener"
                >
                  <img src={port.img} alt={port.name} />
                </a>
                <div className="port__desc">
                  <h3 className="title">{port.title}</h3>
                  <p className="desc">{port.desc}</p>
                  <a
                    href={port.view}
                    target="_blank"
                    className="site"
                    rel="noreferrer noopener"
                  >
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Port;
