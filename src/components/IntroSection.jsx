// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import { intro } from "../constants";
// import ResponsiveText from "../components/ResponsiveText";

// gsap.registerPlugin(ScrollTrigger);

// const IntroSection = () => {
//   const bannerRef = useRef(null);
//   const containerRef = useRef(null);
//   const videowrapRef = useRef(null);
//   const videoRef = useRef(null);
//   const textRefs = useRef([]);

//   // 1. 브라우저 크기에 따라 배너 클래스 resize 조정 (가로/세로 기준)
//   useEffect(() => {
//     const handleResize = () => {
//       const widthW = window.innerWidth;
//       const heightH = window.innerHeight;

//       if (bannerRef.current) {
//         if (widthW > heightH) {
//           bannerRef.current.classList.add("widthW");
//           bannerRef.current.classList.remove("heightH");
//         } else {
//           bannerRef.current.classList.add("heightH");
//           bannerRef.current.classList.remove("widthW");
//         }
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize(); // mount 시 최초 1회 실행

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   // 2. ScrollTrigger 애니메이션 설정 및 상태 관리
//   useEffect(() => {
//     const video = videoRef.current;
//     video.loop = true;
//     video.muted = true;
//     video.play();

//     // 상태를 저장할 context
//     const ctx = gsap.context(() => {
//       const timeline = gsap.timeline({
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: "top top",
//           end: "400% top",              // 이전 end:"400% top"
//           scrub: false,                  // 스크롤과 애니메이션 동기화 (부드럽게 연결)
//           pin: true,
//           invalidateOnRefresh: true,
//           // markers: true,

//           // 스크롤할 때마다 실행되는 함수
//           onUpdate: (self) => {
//             const degree = self.progress * 100;
//             const progress = Math.floor(degree);

//             const banner = bannerRef.current;
//             const videoEl = videowrapRef.current;

//             if (self.direction === -1) {
//               // scroll up
//               if (progress === 0) banner?.classList.remove("active");
//               if (progress < 10) textRefs.current[0]?.classList.remove("active");
//               if (progress < 35) textRefs.current[0]?.classList.remove("none");
//               if (progress < 55) textRefs.current[1]?.classList.remove("active");
//               if (progress < 80) videoEl?.classList.remove("active");
//             } else if (self.direction === 1) {
//               // scroll down
//               if (progress > 1) banner?.classList.add("active");
//               if (progress > 10) textRefs.current[0]?.classList.add("active");
//               if (progress > 35) textRefs.current[0]?.classList.add("none");
//               if (progress > 55) textRefs.current[1]?.classList.add("active");
//               if (progress > 80) videoEl?.classList.add("active");
//             }
//           },
//         },
//       });

//       timeline.to(containerRef.current, {
//         opacity: 1,
//         duration: 3.5,
//       });
//     }, containerRef);

//     // 핵심 추가: ScrollTrigger 위치 초기화 (로딩 직후 렌더 지연 문제 방지)
//     const refreshTimeout = setTimeout(() => {
//       ScrollTrigger.refresh();
//     }, 100);

//     const handleLoaded = () => video.classList.add("loaded");
//     video?.addEventListener("loadeddata", handleLoaded);

//     return () => {
//       ctx.revert(); // ScrollTrigger 제거
//       clearTimeout(refreshTimeout);  // 언마운트 시 메모리 누수 방지
//       video?.removeEventListener("loadeddata", handleLoaded);
//     };
//   }, []);

//   return (
//     <section id="home" className="video-section" ref={containerRef}>
//       <div className="banner-box" ref={bannerRef}>
//         <div className="banner-inner">
//           <p>2025</p>
//           <strong>Portfolio</strong>
//         </div>
//       </div>
//       <div className="video-wrap" ref={videowrapRef}>
//         <video ref={videoRef} src="/intro.mp4" muted playsInline autoPlay loop preload="auto" />
//         <div className="txt_motion_box">
//           {intro.map((text, index) => (
//             <div
//               key={index}
//               className={`txt_motion txt_motion0${index + 1}`}
//               ref={(el) => (textRefs.current[index] = el)}
//             >
//               <strong>{text.title}</strong>
//               <div>
//                 <ResponsiveText
//                   text={text.desc}
//                   as="p"
//                 />
//               </div>
//               {/* <p>{text.desc}</p> */}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default IntroSection;

import React, { useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { intro } from "../constants";
import ResponsiveText from "../components/ResponsiveText";

gsap.registerPlugin(ScrollTrigger);

/* 
ScrollTrigger.refresh()를 useLayoutEffect로 이동 (레이아웃 계산 전 실행되도록).
requestAnimationFrame 사용해 스크롤 업데이트 최적화.
이벤트 리스너, GSAP context 및 타이머는 정확히 정리.
video.play() → try-catch로 처리 (브라우저 제한 고려).
*/

const IntroSection = () => {
  const bannerRef = useRef(null);
  const containerRef = useRef(null);
  const videowrapRef = useRef(null);
  const videoRef = useRef(null);
  const textRefs = useRef([]);

  // 1. 화면 비율에 따른 배너 클래스 설정
  useEffect(() => {
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      if (!bannerRef.current) return;
      const banner = bannerRef.current;

      if (innerWidth > innerHeight) {
        banner.classList.add("widthW");
        banner.classList.remove("heightH");
      } else {
        banner.classList.add("heightH");
        banner.classList.remove("widthW");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // mount 시 최초 실행
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 2. GSAP 애니메이션 및 ScrollTrigger 적용
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.loop = true;
    video.muted = true;

    // Safari 등 autoplay 오류 방지
    try {
      video.play();
    } catch (err) {
      console.warn("Video autoplay failed", err);
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "400% top",
          scrub: false,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = Math.floor(self.progress * 100);
            const banner = bannerRef.current;
            const videoWrap = videowrapRef.current;

            if (!banner || !videoWrap || !textRefs.current.length) return;

            if (self.direction === -1) {
              if (progress === 0) banner.classList.remove("active");
              if (progress < 10) textRefs.current[0]?.classList.remove("active");
              if (progress < 35) textRefs.current[0]?.classList.remove("none");
              if (progress < 55) textRefs.current[1]?.classList.remove("active");
              if (progress < 80) videoWrap.classList.remove("active");
            } else {
              if (progress > 1) banner.classList.add("active");
              if (progress > 10) textRefs.current[0]?.classList.add("active");
              if (progress > 35) textRefs.current[0]?.classList.add("none");
              if (progress > 55) textRefs.current[1]?.classList.add("active");
              if (progress > 80) videoWrap.classList.add("active");
            }
          },
        },
      });

      tl.to(containerRef.current, { opacity: 1, duration: 3.5 });
    }, containerRef);

    // video 로드 상태 처리
    const handleLoaded = () => video.classList.add("loaded");
    video.addEventListener("loadeddata", handleLoaded);

    return () => {
      ctx.revert(); // cleanup GSAP context
      video.removeEventListener("loadeddata", handleLoaded);
    };
  }, []);

  // 3. ScrollTrigger 위치 갱신 (layout 이후)
  useLayoutEffect(() => {
    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="home" className="video-section" ref={containerRef}>
      <div className="banner-box" ref={bannerRef}>
        <div className="banner-inner">
          <p>2025</p>
          <strong>Portfolio</strong>
        </div>
      </div>
      <div className="video-wrap" ref={videowrapRef}>
        <video
          ref={videoRef}
          src="/intro.mp4"
          muted
          playsInline
          autoPlay
          loop
          preload="auto"
        />
        <div className="txt_motion_box">
          {intro.map((text, index) => (
            <div
              key={index}
              className={`txt_motion txt_motion0${index + 1}`}
              ref={(el) => (textRefs.current[index] = el)}
            >
              <strong>{text.title}</strong>
              <div>
                <ResponsiveText text={text.desc} as="p" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
