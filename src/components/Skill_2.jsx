import React, { useEffect,useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { skill } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const Skill = () => {
  const skillRef = useRef(null);
  const listRefs = useRef([]);

  // IntersectionObserver로 개별 항목 모션 처리
  
  useLayoutEffect(() => {
    const timeout = setTimeout(() => {
      const validRefs = listRefs.current.filter(Boolean); // null 제거

      if (validRefs.length === 0) return; // 유효한 요소가 없으면 종료

      const ctx = gsap.context(() => {
        validRefs.forEach((el, index) => {
          //if (!el) return; 
          //el이 없으면(return falsey)이면, 아래 코드를 실행하지 말고 해당 forEach 반복을 종료해라
          //el이 없으면 무시하고 다음으로

          // requestAnimationFrame(() => {
          gsap.set(el, { y: "70rem", opacity: 0 });

          ScrollTrigger.create({
            trigger: el,
            start: "top 80%",
            end: "bottom bottom",
            // end: "bottom 100%", // 필요 시 조정
            // toggleActions: "play none none reverse", // 보장용
            // once: true,
            invalidateOnRefresh: true,
            // markers: true,
            onEnter: () => {
              // console.log("ENTER:", el);
              gsap.to(el, {
                y: "0rem",
                opacity: 1,
                duration: 0.6,
                ease: "power2.out",
                delay: index * 0.15,
              });
            },
            onLeaveBack: () => {
              gsap.to(el, {
                y: "70rem",
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                delay: index * 0.15,
              });
            },
          });
        });

        ScrollTrigger.refresh();
      }, skillRef);

      return () => ctx.revert();
    }, 100); // 렌더 안정성 확보

    return () => clearTimeout(timeout);
  }, []);

  // 데스크탑 pin
  useEffect(() => {
    const matchMedia = ScrollTrigger.matchMedia({
      "(min-width: 1025px)": () => {
        ScrollTrigger.create({
          trigger: skillRef.current,
          start: "top top",
          end: "60% top",
          pin: ".sticky__wrap",
          pinSpacing: true,
          // markers: true,
        });
      },
      "(max-width: 1024px)": () => {
        gsap.set(".sticky__wrap", { clearProps: "all" });
      },
    });

    return () => {
      matchMedia.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="skill" className="skill" ref={skillRef}>
      <div className="skill__inner section--one">
        <div className="sticky__wrap">
          <h2 className="skill__title">
            기술 <em>Skills</em>
          </h2>
        </div>

        <div className="skill__desc">
          <ul className="skill__list">
            {skill.map((item, index) => (
              <li
                key={index}
                ref={(el) => {
                  if (el) listRefs.current[index] = el;
                }}
                style={{ transform: "translateY(70rem)", opacity: 0 }} // 초기값 CSS로
              >
                <strong className="skill__info">{item.info}</strong>
                <figure className="skill__icon">
                  <img src={item.icon} alt={item.info} />
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Skill;
