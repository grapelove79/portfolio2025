import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { intro } from "../constants";
import useIsMobile from "../hooks/useIsMobile";
import useAppStore from "../hooks/useAppStore";

gsap.registerPlugin(ScrollTrigger);

const IntroSection = () => {
  const bannerRef = useRef(null);
  const containerRef = useRef(null);
  const videowrapRef = useRef(null);
  const videoRef = useRef(null);
  const textRefs = useRef([]);
  const isMobile = useIsMobile();
  const { setHeaderHidden } = useAppStore();

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

            if (self.direction === -1 && progress > 1 && isMobile) {
              setHeaderHidden(false);
            }

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

    return () => {
      ctx.revert(); // ScrollTrigger 제거
    };
  }, [isMobile, setHeaderHidden]);

  useEffect(() => {
    const video = videoRef.current;
    const videoWrap = videowrapRef.current;

    if (!video || !videoWrap) return;

    // play/pause 버튼
    const playBtn = videoWrap.querySelector(".movie-btn.play");
    const pauseBtn = videoWrap.querySelector(".movie-btn.pause");

    // suspend 로깅
    const onSuspend = () => {
      console.log("Data loading has been suspended.");
    };

    const handleUserInteraction = () => {
      video.addEventListener("suspend", onSuspend);
    };

    document.body.addEventListener("click", handleUserInteraction, { once: true });
    document.body.addEventListener("touchstart", handleUserInteraction, { once: true });

    const handlePlay = () => {
      video.play();
      playBtn?.setAttribute("aria-pressed", "true");
      pauseBtn?.setAttribute("aria-pressed", "false");
      playBtn.style.display = "none";
      pauseBtn.style.display = "inline-block";
    };

    const handlePause = () => {
      video.pause();
      playBtn?.setAttribute("aria-pressed", "false");
      pauseBtn?.setAttribute("aria-pressed", "true");
      playBtn.style.display = "inline-block";
      pauseBtn.style.display = "none";
    };

    // 버튼 이벤트 연결
    playBtn?.addEventListener("click", handlePlay);
    pauseBtn?.addEventListener("click", handlePause);

    // 비디오 영역 클릭 시 토글
    const handleVideoWrapClick = (e) => {
      // 버튼 자체 클릭이면 무시
      if (e.target.closest(".movie-btn")) return;

      video.paused ? handlePlay() : handlePause();
    };

    videoWrap.addEventListener("click", handleVideoWrapClick);

    // 초기 상태 (자동 재생하면 pause 버튼만 보이도록)
    playBtn.style.display = video.paused ? "inline-block" : "none";
    pauseBtn.style.display = video.paused ? "none" : "inline-block";

    return () => {
      // suspend 리스너 해제
      document.body.removeEventListener("click", handleUserInteraction);
      document.body.removeEventListener("touchstart", handleUserInteraction);
      video.removeEventListener("suspend", onSuspend);

      // 버튼 해제
      playBtn?.removeEventListener("click", handlePlay);
      pauseBtn?.removeEventListener("click", handlePause);

      // 래퍼 클릭 해제
      videoWrap.removeEventListener("click", handleVideoWrapClick);
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
      {/* <div className="video-wrap" ref={videowrapRef}>
        <video ref={videoRef} autoplay muted loop playsInline poster="/intro.png" >
        <source  src="/intro.mp4" type="video/mp4" />
        </video>
        <div className="txt_motion_box">
          {intro.map((text, index) => (
            <div key={index}
              className={`txt_motion txt_motion0${index + 1}`}
              ref={(el) => (textRefs.current[index] = el)}
            >
              <strong>{text.title}</strong>
              <p>{text.desc}</p>
            </div>
          ))}
        </div>
      </div> */}
      <div className="video-wrap" ref={videowrapRef}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/intro.png"
        >
          <source src="/intro.mp4" type="video/mp4" />
        </video>
        <div className="txt_motion_box">
          {intro.map((text, index) => (
            <div
              key={index}
              className={`txt_motion txt_motion0${index + 1}`}
              ref={(el) => (textRefs.current[index] = el)}
            >
              <strong>{text.title}</strong>
              <p>{text.desc}</p>
            </div>
          ))}
        </div>

        <div
          className="btn-wrap"
          role="group"
          aria-label="영상 재생 컨트롤"
        >
          <button
            type="button"
            aria-label="영상 일시정지"
            aria-pressed="true"
            className="movie-btn pause"
          ></button>
          <button
            type="button"
            aria-label="영상 재생"
            aria-pressed="false"
            className="movie-btn play"
          ></button>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
