import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const useScrollMotion = (selector = ".scroll__motion", options = {}) => {
  useEffect(() => {
   // const isMobile = window.innerWidth <= 1024;
   // if (isMobile) return; // 모바일에서는 애니메이션 생략

    // 기존 트리거 제거 (중복 방지)
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    const defaultOptions = {
      scrub: 0.5,
      start: "top 75%",
      end: "bottom top",
      invalidateOnRefresh: true,
    };

    // 요소 렌더 이후 실행 보장
    requestAnimationFrame(() => {
      const elements = document.querySelectorAll(selector);

      elements.forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          ...defaultOptions,
          ...options,
          onEnter: () => el.classList.add("active"),
          onLeaveBack: () => el.classList.remove("active"),
        });
      });

      ScrollTrigger.refresh(); // 위치 정보 갱신
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [selector, options]); // options가 자주 바뀌는 객체라면 useMemo로 감싸는 것이 좋음
};

export default useScrollMotion;
