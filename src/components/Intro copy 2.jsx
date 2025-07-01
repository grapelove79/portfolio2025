import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MotionComponent = () => {
  const containerRef = useRef(null);
  const motionRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
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
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {[...Array(5)].map((_, idx) => (
        <div
          key={idx}
          data-motionactive=""
          ref={(el) => (motionRefs.current[idx] = el)}
          className="motion-item"
        >
          Section {idx + 1}
        </div>
      ))}
    </div>
  );
};

export default MotionComponent;



// .motion-item {
//   opacity: 0;
//   transform: translateY(2rem);
//   transition: all 0.6s ease-out;
// }

// .motion-item.active {
//   opacity: 1;
//   transform: translateY(0);
// }


// 필요하시면 이 구조를 컴포넌트 분할하거나 props로 제어하는 방향으로 확장할 수도 있어요. 추가 요청 있으면 알려주세요!


// 메인에서만 쓰이는 scroll-motion (end값 인위적으로 늘리는거때문에 별도 처리)
function mainScrollMotion() {
  if ($(".main-motion").size() > 0) {
    $(".main-motion:visible").each(function (q) {
      gsap.to($(this), {
        scrollTrigger: {
          trigger: $(this),
          start:()=> "top 75%",
          end: "bottom top",
          toggleClass: { targets: $(".main-motion:visible").eq(q), className: "active" },
          once: true,
          // markers: true,
        },
      });
    });
  }

  $(window).on('load', function(){
        $('[data-motionActive]').each(function(idx,item){
            ScrollTrigger.create({
                id:'sec' + idx,
                trigger: $(item),
                scrub: 0.5,
                start:'top 90%',
                invalidateOnRefresh: true,
                onEnter:function(){
                    $(item).addClass('active');
                },
                onLeaveBack:function(){
                	$(item).removeClass('active');
                },
            })
        });
        Motion();
    });