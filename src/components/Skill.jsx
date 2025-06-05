import React, { useLayoutEffect, useRef } from "react";
import { skillText } from "../constants";
import skill01 from "../assets/img/ico_html.svg";
import skill02 from "../assets/img/ico_css.svg";
import skill03 from "../assets/img/ico_js.svg";
import skill04 from "../assets/img/ico_jquery.svg";
import skill05 from "../assets/img/ico_sass.svg";
import skill06 from "../assets/img/ico_vs.svg";
import skill07 from "../assets/img/ico_git.svg";
import skill08 from "../assets/img/ico_github.svg";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";



const Skill = () => {
  const skillRef = useRef(null);
  const listRefs = useRef([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const timeout = setTimeout(() => {
      const ctx = gsap.context(() => {
        listRefs.current.forEach((el, index) => {
          if (!el) return; //el이 없으면(return falsey)이면, 아래 코드를 실행하지 말고 해당 forEach 반복을 종료해라
          //el이 없으면 무시하고 다음으로

          // gsap.set(el, { y: 99, opacity: 0 });

          ScrollTrigger.create({
            trigger: el,
            start: "top bottom",
            //end: "20% 100%", // 필요 시 조정
            markers: true,
            toggleActions: "play none none reverse", // 보장용
            invalidateOnRefresh: true,
            onEnter: () => {
              console.log("ENTER:", el);
              gsap.to(el, {
                y: 0,
                opacity: 0.8,
                duration: 0.6,
                ease: "power2.out",
                delay: index * 0.05,
              });
            },
            onLeaveBack: () => {
              gsap.to(el, {
                y: 50,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                delay: index * 0.05,
              });
            },
          });
        });

        ScrollTrigger.refresh();
      }, skillRef);

      return () => ctx.revert();
    }, 50); // 50~100ms 정도면 충분

    return () => clearTimeout(timeout);
  }, []);

  const skillIcons = [skill01, skill02, skill03, skill04, skill05, skill06, skill07, skill08];

  listRefs.current = [];

  return (
    <section id="skill" ref={skillRef}>
      <div className="skill__inner" >
        <h2 className="skill__title">
          Skills <em>나의 도전</em>
        </h2>
        <div className="skill__desc">
              <h3>{skillText.title}</h3>
              <p>{skillText.desc}</p>
          {/* {skillText.map((skill, key) => (
            <div key={key}>
              <span>{key + 1}.</span>
              <h3>{skill.title}</h3>
              <p>{skill.desc}</p>
            </div>
          ))} */}
          <ul className="skill__list" >
            {skillIcons.map((icon, index) => (
              // <li key={index} ref={(el) => (listRefs.current[index] = el)}>
              // <img className="skill__img" src={icon} alt="skill icon" />
              // </li>
              // <li key={index} ref={(el) => (listRefs.current[index] = el)}>
              //   <div className="trigger-box" />
              //   <img className="skill__img" src={icon} alt="skill icon" />
              // </li>

              <li key={index} ref={(el) => (listRefs.current[index] = el)}>
                <img className="skill__img" src={icon} alt="skill icon" />
              </li>

            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Skill;
