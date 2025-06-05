import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IntroSection = () => {
  const bannerRef = useRef(null);
  const containerRef = useRef(null);
  const videowrapRef = useRef(null);
  const videoRef = useRef(null);
  const textRefs = useRef([]);

  // 화면 비율에 따라 class 추가 (widthW / heightH)
  useEffect(() => {
    const handleResize = () => {
      const widthW = window.innerWidth;
      const heightH = window.innerHeight;

      if (bannerRef.current) {
        if (widthW > heightH) {
          bannerRef.current.classList.add("widthW");
          bannerRef.current.classList.remove("heightH");
        } else {
          bannerRef.current.classList.add("heightH");
          bannerRef.current.classList.remove("widthW");
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    video.loop = true;
    video.muted = true;
    video.play();

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "400% top",
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
          // markers: true,

          // 👇 Header 감지 비활성화 시작
          onEnter: () => (window.__disableHeaderScroll__ = true),
          onEnterBack: () => (window.__disableHeaderScroll__ = true),
          // 👇 Header 감지 비활성화 해제
          onLeave: () => (window.__disableHeaderScroll__ = false),
          onLeaveBack: () => (window.__disableHeaderScroll__ = false),

          onUpdate: (self) => {
            const degree = self.progress * 100;
            const progress = Math.floor(degree);

            const banner = bannerRef.current;
            const videoEl = videowrapRef.current;

            if (self.direction === -1) {
              // scroll up
              if (progress < 1) banner?.classList.remove("active");
              if (progress < 10) textRefs.current[0]?.classList.remove("active");
              if (progress < 35) textRefs.current[0]?.classList.remove("none");
              if (progress < 55) textRefs.current[1]?.classList.remove("active");
              if (progress < 80) videoEl?.classList.remove("active");
            } else {
              // scroll down
              if (progress > 1) banner?.classList.add("active");
              if (progress < 10) textRefs.current[0]?.classList.add("active");
              if (progress > 35) textRefs.current[0]?.classList.add("none");
              if (progress > 55) textRefs.current[1]?.classList.add("active");
              if (progress > 80) videoEl?.classList.add("active");
            }
          },
        },
      });

      // Fade-in 효과
      timeline.to(containerRef.current, {
        opacity: 1,
        duration: 3.5,
      });
    }, containerRef);

    return () => {
      window.__disableHeaderScroll__ = false; // 컴포넌트 unmount 시 감지 복구
      ctx.revert();
    };
  }, []);

  return (
    <section className="video-section" ref={containerRef}>
      <div className="banner-box" ref={bannerRef}>
        <div className="banner-inner">
          <span>2025</span>
          <strong>portfolio</strong>
        </div>
      </div>

      <div className="video-wrap" ref={videowrapRef}>
        <video ref={videoRef} src="/intro.mp4" muted playsInline />
        <div className="txt_motion_box">
          <div
            className="txt_motion txt_motion01"
            ref={(el) => (textRefs.current[0] = el)}
          >
            <strong>여행을 준비하세요</strong>
            <p>새로운 시작을 위한 첫 걸음</p>
          </div>
          <div
            className="txt_motion txt_motion02"
            ref={(el) => (textRefs.current[1] = el)}
          >
            <strong>추억을 간직하세요</strong>
            <p>당신만의 스토리를 만들어가세요</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;


// --------------------------------
// ScrollTrigger 감지 구간에서 헤더 감지 비활성화 처리 포함 전체 코드

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import useAppStore from "../store/useAppStore"; // Zustand 상태 관리 훅

gsap.registerPlugin(ScrollTrigger);

const IntroSection = () => {
  const bannerRef = useRef(null);
  const containerRef = useRef(null);
  const videowrapRef = useRef(null);
  const videoRef = useRef(null);
  const textRefs = useRef([]);

  const { setScrollDisabled } = useAppStore(); // Zustand에서 스크롤 감지 끄기/켜기 상태 제어

  // ✅ 1. 브라우저 크기에 따라 클래스 조정 (가로/세로 기준)
  useEffect(() => {
    const handleResize = () => {
      const widthW = window.innerWidth;
      const heightH = window.innerHeight;

      if (bannerRef.current) {
        if (widthW > heightH) {
          bannerRef.current.classList.add("widthW");
          bannerRef.current.classList.remove("heightH");
        } else {
          bannerRef.current.classList.add("heightH");
          bannerRef.current.classList.remove("widthW");
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // mount 시 최초 1회 실행

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ✅ 2. ScrollTrigger 설정 및 상태 관리
  useEffect(() => {
    const video = videoRef.current;
    video.loop = true;
    video.muted = true;
    video.play();

    // 상태를 저장할 context
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "400% top",
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
          // markers: true,

          // ✅ ScrollTrigger 애니메이션 시작 시 스크롤 감지 OFF
          // ScrollTrigger 영역 진입 시 isScrollDisabled = true
          onEnter: () => setScrollDisabled(true),
          onEnterBack: () => setScrollDisabled(true),

          // ✅ ScrollTrigger 영역을 벗어나면 다시 감지 ON
          // ScrollTrigger 영역을 벗어나면 isScrollDisabled = false
          onLeave: () => setScrollDisabled(false),
          onLeaveBack: () => setScrollDisabled(false),

          onUpdate: (self) => {
            const degree = self.progress * 100;
            const progress = Math.floor(degree);

            const banner = bannerRef.current;
            const videoEl = videowrapRef.current;

            if (self.direction === -1) {
              // ⬆️ 스크롤 업
              if (progress < 1) banner?.classList.remove("active");
              if (progress < 10) textRefs.current[0]?.classList.remove("active");
              if (progress < 35) textRefs.current[0]?.classList.remove("none");
              if (progress < 55) textRefs.current[1]?.classList.remove("active");
              if (progress < 80) videoEl?.classList.remove("active");
            } else {
              // ⬇️ 스크롤 다운
              if (progress > 1) banner?.classList.add("active");
              if (progress < 10) textRefs.current[0]?.classList.add("active");
              if (progress > 35) textRefs.current[0]?.classList.add("none");
              if (progress > 55) textRefs.current[1]?.classList.add("active");
              if (progress > 80) videoEl?.classList.add("active");
            }
          },
        },
      });

      // 간단한 트윈 예시 (초기 오프닝 등)
      timeline.to(containerRef.current, {
        opacity: 1,
        duration: 3.5,
      });
    }, containerRef);

    return () => {
      ctx.revert();
      setScrollDisabled(false); // 컴포넌트 언마운트 시에도 안전하게 감지 복구
    };
  }, [setScrollDisabled]);

  return (
    <section className="video-section" ref={containerRef}>
      {/* 상단 배너 영역 */}
      <div className="banner-box" ref={bannerRef}>
        <div className="banner-inner">
          <span>2025</span>
          <strong>portfolio</strong>
        </div>
      </div>

      {/* 비디오 + 텍스트 오버레이 */}
      <div className="video-wrap" ref={videowrapRef}>
        <video ref={videoRef} src="/intro.mp4" muted playsInline />
        <div className="txt_motion_box">
          {/* 텍스트 시퀀스 1 */}
          <div
            className="txt_motion txt_motion01"
            ref={(el) => (textRefs.current[0] = el)}
          >
            <strong>여행을 준비하세요</strong>
            <p>새로운 시작을 위한 첫 걸음</p>
          </div>

          {/* 텍스트 시퀀스 2 */}
          <div
            className="txt_motion txt_motion02"
            ref={(el) => (textRefs.current[1] = el)}
          >
            <strong>추억을 간직하세요</strong>
            <p>당신만의 스토리를 만들어가세요</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;

