import React from "react";
import { careerText } from "../constants";
import useScrollMotion from "../hooks/useScrollMotion";

const Career = () => {
  useScrollMotion();

  return (
    <section id="career">
      <div className="career__inner">
        <h2 className="career__title scroll__motion">경력 <em>Career</em></h2>
        <div className="career__wrap scroll__motion">
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