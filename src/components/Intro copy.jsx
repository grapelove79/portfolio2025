import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MotionComponent = () => {
  const containerRef = useRef(null);
  const motionRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => { //React 환경에서 ScrollTrigger를 안전하게 등록/해제
      motionRefs.current.forEach((el, idx) => {
        if (!el) return;

        ScrollTrigger.create({
          id: `sec${idx}`,
          trigger: el,
          scrub: 0.5,
          start: 'top 90%',
          invalidateOnRefresh: true,
          onEnter: () => {
            el.classList.add('active');
          },
          onLeaveBack: () => {
            el.classList.remove('active');
          }
        });
      });

      // Motion() 함수도 여기에 실행
      // Motion(); // 이 함수는 따로 정의되어 있어야 합니다
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {[...Array(5)].map((_, idx) => (
        <div
          key={idx}
          data-motionactive=""
          ref={(el) => (motionRefs.current[idx] = el)} //	여러 DOM 요소를 motionRefs.current 배열에 담음
          className="motion-item"
        >
          Section {idx + 1}
        </div>
      ))}
    </div>
  );
};

export default MotionComponent;
