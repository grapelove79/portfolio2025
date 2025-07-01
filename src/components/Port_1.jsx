// 정상 작동 잘됨

import React, { useEffect, useRef, useState } from "react";
import { portText } from "../constants";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useScrollMotion from "../hooks/useScrollMotion";

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

    const handleResize = () => {
      updateSizes();
      // resize나 dimensions 계산 후 refresh()는 raf로 래핑하면 Reflow 안정적
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // (2) ScrollTrigger를 활용한 수평 스크롤 트윈 설정
  useEffect(() => {
    if (!horizontalRef.current || !wrapRef.current) return;

    const { workW, innerW, winW } = dimensions;

    // const section = horizontalRef.current;
    // if (!section) return;

    if (workW === 0) return;

    const totalMoveRaw = winW - innerW + (workW - winW);
    const totalMove = parseFloat(totalMoveRaw.toFixed(3));

    console.log("totalMove:", totalMove);

    // 기존 트윈 제거 (안전)
    // gsap.killTweensOf(wrapRef.current);
    // const tween = gsap.to(wrapRef.current, {

    const ctx = gsap.context(() => {
      gsap.to(wrapRef.current, {
        //  const scrollTriggerInstance =  gsap.to(wrapRef.current, {
        x: -totalMove, // 왼쪽으로 이동
        ease: "none",
        // duration:2.5,
        scrollTrigger: {
          trigger: horizontalRef.current,
          start: "top top",
          // end:`bottom+=100% bottom`, // 섹션 너비만큼 스크롤 거리 생성
          end: () => `bottom+=${workW} bottom`, // 섹션 너비만큼 스크롤 거리 생성
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          markers: true,
        },
      });
      //  }).scrollTrigger;


      // const calculatedEnd = scrollTriggerInstance.vars.end();  
      // console.log("Calculated end value: ", calculatedEnd);

      
    }, horizontalRef);
    // return () => {
    //   tween.scrollTrigger?.kill();
    //   tween.kill();
    // };
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    }
  }, [dimensions]);

  return (
    <section id="port" className="port">
      <div className="port__inner" ref={horizontalRef}>
        <div className="port__wrap">
          <h2 className="port__title scroll__motion" ref={titleRef}>
            포트폴리오 <em>Portfolio</em>
          </h2>
          <div className="slide-con">
            <div className="port__list" ref={wrapRef}>
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