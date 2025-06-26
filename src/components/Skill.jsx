import React, { useLayoutEffect, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import useScrollMotion from "../hooks/useScrollMotion";
import { skill } from "../constants";

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

const Skill = () => {

  useScrollMotion(); // 커스텀 훅 호출

  const skillRef = useRef(null);
  const listRefs = useRef([]);

  useLayoutEffect(() => {
    const timeout = setTimeout(() => {
      const validRefs = listRefs.current.filter(Boolean); // null 제거

      if (validRefs.length === 0) return; // 유효한 요소가 없으면 종료

      const ctx = gsap.context(() => {
        validRefs.forEach((el, index) => {
          //if (!el) return; 
          //el이 없으면(return falsey)이면, 아래 코드를 실행하지 말고 해당 forEach 반복을 종료해라
          //el이 없으면 무시하고 다음으로

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

  useEffect(() => {
    const matchMedia = ScrollTrigger.matchMedia({
      // 데스크탑 이상에서만 ScrollTrigger 적용
      "(min-width: 1025px)": function () {
        ScrollTrigger.create({
          trigger:skillRef.current,
          start: "top top",
          end: "60% top",
          pin: ".sticky__wrap",
          pinSpacing: true,
          markers: true,
        });
      },

      // 모바일/태블릿에서는 ScrollTrigger 제거 (필요 시 cleanup도 가능)
      "(max-width: 1024px)": function () {
       // `.sticky__wrap`에 pin 제거를 위해 초기화 조치
       gsap.set(".sticky__wrap", { clearProps: "all" });
      },
    });

    // 컴포넌트 언마운트 시 ScrollTrigger 전부 제거
    return () => {
      matchMedia.revert(); // matchMedia context 제거
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id="skill" className="skill" ref={skillRef}>
      <div className="skill__inner section--one" >
        <div className="sticky__wrap">
          <h2 className="skill__title">
         기술 <em>Skills</em>
          </h2>
        </div>

        <div className="skill__desc">
          <ul className="skill__list" >
            {skill.map((item, index) => (
              <li
                key={index}
                ref={(el) => {
                  if (el) listRefs.current[index] = el;
                }}
              >
                <strong className="skill__info">{item.info}</strong>
                <figure className="skill__icon">
                  <img src={item.icon} alt={item.info} />
                </figure>

              </li>
            ))}

            {/* {skillIcons.map((icon, index) => (
              <li
                key={index}
                ref={(el) => {
                  if (el && !listRefs.current.includes(el)) {
                    listRefs.current[index] = el;
                  }
                }}
              >
                <img className="skill__img" src={icon} alt="skill icon" />
              </li>
            ))} */}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Skill;
