// Header.jsx
import React, { useEffect, useRef, useState } from "react";
import { headerNav } from "../constants";

// 전역 변수 초기화: 감지 비활성화 여부 (IntroSection에서 변경)
if (typeof window !== "undefined" && !window.__disableHeaderScroll__) {
  window.__disableHeaderScroll__ = false;
}

const Header = () => {
  const [show, setShow] = useState(false);      // 모바일 메뉴 toggle 상태
  const [isHide, setIsHide] = useState(false);  // 헤더 숨김 여부
  const lastScroll = useRef(0);                 // 마지막 스크롤 위치
  const ticking = useRef(false);                // requestAnimationFrame 중복 방지

  const toggleMenu = () => {
    setShow((prevShow) => !prevShow);
  };

  const handleScroll = () => {
    // ScrollTrigger 사용 중이거나 IntroSection에서 감지 중지 요청이 들어온 경우
    if (window.__disableHeaderScroll__) return;

    const currentScroll = window.pageYOffset;

    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        if (currentScroll > lastScroll.current && currentScroll > 100) {
          setIsHide(true);  // 아래로 스크롤 시 숨김
        } else {
          setIsHide(false); // 위로 스크롤 시 표시
        }
        lastScroll.current = currentScroll;
        ticking.current = false;
      });
      ticking.current = true;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header id="header" role="banner" className={isHide ? "hide" : ""}>
      <div className="header__inner">
        <div className="header__logo">
          <h1>
            <a href="/">Youngsun</a>
          </h1>
        </div>
        <nav
          className={`header__nav ${show ? "show" : ""}`}
          role="navigation"
          aria-label="메인메뉴"
        >
          <ul>
            {headerNav.map((nav, key) => (
              <li key={key}>
                <a href={nav.url}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div
          className="header__nav__mobile"
          id="headerToggle"
          aria-controls="primary-menu"
          aria-expanded={show ? "true" : "false"}
          role="button"
          tabIndex="0"
          onClick={toggleMenu}
        >
          <span></span>
        </div>
      </div>
    </header>
  );
};

export default Header;
