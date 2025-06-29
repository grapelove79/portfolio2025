import React, { useEffect, useRef, useState } from "react";
import { portText } from "../constants";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useScrollMotion from "../hooks/useScrollMotion";
import { debounce } from "lodash";

gsap.registerPlugin(ScrollTrigger);

const Port = () => {
  useScrollMotion(); // 커스텀 훅 

  const horizontalRef = useRef(null); // 수평 pin 대상 전체 섹션
  const wrapRef = useRef(null);    // 수평 이동할 전체 wrapper(가로 슬라이드 요소)
  const titleRef = useRef(null);      // 제목 기준 요소

  const [dimensions, setDimensions] = useState({
    workW: 0,
    innerW: 0,
    winW: 0,
  });

  // (1) 전체 width 계산 후 상태 저장
  useEffect(() => {

    // 너비 계산 시 추가
    const updateSizes = () => {
      if (!wrapRef.current || !titleRef.current) return;

      const workW = wrapRef.current.offsetWidth;    // 슬라이드 전체 너비
      const innerW = titleRef.current.offsetWidth;     // 타이틀 너비
      const winW = window.innerWidth;

      setDimensions({ workW, innerW, winW });
      // ScrollTrigger.refresh();
    };

    updateSizes();

    const handleResize = debounce(() => {
      updateSizes();
      ScrollTrigger.refresh();
    }, 200); // 200ms 동안 연속 호출되면 마지막 한 번만 실행

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // (2) ScrollTrigger를 활용한 수평 스크롤 트윈 설정
  useEffect(() => {
    if (!horizontalRef.current || !wrapRef.current) return;

    const { workW, innerW, winW } = dimensions;
    if (!workW) return;

    // const section = horizontalRef.current;
    // if (!section) return;

    const totalMove = winW - innerW + (workW - winW);

    // 기존 트윈 제거 (안전)
    // gsap.killTweensOf(wrapRef.current);
    // const tween = gsap.to(wrapRef.current, {

    const ctx = gsap.context(() => {
      gsap.to(wrapRef.current, {
        x: -totalMove, // 왼쪽으로 이동
        ease: "none",
        scrollTrigger: {
          trigger: horizontalRef.current,
          start: "top top",
          end: () => `+=${workW}`, // 섹션 너비만큼 스크롤 거리 생성
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          refreshPriority: 1,
          // markers: true,
          onUpdate: (self) => {
            const xVal = self.progress.toFixed(3) * -totalMove;
            gsap.to(wrapRef.current, { x: xVal, duration: 0.2, ease: "none" });
          },
        },
      });
    }, horizontalRef);
    // return () => {
    //   tween.scrollTrigger?.kill();
    //   tween.kill();
    // };

    return () => ctx.revert();

  }, [dimensions]);

  return (
    <section id="port" className="port">
      <div className="port__inner" ref={horizontalRef}>
        <h2 className="port__title scroll__motion" ref={titleRef}>
          포트폴리오 <em>Portfolio</em>
        </h2>
        <div className="slide-con">
          <div className="port__wrap" ref={wrapRef}>
            {portText.map((port, key) => (
              <article className={`port__item p${key + 1}`} key={key}>
                <a
                  href={port.view}
                  target="_blank"
                  className="port__item-link"
                  rel="noreferrer noopener"
                >
                  <div className="port__img">
                    <img src={port.img} alt={port.name} />
                  </div>
                  <div className="port__desc">
                    <h3 className="company">{port.company}</h3>
                    <h3 className="title">{port.title}</h3>
                    <p className="desc">{port.desc}</p>
                    <span className="arrow"></span>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Port;
