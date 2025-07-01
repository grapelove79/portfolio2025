import { useLayoutEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

/**
 * targetSelector: 관찰할 요소의 selector (기본값 ".scroll__motion")
 * scopeRef: 컴포넌트에서 범위를 지정할 ref (필수!)
 */
const useScrollMotion = (scopeRef, targetSelector = ".scroll__motion") => {
  useLayoutEffect(() => {
    if (!scopeRef.current) return;

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(targetSelector);
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

      ScrollTrigger.refresh();
    }, scopeRef);

    return () => ctx.revert(); // context revert로 트리거 안전 제거
  }, [scopeRef, targetSelector]);
};

export default useScrollMotion;

