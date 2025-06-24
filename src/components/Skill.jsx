import React, { useLayoutEffect, useRef } from "react";
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

          gsap.set(el, { y: "90rem", opacity: 0 });

          ScrollTrigger.create({
            trigger: el,
            start: "top 80%",
            end: "bottom bottom",
            once: false,
            // end: "bottom 100%", // 필요 시 조정
            toggleActions: "play none none none", // 보장용
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
                y: "90rem",
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

  return (
    <section id="skill" ref={skillRef}>
      <div className="skill__inner" >
        <h2 className="skill__title scroll__motion">
          기술 <em>Skills</em>
        </h2>
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
