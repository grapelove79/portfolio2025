import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const useScrollMotion = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".scroll__motion");
    const triggers = [];

    elements.forEach((item) => {
      const trigger = ScrollTrigger.create({
        trigger: item,
        start: "top 75%",
        end: "bottom top",
        once: false,
        scrub: false,
        invalidateOnRefresh: true,
        onEnter: () => item.classList.add("active"),
        onLeaveBack: () => item.classList.remove("active"),
      });
      triggers.push(trigger);
    });

    // 위치 갱신은 전체 트리거를 생성한 뒤 한 번만
    ScrollTrigger.refresh();

    return () => {
      // 해당 훅에서 생성한 트리거만 제거
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);
};

export default useScrollMotion;