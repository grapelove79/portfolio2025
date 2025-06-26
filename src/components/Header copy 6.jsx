
// 최종 원본 6/26
import React, { useEffect, useRef, useState } from "react";
import { headerNav } from "../constants";
import useAppStore from "../hooks/useAppStore";
import useScrollBlock from "../hooks/useScrollBlock";
import useIsMobile from "../hooks/useIsMobile";  // useIsMobile 훅 import
import { ScrollTrigger } from "gsap/ScrollTrigger";
import lenis from "../utils/smooth";

const Header = () => {
  const isMobile = useIsMobile();
  const [on, setOn] = useState(false); // 모바일 메뉴 열림 상태
  const lastScrollYRef = useRef(0); // 이전 스크롤 위치 저장용 ref
  const [scrollDirection, setScrollDirection] = useState("up"); // 스크롤 방향 상태(up/down)
  const { isHeaderHidden, setHeaderHidden, isScrollDisabled } = useAppStore();
  const headerRef = useRef(null);
  const isScrollBlocked = useScrollBlock();

  // 모바일 메뉴 토글 함수
  const toggleMenu = () => {
    if (!isMobile) return;
    setOn(prev => !prev);
  };

  // 메뉴 열림 상태에 따라 body에 스크롤 차단 클래스 추가/제거
  useEffect(() => {
    console.log("on 상태 변경:", on);
    if (on) {
      document.body.classList.add("stop-scroll--menu"); // 메뉴 열림 시 스크롤 차단
    } else {
      document.body.classList.remove("stop-scroll--menu");
    }
  }, [on]);

  // 메뉴 외부 클릭 시 메뉴 닫기 처리
  useEffect(() => {
    const handleClickOutside = (e) => {
      const menu = document.querySelector(".header__nav");
      const toggle = document.querySelector("#headerToggle");

      if (
        on && // 메뉴가 열려있고
        menu &&
        toggle &&
        !menu.contains(e.target) && // 클릭 대상이 메뉴 내부가 아니고
        !toggle.contains(e.target) // 토글 버튼도 아닐 때
      ) {
        setOn(false); // 메뉴 닫기
        console.log("외부 클릭으로 메뉴 닫힘");
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [on]);

  // 스크롤 방향 감지 및 헤더 숨김/표시 처리
  useEffect(() => {
    // body data-scroll 속성에 현재 스크롤 방향 설정 (CSS에서 활용 가능)
    document.body.setAttribute("data-scroll", scrollDirection);

    const handleScroll = () => {
      if (isScrollDisabled || isScrollBlocked()) return; // 스크롤 차단 상태면 무시

      const currentScroll = window.scrollY;
      // 현재 스크롤 위치가 이전보다 크면 "down", 작거나 같으면 "up"
      const direction =
        currentScroll > lastScrollYRef.current && currentScroll ? "down" : "up";

      if (direction !== scrollDirection) {
        setScrollDirection(direction); // 상태 변경
        setHeaderHidden(direction === "down"); // 스크롤 다운 시 헤더 숨김, 업 시 표시
      }

      lastScrollYRef.current = currentScroll; // 현재 위치 저장
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrollDisabled, isHeaderHidden, setHeaderHidden, scrollDirection, isScrollBlocked]);

  // 헤더 클래스 이름 조합
  const headerClassName = [
    isHeaderHidden ? "hide" : "", // 헤더 숨김 상태면 hide 클래스 추가
    isMobile && on ? "on" : "",   // 모바일이고 메뉴 열림 상태면 on 클래스 추가
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
                    // a 태그 기본 이동 막고 Lenis를 이용해 부드럽게 스크롤 이동 처리
                    const target = document.querySelector(nav.url);
                    if (target) {
                      e.preventDefault(); // 기본 이동 막기

                      // 스크롤 완료 후 메뉴 닫기 이벤트 등록
                      const onScrollEnd = () => {
                        setOn(false);
                        lenis.off("scrollEnd", onScrollEnd); // 스크롤 애니메이션 종료 시점에 메뉴 닫기

                        ScrollTrigger.refresh(); // scrollTo 후 ScrollTrigger 위치 다시 계산
                      };
                      lenis.on("scrollEnd", onScrollEnd);

                      lenis.scrollTo(target); // Lenis 스크롤 이동
                    }
                    setOn(false); // 메뉴 닫기
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
  );
};

export default Header;