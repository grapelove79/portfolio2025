import React, { useEffect, useRef, useState } from "react";
import { portText } from "../constants";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Port = () => {
  gsap.registerPlugin(ScrollTrigger);

  const horizontalRef = useRef(null); // 수평 pin 대상 전체 섹션
  const sectionRef = useRef(null);    // 수평 이동할 전체 wrapper(가로 슬라이드 요소)
  const titleRef = useRef(null);      // 제목 기준 요소

  const [dimensions, setDimensions] = useState({ workW: 0, innerW: 0 });

  // (1) 전체 width 계산 후 상태 저장
  useEffect(() => {

    // 너비 계산 시 추가
    const updateSizes = () => {
      if (!sectionRef.current || !titleRef.current) return;

      const workW = sectionRef.current.offsetWidth;    // 슬라이드 전체 너비
      const innerW = titleRef.current.offsetWidth;     // 타이틀 너비
      // left 값까지 포함한 총 이동 거리 계산
      // const leftOffset = parseFloat(getComputedStyle(titleRef.current).width); // '100rem' → px

      console.log(workW, "workW", innerW, "innerW")
      setDimensions({ workW, innerW });
      // setDimensions({ workW, innerW, leftOffset});

      ScrollTrigger.refresh();
    };

    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  // (2) ScrollTrigger를 활용한 수평 스크롤 트윈 설정
  useEffect(() => {
    if (!horizontalRef.current || !sectionRef.current) return;

    // const { workW, leftOffset } = dimensions;
    const { workW, innerW } = dimensions;
    const windowW = window.innerWidth;
    const section = horizontalRef.current;

    if (!section) return;
    //const totalMove =  workW - windowW + leftOffset;  // 전체 이동 거리 계산
    const totalMove = windowW - innerW + (workW - windowW);
    console.log(totalMove, "totalMove")

    // 기존 트윈 제거 (안전)
    gsap.killTweensOf(sectionRef.current);

    const tween = gsap.to(sectionRef.current, {
      x: -totalMove, // 왼쪽으로 이동
      ease: "none",
      scrollTrigger: {
        trigger: horizontalRef.current,
        start: "top top",
        end: () => `+=${workW}`, // 섹션 너비만큼 스크롤 거리 생성
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
        // markers: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();

    };
  }, [dimensions]);

  return (
    <section id="port" className="port">
      <div className="port__inner" ref={horizontalRef}>
        <div className="port__wrap">
          <h2 className="port__title scroll__motion" ref={titleRef}>
            포트폴리오 <em>Portfolio</em>
          </h2>
          <div className="slide-con">
            <div className="port__list" ref={sectionRef}>
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
      </div>
    </section>
  );
};

export default Port;
