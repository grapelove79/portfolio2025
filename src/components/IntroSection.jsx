import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { intro } from "../constants";
import ResponsiveText from "../components/ResponsiveText";

gsap.registerPlugin(ScrollTrigger);

const IntroSection = () => {
  const bannerRef = useRef(null);
  const containerRef = useRef(null);
  const videowrapRef = useRef(null);
  const videoRef = useRef(null);
  const textRefs = useRef([]);

  // 1. 브라우저 크기에 따라 배너 클래스 resize 조정 (가로/세로 기준)
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

  // 2. ScrollTrigger 애니메이션 설정 및 상태 관리
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
          end: "400% top",              // 이전 end:"400% top"
          scrub: true,                  // 스크롤과 애니메이션 동기화 (부드럽게 연결)
          pin: true,
          invalidateOnRefresh: true,
          // markers: true,

          // 스크롤할 때마다 실행되는 함수
          onUpdate: (self) => {
            const degree = self.progress * 100;
            const progress = Math.floor(degree);

            const banner = bannerRef.current;
            const videoEl = videowrapRef.current;

            if (self.direction === -1) {
              // scroll up
              if (progress === 0) banner?.classList.remove("active");
              if (progress < 10) textRefs.current[0]?.classList.remove("active");
              if (progress < 35) textRefs.current[0]?.classList.remove("none");
              if (progress < 55) textRefs.current[1]?.classList.remove("active");
              if (progress < 80) videoEl?.classList.remove("active");
            } else if (self.direction === 1) {
              // scroll down
              if (progress > 1) banner?.classList.add("active");
              if (progress > 10) textRefs.current[0]?.classList.add("active");
              if (progress > 35) textRefs.current[0]?.classList.add("none");
              if (progress > 55) textRefs.current[1]?.classList.add("active");
              if (progress > 80) videoEl?.classList.add("active");
            }
          },
        },
      });

      timeline.to(containerRef.current, {
        opacity: 1,
        duration: 3.5,
      });
    }, containerRef);

    // 핵심 추가: ScrollTrigger 위치 초기화 (로딩 직후 렌더 지연 문제 방지)
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const handleLoaded = () => video.classList.add("loaded");
    video?.addEventListener("loadeddata", handleLoaded);

    return () => {
      ctx.revert(); // ScrollTrigger 제거
      clearTimeout(refreshTimeout);  // 언마운트 시 메모리 누수 방지
      video?.removeEventListener("loadeddata", handleLoaded);
    };
  }, []);

  return (
    <section className="video-section" ref={containerRef}>
      <div className="banner-box" ref={bannerRef}>
        <div className="banner-inner">
          <p>2025</p>
          <strong>Portfolio</strong>
        </div>
      </div>
      <div className="video-wrap" ref={videowrapRef}>
        <video ref={videoRef} src="/intro.mp4" muted playsInline autoPlay loop preload="auto" />
        <div className="txt_motion_box">
          {intro.map((text, index) => (
            <div
              key={index}
              className={`txt_motion txt_motion0${index + 1}`}
              ref={(el) => (textRefs.current[index] = el)}
            >
              <strong>{text.title}</strong>
              <div>
                <ResponsiveText
                  text={text.desc}
                  as="p"
                />
              </div>
              {/* <p>{text.desc}</p> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
