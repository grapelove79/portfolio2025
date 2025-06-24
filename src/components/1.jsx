// Sec01.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import $ from "jquery";
gsap.registerPlugin(ScrollTrigger);

const Sec01 = () => {
  const sec01Ref = useRef(null);
  const bannerBoxRef = useRef(null);
  const txtMotionBoxRef = useRef(null);
  const videoWrapRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const widthW = window.innerWidth;
      const heightH = window.innerHeight;
      const bannerBox = bannerBoxRef.current;

      if (widthW > heightH) {
        bannerBox.classList.remove("heightH");
        bannerBox.classList.add("widthW");
      } else {
        bannerBox.classList.add("heightH");
        bannerBox.classList.remove("widthW");
      }
    };

    window.addEventListener("load", handleResize);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("load", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const $sec01 = $(sec01Ref.current);
    const $bannerBox = $(bannerBoxRef.current);
    const $txtMotionBox = $(txtMotionBoxRef.current);
    const $videoWrap = $(videoWrapRef.current);

    gsap.timeline({
      scrollTrigger: {
        id: "sec01",
        trigger: $sec01,
        pin: true,
        start: "top top",
        end: "400% top",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = Math.floor(self.progress * 100);

          if (self.direction === -1) {
            if (progress === 0) $bannerBox.removeClass("active");
            if (progress < 10) $txtMotionBox.find(".txt_motion01").removeClass("active");
            if (progress < 35) $txtMotionBox.find(".txt_motion01").removeClass("none");
            if (progress < 55) $txtMotionBox.find(".txt_motion02").removeClass("active");
            if (progress < 80) $videoWrap.removeClass("active");
          } else {
            if (progress > 1) $bannerBox.addClass("active");
            if (progress > 10) $txtMotionBox.find(".txt_motion01").addClass("active");
            if (progress > 35) $txtMotionBox.find(".txt_motion01").addClass("none");
            if (progress > 55) $txtMotionBox.find(".txt_motion02").addClass("active");
            if (progress > 80) $videoWrap.addClass("active");
          }
        },
      },
    }).to($sec01, {
      opacity: 1,
      duration: 3.5,
    });

    $("#wave1").wavify({
      height: 10,
      bones: 1,
      amplitude: 50,
      color: "transparent",
      speed: 0.15,
    });

    $("#wave2").wavify({
      height: 10,
      bones: 1,
      amplitude: 45,
      color: "transparent",
      speed: 0.25,
    });
  }, []);

  return (
    <section ref={sec01Ref} className="sec01">
      <div ref={bannerBoxRef} className="banner_box"></div>
      <div ref={txtMotionBoxRef} className="txt_motion_box">
        <div className="txt_motion01">TEXT 01</div>
        <div className="txt_motion02">TEXT 02</div>
      </div>
      <div ref={videoWrapRef} className="video_wrap">
        <video muted autoPlay loop>
          <source src="/video/sample.mp4" type="video/mp4" />
        </video>
      </div>
      <svg id="wave1" />
      <svg id="wave2" />
    </section>
  );
};

export default Sec01;


// Sec03.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const isTouchDevice = () => {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

const Sec03 = () => {
  const sec03Ref = useRef(null);
  const listWrapRef = useRef(null);
  const listScrollRef = useRef(null);

  useEffect(() => {
    const motion = () => {
      const windowWidth = window.innerWidth;
      const sec03 = sec03Ref.current;
      const listWrap = listWrapRef.current;
      const scrollTarget = windowWidth > 1023 && !isTouchDevice() ? listScrollRef.current : listWrap;
      const moveY = listWrap.scrollHeight - sec03.clientHeight;

      gsap.timeline({
        scrollTrigger: {
          id: "listMotion",
          trigger: sec03,
          pin: true,
          start: "top top",
          end: "250% 10%",
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = Math.floor(self.progress * 100);
            if (self.direction === -1 && progress < 25) {
              sec03.classList.remove("active");
            } else if (self.direction === 1 && progress > 10) {
              sec03.classList.add("active");
            }
          },
        },
      })
        .to(sec03, { opacity: 1, duration: 0.3 })
        .to(sec03, { backgroundPosition: "0 70%" })
        .to(scrollTarget, { y: `-${moveY}` }, "<");
    };

    motion();
    const handleResize = () => {
      if (window.innerWidth > 1023 && !isTouchDevice()) {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.vars.id === "listMotion") {
            st.kill();
          }
        });
        motion();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section ref={sec03Ref} className="sec03">
      <div ref={listWrapRef} className="list_scroll_wrap">
        <div ref={listScrollRef} className="list_scroll">
          {/* List Content */}
        </div>
      </div>
    </section>
  );
};

export default Sec03;


// ScrollActiveInitializer.jsx
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ScrollActiveInitializer = () => {
  useEffect(() => {
    document.querySelectorAll("[data-motionActive]").forEach((el, idx) => {
      ScrollTrigger.create({
        id: "sec" + idx,
        trigger: el,
        scrub: 0.5,
        start: "top 90%",
        invalidateOnRefresh: true,
        onEnter: () => el.classList.add("active"),
        onLeaveBack: () => el.classList.remove("active"),
      });
    });
  }, []);

  return null;
};

export default ScrollActiveInitializer;
