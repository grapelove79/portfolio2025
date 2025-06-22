import React, { useEffect } from "react";
import { careerText } from "../constants";
import useScrollMotion from "../hooks/useScrollMotion";

const Career = () => {
  useScrollMotion(); // 커스텀 훅 

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

  return (
    <section id="career">
      <div className="career__inner">
        <h2 className="career__title scroll__motion">경력 <em>Career</em></h2>
        <div className="career__wrap scroll__motion">
          {careerText.map((career, key) => (
            <article className={`career__item s${key + 1}`} key={key}>
              <div className="title__wrap">
                <p className="date">
                  {career.date}
                </p>
                <h3 className="title">{career.title}</h3>
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