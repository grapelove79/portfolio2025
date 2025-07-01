import React, { useEffect, useRef, useState } from "react";
import { headerNav } from "../constants";
import useAppStore from "../hooks/useAppStore"; // Zustand 상태 훅

const Header = () => {
  const lastScroll = useRef(0);
  const [on, setOn] = useState(false); // 모바일 메뉴 열림 상태
  const { isHeaderHidden, setHeaderHidden, isScrollDisabled } = useAppStore();

  // 모바일 메뉴 토글 함수
  const toggleMenu = () => {
    // useState가 기본값이 false이기 때문에 
    // prevShow가 false 이면 => prevShow를 반대(!)로 true 로 해주고, 
    // prevShow가 true 이면 => prevShow를 반대(!)로 false 로 해줘라!
    setOn((prevShow) => !prevShow)
  }

  // 스크롤 시 헤더 감지
  useEffect(() => {
    const handleScroll = () => {
      if (isScrollDisabled) return; // GSAP ScrollTrigger 내에서는 감지 OFF

      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll.current && currentScroll > 41) {
        setHeaderHidden(true); // 아래로 스크롤 시 헤더 숨김
      } else {
        setHeaderHidden(false); // 위로 스크롤 시 헤더 보임
      }

      lastScroll.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrollDisabled, setHeaderHidden]);

  // 모바일 메뉴 클릭 시 닫기
  const handleNavClick = () => {
    setOn(false);
  };

  return (
    <header id="header" role="banner" className={isHeaderHidden ? "hide" : ""}>
      <div className="header__inner">
        <h1 className="header__logo">
          <a href="/">Youngsun</a>
        </h1>
        {/* PC & 모바일 공통 네비게이션 */}
        {/* show의 값이 true 면 show 가 붙고 아니면 아무것도 없게 "" 처리  */}
        <nav
          className={`header__nav ${on ? "on" : ""}`} // on가 true일 때 클래스 적용
          role="navigation"
          aria-label="메인메뉴"
        >
          <ul className="nav__wrap">
            {headerNav.map((nav, key) => (
              <li key={key}>
                <a href={nav.url} onClick={handleNavClick}>{nav.title}</a>
              </li>
            ))}
          </ul>
          {/* <ul className="nav-mo__wrap">
            {headerNav.map((nav, key) => (
              <li key={key}>
                <a href={nav.url}>{nav.title}</a>
              </li>
            ))}
          </ul> */}
        </nav>
        {/* 모바일 메뉴 토글 버튼 */}
        <div
          className="header__nav__mobile"
          id="headerToggle"
          aria-controls="primary-menu"
          aria-expanded={on ? "true" : "false"}
          role="button"
          tabIndex="0"
          onClick={toggleMenu}
          onKeyDown={(e) => {
            // 키보드 접근성 - Enter 또는 Space 키로 메뉴 토글
            if (e.key === "Enter" || e.key === " ") {
              toggleMenu();
            }
          }}
        >
          <span></span>
        </div>
      </div>
    </header>
  )
}

export default Header;