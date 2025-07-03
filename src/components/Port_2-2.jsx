import React, { useEffect, useRef, useState } from "react";
import { portText } from "../constants";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Port = () => {
  gsap.registerPlugin(ScrollTrigger);

  const horizontalRef = useRef(null); // 수평 스크롤 pin 대상
  const sectionRef = useRef(null);    // 수평 이동할 전체 wrapper
  const titleRef = useRef(null);      // 타이틀 너비 계산용

  const [dimensions, setDimensions] = useState({ workW: 0, innerW: 0 });

  // (1) 전체 width 계산 후 상태 저장
  useEffect(() => {
    const updateSizes = () => {
      if (!sectionRef.current || !titleRef.current) return;

      const workW = sectionRef.current.scrollWidth;
      const innerW = titleRef.current.offsetWidth;

      setDimensions({ workW, innerW });
      ScrollTrigger.refresh(); // trigger 갱신
    };

    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  // (2) ScrollTrigger를 활용한 수평 스크롤 트윈 설정
  useEffect(() => {
    if (!horizontalRef.current || !sectionRef.current) return;

    const { workW } = dimensions;
    const totalMove = workW - window.innerWidth;

    // 수평 이동 애니메이션 설정
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
        markers: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [dimensions]);

  // (3) 각 포트 아이템 텍스트 애니메이션 추가
  useEffect(() => {
    // 모든 .port__item 요소에 ScrollTrigger 트윈 추가
    const items = gsap.utils.toArray(".port__item");

    items.forEach((item, index) => {
      const desc = item.querySelector(".port__desc");

      // from-to 트윈으로 opacity 및 y 위치 애니메이션
      gsap.fromTo(
        desc,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            containerAnimation: ScrollTrigger.getById("horizontalScroll"), // 아래에서 id로 연결
            start: "left center", // 수평 기준에서 왼쪽이 center에 닿을 때
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="port" ref={horizontalRef}>
      <div className="port__inner">
        <h2 className="port__title scroll__motion" ref={titleRef}>
          포트폴리오 <em>Portfolio</em>
        </h2>

        <div className="slide-con">
          <div className="port__wrap" ref={sectionRef}>
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
