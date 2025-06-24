import React, { useEffect, useRef, useState } from "react";
import { headerNav } from "../constants";
import useAppStore from "../hooks/useAppStore";
import useScrollBlock from "../hooks/useScrollBlock";

const Header = () => {
  const [on, setOn] = useState(false);
  const lastScrollYRef = useRef(0);
  // const scrollDirectionRef = useRef(null);
  const [scrollDirection, setScrollDirection] = useState("up"); // ✅ 스크롤 방향 상태
  const { isHeaderHidden, setHeaderHidden, isScrollDisabled } = useAppStore();
  const [isMobile, setIsMobile] = useState(false);
  const headerRef = useRef(null);
  const isScrollBlocked = useScrollBlock();


  // 화면 크기 체크
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 메뉴 열기/닫기
  const toggleMenu = () => {
    if (!isMobile) return;
    setOn(prev => {
      const next = !prev;
      console.log("메뉴 토글 상태:", next);
      return next;
    });
  };

  // body stop-scroll 클래스 처리
  useEffect(() => {
    console.log("on 상태 변경:", on);
    if (on) {
      document.body.classList.add("stop-scroll--menu");
    } else {
      document.body.classList.remove("stop-scroll--menu");
    }
  }, [on]);



  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      const menu = document.querySelector(".header__nav");
      const toggle = document.querySelector("#headerToggle");

      if (
        on &&
        menu &&
        toggle &&
        !menu.contains(e.target) &&
        !toggle.contains(e.target)
      ) {
        setOn(false);
        console.log("외부 클릭으로 메뉴 닫힘");
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [on]);

  // 스크롤 방향 감지 및 <body data-scroll="..."> 설정 및 헤더 스크롤 숨김/표시
  useEffect(() => {
    document.body.setAttribute("data-scroll", scrollDirection); // 기본값 설정

    const handleScroll = () => {
      const scrollBlocked = isScrollBlocked();
      if (isScrollDisabled || isScrollBlocked()) return;

      const currentScroll = window.scrollY;
      // const isMenuOpen =  // 스크롤 차단 여부
      //   headerRef.current?.classList.contains("on") &&
      //   document.querySelector(".header__nav__mobile")?.getAttribute("aria-expanded") === "true" &&
      //   document.body.classList.contains("stop-scroll");

      // const isMenuOpen = isScrollBlocked(); // 스크롤 차단 여부로 대체

      if (scrollBlocked) {
        // if (isMenuOpen) {
        if (isHeaderHidden) setHeaderHidden(false);
        return;
      }

      const direction =
        // currentScroll > lastScrollYRef.current && currentScroll > 0 ? "down" : "up";
        currentScroll > lastScrollYRef.current && currentScroll ? "down" : "up";

      if (direction !== scrollDirection) {
        setScrollDirection(direction)
        // if (direction !== scrollDirectionRef.current) {
        // scrollDirectionRef.current = direction;

        setHeaderHidden(direction === "down");

        // if (direction === "down") setHeaderHidden(true);
        // else setHeaderHidden(false);
      }


      lastScrollYRef.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrollDisabled, isHeaderHidden, setHeaderHidden, scrollDirection, isScrollBlocked]);

  // useEffect(() => {
  //   console.log("스크롤 방향:", scrollDirection);
  //   document.body.setAttribute("data-scroll", scrollDirection);
  // }, [scrollDirection]);

  // 모바일 메뉴 클릭 시 닫기
  const handleNavClick = () => {
    setOn(false);
  };

  const headerClassName = [
    isHeaderHidden ? "hide" : "",
    isMobile && on ? "on" : "",
  ].join(" ").trim();

  return (
    <header id="header" ref={headerRef} className={headerClassName} role="banner">
      <div className="header__inner">
        <h1 className="header__logo">
          <a href="/">Youngsun</a>
        </h1>
        <nav className="header__nav" role="navigation" aria-label="메인메뉴">
          <ul className="nav__wrap">
            {headerNav.map((nav, key) => (
              <li key={key}>
                <a href={nav.url} onClick={handleNavClick}>{nav.title}</a>
                {/* <a href={nav.url} onClick={handleNavClick}>{nav.title}</a> */}
              </li>
            ))}
          </ul>
        </nav>
        <div
          className="header__nav__mobile"
          id="headerToggle"
          aria-controls="primary-menu"
          aria-expanded={on ? "true" : "false"}
          role="button"
          tabIndex="0"
          onClick={toggleMenu}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              toggleMenu();
            }
          }}
        >
          <span></span>
        </div>
      </div>
    </header>
  );
};

export default Header;


