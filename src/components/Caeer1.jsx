import React, { useEffect, useRef } from "react";
import { careerText } from "../constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

const Career = () => {
  const careerRef = useRef(null);

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

  // GSAP ScrollTrigger 설정
  useEffect(() => {
    const section = careerRef.current;
    if (!section) return;

    const articles = section.querySelectorAll(".career__wrap article");
    if (articles.length < 3) return; // article이 부족하면 실행하지 않음

    // 다음 렌더링 프레임에서 실행 (요소 렌더 보장)
    requestAnimationFrame(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 1025px)": () => createTimeline(articles, "500%"),
        "(max-width: 1024px)": () => createTimeline(articles, "300%"),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const createTimeline = (articles, endValue) => {
    gsap.timeline({
      scrollTrigger: {
        id: "career",
        trigger: careerRef.current,
        pin: true,
        start: "top top",
        end: `${endValue} bottom`,
        scrub: true,
        invalidateOnRefresh: true,
      },
    })
      .to(articles[0], { top: 0 })
      .to(articles[0], { scale: 0.88 })
      .to(articles[0].querySelector(".bg"), { opacity: 1 }, "<")
      .to(articles[1], { top: "7.4%" }, "=-.4")
      .to(articles[1], { scale: 0.94 }, "=-.2")
      .to(articles[1].querySelector(".bg"), { opacity: 1 }, "<")
      .to(articles[2], { top: "14.8%" }, "=-.2");
  };

  return (
    <section id="career" className="career" ref={careerRef}>
      <div className="career__inner">
        <h2 className="career__title">경력 <em>Career</em></h2>
        <div className="career__wrap">
          {careerText.map((career, key) => (
            <article className={`career__item s${key + 1}`} key={key}>
              <div className="title__wrap">
                <div className="title__inner">
                  <p className="date">{career.date}</p>
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

----

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
     const item = careerRef.current;
    if (!item) return;

     const articles =  item.querySelectorAll(".career__wrap article");
    requestAnimationFrame(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 1025px)": (e) => {
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
            .to(articles[0], {top: 0,})
            .to(articles[0], {scale: 0.88,})
            .to(articles[0].querySelector(".bg"), {opacity: 1,}, "<")
            .to(articles[1], {top: "7.4%",}, "=-.4")
            .to(articles[1], {scale: 0.94,}, "=-.2")
            .to(articles[1].querySelector(".bg"), {opacity: 1,}, "<")
            .to(articles[2], {top: "14.8%",}, "=-.2");
        },

        "(max-width: 1024px)": (e) => {
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
            .to(articles[0], {top: 0,})
            .to(articles[0], {scale: 0.88,})
            .to(articles[0].querySelector(".bg"), {opacity: 1,}, "<")
            .to(articles[1], {top: "7.4%",}, "=-.4")
            .to(articles[1], {scale: 0.94,}, "=-.2")
            .to(articles[1].querySelector(".bg"), {opacity: 1,}, "<")
            .to(articles[2], {top: "14.8%",}, "=-.2");
        },
      });
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
