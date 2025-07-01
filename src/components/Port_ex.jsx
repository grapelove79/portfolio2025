import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WorkSection = () => {
  const wrapRef = useRef(null); // .work-list-wrap
  const titleRef = useRef(null); // .section .title-wrap
  const fixedRef = useRef(null); // .work-fixed

  const [dimensions, setDimensions] = useState({
    workW: 0,
    innerW: 0,
    winW: 0,
  });

  useEffect(() => {
    const updateSizes = () => {
      if (!wrapRef.current || !titleRef.current) return;
      const workW = wrapRef.current.offsetWidth;
      const innerW = titleRef.current.offsetWidth;
      const winW = window.innerWidth;
      setDimensions({ workW, innerW, winW });
      ScrollTrigger.refresh();
    };

    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  useEffect(() => {
    if (!wrapRef.current || !fixedRef.current) return;

    const { workW, innerW, winW } = dimensions;
    const totalMove = winW - innerW + (workW - winW);

    const tween = gsap.to(wrapRef.current, {
      x: 0, // 초기화
      ease: "none",
      scrollTrigger: {
        trigger: fixedRef.current,
        start: "top top",
        end: "bottom+=150% bottom",
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const xVal = self.progress.toFixed(3) * -totalMove;
          gsap.to(wrapRef.current, { x: xVal, duration: 0.2, ease: "none" });
        },
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [dimensions]);

  return (
    <section className="work-fixed" ref={fixedRef}>
      <div className="section">
        <div className="title-wrap" ref={titleRef}>
          <h2>Our Work</h2>
        </div>
        <div className="work-list-wrap" ref={wrapRef}>
          {/* 반복 아이템 렌더링 */}
          {/* 예시용 */}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="work-item">
              <h3>Project {i + 1}</h3>
              <p>내용입니다.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
