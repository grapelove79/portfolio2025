import React, { useEffect, useRef, useState } from "react";
import { headerNav } from "../constants";
import useAppStore from "../hooks/useAppStore";
import useScrollBlock from "../hooks/useScrollBlock";
import { lenis } from "../utils/lenis-anchors"; // lenis 부드러운 스크롤 인스턴스 import
import useIsMobile from "../hooks/useIsMobile";  // useIsMobile 훅 import

const Header = () => {
  const isMobile = useIsMobile();
  const [on, setOn] = useState(false);
  const lastScrollYRef = useRef(0);
  const [scrollDirection, setScrollDirection] = useState("up");
  const { isHeaderHidden, setHeaderHidden, isScrollDisabled } = useAppStore();
  const headerRef = useRef(null);
  const isScrollBlocked = useScrollBlock();

  const toggleMenu = () => {
    if (!isMobile) return;
    setOn((prev) => !prev);
  };

  useEffect(() => {
    if (on) {
      document.body.classList.add("stop-scroll--menu");
    } else {
      document.body.classList.remove("stop-scroll--menu");
    }
  }, [on]);

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
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [on]);

  useEffect(() => {
    document.body.setAttribute("data-scroll", scrollDirection);

    const handleScroll = () => {
      if (isScrollDisabled || isScrollBlocked()) return;

      const currentScroll = window.scrollY;
      const direction =
        currentScroll > lastScrollYRef.current && currentScroll ? "down" : "up";

      if (direction !== scrollDirection) {
        setScrollDirection(direction);
        setHeaderHidden(direction === "down");
      }

      lastScrollYRef.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrollDisabled, isHeaderHidden, setHeaderHidden, scrollDirection, isScrollBlocked]);

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
                <a
                  href={nav.url}
                  onClick={(e) => {
                    const target = document.querySelector(nav.url);
                    if (target) {
                      e.preventDefault();
                      // 스크롤 완료 후 메뉴 닫기 이벤트 등록
                      const onScrollEnd = () => {
                        setOn(false);
                        lenis.off("scrollEnd", onScrollEnd);
                      };
                      lenis.on("scrollEnd", onScrollEnd);

                      lenis.scrollTo(target);
                    } else {
                      setOn(false);
                    }
                  }}
                >
                  {nav.title}
                </a>
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
