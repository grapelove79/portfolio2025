import React, { useEffect, useRef, useState } from "react";
import { headerNav } from "../constants";
import useAppStore from "../hooks/useAppStore";

const Header = () => {
  const [on, setOn] = useState(false);
  const lastScrollYRef = useRef(0);
  const scrollDirectionRef = useRef(null);
  const { isHeaderHidden, setHeaderHidden, isScrollDisabled } = useAppStore();
  const [isMobile, setIsMobile] = useState(false);
  const headerRef = useRef(null);

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
      console.log("📌 메뉴 토글 상태:", next);
      return next;
    });
  };

  // body stop-scroll 클래스 처리
  useEffect(() => {
    console.log("📌 on 상태 변경:", on);
    const body = document.body;
    if (on) {
      body.classList.add("stop-scroll");
    } else {
      body.classList.remove("stop-scroll");
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
        console.log("📌 외부 클릭으로 메뉴 닫힘");
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [on]);

  // 헤더 스크롤 숨김/표시
  useEffect(() => {
    const handleScroll = () => {
      if (isScrollDisabled) return;

      const currentScroll = window.scrollY;
      const isMenuOpen =
        headerRef.current?.classList.contains("on") &&
        document.querySelector(".header__nav__mobile")?.getAttribute("aria-expanded") === "true" &&
        document.body.classList.contains("stop-scroll");

      if (isMenuOpen) {
        if (isHeaderHidden) setHeaderHidden(false);
        return;
      }

      const direction =
        currentScroll > lastScrollYRef.current && currentScroll > 0 ? "down" : "up";

      if (direction !== scrollDirectionRef.current) {
        scrollDirectionRef.current = direction;
        if (direction === "down") setHeaderHidden(true);
        else setHeaderHidden(false);
      }

      lastScrollYRef.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrollDisabled, isHeaderHidden, setHeaderHidden]);

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
