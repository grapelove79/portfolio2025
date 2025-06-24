import React, { useEffect } from "react";
import profile from "../assets/img/profile.png";
import { introText } from "../constants";
import gsap from "gsap";
import ResponsiveText from "../components/ResponsiveText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

const Intro = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".intro__motion");

    elements.forEach((item, idx) => {
      ScrollTrigger.create({
        // id: "intro" + idx,
        trigger: item,
        scrub: 0.5,
        start: "top 90%",
        invalidateOnRefresh: true,
        // markers: true,
        onEnter: () => {
          item.classList.add("active");
        },
        onLeaveBack: () => {
          item.classList.remove("active");
        },
      });
    })
    // 💡 ScrollTrigger 정리
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="intro">
      <div className="intro__inner">
        <div className="title__box intro__motion">
          <h2 className="intro__title">
            <strong>{introText.title[0]}</strong>
            <strong>{introText.title[1]}</strong>
          </h2>
        </div>
        <div className="intro__text">
          <div className="img intro__motion">
            <img src={profile} alt="어바웃" />
          </div>
          <h3 className="title intro__motion">
            {introText.subtitle}
          </h3>
          <div className="text">
            <div className="intro__motion">
              <ResponsiveText
                text={introText.desc[0]}
                as="p"
              />
            </div>
            <div className="intro__motion">
              <ResponsiveText
                text={introText.desc[1]}
                as="p"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Intro;