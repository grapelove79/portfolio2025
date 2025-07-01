import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { skill } from "../constants";

/**
 * - li마다 ScrollTrigger를 만드는 대신, IntersectionObserver를 사용해도 동일한 enter/leave 효과가 가능합니다.
 * - IntersectionObserver는 스크롤 연산과 별도의 쓰레드에서 실행되어 Reflow 부하 ↓
 */

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

const Skill = () => {
  const skillRef = useRef(null);
  const listRefs = useRef([]);

  // IntersectionObserver로 개별 항목 모션 처리
  useEffect(() => {
    if (!listRefs.current.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = listRefs.current.indexOf(entry.target);

          if (entry.isIntersecting) {
            gsap.to(entry.target, {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              delay: index * 0.1,
            });
            observer.unobserve(entry.target); 
          } else {
            gsap.to(entry.target, {
              y: "70rem",
              opacity: 0,
              duration: 0.6,
              ease: "power2.out",
              delay: index * 0.1,
            });
            observer.unobserve(entry.target); 
          }
        });
      },
      {
        threshold: 0.1, // 적절한 진입 비율
        rootMargin: "0px 0px -10% 0px", // 진입 시점 미세 조절
      }
    );

    listRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();  // 메모리 누수 방지
  }, []);

  // 데스크탑 pin 고정
  useEffect(() => {
    const matchMedia = ScrollTrigger.matchMedia({
      // 데스크탑 이상에서만 ScrollTrigger 적용
      "(min-width: 1025px)": () => {
        // "(min-width: 1025px)": function () {
        ScrollTrigger.create({
          trigger: skillRef.current,
          start: "top top",
          end: "60% top",
          pin: ".sticky__wrap",
          pinSpacing: true,
          // markers: true,
        });

        // 데스크탑 pin 설정 후 refresh
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      },

      // 모바일/태블릿에서는 ScrollTrigger 제거 (필요 시 cleanup도 가능)
      "(max-width: 1024px)": () => {
        // `.sticky__wrap`에 pin 제거를 위해 초기화 조치
        gsap.set(".sticky__wrap", { clearProps: "all" });

        // 모바일 해제 후에도 refresh
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      },
    });

    // 컴포넌트 언마운트 시 ScrollTrigger 전부 제거
    return () => {
      matchMedia.revert(); // matchMedia context 제거
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());  // 안전하게 제거
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
                style={
                  {
                    transform: "translateY(70rem)",  // 초기값 깜빡임 방지(gsap set가 동일해야 함)
                    opacity: 0
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