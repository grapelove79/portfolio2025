import React, { useEffect, useRef, useState } from "react";
import { headerNav } from "../constants";
import useAppStore from "../hooks/useAppStore"; // Zustand 상태 훅

const Header = () => {
  const [on, setOn] = useState(false); // 모바일 메뉴 열기/닫기 상태
  const lastScrollYRef = useRef(0); // 이전 scrollY 저장
  const scrollDirectionRef = useRef(null); // 이전 방향 저장 ("up" | "down")

  const { isHeaderHidden, setHeaderHidden, isScrollDisabled } = useAppStore();
  const [isMobile, setIsMobile] = useState(false); // 화면 크기 체크

  // 화면 크기 변경 시 isMobile 상태 업데이트
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024); // 1024px 이하일 때만 모바일로 간주
    };

    handleResize(); // 처음 렌더링 시 체크
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 메뉴 열기/닫기
  const toggleMenu = () => {
    if (isMobile) {
      // useState가 기본값이 false이기 때문에 
      // prevShow가 false 이면 => prevShow를 반대(!)로 true 로 해주고,
      // prevShow가 true 이면 => prevShow를 반대(!)로 false 로 해줘라!
      setOn(prev => !prev); // 모바일에서만 메뉴 토글
    }
  };

  // aria-expanded 상태에 따라 body 클래스 추가/제거
  useEffect(() => {
    const body = document.body;
    if (on) {
      body.classList.add("stop-scroll");
    } else {
      body.classList.remove("stop-scroll");
    }
  }, [on]); // on 상태가 변경될 때마다 실행

  // 스크롤 시 헤더 감지
  useEffect(() => {
    const handleScroll = () => {
      if (isScrollDisabled) return; // GSAP ScrollTrigger 내에서는 감지 OFF

      const currentScroll = window.scrollY;

      const isMenuOpen =
        document.querySelector("#header")?.classList.contains("on") &&
        document.querySelector(".header__nav__mobile")?.getAttribute("aria-expanded") === "true" &&
        document.body.classList.contains("stop-scroll");

      if (isMenuOpen) {
        if (isHeaderHidden) setHeaderHidden(false); // 조건 충족 시 hide 제거
        return;
      }
      const direction =
        currentScroll > lastScrollYRef.current && currentScroll > 0 ? "down" : "up";

      // 방향이 바뀔 때만 setHeaderHidden 호출
      if (direction !== scrollDirectionRef.current) {
        scrollDirectionRef.current = direction;

        if (direction === "down") {
          setHeaderHidden(true); // 아래로 스크롤 → 숨김
        } else {
          setHeaderHidden(false); // 위로 스크롤 → 보임
        }
      }

      lastScrollYRef.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrollDisabled, isHeaderHidden, setHeaderHidden]);


  // 메뉴 클릭 시 닫기 (모바일에서)
  const handleNavClick = () => {
    setOn(false);
  };

  // 클래스명 조합
  const headerClassName = [
    isHeaderHidden ? "hide" : "",
    isMobile && on ? "on" : "", // 모바일에서만 on 클래스 적용
  ].join(" ").trim();

  return (
    <header id="header" role="banner" className={headerClassName}>
      {/* <header id="header" role="banner" className={isHeaderHidden ? "hide" : ""}> */}
      <div className="header__inner">
        <h1 className="header__logo">
          <a href="/">Youngsun</a>
        </h1>
        {/* PC & 모바일 공통 네비게이션 */}
        {/* show의 값이 true 면 show 가 붙고 아니면 아무것도 없게 "" 처리  */}
        <nav
          className="header__nav"
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
        </nav>
        {/* 모바일 메뉴 토글 버튼 */}
        <div
          className="header__nav__mobile"
          id="headerToggle"
          aria-controls="primary-menu"
          aria-expanded={on ? "true" : "false"} // aria-expanded 상태 반영
          role="button"
          tabIndex="0"
          onClick={toggleMenu}
        >
          <span></span>
        </div>
      </div>
    </header>
  )
}

export default Header;