import React, { useEffect, useRef } from "react";
import { careerText } from "../constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

const Career = () => {

  useEffect(() => {
    // 100vh 대신 JS로 실제 뷰포트 높이 계산해서 적용:
    // 모바일 브라우저는 주소창 높이 변화, 가상 키보드, 100vh 계산 문제로 인해 height: 100vh나 flexbox 기반의 중앙 정렬이 깨질 수 있음.
    // 특히 iOS는 Safari에서 100vh가 보이는 영역(viewport)에 따라 다르게 해석
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);


  const careerRef = useRef(null);

  useEffect(() => {
    
    ScrollTrigger.matchMedia({
      "(min-width: 1025px)": function () {
        gsap.timeline({
          scrollTrigger: {
            id: "career",
            trigger: careerRef.current,
            pin: true,
            start: "top top",
            end: "500% bottom",
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
          .to(careerRef.current.querySelectorAll(".career__wrap article")[0], {
            top: 0,
          })
          .to(careerRef.current.querySelectorAll(".career__wrap article")[0], {
            scale: 0.88,
          })
          // .to(careerRef.current.querySelectorAll(".career__wrap article")[0].querySelector(".bg"), {
          //   opacity: 1,
          // }, "<")
          .to(careerRef.current.querySelectorAll(".career__wrap article")[1], {
            top: "7.4%",
          }, "=-.4")
          .to(careerRef.current.querySelectorAll(".career__wrap article")[1], {
            scale: 0.94,
          }, "=-.2")
          // .to(careerRef.current.querySelectorAll(".career__wrap article")[1].querySelector(".bg"), {
          //   opacity: 1,
          // }, "<")
          .to(careerRef.current.querySelectorAll(".career__wrap article")[2], {
            top: "14.8%",
          }, "=-.2");
      },

      "(max-width: 1024px)": function () {
        gsap.timeline({
          scrollTrigger: {
            id: "career",
            trigger: careerRef.current,
            pin: true,
            start: "top top",
            end: "300% bottom",
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
          .to(careerRef.current.querySelectorAll(".career__wrap article")[0], {
            top: 0,
          })
          .to(careerRef.current.querySelectorAll(".career__wrap article")[0], {
            scale: 0.88,
          })
          .to(careerRef.current.querySelectorAll(".career__wrap article")[1], {
            top: "7.4%",
          }, "=-.4")
          .to(careerRef.current.querySelectorAll(".career__wrap article")[1], {
            scale: 0.94,
          }, "=-.2")  
          .to(careerRef.current.querySelectorAll(".career__wrap article")[2], {
            top: "14.8%",
          }, "=-.2");
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);


  return (
    <section id="career" className="career" ref={careerRef}>
      <div className="career__inner">
        <h2 className="career__title">경력 <em>Career</em></h2>
        <div className="career__wrap">
          {careerText.map((career, key) => (
            <article className={`career__item s${key + 1}`} key={key}>
              <div className="title__wrap">
                <div className="title__inner">
                  <p className="date">
                    {career.date}
                  </p>
                  <h3 className="title">{career.title}</h3>
                </div>
              </div>
              <div className="info">
                <dl><dt>부서명</dt><dd>{career.info[0]}</dd></dl>
                <dl><dt>담당직무</dt><dd>{career.info[1]}</dd></dl>
                <dl><dt>담당업무</dt><dd>{career.info[2]}</dd></dl>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Career;
