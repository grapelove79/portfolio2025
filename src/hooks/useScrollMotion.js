import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const useScrollMotion = () => {
  useEffect(() => {
      const elements = document.querySelectorAll(".scroll__motion");

      elements.forEach((item, idx) => {
        ScrollTrigger.create({
          // id: "motion-" + idx,
          trigger: item,
          scrub: false,
          start: "top 75%",
          end: "bottom top",
          once: true,
          // markers: true,
          invalidateOnRefresh: true,
          onEnter: () => {
            item.classList.add("active");
          },
          onLeaveBack: () => {
            item.classList.remove("active");
          },
        });
        ScrollTrigger.refresh(); // 위치 정보 갱신
      });
      // ScrollTrigger 정리
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
  }, []);
};

export default useScrollMotion;