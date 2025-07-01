import React, { useEffect, useRef, useState } from "react";
import { portText } from "../constants";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useScrollMotion from "../hooks/useScrollMotion";

gsap.registerPlugin(ScrollTrigger);

const Port = () => {
  const scopeRef = useRef(null);

  // 선택자 변경 가능: ".my-motion"
  useScrollMotion(scopeRef);

  const horizontalRef = useRef(null);
  const wrapRef = useRef(null);
  const titleRef = useRef(null);

  const [dimensions, setDimensions] = useState({
    workW: 0,
    innerW: 0,
    winW: 0,
  });

  // (1) 슬라이드 너비 계산
  useEffect(() => {
    const updateSizes = () => {
      if (!wrapRef.current || !titleRef.current) return;
      const workW = wrapRef.current.offsetWidth;
      const innerW = titleRef.current.offsetWidth;
      const winW = window.innerWidth;
      setDimensions({ workW, innerW, winW });
    };

    updateSizes();

    const handleResize = () => {
      updateSizes();
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // (2) 수평 스크롤 애니메이션 설정
  useEffect(() => {
    if (!horizontalRef.current || !wrapRef.current) return;
    const { workW, innerW, winW } = dimensions;
    if (workW === 0) return;

    const totalMoveRaw = winW - innerW + (workW - winW);
    const totalMove = parseFloat(totalMoveRaw.toFixed(3));

    let raf;
    let mm;
    const ctx = gsap.context(() => {
      gsap.to(wrapRef.current, {
        x: -totalMove,
        ease: "none",
        scrollTrigger: {
          trigger: horizontalRef.current,
          start: "top top",
          end: () => `bottom+=${workW} bottom`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          //markers: true,
        },
      });

      mm = ScrollTrigger.matchMedia({
        "(min-width: 1025px)": () => {
          raf = requestAnimationFrame(() => {
            try {
              ScrollTrigger.refresh();
            } catch (e) {
              console.warn(e);
            }
          });
        },
        "(max-width: 1024px)": () => {
          raf = requestAnimationFrame(() => {
            try {
              ScrollTrigger.refresh();
            } catch (e) {
              console.warn(e);
            }
          });
        },
      });
    }, horizontalRef);

    return () => {
      cancelAnimationFrame(raf);
      mm?.revert();
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [dimensions]);

  return (
    <section id="port" className="port" ref={scopeRef}>
      <div className="port__inner" ref={horizontalRef}>
        <div className="port__wrap">
          <h2 className="port__title scroll__motion" ref={titleRef}>
            포트폴리오 <em>Portfolio</em>
          </h2>
          <div className="slide-con">
            <div className="port__list" ref={wrapRef}>
              {portText.map((port, key) => (
                <article className={`port__item p${key + 1}`} key={key}>
                  <a
                    href={port.view}
                    target="_blank"
                    className="port__item-link"
                    rel="noreferrer noopener"
                  >
                    <div className="port__img">
                      <img src={port.img} alt={port.name} />
                    </div>
                    <div className="port__desc">
                      <h3 className="company">{port.company}</h3>
                      <h3 className="title">{port.title}</h3>
                      <p className="desc">{port.desc}</p>
                      <span className="arrow"></span>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Port;
